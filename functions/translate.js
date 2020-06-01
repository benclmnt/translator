require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY
const TRANSLATE_ENDPOINT="https://translate.yandex.net/api/v1.5/tr.json/translate"

exports.handler = async function(event, context, callback) {
  const { lang, text } = event.queryStringParameters

  if(!lang || !text) {
    callback(null, {
      statusCode: 400,
      body: "Missing lang or text"
    })
  }

  const translated = await axios.get(TRANSLATE_ENDPOINT + 
    `?key=${API_KEY}` + 
    `&text=${text}` + 
    `&lang=${lang}`
  )
  .then(res => res.data.text)
  .catch(err => callback(err));

  callback(null, {
    statusCode: 200,
    body: translated[0],
  })
}