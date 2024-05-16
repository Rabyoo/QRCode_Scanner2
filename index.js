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
});
