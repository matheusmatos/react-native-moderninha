package com.matheusmatos.moderninha

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.os.Environment
import android.view.LayoutInflater
import android.view.View
import android.widget.TextView
import androidx.core.content.ContextCompat
import br.com.uol.pagseguro.plugpagservice.wrapper.AppIdentification
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrintResult
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrinterData
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPrinterListener
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.WritableMap
import com.facebook.react.module.annotations.ReactModule
import java.io.FileOutputStream
import java.io.IOException


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
  private val appIdentification: AppIdentification = AppIdentification(reactContext)

  override fun getName(): String = TAG

  private val moderninhaUtils: ModerninhaUtils = ModerninhaUtils()

  override fun getConstants(): MutableMap<String, Any> {
    val constants: MutableMap<String, Any> = HashMap()
    constants["TERMINAL_CAPABILITIES"] = moderninhaUtils.getTerminalCapabilities()
    constants["TERMINAL_SERIAL_NUMBER"] = moderninhaUtils.getTerminalSerialNumber()
    constants["TERMINAL_SN"] = moderninhaUtils.getTerminalSN()
    return constants
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun hasCapability(capability: Int): Boolean {
    return plugPag.hasCapability(capability)
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun isAuthenticated(): Boolean {
    return plugPag.isAuthenticated()
  }

  @ReactMethod
  fun getUserData(promise: Promise) {
    val userData = plugPag.getUserData()
    val map: WritableMap = Arguments.createMap()

    map.putString("address", userData.address.orNullIfEmpty())
    map.putString("city", userData.city.orNullIfEmpty())
    map.putString("cnpjCpf", userData.cnpjCpf.orNullIfEmpty())
    map.putString("addressComplement", userData.addressComplement.orNullIfEmpty())
    map.putString("companyName", userData.companyName.orNullIfEmpty())
    map.putString("userNickName", userData.userNickName.orNullIfEmpty())
    map.putString("addressState", userData.addressState.orNullIfEmpty())
    map.putString("email", userData.email.orNullIfEmpty())

    promise.resolve(map)
  }

  @ReactMethod
  fun printFromFile(filePath: String, printerQuality: Int, steps: Int, promise: Promise) {
    val permissionStatus = ContextCompat.checkSelfPermission(reactApplicationContext, Manifest.permission.READ_EXTERNAL_STORAGE)

    if (permissionStatus != PackageManager.PERMISSION_GRANTED) {
      promise.reject("PERMISSION_DENIED", "Read external storage permission is required to print from file.")
      return
    }

    val data = PlugPagPrinterData(filePath, printerQuality, steps)
    val listener: PlugPagPrinterListener = object : PlugPagPrinterListener {
      override fun onSuccess(result: PlugPagPrintResult) {
        val map = Arguments.createMap().apply {
          putString("message", result.message)
          putString("code", result.errorCode)
        }
        promise.resolve(map)
      }

      override fun onError(result: PlugPagPrintResult) {
        promise.reject("PRINT_ERROR", result.message ?: "Unknown error", Throwable(result.errorCode))
      }
    }

    plugPag.setPrinterListener(listener)
    plugPag.printFromFile(data)
  }
}