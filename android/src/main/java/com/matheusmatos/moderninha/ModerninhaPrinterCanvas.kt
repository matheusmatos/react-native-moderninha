package com.matheusmatos.moderninha

import android.graphics.*
import android.util.Base64
import android.util.Log
import com.google.zxing.BarcodeFormat
import com.google.zxing.MultiFormatWriter

class ModerninhaPrinterCanvas(private val width: Int, private val scale: Float) {
  companion object {
    const val TAG = "ModerninhaPrinterCanvas"
    const val width = 384;
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

  private val fontSizes = mapOf(
    "TITLE" to 28f,      // Larger for titles
    "H1" to 28f,         // Main headings
    "H2" to 26f,         // Subheadings
    "SUBTITLE" to 26f,   // Secondary headings
    "SMALL" to 24f       // Default size for small text
  )

  private fun getFontSize(tag: String): Float {
    return fontSizes[tag.uppercase()] ?: 24f // Default to SMALL size if no match
  }

  fun createBitmapFromText(text: String): Bitmap {
    // Step 1: Define bitmap dimensions and properties
    val textPaint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
      color = Color.BLACK
      textSize = 24f // Default text size
      isAntiAlias = true
      typeface = Typeface.create("Roboto", Typeface.NORMAL)
    }
    val textHeight = textPaint.descent() - textPaint.ascent()
    val maxWidth = width - (2 * 10 * px) // Leave margins on both sides

    // Step 2: Wrap the text into multiple lines
    val lines = wrapText(text, textPaint, maxWidth)

    // Calculate the height of the bitmap based on the number of lines
    val height = (textHeight * lines.size).toInt() + (4 * mm)

    // Step 3: Create the bitmap
    val bitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888)
    val canvas = Canvas(bitmap)
    canvas.drawColor(Color.WHITE) // Set background color

    // Step 4: Draw each line of wrapped text
    var y = -textPaint.ascent() // Start drawing from the first line
    lines.forEach { line ->
      canvas.drawText(line, 10 * px.toFloat(), y, textPaint) // Add left margin
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

  private fun wrapText(text: String, paint: Paint, maxWidth: Int): List<String> {
    val words = text.split(" ")
    val lines = mutableListOf<String>()
    var currentLine = ""

    for (word in words) {
      val testLine = if (currentLine.isEmpty()) word else "$currentLine $word"
      if (paint.measureText(testLine) <= maxWidth) {
        currentLine = testLine
      } else {
        lines.add(currentLine)
        currentLine = word
      }
    }

    if (currentLine.isNotEmpty()) {
      lines.add(currentLine)
    }

    return lines
  }

  private fun drawContent(lines: List<Map<String, String>>) {
    lines.forEach { line ->
      val tag = line["tag"] ?: return@forEach
      val content = line["content"] ?: ""
      when (tag.uppercase()) {
        "TITLE", "H1" -> drawText(content, getFontSize("TITLE"), Paint.Align.CENTER, Typeface.BOLD)
        "SUBTITLE", "H2" -> drawText(content, getFontSize("SUBTITLE"), Paint.Align.CENTER, Typeface.BOLD)
        "STRONG" -> drawText(content, getFontSize("H2"), Paint.Align.CENTER, Typeface.BOLD)
        "SMALL" -> drawText(content, getFontSize("SMALL"), Paint.Align.CENTER, Typeface.NORMAL)
        "QRCODE" -> drawQRCode(content, 15 * mm)
        "BARCODE" -> drawBarcode(content)
        "IMG" -> drawImage(content)
        "HR" -> drawSeparator()
        else -> drawText(content, getFontSize("SMALL"), Paint.Align.CENTER, Typeface.NORMAL)
      }
    }
  }

  private fun drawText(text: String, textSize: Float, align: Paint.Align, style: Int) {
    val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply {
      this.textSize = textSize
      this.textAlign = align
      this.typeface = Typeface.create("Roboto", style)
      this.color = Color.BLACK
    }

    val maxWidth = width - (2 * 10 * px) // Leave margins on both sides

    // Scale down font size if text exceeds max width
    var adjustedTextSize = textSize
    while (paint.measureText(text) > maxWidth && adjustedTextSize > 8f) { // Prevent text size from being too small
      adjustedTextSize -= 1f
      paint.textSize = adjustedTextSize
    }

    // Draw the text on the canvas
    canvas?.drawText(text, centerX.toFloat(), incrementY((adjustedTextSize * 1.2).toInt()).toFloat(), paint)
  }

  private fun drawQRCode(content: String, maxSize: Int) {
    val size = (maxSize.coerceAtMost((width * 0.6).toInt())) // Limit QR code size to 60% of the paper width
    val bitmap = generateQRCode(content, size)
    val left = (width - bitmap.width) / 2 // Center the QR code
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
    val maxImageWidth = (width * 0.8).toInt() // Limit image width to 80% of the paper width
    val scaledBitmap = Bitmap.createScaledBitmap(
      bitmap,
      maxImageWidth,
      (bitmap.height * (maxImageWidth.toFloat() / bitmap.width)).toInt(),
      true
    )
    val left = (width - scaledBitmap.width) / 2
    canvas?.drawBitmap(scaledBitmap, left.toFloat(), incrementY(4 * mm).toFloat(), null)
    incrementY(scaledBitmap.height)
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
