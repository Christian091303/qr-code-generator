function generateQRCode() {
  const text = document.getElementById("text").value;
  const qrcodeDiv = document.getElementById("qrcode");
  qrcodeDiv.innerHTML = "";

  if (!text) return;

  QRCode.toCanvas(text, { errorCorrectionLevel: 'H' }, function (err, canvas) {
    if (err) return console.error(err);
    qrcodeDiv.appendChild(canvas);
  });
}

function downloadQRCode() {
  const canvas = document.querySelector("#qrcode canvas");
  if (!canvas) return alert("Please generate a QR code first.");

  const link = document.createElement("a");
  link.download = "qrcode.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}
