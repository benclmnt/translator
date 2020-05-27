var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;

var output = document.querySelector('.output')
var startButton = document.querySelector('#start-button');

startButton.addEventListener('click', () => {
  recognition.start();
  output.textContent = "";
  console.log("Ready to listen to command");
})

recognition.onresult = function(event) {
  console.log(event)
  for(let i = event.resultIndex; i < event.results.length; i++) {
    output.textContent += event.results[i][0].transcript
  }
}

recognition.onend = function() {
  console.log("recognition stopped")
  recognition.stop();
}