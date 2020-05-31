import { recognizing, recog_button, final_span, interim_span } from './speech_recog.js';

var synth = window.speechSynthesis;
var synth_button = document.querySelector('#synth_button');

function startSynth(event) {
  var text = final_span.textContent || interim_span.textContent;
  console.log(text);
  if (recognizing) {
    recog_button.click();
  }
  var utterThis = new SpeechSynthesisUtterance(text);
  synth.speak(utterThis);
}

synth_button.addEventListener('click', startSynth);
// final_span.addEventListener('change', startSynth);