package com.matheusmatos.moderninha

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.data.request.PlugPagBeepData
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule

@ReactModule(name = ModerninhaModule.TAG)
@Suppress("unused")
class ModerninhaModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
  companion object {
    const val TAG = "Moderninha"

    fun String?.orNullIfEmpty(): String? {
      return if (this.isNullOrEmpty()) null else this
    }
  }

  private val plugPag: PlugPag = PlugPag(reactContext)
  private val moderninhaPrinter: ModerninhaPrinter = ModerninhaPrinter(plugPag)

  override fun getName(): String = TAG

  override fun getConstants(): MutableMap<String, Any> {
    val moderninhaUtils = ModerninhaUtils()
    return mutableMapOf(
      "TERMINAL_CAPABILITIES" to moderninhaUtils.getTerminalCapabilities(),
      "TERMINAL_SERIAL_NUMBER" to moderninhaUtils.getTerminalSerialNumber(),
      "TERMINAL_SN" to moderninhaUtils.getTerminalSN()
    )
  }

  @ReactMethod
  fun beep(beepDataMap: ReadableMap, promise: Promise) {
    try {
      val frequency = when (beepDataMap.getInt("frequency")) {
        0 -> PlugPagBeepData.FREQUENCE_LEVEL_0
        1 -> PlugPagBeepData.FREQUENCE_LEVEL_1
        2 -> PlugPagBeepData.FREQUENCE_LEVEL_2
        3 -> PlugPagBeepData.FREQUENCE_LEVEL_3
        4 -> PlugPagBeepData.FREQUENCE_LEVEL_4
        5 -> PlugPagBeepData.FREQUENCE_LEVEL_5
        6 -> PlugPagBeepData.FREQUENCE_LEVEL_6
        else -> throw IllegalArgumentException("Invalid frequency level")
      }

      val result = plugPag.beep(
        PlugPagBeepData(
          frequency = frequency,
          duration = beepDataMap.getInt("duration")
        )
      )
      promise.resolve(result)
    } catch (e: Exception) {
      promise.reject("ERROR", e.message, e)
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun hasCapability(capability: Int): Boolean {
    return plugPag.hasCapability(capability)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun isAuthenticated(): Boolean {
    return plugPag.isAuthenticated()
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun getUserData(): ReadableMap {
    try {
      val userData = plugPag.getUserData()
      val map = Arguments.createMap().apply {
        putString("address", userData.address.orNullIfEmpty())
        putString("city", userData.city.orNullIfEmpty())
        putString("cnpjCpf", userData.cnpjCpf.orNullIfEmpty())
        putString("addressComplement", userData.addressComplement.orNullIfEmpty())
        putString("companyName", userData.companyName.orNullIfEmpty())
        putString("userNickName", userData.userNickName.orNullIfEmpty())
        putString("addressState", userData.addressState.orNullIfEmpty())
        putString("email", userData.email.orNullIfEmpty())
      }
      return map
    } catch (e: Exception) {
      throw e;
    }
  }

  @ReactMethod
  fun printFromText(text: String, printerQuality: Int, steps: Int, promise: Promise) {
    moderninhaPrinter.printFromText(reactApplicationContext, text, printerQuality, steps, promise)
  }

  @ReactMethod
  fun printFromLines(lines: ReadableArray, printerQuality: Int, steps: Int, promise: Promise) {
    moderninhaPrinter.printFromLines(reactApplicationContext, lines, printerQuality, steps, promise)
  }

  @ReactMethod
  fun printFromFile(filePath: String, printerQuality: Int, steps: Int, promise: Promise) {
    if (!hasReadPermission()) {
      promise.reject("PERMISSION_DENIED", "Read external storage permission is required to print.")
      return
    }
    moderninhaPrinter.printFromFile(reactApplicationContext, filePath, printerQuality, steps, promise)
  }

  private fun hasReadPermission(): Boolean {
    val permissionStatus = ContextCompat.checkSelfPermission(
      reactApplicationContext,
      Manifest.permission.READ_EXTERNAL_STORAGE
    )
    return permissionStatus == PackageManager.PERMISSION_GRANTED
  }
}
