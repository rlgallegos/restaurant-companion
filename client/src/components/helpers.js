
let languageObj = {
    'af': 'afrikaans',
    'sq': 'albanian',
    'am': 'amharic',
    'ar': 'arabic',
    'hy': 'armenian',
    'az': 'azerbaijani',
    'eu': 'basque',
    'be': 'belarusian',
    'bn': 'bengali',
    'bs': 'bosnian',
    'bg': 'bulgarian',
    'ca': 'catalan',
    'ceb': 'cebuano',
    'ny': 'chichewa',
    'zh-cn': 'chinese (simplified)',
    'zh-tw': 'chinese (traditional)',
    'co': 'corsican',
    'hr': 'croatian',
    'cs': 'czech',
    'da': 'danish',
    'nl': 'dutch',
    'en': 'english',
    'eo': 'esperanto',
    'et': 'estonian',
    'tl': 'filipino',
    'fi': 'finnish',
    'fr': 'french',
    'fy': 'frisian',
    'gl': 'galician',
    'ka': 'georgian',
    'de': 'german',
    'el': 'greek',
    'gu': 'gujarati',
    'ht': 'haitian creole',
    'ha': 'hausa',
    'haw': 'hawaiian',
    'iw': 'hebrew',
    'he': 'hebrew',
    'hi': 'hindi',
    'hmn': 'hmong',
    'hu': 'hungarian',
    'is': 'icelandic',
    'ig': 'igbo',
    'id': 'indonesian',
    'ga': 'irish',
    'it': 'italian',
    'ja': 'japanese',
    'jw': 'javanese',
    'kn': 'kannada',
    'kk': 'kazakh',
    'km': 'khmer',
    'ko': 'korean',
    'ku': 'kurdish (kurmanji)',
    'ky': 'kyrgyz',
    'lo': 'lao',
    'la': 'latin',
    'lv': 'latvian',
    'lt': 'lithuanian',
    'lb': 'luxembourgish',
    'mk': 'macedonian',
    'mg': 'malagasy',
    'ms': 'malay',
    'ml': 'malayalam',
    'mt': 'maltese',
    'mi': 'maori',
    'mr': 'marathi',
    'mn': 'mongolian',
    'my': 'myanmar (burmese)',
    'ne': 'nepali',
    'no': 'norwegian',
    'or': 'odia',
    'ps': 'pashto',
    'fa': 'persian',
    'pl': 'polish',
    'pt': 'portuguese',
    'pa': 'punjabi',
    'ro': 'romanian',
    'ru': 'russian',
    'sm': 'samoan',
    'gd': 'scots gaelic',
    'sr': 'serbian',
    'st': 'sesotho',
    'sn': 'shona',
    'sd': 'sindhi',
    'si': 'sinhala',
    'sk': 'slovak',
    'sl': 'slovenian',
    'so': 'somali',
    'es': 'spanish',
    'su': 'sundanese',
    'sw': 'swahili',
    'sv': 'swedish',
    'tg': 'tajik',
    'ta': 'tamil',
    'te': 'telugu',
    'th': 'thai',
    'tr': 'turkish',
    'uk': 'ukrainian',
    'ur': 'urdu',
    'ug': 'uyghur',
    'uz': 'uzbek',
    'vi': 'vietnamese',
    'cy': 'welsh',
    'xh': 'xhosa',
    'yi': 'yiddish',
    'yo': 'yoruba',
    'zu': 'zulu'
}

const basicAllergies =[
  {
      name: 'gluten',
      removable: true
  },
  {
      name: 'gluten',
      removable: false
  },
  {
      name: 'garlic',
      removable: true
  },
  {
      name: 'garlic',
      removable: false
  },
  {
      name: 'fish',
      removable: true
  },{
      name: 'fish',
      removable: false
  },{
      name: 'onion',
      removable: true
  },{
      name: 'onion',
      removable: false
  },{
      name: 'msg',
      removable: true
  },{
      name: 'msg',
      removable: false
  },{
      name: 'peanuts',
      removable: true
  },{
      name: 'peanuts',
      removable: false
  },{
      name: 'soy',
      removable: true
  },{
      name: 'soy',
      removable: false
  },{
      name: 'sesame',
      removable: true
  },{
      name: 'sesame',
      removable: false
  },{
      name: 'tree nuts',
      removable: true
  },{
      name: 'tree nuts',
      removable: false
  },{
      name: 'shellfish',
      removable: true
  },{
      name: 'shellfish',
      removable: false
  },{
      name: 'shrimp',
      removable: true
  },{
      name: 'shrimp',
      removable: false
  },{
      name: 'dairy',
      removable: true
  },{
      name: 'dairy',
      removable: false
  },{
      name: 'egg',
      removable: true
  },{
      name: 'egg',
      removable: false
  }
]

function titleCase(str) {
    str = str.toLowerCase().split(' ');
    for (var i = 0; i < str.length; i++) {
      str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
    }
    return str.join(' ');
  }

const keys = Object.keys(languageObj)
const languageList = []
keys.forEach(key => {
    const newObj = {[titleCase(languageObj[key])]: key}
    languageList.push(newObj)
})

export {basicAllergies}
export {languageList}