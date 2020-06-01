const TRANSLATE_ENDPOINT="https://translate.yandex.net/api/v1.5/tr.json/translate"
const PUNCTUATE_ENDPOINT="http://bark.phon.ioc.ee/punctuator"

const BASE_API_URL = '/.netlify/functions/'

export async function translate(text, lang_to, lang_from) {
  const lang = lang_from ? `${lang_from}-${lang_to}` : lang_to;
  const translatedResource = await window.fetch(BASE_API_URL + 
    'translate' +
    `?text=${text}` + 
    `&lang=${lang}`
  )
  
  return await textStreamReader(translatedResource);
}

// export async function punctuate(text) {
//   const punctuateResource = await window.fetch(
//     PUNCTUATE_ENDPOINT, 
//     {
//       method: "POST",
//       body: `text=${text}`,
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
//     }
//   )

//   return await textStreamReader(punctuateResource)
// }

// Private functions

const decoder = new TextDecoder('utf-8');
async function textStreamReader(resource) {
  const reader = await resource.body.getReader()
  let result = ''

  // wait until finished
  await reader.read().then(function processText({ done, value }) {
    if (done) {
      // console.log(result);
      return result;
    }

    result += decoder.decode(value);
    return reader.read().then(processText);
  })

  return result
}