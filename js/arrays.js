// arrays.js — مبتنی بر قواعد توران

// ترکیبات و حروف لاتین (طولانی به کوتاه)
var l_patterns = [
  "ng", "sh", "ch", "g‘", "o‘", "yo", "yu", "ya", "ye", "iy",
  "a", "b", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "x", "y", "z", "'"
];

// معادل‌های عربی برای l_patterns
var c_equivalents = [
  "ڭ", "ش", "چ", "غ", "ؤ", "يو", "ئۇ", "يا", "اې", "ي",
  "ا", "ب", "د", "ې", "ف", "گ", "ه", "ى", "ج", "ك", "ل", "م",
  "ن", "و", "پ", "ق", "ر", "س", "ت", "ۇ", "ۋ", "خ", "ي", "ز", "ع"
];

// پسوندهایی که با یِریم فاصله باید جدا بشن
var suffixes_with_zwnj = [
  "lar", "lik", "chi", "siz", "dor", "xon", "gacha", "dan", "ga", "ni", "dir", "di",
  "cha", "gina", "ginam", "ganing", "man", "si", "shunos", "xon", "soz", "parvar", "mand",
  "lashtir", "lantir", "viy", "zor", "xona", "gina", "gich", "bop", "sira", "ay", "sit", "bin", "lab"
];

// پیشوندهایی که با یِریم فاصله از کلمه جدا می‌شن
var prefixes_with_zwnj = [
  "be", "ba", "xush"
];

// یِریم فاصله (Unicode)
var yerim_fasila = "\u200C";
