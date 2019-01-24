module.exports = async FineCategory => {
  await FineCategory.create({
    code: 2001,
    title: "هرگونه حرکات نمایشی مانند دور زدن درجا یا حرکت موتورسیکلت بر روی یک چرخ"
  });
  await FineCategory.create({ code: 2002, title: "تجاوز از سرعت مجاز (بیش از ۳۰ کیلومتر بر ساعت)" });
  await FineCategory.create({ code: 2003, title: "سبقت غیرمجاز در راه‌های دو طرفه" });
  await FineCategory.create({ code: 2004, title: "عبور از چراغ قرمز راهنمایی و رانندگی" });
  await FineCategory.create({ code: 2005, title: "حرکت به‌طور مارپیچ" });
  await FineCategory.create({ code: 2006, title: "حرکت با دنده عقب در آزاد راه‌ها و بزرگراه‌ها" });
  await FineCategory.create({ code: 2007, title: "رانندگی در حالت مستی و مصرف داروهای روان گردان یا افیونی" });
  await FineCategory.create({ code: 2008, title: "تجاوز از سرعت مجاز بیش از ۳۰ تا ۵۰ کیلومتر در ساعت" });
  await FineCategory.create({ code: 2009, title: "عبور از محل ممنوع" });
  await FineCategory.create({ code: 2010, title: "تجاوز به چپ از محور راه" });
  await FineCategory.create({ code: 2011, title: "عبور وسایل نقلیه از پیاده‌رو" });
  await FineCategory.create({ code: 2012, title: "عدم رعایت حق تقدم عبور" });
  await FineCategory.create({ code: 2013, title: "دور زدن در محل ممنوع" });
  await FineCategory.create({ code: 2014, title: "استفاده از تلفن همراه یا وسایل ارتباطی مشابه در حین رانندگی" });
  await FineCategory.create({ code: 2015, title: "نقص فنی مؤثر یا نقص در سامانه (سیستم) روشنایی در شب" });
  await FineCategory.create({ code: 2016, title: "عدم رعایت مقررات ایمنی حمل و نقل جاده ای مواد خطرناک" });
  await FineCategory.create({ code: 2017, title: "رانندگی با وسایل نقلیه عمومی بیش از زمان مجاز" });
  await FineCategory.create({
    code: 2018,
    title:
      "عدم رعایت محدودیت‌های زمانی یا مکانی یا شرایط مندرج در گواهینامه از قبیل استفاده از عینک، سمعک، با تجهیزات خاص"
  });
  await FineCategory.create({
    code: 2019,
    title: "عدم توجه به فرمان ایست یا پرچم مراقبین عبور و مرور محصلین با پلیس مدرسه"
  });
  await FineCategory.create({ code: 2020, title: "عدم رعایت مقررات حمل بار" });
  await FineCategory.create({
    code: 2024,
    title: "حمل تیرآهن، ورق‌های فلزی و امثال آن بدون رعایت شرایط ایمنی و مقرارت مربوط"
  });
  await FineCategory.create({ code: 2025, title: "عدم رعایت مقررات حمل بارهای ترافیکی" });
  await FineCategory.create({ code: 2035, title: "نداشتن مجوز فعالیت راننده وسیله نقلیه عمومی" });
  await FineCategory.create({
    code: 2039,
    title: "عدم رعایت فاصله طولی و عرضی با وسیله نقلیه جلویی یا جانبی یا تصادف ناشی از عدم توجه به جلو"
  });
  await FineCategory.create({
    code: 2041,
    title:
      "سبقت از سمت راست وسیله نقلیه دیگر در راه‌هایی که در هر طرف رفت و برگشت فقط یک خط عبوری وجود دارد یا با استفاده از شانه راه"
  });
  await FineCategory.create({
    code: 2044,
    title: "توقف در ابتدا و انتها پیچها، روی پل، داخل تونل و داخل با حریم تقاطع‌های راه‌آهن"
  });
  await FineCategory.create({ code: 2047, title: "نداشتن پلاک جلو، عقب یا ناخوانا بودن آن" });
  await FineCategory.create({
    code: 2050,
    title: "حرکت نکردن وسایل نقلیه بین دو خط یا تغییر خط حرکت بدون رعایت مقررات مربوطه در معابر خط‌کشی شده"
  });
  await FineCategory.create({ code: 2051, title: "عبور وسایل نقلیه غیرمجاز از خطوط ویژه" });
  await FineCategory.create({ code: 2056, title: "تجاوز از سرعت مجاز (تا ۳۰ کیلومتر از ساعت)" });
  await FineCategory.create({ code: 2057, title: "عدم بارگیری صحیح و مهار ایمن محصولات" });
  await FineCategory.create({ code: 2063, title: "نداشتن گواهی معتبر معاینه فنی وسایل نقلیه" });
  await FineCategory.create({
    code: 2074,
    title:
      "قصور در به کار بردن علائم ایمنی، هشدار دهنده حسب مورد در جلو، کنار و عقب وسیله نقلیه متوقف در سطح راه‌ها برابر ضوابط مربوطه"
  });
  await FineCategory.create({ code: 2088, title: "توقف وسایل نقلیه در حاشیه راه‌ها برای فروش کالا" });
  await FineCategory.create({
    code: 2089,
    title: "نداشتن آج مناسب در سطح اتکای لاستیک یا استفاده از لاستیک‌های فرسوده"
  });
  await FineCategory.create({ code: 2090, title: "رانندگی با وسیله نقلیه دودزا" });
  await FineCategory.create({ code: 2092, title: "عدم استفاده از کلاه ایمنی توسط راننده و سرنشین موتور سیکلت" });
  await FineCategory.create({
    code: 2093,
    title:
      "عدم استفاده از کمربند ایمنی توسط راننده یا سرنشینان وسیله نقلیه در حال حرکت (غیر از استثنائات قانونی) در آزاد راه‌ها، بزرگراه‌ها و جاده‌ها"
  });
  await FineCategory.create({ code: 2094, title: "نداشتن بارنامه یا صورت وضعیت مسافری در وسایل نقلیه عمومی" });
  await FineCategory.create({
    code: 2095,
    title: "مغایرت مشخصات مسافر با محموله یا صورت وضعیت یا بارنامه صادر شده یا استفاده از یک بارنامه یا صورت وضعیت"
  });
  await FineCategory.create({ code: 2123, title: "عدم پرداخت عوارض مقرر در آزاد راه‌ها" });
  await FineCategory.create({ code: 3000, title: "سایر موارد" });
};
