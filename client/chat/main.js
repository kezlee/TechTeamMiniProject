const btnSend = document.querySelector('.btn--send');
const chatInput = document.querySelector('.chat__input');
const chatHistory = document.querySelector('.chat__history');

chatInput.addEventListener('keypress', (event) => {
  if(event.key != "Enter")
    return;
  
  event.preventDefault();

  if(chatInput.value === "")
    return;
  const chatInputValue = chatInput.value;
  chatInput.value = "";
  sendMessage(chatInputValue);
});

btnSend.addEventListener('click', () => {
  if(chatInput.value === "")
    return;
  const chatInputValue = chatInput.value;
  chatInput.value = "";
  sendMessage(chatInputValue);
});

function sendMessage(message) {
  const div = document.createElement('div');
  div.classList.add('chat__bubble', 'chat__bubble--send')
  div.innerText = message;
  chatHistory.insertBefore(div, chatHistory.firstChild);
  document.querySelector(".chat__input").focus();
}

function initChatHistoryStyle() {
  const paddingRight = chatHistory.offsetWidth - chatHistory.clientWidth
  chatHistory.style.marginRight = -paddingRight + "px";
}

initChatHistoryStyle();