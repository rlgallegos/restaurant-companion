

let lanugageObj = {'afrikaans': 'af', 'albanian': 'sq', 'amharic': 'am', 'arabic': 'ar', 'armenian': 'hy', 'assamese': 'as', 'aymara': 'ay', 'azerbaijani': 'az', 'bambara': 'bm', 'basque': 'eu', 'belarusian': 'be', 'bengali': 'bn', 'bhojpuri': 'bho', 'bosnian': 'bs', 'bulgarian': 'bg', 'catalan': 'ca', 'cebuano': 'ceb', 'chichewa': 'ny', 'chinese- simplified': 'zh-CN', 'chinese- traditional': 'zh-TW', 'corsican': 'co', 'croatian': 'hr', 'czech': 'cs', 'danish': 'da', 'dhivehi': 'dv', 'dogri': 'doi', 'dutch': 'nl', 'english': 'en', 'esperanto': 'eo', 'estonian': 'et', 'ewe': 'ee', 'filipino': 'tl', 'finnish': 'fi', 'french': 'fr', 'frisian': 'fy', 'galician': 'gl', 'georgian': 'ka', 'german': 'de', 'greek': 'el', 'guarani': 'gn', 'gujarati': 'gu', 'haitian creole': 'ht', 'hausa': 'ha', 'hawaiian': 'haw', 'hebrew': 'iw', 'hindi': 'hi', 'hmong': 'hmn', 'hungarian': 'hu', 'icelandic': 'is', 'igbo': 'ig', 'ilocano': 'ilo', 'indonesian': 'id', 'irish': 'ga', 'italian': 'it', 'japanese': 'ja', 'javanese': 'jw', 'kannada': 'kn', 'kazakh': 'kk', 'khmer': 'km', 'kinyarwanda': 'rw', 'konkani': 'gom', 'korean': 'ko', 'krio': 'kri', 'kurdish- kurmanji': 'ku', 'kurdish- sorani': 'ckb', 'kyrgyz': 'ky', 'lao': 'lo', 'latin': 'la', 'latvian': 'lv', 'lingala': 'ln', 'lithuanian': 'lt', 'luganda': 'lg', 'luxembourgish': 'lb', 'macedonian': 'mk', 'maithili': 'mai', 'malagasy': 'mg', 'malay': 'ms', 'malayalam': 'ml', 'maltese': 'mt', 'maori': 'mi', 'marathi': 'mr', 'meiteilon- manipuri': 'mni-Mtei', 'mizo': 'lus', 'mongolian': 'mn', 'myanmar': 'my', 'nepali': 'ne', 'norwegian': 'no', 'odia oriya': 'or', 'oromo': 'om', 'pashto': 'ps', 'persian': 'fa', 'polish': 'pl', 'portuguese': 'pt', 'punjabi': 'pa', 'quechua': 'qu', 'romanian': 'ro', 'russian': 'ru', 'samoan': 'sm', 'sanskrit': 'sa', 'scots gaelic': 'gd', 'sepedi': 'nso', 'serbian': 'sr', 'sesotho': 'st', 'shona': 'sn', 'sindhi': 'sd', 'sinhala': 'si', 'slovak': 'sk', 'slovenian': 'sl', 'somali': 'so', 'spanish': 'es', 'sundanese': 'su', 'swahili': 'sw', 'swedish': 'sv', 'tajik': 'tg', 'tamil': 'ta', 'tatar': 'tt', 'telugu': 'te', 'thai': 'th', 'tigrinya': 'ti', 'tsonga': 'ts', 'turkish': 'tr', 'turkmen': 'tk', 'twi': 'ak', 'ukrainian': 'uk', 'urdu': 'ur', 'uyghur': 'ug', 'uzbek': 'uz', 'vietnamese': 'vi', 'welsh': 'cy', 'xhosa': 'xh', 'yiddish': 'yi', 'yoruba': 'yo', 'zulu': 'zu'}

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

const keys = Object.keys(lanugageObj)
// console.log(keys)
const languageList = []
keys.forEach(key => {
    const newObj = {[titleCase(key)]: lanugageObj[key]}
    languageList.push(newObj)
})

export {basicAllergies}
export {languageList}
// export default languageList