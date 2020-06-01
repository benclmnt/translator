import { API_KEY } from './secrets.js'

const TRANSLATE_ENDPOINT="https://translate.yandex.net/api/v1.5/tr.json/translate"
const PUNCTUATE_ENDPOINT="http://bark.phon.ioc.ee/punctuator"

export async function translate(text, lang_to, lang_from) {
  const lang = lang_from ? `${lang_from}-${lang_to}` : lang_to;
  const translated = await window.fetch(TRANSLATE_ENDPOINT + 
    `?key=${API_KEY}` + 
    `&text=${text}` + 
    `&lang=${lang}`
  )
  .then(res => res.json())
  .then(res => res.text)
  .catch(err => console.error(err));

  return translated;
}

export async function punctuate(text) {
  const fetchedResource = await window.fetch(
    PUNCTUATE_ENDPOINT, 
    {
      method: "POST",
      body: `text=${text}`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  )
  const reader = await fetchedResource.body.getReader()
  let result = ''

  reader.read().then(function processText({ done, value }) {
    if (done) {
      console.log(result);
      return result;
    }

    result += value;
    return reader.read().then(processText);
  })
}