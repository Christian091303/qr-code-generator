function generateQRCode() {
  const text = document.getElementById("text").value;
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // clear previous QR

  if (!text) {
    alert("Please enter text or a URL.");
    return;
  }

  QRCode.toCanvas(text, { width: 200, errorCorrectionLevel: 'H' }, function (err, canvas) {
    if (err) {
      console.error(err);
      return;
    }
    qrContainer.appendChild(canvas);
  });
}

function downloadQRCode() {
  const qrContainer = document.getElementById("qrcode");
  const canvas = qrContainer.querySelector("canvas");

  if (!canvas) {
    alert("Please generate a QR code first.");
    return;
  }

  // Get filename input
  let filename = document.getElementById("filename")?.value.trim();
  if (!filename) {
    filename = "qrcode"; // default name
  }

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename + ".png";
  link.click();

  // ✅ Auto-clear after download (instead of full reload)
  setTimeout(() => {
    document.getElementById("text").value = "";
    if (document.getElementById("filename")) {
      document.getElementById("filename").value = "";
    }
    qrContainer.innerHTML = "";
  }, 500);
}