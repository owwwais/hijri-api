const express = require("express");
const hijriDate = require("hijri-converter"); // استيراد المكتبة

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
    // تاريخ اليوم الميلادي
    const today = new Date();

    // تحويل التاريخ الميلادي إلى هجري
    const hijri = hijriDate.toHijri(
      today.getFullYear(),
      today.getMonth() + 1,
      today.getDate() +1,
    );

    console.log("Hijri Date:", hijri); // طباعة التاريخ الهجري للتأكد

    // التحقق من القيم المرتجعة
    if (!hijri || !hijri.hd || !hijri.hm || !hijri.hy) {
      throw new Error("Invalid Hijri conversion result");
    }

    // اسم الشهر الهجري
    const monthName = hijriMonths[hijri.hm - 1];

    // استجابة JSON
    res.json({
      day: hijri.hd, // اليوم
      month: hijri.hm, // الشهر
      monthName: monthName || "Unknown",
      year: hijri.hy, // السنة
      hijriDate: `${hijri.hd} ${monthName} ${hijri.hy}`,
    });
  } catch (error) {
    console.error("Error during Hijri conversion:", error.message);

    // استجابة الخطأ
    res.status(500).json({
      error: "حدث خطأ أثناء حساب التاريخ الهجري",
      details: error.message,
    });
  }
});

// تشغيل السيرفر
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
