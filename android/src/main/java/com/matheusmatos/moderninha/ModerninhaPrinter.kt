package com.matheusmatos.moderninha

import android.graphics.Bitmap
import android.util.Log
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrintResult
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrinterData
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrinterListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableArray
import java.io.File
import java.io.FileOutputStream


class ModerninhaPrinter(private val plugPag: PlugPag) {
  companion object {
    const val TAG = "ModerninhaPrinter"
  }

  private fun saveBitmapToTempFile(context: ReactApplicationContext, bitmap: Bitmap): File {
    val tempFile = File.createTempFile("printer", ".tmp", context.cacheDir)
    FileOutputStream(tempFile).use { outputStream ->
      bitmap.compress(Bitmap.CompressFormat.JPEG, 100, outputStream)
    }
    return tempFile
  }

  private fun readableArrayToList(readableArray: ReadableArray): List<Map<String, String>> {
    val list = mutableListOf<Map<String, String>>()

    for (i in 0 until readableArray.size()) {
      val readableMap = readableArray.getMap(i)
      val map = mutableMapOf<String, String>()

      val iterator = readableMap.keySetIterator()
      while (iterator.hasNextKey()) {
        val key = iterator.nextKey()
        map[key] = readableMap.getString(key) ?: ""
      }

      list.add(map)
    }

    return list
  }

  // Print text, file, or lines methods here, as discussed earlier.
  fun printFromText(
    context: ReactApplicationContext,
    text: String,
    printerQuality: Int,
    steps: Int,
    promise: Promise
  ) {
    try {
      // Step 1: Create the bitmap using ModerninhaPrinterCanvas
      val scale = context.resources.displayMetrics.density
      val printerCanvas = ModerninhaPrinterCanvas(384, scale) // Width is typically 384px for thermal printers
      val bitmap = printerCanvas.createBitmapFromText(text)

      // Step 2: Save the bitmap to a file
      val savedFile = saveBitmapToTempFile(context, bitmap)

      // Step 3: Print using the existing SDK (PlugPag)
      printFromFile(context, savedFile.absolutePath, printerQuality, steps, promise)
    } catch (e: Exception) {
      Log.e(TAG, "Error in printFromLines: ${e.message}", e)
      promise.reject("PRINT_ERROR", e.message, e)
    }
  }

  fun printFromLines(
    context: ReactApplicationContext,
    lines: ReadableArray,
    printerQuality: Int,
    steps: Int,
    promise: Promise
  ) {
      try {
        // Step 1: Convert ReadableArray to List<Map<String, String>>
        val convertedLines = readableArrayToList(lines)

        // Step 2: Create the bitmap using ModerninhaPrinterCanvas
        val scale = context.resources.displayMetrics.density
        val printerCanvas = ModerninhaPrinterCanvas(384, scale) // Width is typically 384px for thermal printers
        val bitmap = printerCanvas.createBitmapFromLines(convertedLines)

        // Step 3: Save the bitmap to a file
        val savedFile = saveBitmapToTempFile(context, bitmap)

        // Step 4: Print using the existing SDK (PlugPag)
        printFromFile(context, savedFile.absolutePath, printerQuality, steps, promise, deleteFile = true)
      } catch (e: Exception) {
        Log.e(TAG, "Error in printFromLines: ${e.message}", e)
        promise.reject("PRINT_ERROR", e.message, e)
      }
  }

  fun printFromFile(
    context: ReactApplicationContext,
    filePath: String,
    printerQuality: Int,
    steps: Int,
    promise: Promise,
    deleteFile: Boolean = false
  ) {
    val data = PlugPagPrinterData(filePath, printerQuality, steps)
    val listener: PlugPagPrinterListener = object : PlugPagPrinterListener {
      override fun onSuccess(result: PlugPagPrintResult) {
        val map = Arguments.createMap().apply {
          putString("message", result.message)
          putString("code", result.errorCode)
        }
        promise.resolve(map)
        if (deleteFile) {
          File(filePath).delete()
        }
      }

      override fun onError(result: PlugPagPrintResult) {
        promise.reject("PRINT_ERROR", result.message ?: "Unknown error", Throwable(result.errorCode))
        if (deleteFile) {
          File(filePath).delete()
        }
      }
    }

    plugPag.setPrinterListener(listener)
    plugPag.printFromFile(data)
  }
}
