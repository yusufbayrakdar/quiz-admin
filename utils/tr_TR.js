export const time = {
  years: Array.from({ length: 2 }, (_, i) => new Date().getFullYear() + i),
  months:
    "Ocak_Şubat_Mart_Nisan_Mayıs_Haziran_Temmuz_Ağustos_Eylül_Ekim_Kasım_Aralık".split(
      "_"
    ),
  monthsShort: "Oca_Şub_Mar_Nis_May_Haz_Tem_Ağu_Eyl_Eki_Kas_Ara".split("_"),
  weekdays: "Pazar_Pazartesi_Salı_Çarşamba_Perşembe_Cuma_Cumartesi".split("_"),
  weekdaysShort: "Paz_Pts_Sal_Çar_Per_Cum_Cts".split("_"),
  weekdaysMin: "Pz_Pt_Sa_Ça_Pe_Cu_Ct".split("_"),

  Mon: "Pzt",
  Tue: "Sal",
  Wed: "Çar",
  Thu: "Per",
  Fri: "Cum",
  Sat: "Cmt",
  Sun: "Paz",
  Monday: "Pazartesi",
  Tuesday: "Salı",
  Wednesday: "Çarşamba",
  Thursday: "Perşembe",
  Friday: "Cuma",
  Saturday: "Cumartesi",
  Sunday: "Pazar",
  Jan: "Oca",
  Feb: "Şub",
  Mar: "Mar",
  Apr: "Nis",
  May: "Mayıs",
  Jun: "Haz",
  Jul: "Tem",
  Aug: "Ağu",
  Sep: "Eyl",
  Oct: "Eki",
  Nov: "Kas",
  Dec: "Ara",
  January: "Ocak",
  February: "Şubat",
  March: "Mart",
  April: "Nisan",
  June: "Haziran",
  July: "Temmuz",
  August: "Ağustos",
  September: "Eylül",
  October: "Ekim",
  November: "Kasım",
  December: "Aralık",
};
export const translate = {
  locale: "tr_TR",
  placeholder: "Tarih seçin",
  rangePlaceholder: ["Başlangıç tarihi", "Bitiş tarihi"],
  today: "Bugün",
  now: "Şuan",
  backToToday: "Bugüne gel",
  ok: "Tamam",
  clear: "Temizle",
  month: "Ay",
  year: "Yıl",
  timeSelect: "Zaman seç",
  dateSelect: "Tarih seç",
  monthSelect: "Ay seç",
  yearSelect: "Yıl seç",
  decadeSelect: "Onyıl seç",
  yearFormat: "YYYY",
  dateFormat: "M/D/YYYY",
  dayFormat: "D",
  dateTimeFormat: "M/D/YYYY HH:mm:ss",
  monthFormat: "MMMM",
  monthBeforeYear: true,
  previousMonth: "Önceki ay (PageUp)",
  nextMonth: "Gelecek ay (PageDown)",
  previousYear: "Geçen yıl (Control + left)",
  nextYear: "Gelecek yıl (Control + right)",
  previousDecade: "Geçen onyıl",
  nextDecade: "Gelecek onyıl",
  previousCentury: "Geçen yüzyıl",
  nextCentury: "Gelecek yüzyıl",
};
export const formats = {
  dateFormat: "YYYY-MM-DD",
  dateTimeFormat: "YYYY-MM-DD HH:mm:ss",
  weekFormat: "YYYY-wo",
  monthFormat: "YYYY-MM",
};
