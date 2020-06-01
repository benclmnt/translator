require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.API_KEY
const TRANSLATE_ENDPOINT="https://translate.yandex.net/api/v1.5/tr.json/translate"

exports.handler = async function(event, context) {
  const { lang, text } = event.queryStringParameters

  if(!lang || !text) {
    return {
      statusCode: 400,
      body: "Missing lang or text"
    }
  }
  
  const translated = await axios.get(TRANSLATE_ENDPOINT + 
    `?key=${API_KEY}` + 
    `&text=${text}` + 
    `&lang=${lang}`
  )
  .then(res => res.data.text)
  .catch(err => {
    console.log(err);
    return {
      statusCode: 400,
      body: JSON.stringify(err)
    }
  });

  console.log(translated);

  return {
    statusCode: 200,
    body: translated[0],
  }
}