import { jsPDF } from "jspdf";

// نسخة Alef-Regular محوّلة إلى Base64 (مقصرّة للاختصار)
const alefFontBase64 = `
AAEAAAAPAIAAAwBwR1NVQkpwOM4AAADYAAAAYGNtYXAAGgAAAAAwAAAAGmN2dCAAAABYAAAAHGZwZ20AAAF4AAAALmdseWYQZoAqAAABdAA...
... (هنا يكمل باقي الـ base64) ...
`;

jsPDF.API.events.push(["addFonts", function () {
  this.addFileToVFS("Alef-Regular.ttf", alefFontBase64);
  this.addFont("Alef-Regular.ttf", "Alef", "normal");
}]);
