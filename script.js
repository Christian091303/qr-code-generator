// Generate QR code from text/URL
function generateQRCode() {
  const text = document.getElementById("text").value.trim();
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = ""; // clear previous QR

  if (!text) {
    alert("Please enter a link or URL.");
    return;
  }

  QRCode.toCanvas(text, { width: 220, errorCorrectionLevel: 'H' }, function (err, canvas) {
    if (err) {
      console.error(err);
      return;
    }
    qrContainer.appendChild(canvas);
  });
}

// Download QR code as PNG
function downloadQRCode() {
  const qrContainer = document.getElementById("qrcode");
  const canvas = qrContainer.querySelector("canvas");

  if (!canvas) {
    alert("Please generate a QR code first.");
    return;
  }

  let filename = document.getElementById("filename")?.value.trim();
  if (!filename) filename = "qrcode";

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = filename + ".png";
  link.click();

  // optional: clear inputs after download
  setTimeout(() => {
    document.getElementById("text").value = "";
    document.getElementById("filename").value = "";
    qrContainer.innerHTML = "";
  }, 500);
}

// 🔑 Automatic QR generation when typing
document.getElementById("text").addEventListener("input", function() {
  const text = this.value.trim();
  if (text) generateQRCode();
});