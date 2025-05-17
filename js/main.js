function normalize(text) {
  return text
    .toLowerCase()
    .replace(/['’`ʻ‘]/g, "‘")
    .replace(/’/g, "'")
    .replace(/а/g, 'a')      // a سیریلیک
    .replace(/ā/g, 'a')      // a ممدوده
    .replace(/ī/g, 'i')
    .replace(/ū/g, 'u')
    .replace(/ḥ/g, 'ح')      // مهم: به ح تبدیل شود
    .replace(/ṭ/g, 'ط')
    .replace(/ṣ/g, 'ص')
    .replace(/ḍ/g, 'ض')
    .replace(/ẓ/g, 'ظ')
    .replace(/ʿ/g, 'ع')
    .replace(/th/g, 'ث');
}


// مرحله 1: جایگزینی واژه‌های خاص از واژه‌نامه
function applyWordDictionary(text) {
  const dict = raw_words.trim().split("\n").map(line => line.split("|"));
  for (let [latin, arabic] of dict) {
    const re = new RegExp("\\b" + latin + "\\b", "gi");
    text = text.replace(re, arabic);
  }
  return text;
}

function transformA(text) {
  return text.split(/\b/).map(word => {
    if (/^[aA]/.test(word)) {
      const secondLetter = word[1]?.toLowerCase();

      const forceAinAfter = ['b', 'd', 'z', 'g', 'm', 'r', 'l'];
      const forceAlifAfter = ['h', 'k', 's', 'f', 'n', 't'];

      if (forceAinAfter.includes(secondLetter)) {
        word = word.replace(/^a/, 'ع');
      } else if (forceAlifAfter.includes(secondLetter)) {
        word = word.replace(/^a/, 'ا');
      } else {
        word = word.replace(/^a/, 'ع');
      }
    }

    // تطبیق "a" در انتهای واژه‌هایی که باید به "ه" ختم شوند
    if (/\w{2,}ma$|sa$|ta$|la$|na$/i.test(word)) {
      word = word.replace(/a$/, 'ه');
    } else {
      word = word.replace(/a/g, 'ا'); // سایر a‌ها به الف
    }

    return word;
  }).join('');
}



function transformE(text) {
  return text.split(/\b/).map(word => {
    if (/^e/.test(word)) {
      word = word.replace(/^e/, 'اې'); // در ابتدای واژه
    }
    word = word.replace(/e/g, 'ې'); // سایر موارد
    return word;
  }).join('');
}


function transformI(text) {
  const likelyAinStarts = ['t', 'b', 'j', 'q', 'x', 'h', 'd'];

  return text.split(/\b/).map(word => {
    if (word.startsWith("i") || word.startsWith("I")) {
      const secondLetter = word[1]?.toLowerCase();
      if (likelyAinStarts.includes(secondLetter)) {
        word = word.replace(/^i/, 'ع');
      } else {
        word = word.replace(/^i/, 'ى');
      }
    }

    // باقی موارد: جایگزینی درون کلمه
    word = word.replace(/i/g, 'ى');

    return word;
  }).join('');
}

function transformOʻ(text) {
  return text.split(/\b/).map(word => {
    // در ابتدای واژه
    if (word.startsWith("o‘") || word.startsWith("o'")) {
      word = word.replace(/^o[‘']/, 'اۉ');
    }

    // سایر موارد
    word = word.replace(/o[‘']/g, 'ۉ');

    return word;
  }).join('');
}





function transformH(text) {
  const forceHaWords = new Set([
    "ahmad", "hamid", "himoya", "halol", "hamal", "haydar", "himmat", "hijob",
    "hojatmand", "hujjat", "hamiy", "himoyachi", "sohib", "hajj", "homil", "homiy",
    "hamalat", "hamil", "hamd", "hamza", "ihtiros", "ehtimol", "ahmaq", "ihtiyoj", "ihsan", "ihtilol",
    "bahith"
  ]);

  return text.split(/\b/).map(word => {
    const lw = word.toLowerCase();

    if (forceHaWords.has(lw)) {
      return word.replace(/h/g, 'ح');
    }

    // h بین صدادارها → ح
    word = word.replace(/([aiueo])h([aiueo])/gi, '$1ح$2');
    // h بین صدادار و حروف خاص → ح
    word = word.replace(/([aeiou])h([mdtrzq])/gi, '$1ح$2');
    // باقی hها → ه
    word = word.replace(/h/g, 'ه');

    return word;
  }).join('');
}



function transformU(text) {
  const uToAinWords = new Set([
    "usmon", "umar", "umr", "ubayd", "ulumo", "uqubat", "ujrat", "ushshoq", "umum", "umumiy", "uzv", "utufat", "ulum", "uqda", "u’yub"
  ]);

  return text.split(/\b/).map(word => {
    const lw = word.toLowerCase();

    // اگر کلمه جزو لیست عربی‌ریشه بود → همه u ها به ع
    if (uToAinWords.has(lw)) {
      return word.replace(/u/g, 'ع');
    }

    // اگر واژه با u شروع بشه → u اول به او
    if (lw.startsWith("u")) {
      word = word.replace(/^u/, 'او');
    }

    // باقی u ها → و
    word = word.replace(/u/g, 'و');

    return word;
  }).join('');
}

function transformY(text) {
  const specialYWords = new Set([
    "yaqin", "yaqaza", "yaqinlik", "yaqinlashuv", "yaqinlashmoq"
  ]);

  return text.split(/\b/).map(word => {
    const lw = word.toLowerCase();

    // اگر واژه خاص باشه → y به ع
    if (specialYWords.has(lw)) {
      return word.replace(/y/g, 'ع');
    }

    // اگر با y شروع شه → ابتدا به يا
    if (lw.startsWith("y")) {
      word = word.replace(/^y/, 'يا');
    }

    // سایر موارد → y به ي
    word = word.replace(/y/g, 'ي');

    return word;
  }).join('');
}

function transformO(text) {
  const oToAinAlefWords = new Set([
    "oqibat", "ojiz", "oshiq", "odil", "ozim", "oqil", "ojil", "or", "obid", "obir", "odat", "oriz", "orif", "orifa", 
    "oshuro", "osim", "otifa", "ofiyat", "olam", "olim", "oliy", "om", "omil", "oid", "oila"
  ]);

  const oToAlifMaddaWords = new Set([
    "odob", "ota", "ona", "ot", "orqa", "oshufta", "orzu", "os", "osh"
  ]);

  return text.split(/\b/).map(word => {
    const lw = word.toLowerCase();

    if (oToAinAlefWords.has(lw)) {
      return word.replace(/o/g, 'عا');
    }

    if (oToAlifMaddaWords.has(lw)) {
      return word.replace(/o/g, 'آ');
    }

    // حالت عمومی
    return word.replace(/o/g, 'ا');
  }).join('');
}


function transformS(text) {
  const sToTha = new Set([
    "savob", "saboq", "sabt", "sabot", "samar", "sanoq", "soniya", "samin", "misol", "misqol", "saqofat", "sano", "masnaviy", "silsila"
  ]);

  const sToSad = new Set([
    "sohib", "sabr", "sodiq", "sodir", "suhbat", "sifat", "sahifa", "safha", "subh", "saboq", "sadiq", "sadaqa", "sadi", "sahih", "suhufi", "sadrazam"
  ]);

  return text.split(/\b/).map(word => {
    const lw = word.toLowerCase();

    if (sToTha.has(lw)) {
      return word.replace(/s/g, 'ث');
    }

    if (sToSad.has(lw)) {
      return word.replace(/s/g, 'ص');
    }

    // حالت عمومی
    return word.replace(/s/g, 'س');
  }).join('');
}


function transformTGeneral(text) {
  return text.replace(/t/g, 'ت');
}


function transformVGeneral(text) {
  return text.replace(/v/g, 'و');
}


function transformZGeneral(text) {
  return text.replace(/z/g, 'ز');
}



const zwjSuffixPrefixes = [
  "بی", "به", "خوش", "الّه", "لّه"
];

const zwjSuffixes = [
  "لر", "دیر", "دی", "چه", "گه", "دن", "ده", "نی", "نینگ", "شناس", "ساز", "خوان", "گیچ", "زار", "خانه",
  "چاق", "سیز", "دار", "خور", "پرور", "لی", "غان", "باپ", "وي", "بین", "چي", "لب", "لنیب", "لش",
  "ماق", "راق", "من", "سی", "چی", "چیلیک", "مند", "سیمان", "سیره", "ی", "سیت", "لنتیر", "لشتیر",
  "گینه", "گینم", "یین", "وو", "iy", "uv", "moq", "roq", "lab", "lash", "lanib", "ginam", "gina", "cha"
];

function applySuffixZWNJ(text) {
  for (let prefix of zwjSuffixPrefixes) {
    const pattern = new RegExp("\\b(" + prefix + ")(?=[\u0621-\u06FF])", "g");
    text = text.replace(pattern, "$1\u200C");
  }
  return text;
}

function applyPrefixZWNJ(text) {
  for (let suffix of zwjSuffixes) {
    const pattern = new RegExp("(?<=[\u0621-\u06FF])(" + suffix + ")\\b", "g");
    text = text.replace(pattern, "\u200C$1");
  }
  return text;
}




// مرحله 2: جایگزینی نویسه‌ای عمومی
function applyRules(text) {
  const sortedIndices = [...l_patterns.keys()].sort((a, b) => l_patterns[b].length - l_patterns[a].length);
  for (let i of sortedIndices) {
    const re = new RegExp(l_patterns[i], "g");
    text = text.replace(re, c_equivalents[i]);
  }
  return text;
}






// تبدیل نهایی متن ورودی
function startConversion() {
  let inputText = document.getElementById("input").value;
  inputText = normalize(inputText);

  let outputText = applyWordDictionary(inputText);
  outputText = applyReligiousWords(outputText);
 
  outputText = applyArabicUWords(outputText);
  outputText = applyArabicBWords(outputText);
  outputText = applyArabicSWords(outputText); 
  outputText = applyArabicTWords(outputText);   // مرحله جایگزینی کامل
  outputText = applyArabicVWords(outputText);   // واژه‌های خاص عربی
  outputText = applyArabicZWords(outputText);    // جایگزینی دقیق واژه‌نامه‌ها با ذ، ض، ظ


  outputText = transformA(outputText);
  outputText = transformE(outputText);
  outputText = transformI(outputText);
  outputText = transformOʻ(outputText);
  outputText = transformH(outputText);
  outputText = transformU(outputText);
  outputText = transformY(outputText);
  outputText = transformO(outputText);
  outputText = transformS(outputText);
      
  outputText = transformS(outputText);     // حرف S عمومی

  outputText = transformTGeneral(outputText);   // پیش‌فرض t → ت
  
  outputText = transformVGeneral(outputText);   // تبدیل عمومی

  
  outputText = transformZGeneral(outputText);    // بقیه موارد با قاعده عمومی به ز

  outputText = applyRules(outputText);

  outputText = applyPrefixZWNJ(outputText);
  outputText = applySuffixZWNJ(outputText);

  document.getElementById("output").value = outputText;
}


// تغییر اندازه پویا
function autoResizePair() {
  const input = document.getElementById("input");
  const output = document.getElementById("output");
  input.style.height = "auto";
  output.style.height = "auto";
  const maxHeight = Math.max(input.scrollHeight, output.scrollHeight);
  input.style.height = maxHeight + "px";
  output.style.height = maxHeight + "px";
}

// عملکرد کپی
document.getElementById('copyBtn').addEventListener('click', function () {
  const output = document.getElementById('output');
  output.select();
  output.setSelectionRange(0, 99999);
  document.execCommand("copy");
  output.blur();
});

// عملکرد پاک‌سازی
document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("input").value = "";
  document.getElementById("output").value = "";
  autoResizePair();
});

// هم‌زمانی با تایپ
document.getElementById("input").addEventListener("input", () => {
  startConversion();
  autoResizePair();
});

// بارگذاری اولیه
window.addEventListener("load", () => {
  autoResizePair();
  startConversion();
});

document.getElementById("clearBtn").addEventListener("click", function () {
  document.getElementById("input").value = "";
  document.getElementById("output").value = "";
  autoResizePair();
});
