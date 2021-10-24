const btnSend = document.querySelector('.btn--send');
const chatInput = document.querySelector('.chat__input');
const chatHistory = document.querySelector('.chat__history');
const ws = initWebSocket();

chatInput.addEventListener('keypress', (event) => {
  if(event.key != "Enter")
    return;
  
  event.preventDefault();
  sendChatMessage();
});

btnSend.addEventListener('click', () => {
  sendChatMessage();
});

function sendChatMessage() {
  if(chatInput.value === "")
    return;

  const chatInputValue = chatInput.value;
  chatInput.value = "";

  sendMessageToSocket(chatInputValue);
  sendMessageToHistory(chatInputValue);
}

function sendMessageToSocket(message) {
  if(!ws) {
    console.log('WebSocket not initialized', ws);
    return;
  }
  console.log('message sent to', ws);
  
  ws.send(message)
}

function sendMessageToHistory(message) {
  const div = document.createElement('div');
  div.classList.add('chat__bubble', 'chat__bubble--send')
  div.innerText = message;
  chatHistory.insertBefore(div, chatHistory.firstChild);
  document.querySelector(".chat__input").focus();
}

function polyFillChatStyle() {
  const paddingRight = chatHistory.offsetWidth - chatHistory.clientWidth
  chatHistory.style.marginRight = -paddingRight + "px";
}

function initWebSocket() {
  const host = 'localhost';
  const port = '8080';
  const ws = new WebSocket('ws://localhost:8080');
  ws.onopen = () => {
    console.log('connection opened !')
  }
  ws.onmessage = ({data}) => {
    console.log('message received', data);
  }
  ws.onclose = () => {
    console.log('ws closed');
    ws = null;
  }

  return ws;
}

polyFillChatStyle();
