import { recognizing, recog_button, final_span, interim_span } from './speech_recog.js';
import { translate } from './translate.js'

var synth = window.speechSynthesis;
var synth_button = document.querySelector('#synth_button');
export var translation_span = document.querySelector('#translation');
var lang_to_input = document.querySelector('#lang_to');
export var lang_from_input = document.querySelector('#lang_from');

async function startSynth(event) {
  var text = final_span.textContent || interim_span.textContent;

  if(!text) return;

  var translatedText = await translate(text, lang_to_input.value, lang_from_input.value);
  translation_span.textContent = translatedText;

  if (recognizing) {
    recog_button.click();
  }

  var textToUtter = translatedText || 
    "Cannot get translated text. Returning previous text. " + text;
  var utterThis = new SpeechSynthesisUtterance(textToUtter);
  synth.speak(utterThis);
}

synth_button.addEventListener('click', startSynth);
// final_span.addEventListener('change', startSynth);