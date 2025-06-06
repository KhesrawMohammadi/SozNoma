function applyArabicVWords(text) {
  const dict = {
    'vahiy': 'وحی',
    'vazifa': 'وظیفه',
    'viloyat': 'ولایت',
    'voqe’a': 'واقعه',
    'vujud': 'وجود',
    'vajh': 'وجه',
    'vajd': 'وجد',
    'vohid': 'واحد',
    'vojib': 'واجب',
    'voris': 'وارث',
    'vorid': 'وارد',
    'voqeiyat': 'واقعیت',
    'vasiqa': 'وثیقه',
    'vaqor': 'وقار',
    'vaqt': 'وقت',
    'vazir': 'وزیر',
    'vazorat': 'وزارت',
    'vafot': 'وفات',
    'voqeiy': 'واقعي',
    'vahshat': 'وحشت',
    'vahid': 'وحید',
    'vudud': 'ودود',
    'vasi': 'وسیع',
    'vasilat': 'وسيله',
    'vasiyat': 'وصیت',
    'vasl': 'وصل',
    'visol': 'وصال',
    'voiz': 'واعظ',
    'voqe': 'واقع',
    'valloh': 'والله',
    'vassalom': 'والسلام',
    'volida': 'والده',
    'vasiq': 'واثق',
    'vajohat': 'وجاهت',
    'voha': 'واحه',
    'vodiy': 'وادی',
    'vasila': 'وسیله',
    'vajiba': 'وجیبه',
    'vajiza': 'وجیزه',
    'va’da': 'وعده',
    'vafo': 'وفا',
    'va’z': 'وعظ',
    'tavochi': 'تواچی',
  'tovuq': 'تاووق',
  'qovun': 'قاوون',
  'quvg’on': 'قووغان',
  'quvonch': 'قووانچ',
  'turuvchi': 'تورووچی',
  'vaysaqi': 'ویسَقی',
  'tarnov': 'ترناو',
  'payvand': 'پیوند',
  'vobasta': 'وابسته',
  'vatr': 'وتر',
  'vosiq': 'واثق',
  'voha': 'واحه',
  'vodiy': 'وادي',
  'vorasta': 'وارسته',
  'voz kech': 'وازکېچ',
  'vosita': 'واسطه',
  'vosil': 'واسل',
  'vozih': 'واضح',
  'voqif': 'واقف',
  'voqeiyat': 'واقعیت',
  'volo': 'والا',
  'volida': 'والده',
  'vassalom': 'والسلام',
  'valloh': 'والله',
  'vola': 'واله',
  'vali': 'ولي',
  'voleybol': 'والیبال',
  'vomiq': 'وامق',
  'vom': 'وام',
  'voh': 'واه',
  'vohima': 'واهمه',
  'vaksina': 'واکسین',
  'voy': 'وای',
  'vabo': 'وبا',
  'vatad': 'وتد',
  'vajohat': 'وجاهت',
  'vajd': 'وجد',
  'vajh': 'وجه',
  'vujub': 'وجوب',
  'vajiza': 'وجیزه',
  'vajiba': 'وجیبه',
  'vahdat': 'وحدت',
  'vahshiy': 'وحشي',
  'vahshat': 'وحشت',
  'vahm': 'وحم',
  'vaxim': 'وخیم',
  'vido': 'وداع',
  'vodka': 'ودکا',
  'varosat': 'وراثت',
  'varasa': 'ورثه',
  'verd': 'ورد',
  'varzish': 'ورزش',
  'viza': 'ویزه',
  'vare’': 'ورع',
  'varta': 'ورطه',
  'varaqa': 'ورق',
  'vuzaro': 'وزرا',
  'vasotat': 'وساطت',
  'vasat': 'وسط',
  'vus’at': 'وسعت',
  'vasvos': 'وسواس',
  'vasiyat': 'وصیت',
  'vaslat': 'وصلت',
  'vaz’': 'وضع',
  'vuzu': 'وضو',
  'vatan': 'وطن',
  'va’da': 'وعده',
  'va’z': 'وعظ',
  'vafo': 'وفا',
  'vaqor': 'وقار',
  'voqoe’': 'وقایع',
  'vaqfa': 'وقفه'
  };

  for (let key in dict) {
    const pattern = new RegExp("\\b" + key + "\\b", "gi");
    text = text.replace(pattern, dict[key]);
  }

  return text;
}
