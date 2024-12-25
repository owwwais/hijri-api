const express = require("express");
const hijriDate = require("hijri-converter");

const app = express();

// أسماء الأشهر الهجرية
const hijriMonths = [
  "محرم",
  "صفر",
  "ربيع الأول",
  "ربيع الآخر",
  "جمادى الأولى",
  "جمادى الآخرة",
  "رجب",
  "شعبان",
  "رمضان",
  "شوال",
  "ذو القعدة",
  "ذو الحجة",
];

// API للحصول على التاريخ الهجري لليوم
app.get("/hijri-today", (req, res) => {
  try {
    const today = new Date(); // تاريخ اليوم الميلادي
    const hijri = hijriDate.toHijri(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate()
    ); // تحويل إلى هجري

    const monthName = hijriMonths[hijri.month - 1]; // اسم الشهر الهجري

    res.json({
      day: hijri.day,
      month: hijri.month,
      monthName: monthName,
      year: hijri.year,
      hijriDate: `${hijri.day} ${monthName} ${hijri.year}`,
    });
  } catch (error) {
    res.status(500).json({ error: "حدث خطأ أثناء حساب التاريخ الهجري" });
  }
});

// بدء السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;