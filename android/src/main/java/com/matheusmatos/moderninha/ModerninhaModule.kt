package com.matheusmatos.moderninha

import android.Manifest
import android.content.pm.PackageManager
import androidx.core.content.ContextCompat
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPag
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagActivationData
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventData
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagEventListener
import br.com.uol.pagseguro.plugpagservice.wrapper.PlugPagPaymentData
import br.com.uol.pagseguro.plugpagservice.wrapper.data.request.PlugPagBeepData
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.modules.core.DeviceEventManagerModule
import org.json.JSONObject


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

  private fun sendEvent(plugPagEventData: PlugPagEventData) {
    val params = Arguments.createMap()
    params.putInt("eventCode", plugPagEventData.eventCode)
    params.putString("message", plugPagEventData.customMessage)

    reactApplicationContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit("onPlugPagEvent", params)
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

  @ReactMethod
  fun initializeAndActivatePinpad(activationCode: String, promise: Promise) {
    val data = PlugPagActivationData(activationCode = activationCode)
    val plugPagInitializationResult = plugPag.initializeAndActivatePinpad(activationData = data)

    if (plugPagInitializationResult.result == PlugPag.RET_OK) {
      promise.resolve(0)
    } else {
      promise.reject(plugPagInitializationResult.errorCode, plugPagInitializationResult.errorMessage)
    }
  }

  @ReactMethod(isBlockingSynchronousMethod = true)
  fun isAuthenticated(): Boolean {
    return plugPag.isAuthenticated()
  }

  @ReactMethod
  fun doPayment(options: ReadableMap, promise: Promise) {
    plugPag.setEventListener(
      listener = object : PlugPagEventListener {
        override fun onEvent(data: PlugPagEventData) {
          sendEvent(data)
        }
      }
    )

    val paymentThread = Thread {
      val paymentData = PlugPagPaymentData(
        type = options.getInt("type"),
        amount = options.getInt("amount"),
        installmentType = options.getInt("installmentType"),
        installments = options.getInt("installments"),
        userReference = options.getString("userReference"),
        printReceipt = options.getBoolean("printReceipt"),
        partialPay = options.getBoolean("partialPay"),
        isCarne = options.getBoolean("isCarne"),
      )

      val result = plugPag.doPayment(paymentData = paymentData)

      if (result.result != 0) {
        promise.reject(result.errorCode ?: "UNKNOWN_ERROR", result.message ?: "Unknown error")
        return@Thread
      }

      val payload = Arguments.createMap().apply {
        putInt("code", result.result!!)
        putString("message", result.message)
        putString("errorCode", result.errorCode)
        putString("cardApplication", result.cardApplication)
        putString("bin", result.bin)
        putString("availableBalance", result.availableBalance)
        putString("amount", result.amount)
        putString("cardBrand", result.cardBrand)
        putString("date", result.date)
        putString("extendedHolderName", result.extendedHolderName)
        putString("holder", result.holder)
        putString("hostNsu", result.hostNsu)
        putString("label", result.label)
        putString("terminalSerialNumber", result.terminalSerialNumber)
        putString("transactionCode", result.transactionCode)
        putString("transactionId", result.transactionId)
        result.paymentType?.let { putInt("paymentType", it) }
        putString("eventType", "result")
      }

      promise.resolve(payload)
    }

    paymentThread.start()
  }

  @ReactMethod
  fun getUserData(promise: Promise) {
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

      val json = JSONObject()
      for (entry in map.entryIterator) {
        json.put(entry.key, entry.value)
      }
      promise.resolve(json.toString())
    } catch (e: Exception) {
      promise.reject(e);
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
