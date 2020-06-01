require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY

exports.handler = async function(event, context, callback) {
  const TRANSLATE_ENDPOINT="https://translate.yandex.net/api/v1.5/tr.json/translate"
  const lang = lang_from ? `${lang_from}-${lang_to}` : lang_to;

  const translated = await window.fetch(TRANSLATE_ENDPOINT + 
    `?key=${API_KEY}` + 
    `&text=${text}` + 
    `&lang=${lang}`
  )
  .then(res => res.json())
  .then(res => res.text)
  .catch(err => console.error(err));

  return {
    statusCode: 200,
    body: API_KEY
  }
}