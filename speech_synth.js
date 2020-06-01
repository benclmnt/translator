import { recognizing, recog_button, final_span, interim_span } from './speech_recog.js';
import { translate, punctuate } from './utils.js'

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

  // if (lang_from === 'en') {
  //   text = await punctuate(text);
  //   final_span.textContent = text;
  // }

  var translatedText = await translate(text, lang_to, lang_from);
  translation_span.textContent = translatedText;

  if (recognizing) {
    recog_button.click();
  }

  var textToUtter = translatedText || 
    "Cannot get translated text. Returning previous text. " + text;
  var utterThis = new SpeechSynthesisUtterance(textToUtter);
  utterThis.lang = lang_to;
  synth.speak(utterThis);
}

synth_button.addEventListener('click', synthTranslator);
// final_span.addEventListener('change', startSynth);