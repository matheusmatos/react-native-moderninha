package com.matheusmatos.moderninha

import android.graphics.*
import android.util.Base64
import android.util.Log
import com.google.zxing.BarcodeFormat
import com.google.zxing.MultiFormatWriter

class ModerninhaPrinterCanvas(private val width: Int, private val scale: Float) {
  companion object {
    const val TAG = "ModerninhaPrinterCanvas"
  }

  private var canvas: Canvas? = null
  private var cY = 0
  private var px = (1 * scale).toInt()
  private var mm = 13 * px
  private var pt = 3 * px

  private val paintFillBlack = Paint(Paint.ANTI_ALIAS_FLAG).apply {
    style = Paint.Style.FILL
    color = Color.BLACK
  }

  private val basicPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply { color = Color.BLACK }

  private val centerX get() = canvas?.width?.div(2) ?: 0

  fun createBitmapFromText(text: String): Bitmap {
    // Step 1: Define bitmap dimensions and properties
    val width = 384 // Typical width for thermal printers
    val textPaint = android.graphics.Paint().apply {
      color = android.graphics.Color.BLACK
      textSize = 24f
      isAntiAlias = true
    }
    val textHeight = textPaint.descent() - textPaint.ascent()
    val height = (textHeight * text.split("\n").size).toInt()

    // Step 2: Create the bitmap
    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
    val canvas = android.graphics.Canvas(bitmap)
    canvas.drawColor(android.graphics.Color.WHITE) // Set background color

    // Step 3: Draw the text
    var y = -textPaint.ascent()
    text.split("\n").forEach { line ->
      canvas.drawText(line, 0f, y, textPaint)
      y += textHeight
    }

    return bitmap
  }

  fun createBitmapFromLines(lines: List<Map<String, String>>): Bitmap {
    val height = calculateHeight(lines)
    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
    canvas = Canvas(bitmap)
    canvas?.drawColor(Color.WHITE) // Background color
    drawContent(lines)
    return bitmap
  }

  private fun calculateHeight(lines: List<Map<String, String>>): Int {
    var totalHeight = 0
    lines.forEach { line ->
      totalHeight += when (line["tag"]?.uppercase()) {
        "HR" -> 3 * mm
        "QRCODE" -> 15 * mm
        "BARCODE" -> 8 * mm
        "IMG" -> line["content"]?.let { decodeBase64Image(it)?.height } ?: 0
        else -> 4 * mm
      }
    }
    return totalHeight
  }

  private fun drawContent(lines: List<Map<String, String>>) {
    lines.forEach { line ->
      val tag = line["tag"] ?: return@forEach
      val content = line["content"] ?: ""
      when (tag.uppercase()) {
        "TITLE", "H1" -> drawText(content, 16 * pt, Paint.Align.CENTER, Typeface.BOLD)
        "SUBTITLE", "H2" -> drawText(content, 13 * pt, Paint.Align.CENTER, Typeface.BOLD)
        "STRONG" -> drawText(content, 13 * pt, Paint.Align.CENTER, Typeface.BOLD)
        "SMALL" -> drawText(content, 11 * pt, Paint.Align.CENTER, Typeface.NORMAL)
        "QRCODE" -> drawQRCode(content, 15 * mm)
        "BARCODE" -> drawBarcode(content)
        "IMG" -> drawImage(content)
        "HR" -> drawSeparator()
        else -> drawText(content, 13 * pt, Paint.Align.CENTER, Typeface.NORMAL)
      }
    }
  }

  private fun drawText(text: String, textSize: Int, align: Paint.Align, style: Int) {
    val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
      this.textSize = textSize.toFloat()
      this.textAlign = align
      this.typeface = Typeface.create("Roboto", style)
      this.color = Color.BLACK
    }
    canvas?.drawText(text, centerX.toFloat(), incrementY(4 * mm).toFloat(), paint)
  }

  private fun drawQRCode(content: String, size: Int) {
    val bitmap = generateQRCode(content, size)
    val left = (width - bitmap.width) / 2
    canvas?.drawBitmap(bitmap, left.toFloat(), incrementY(4 * mm).toFloat(), null)
    incrementY(bitmap.height)
  }

  private fun generateQRCode(content: String, size: Int): Bitmap {
    val bitMatrix = MultiFormatWriter().encode(content, BarcodeFormat.QR_CODE, size, size)
    return Bitmap.createBitmap(size, size, Bitmap.Config.ARGB_8888).apply {
      for (x in 0 until size) {
        for (y in 0 until size) {
          setPixel(x, y, if (bitMatrix[x, y]) Color.BLACK else Color.WHITE)
        }
      }
    }
  }

  private fun drawBarcode(content: String) {
    val height = 8 * mm
    val bitMatrix = MultiFormatWriter().encode(content, BarcodeFormat.CODE_128, width, height)
    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565).apply {
      for (x in 0 until width) {
        for (y in 0 until height) {
          setPixel(x, y, if (bitMatrix[x, y]) Color.BLACK else Color.WHITE)
        }
      }
    }
    val left = (width - bitmap.width) / 2
    canvas?.drawBitmap(bitmap, left.toFloat(), incrementY(4 * mm).toFloat(), null)
    incrementY(bitmap.height)
  }

  private fun drawImage(base64Content: String) {
    val bitmap = decodeBase64Image(base64Content) ?: return
    val left = (width - bitmap.width) / 2
    canvas?.drawBitmap(bitmap, left.toFloat(), incrementY(4 * mm).toFloat(), null)
    incrementY(bitmap.height)
  }

  private fun decodeBase64Image(base64Content: String): Bitmap? {
    return try {
      val pureBase64 = base64Content.substringAfter(",")
      val byteArray = Base64.decode(pureBase64, Base64.DEFAULT)
      BitmapFactory.decodeByteArray(byteArray, 0, byteArray.size)
    } catch (e: Exception) {
      Log.e(TAG, "Failed to decode Base64 image", e)
      null
    }
  }

  private fun drawSeparator() {
    val rect = Rect(0, incrementY(3 * mm), width, incrementY(1))
    canvas?.drawRect(rect, paintFillBlack)
  }

  private fun incrementY(amount: Int): Int {
    cY += amount
    return cY
  }
}
