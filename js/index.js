const main = document.querySelector("main");
const buttonInsertText = document.querySelector(".btn-toggle");
const divTextBox = document.querySelector(".text-box");
const CloseDivTextBox = document.querySelector(".close");
const select = document.querySelector("select");
const buttonRead = document.querySelector("#read");
const textArea = document.querySelector("textarea");

const humanExpressions = [
  { img: "../img/drink.jpg", text: "Estoucom sede" },
  { img: "../img/food.jpg", text: "Estou com fome" },
  { img: "../img/tired.jpg", text: "Estou cansado" },
  { img: "../img/hurt.jpg", text: "Estou machucado" },
  { img: "../img/happy.jpg", text: "Estou feliz" },
  { img: "../img/angry.jpg", text: "Estou com raiva" },
  { img: "../img/sad.jpg", text: "Estou triste" },
  { img: "../img/scared.jpg", text: "Estou assustado" },
  { img: "../img/outside.jpg", text: "Quero ir lá fora" },
  { img: "../img/home.jpg", text: "quero ir para casa" },
  { img: "../img/school.jpg", text: "quero ir para a escola" },
  { img: "../img/grandma.jpg", text: "quero ver a vóvó" },
];

const utterance = new SpeechSynthesisUtterance();

const setTextMessage = (text) => {
  utterance.text = text;
};

const speakText = () => {
  speechSynthesis.speak(utterance);
};

const setVoice = (event) => {
  const selectedVoice = voices.find(
    (voice) => voice.name === event.target.value
  );
  utterance.voice = selectedVoice;
};

const addExpressionBoxesIntoDOM = () => {
  main.innerHTML = humanExpressions
    .map(
      ({ img, text }) => `
  <div class="expression-box"  data-js="${text}">
     <img src="${img}" alt="${text}" data-js="${text}">
     <p class="info"  data-js="${text}">${text}</p> 
  </div>
  `
    )
    .join("");
};

addExpressionBoxesIntoDOM();

const setStyleOfClickedDiv = (dataValue) => {
  const div = document.querySelector(`[data-js="${dataValue}"]`);
  div.classList.add("active");
  setTimeout(() => {
    div.classList.remove("active");
  }, 1000);
};

main.addEventListener("click", (event) => {
  const clickedElement = event.target;
  const clickedElementText = clickedElement.dataset.js;
  const clickedElementTextMustBeSpoken = ["img ", "p"].some(
    (elementName) =>
      clickedElement.tagName.toLowerCase() === elementName.toLowerCase()
  );

  if (clickedElementTextMustBeSpoken) {
    setTextMessage(clickedElementText);
    speakText();
    setStyleOfClickedDiv(clickedElementText);
  }
});

const insertOptionsElementsIntoDOM = (voices) => {
  const optionElement = voices.reduce((accumulator, { lang, name }) => {
    accumulator += `<option value="${name}">${lang} | ${name}</option>`;
    return accumulator;
  }, "");

  select.innerHTML = optionElement;
};


const setUtterance = voice => {
  utterance.voice = voice;
  const voiceOptionElement = select.querySelector(
    `value="[${googleVoice}]"`)
    voiceOptionElement = true
}

const setPTBRVoices = (voices) => {
  const googleVoice = voices.find(
    (voice) => voice.name === "Google português do Brasil"
  );

  const microsoftVoice = voices.find(
    (voice) => voice.name === "Microsoft Maria Desktop - Portuguese(Brazil)"
  );

  if (googleVoice) {
    setUtterance(googleVoice)
  } else if (microsoftVoice) {
    setUtterance(microsoftVoice)
  }
};

let voices = [];

speechSynthesis.addEventListener("voiceschanged", () => {
  voices = speechSynthesis.getVoices();

  insertOptionsElementsIntoDOM(voices);
  setPTBRVoices(voices)
});

buttonInsertText.addEventListener("click", () => {
  divTextBox.classList.add("show");
});

CloseDivTextBox.addEventListener("click", () => {
  divTextBox.classList.remove("show");
});

select.addEventListener("change", setVoice);

buttonRead.addEventListener("click", () => {
  setTextMessage(textArea.value);
  speakText();
});
