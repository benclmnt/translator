import { API_KEY } from './secrets.js'

const ENDPOINT="https://translate.yandex.net/api/v1.5/tr.json/translate"

export async function translate(text, lang_to, lang_from) {
  const lang = lang_from ? `${lang_from}-${lang_to}` : lang_to;
  const translated = await window.fetch(ENDPOINT + 
    `?key=${API_KEY}` + 
    `&text=${text}` + 
    `&lang=${lang}`
  )
  .then(res => res.json())
  .then(res => res.text)
  .catch(err => console.error(err));

  return translated;
}