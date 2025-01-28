package com.matheusmatos.moderninha

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.os.Build
import android.util.Log
import androidx.core.app.ActivityCompat
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagExtras
import br.com.uol.pagseguro.plugpagservice.wrapper.TerminalCapabilities
import com.facebook.react.bridge.ReactApplicationContext
import java.io.File
import java.io.FileOutputStream


class ModerninhaUtils() {
  companion object {
    const val TAG = "ModerninhaUtils"
  }

  fun getTerminalCapabilities(): Map<out String, Any> {
    val constants: MutableMap<String, Int> = HashMap()
    constants["MODULE_BT"] = TerminalCapabilities.MODULE_BT
    constants["MODULE_CASH_BOX"] = TerminalCapabilities.MODULE_CASH_BOX
    constants["MODULE_CUSTOMER_DISPLAY"] = TerminalCapabilities.MODULE_CUSTOMER_DISPLAY
    constants["MODULE_ETHERNET"] = TerminalCapabilities.MODULE_ETHERNET
    constants["MODULE_FINGERPRINT_READER"] = TerminalCapabilities.MODULE_FINGERPRINT_READER
    constants["MODULE_G_SENSOR"] = TerminalCapabilities.MODULE_G_SENSOR
    constants["MODULE_HDMI"] = TerminalCapabilities.MODULE_HDMI
    constants["MODULE_ICC"] = TerminalCapabilities.MODULE_ICC
    constants["MODULE_ID_CARD_READER"] = TerminalCapabilities.MODULE_ID_CARD_READER
    constants["MODULE_KEYBOARD"] = TerminalCapabilities.MODULE_KEYBOARD
    constants["MODULE_MAG"] = TerminalCapabilities.MODULE_MAG
    constants["MODULE_MODEM"] = TerminalCapabilities.MODULE_MODEM
    constants["MODULE_PED"] = TerminalCapabilities.MODULE_PED
    constants["MODULE_PICC"] = TerminalCapabilities.MODULE_PICC
    constants["MODULE_PRINTER"] = TerminalCapabilities.MODULE_PRINTER
    constants["MODULE_SM"] = TerminalCapabilities.MODULE_SM

    return constants
  }

  @Suppress("DEPRECATED")
  fun getTerminalSerialNumber(): String {
    return if (Build.VERSION.SDK_INT < Build.VERSION_CODES.O) {
      Build.SERIAL
    } else {
      getTerminalSN()
    }
  }

  fun getTerminalSN(): String {
    return PlugPagExtras.TERMINAL_SN
  }

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

  fun saveBitmapToTempFile(reactApplicationContext: ReactApplicationContext, bitmap: Bitmap): File {
    val tempFile = File.createTempFile("print", ".png", reactApplicationContext.cacheDir)
    FileOutputStream(tempFile).use { outputStream ->
      bitmap.compress(Bitmap.CompressFormat.PNG, 100, outputStream)
    }
    return tempFile
  }
}
