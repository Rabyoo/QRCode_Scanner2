function domReady(fn) {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 200);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

domReady(function () {
  function onScanSuccess(decodedText, decodedResult) {
    alert("Your QR code is: " + decodedText);
    console.log(decodedResult);
  }

  function onScanError(errorMessage) {
    console.error("Error scanning QR Code: " + errorMessage);
  }

  // Check for camera permissions and prompt user if needed
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(function(stream) {
      stream.getTracks().forEach(track => track.stop()); // Close the stream immediately after getting permission

      const html5QrcodeScanner = new Html5QrcodeScanner(
        "my-qr-reader",
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          rememberLastUsedCamera: true,
          // Additional options for better mobile compatibility
          supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA]
        },
        false // verbose output
      );

      html5QrcodeScanner.render(onScanSuccess, onScanError);
    })
    .catch(function(err) {
      console.error("Error accessing camera: ", err);
      alert("Error accessing camera. Please ensure your browser has permission to access the camera.");
    });
});

// Arabic Comments Translation
// تأكد من أن متصفح الهاتف المحمول لديه الأذونات اللازمة للوصول إلى الكاميرا.
// تدعم المكتبة المتصفحات الرئيسية مثل Chrome وFirefox وSafari وEdge وOpera
