import { recognizing, recog_button, final_span, interim_span } from './speech_recog.js';
import { translate } from './utils.js'

var synth = window.speechSynthesis;
var synth_button = document.querySelector('#synth_button');
export var translation_span = document.querySelector('#translation');
var lang_to_input = document.querySelector('#lang_to');
export var lang_from_input = document.querySelector('#lang_from');

async function synthTranslator(event) {
  var text = final_span.textContent || interim_span.textContent;
  var lang_from = lang_from_input.value;
  var lang_to = lang_to_input.value;

  if(!text) return;
  
  if (recognizing) {
    recog_button.click();
  }

  // if (lang_from === 'en') {
  //   text = await punctuate(text);
  //   final_span.textContent = text;
  // }

  let translatedText;
  if (lang_to !== lang_from) {
    translatedText = await translate(text, lang_to, lang_from);
  } else {
    translatedText = text;
  }
  translation_span.textContent = translatedText;

  var textToUtter = translatedText || 
    "Cannot get translated text. Returning previous text. " + text;
  var utterThis = new SpeechSynthesisUtterance(textToUtter);
  utterThis.lang = lang_to;

  // make sure window.speechSynthesis is not speaking
  synth.cancel();
  synth.speak(utterThis);
}

synth_button.addEventListener('click', synthTranslator);
// final_span.addEventListener('change', startSynth);