function applyArabicZWords(text) {
  const dict = {
    // ذ (ذال)
    'zikr': 'ذکر',
    'zukur': 'ذکور',
    'zokira': 'ذاکره',
    'mazkur': 'مذکور',
    'tazkira': 'تذکره',
    'ustoz': 'استاذ',
    'zabihullah': 'ذبیح‌الله',
    'zohid': 'ذاهد',
    'zoiqa': 'ذایقه',
    'zabh': 'ذبح',
    'zaxira': 'ذخیره',
    'zarra': 'ذره',
    'zarrabin': 'ذره‌بین',
    'zurriyot': 'ذریات',
    'zari’a': 'ذریعه',
    'zaqan': 'ذقن',
    'zillat': 'ذلت',
    'zilil': 'ذلیل',
    'zam': 'ذم',
    'zimma': 'ذمه',
    'zanb': 'ذنب',
    'zunub': 'ذنوب',
    'zahab': 'ذهب',
    'zahabiy': 'ذهبي',
    'zihn': 'ذهن',
    'zihniyat': 'ذهنیت',
    'zihniy': 'ذهني',
    'zavot': 'ذوات',
    'zulqarnayn': 'ذوالقرنین',

    // ض (ضاد)
    'zamonat': 'ضمانت',
    'zimn': 'ضمن',
    'zabt': 'ضبط',
    'zorib': 'ضارب',
    'zomin': 'ضامن',
    'zoye’': 'ضایع',
    'zajr': 'ضجر',
    'zaxomat': 'ضخامت',
    'zaxim': 'ضخیم',
    'zid': 'ضد',
    'ziddiyat': 'ضدیت',
    'zarba': 'ضربه',
    'zarurat': 'ضرورت',
    'zarb al-masal': 'ضرب المثل',
    'za’f': 'ضعف',
    'zaif': 'ضعیف',
    'zalolat': 'ضلالت',
    'zamima': 'ضمیمه',
    'zamir': 'ضمیر',
    'ziyo': 'ضیا',
    'tazmin': 'تضمین',

    // ظ (ظاء)
    'zahir': 'ظاهىر',
    'zohir': 'ظاهر',
    'zarif': 'ظریف',
    'zarifa': 'ظریفه',
    'zarf': 'ظرف',
    'zarofat': 'ظرافت',
    'zarfiyat': 'ظرفیت',
    'zafar': 'ظفر',
    'zulm': 'ظلم',
    'zulumat': 'ظلمات',
    'zulmat': 'ظلمت',
    'izhor': 'اظهار',
    'zuhr': 'ظهر',
    'zuhur': 'ظهور'
  };

  for (let key in dict) {
    const pattern = new RegExp("\\b" + key + "\\b", "gi");
    text = text.replace(pattern, dict[key]);
  }

  return text;
}
