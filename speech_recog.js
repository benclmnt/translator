import { translation_span, lang_from_input } from './speech_synth.js';

var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
var SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent

export var final_span = document.querySelector('#final_span');
export var interim_span = document.querySelector('#interim_span');
export var recog_button = document.querySelector('#recog_button')

var final_transcript = '';
export var recognizing = false;

if (typeof SpeechRecognition === "undefined") {
  recog_button.remove();
  final_span.textContent = "Sorry! Your browser do not support Speech Recognition" 
  final_span.style.color = "red"
} else {
  // recognition obj
  var recognition = new SpeechRecognition();
  recognition.lang = lang_from_input.value;
  recognition.continuous = true;
  recognition.interimResults = true;

  recognition.onstart = function() {
    console.log("recognition started");
    recog_button.textContent = 'Stop recognition'
    recognizing = true;
  }

  recognition.onerror = function(event) {
    console.log(event.error);
    final_span.textContent=`Error: ${event.error}`
  }
  
  recognition.onresult = function(event) {
    var interim_transcript = '';

    if (typeof(event.results) === "undefined") {
      recognition.onend = null;
      recognition.stop();
      console.log("exitted prematurely")
    }

    for(let i = event.resultIndex; i < event.results.length; i++) {
      if (event.results[i].isFinal) {
        final_transcript += event.results[i][0].transcript;
      } else {
        interim_transcript += event.results[i][0].transcript;
      }
      final_span.textContent = final_transcript;
      interim_span.textContent = interim_transcript;
    }
  }
  
  recognition.onsoundend = function(){
    console.log("onsoundend");
  }

  recognition.onaudioend = function() {
    console.log("onaudioend");
  }

  recognition.onspeechend = function() {
    console.log("onspeechend");
  }

  recognition.onend = function() {
    console.log("recognition ended")
    recognizing = false;
    recog_button.textContent = 'Start recognition'
  }
}

function startRecog(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  recognition.lang = lang_from_input.value;
  recognition.start();
  final_span.textContent = '';
  interim_span.textContent = '';
  translation_span.textContent = '';
  final_transcript = '';
}

recog_button.addEventListener('click', startRecog)

//https://www.google.com/intl/en/chrome/demos/speech.html