// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the future
const CLIENT_ID = "5m2UXbanTT7ha1Fc";

const drone = new ScaleDrone(CLIENT_ID, {
  data: {
    // Will be sent out as clientData via events
    name: getRandomName(),
    color: getRandomColor(),
  },
});

let members = [];

drone.on("open", (error) => {
  if (error) {
    return console.error(error);
  }
  console.log("Successfully connected to Scaledrone");

  const room = drone.subscribe("observable-room");
  room.on("open", (error) => {
    if (error) {
      return console.error(error);
    }
    console.log("Successfully joined room");
  });

  room.on("members", (m) => {
    members = m;
    updateMembersDOM();
  });

  room.on("member_join", (member) => {
    members.push(member);
    updateMembersDOM();
  });

  room.on("member_leave", ({ id }) => {
    const index = members.findIndex((member) => member.id === id);
    members.splice(index, 1);
    updateMembersDOM();
  });

  room.on("data", (text, member) => {
    if (member) {
      addMessageToListDOM(text, member);
    } else {
      // Message is from server
    }
  });
});

drone.on("close", (event) => {
  console.log("Connection was closed", event);
});

drone.on("error", (error) => {
  console.error(error);
});

function getRandomName() {
  var name = window.prompt("Enter your name: ");
  alert("Your name is " + name);

  return name;
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

//------------- DOM STUFF

const DOM = {
  membersCount: document.querySelector(".members-count"),
  membersList: document.querySelector(".members-list"),
  messages: document.querySelector(".messages"),
  input: document.querySelector(".message-form__input"),
  form: document.querySelector(".message-form"),
};

DOM.form.addEventListener("submit", sendMessage);

function sendMessage() {
  const value = DOM.input.value;
  if (value === "") {
    return;
  }
  DOM.input.value = "";
  drone.publish({
    room: "observable-room",
    message: value,
  });
}

function createMemberElement(member) {
  const { name, color } = member.clientData;
  const el = document.createElement("div");
  el.appendChild(document.createTextNode(name));
  el.className = "member";
  el.style.color = color;
  return el;
}

function updateMembersDOM() {
  DOM.membersCount.innerText = `${members.length} users in room:`;
  DOM.membersList.innerHTML = "";
  members.forEach((member) =>
    DOM.membersList.appendChild(createMemberElement(member))
  );
}

function createMessageElement(text, member) {
  const el = document.createElement("div");
  el.appendChild(createMemberElement(member));
  el.appendChild(document.createTextNode(text));
  el.className = "message";
  return el;
}

function addMessageToListDOM(text, member) {
  const el = DOM.messages;
  const wasTop = el.scrollTop === el.scrollHeight - el.clientHeight;
  el.appendChild(createMessageElement(text, member));
  if (!wasTop) {
    el.scrollTop = el.scrollHeight - el.clientHeight;
  }
}

// function scrollToBottom(don2) {
//   var div = document.getElementById(don2);
//   div.scrollBottom = div.clientHeight - div.scrollHeight;
// }

// window.setInterval(() => {
//   const elem = document.getElementById("don2");
//   elem.scrollTop = elem.scrollHeight;
// }, 5);

// const element = document.getElementById("don2");

// function scrollToTop() {
//   element.scrollIntoView(true);
// }

// function scrollToBottom() {
//   element.scrollIntoView(false);
// }

// Add reply feature to messages
function createMessageElement(text, member) {
  const el = document.createElement("div");
  el.className =
    member.id === drone.clientId
      ? "message message--mine"
      : "message message--theirs";

  // Add member name and color
  const memberEl = createMemberElement(member);
  memberEl.className += " message__member";
  el.appendChild(memberEl);

  // Add message text
  const textEl = document.createElement("div");
  textEl.className = "message__text";
  textEl.innerText = text;
  el.appendChild(textEl);

  // Add reply button
  const replyButton = document.createElement("button");
  replyButton.innerText = "Reply";
  replyButton.className = "message__reply";
  replyButton.onclick = function () {
    DOM.input.value = `@${member.clientData.name} `;
    DOM.input.focus();
  };
  el.appendChild(replyButton);

  return el;
}
// Add message alignment based on sender
function createMessageElement(text, member) {
  const el = document.createElement("div");
  const isMine = member.id === drone.clientId;

  // Add CSS classes based on message sender
  el.classList.add("message");
  el.classList.add(isMine ? "message--mine" : "message--theirs");
  el.classList.add(isMine ? "message--right" : "message--left");

  // Add member name and color
  const memberEl = createMemberElement(member);
  memberEl.className += " message__member";
  el.appendChild(memberEl);

  // Add message text
  const textEl = document.createElement("div");
  textEl.className = "message__text";
  textEl.innerText = text;
  el.appendChild(textEl);

  // Add reply button
  // const replyButton = document.createElement("button");
  // replyButton.innerText = "Reply";
  // replyButton.className = "message__reply";
  // replyButton.onclick = function () {
  //   DOM.input.value = `@${member.clientData.name} `;
  //   DOM.input.focus();
  // };
  // el.appendChild(replyButton);

  // return el;
  const replyButton = document.createElement("button");
  const replyIcon = document.createElement("i");
  replyIcon.className = "fa-solid fa-reply";
  replyButton.appendChild(replyIcon);
  replyButton.appendChild(document.createTextNode(" Reply"));
  replyButton.className = "message__reply";
  replyButton.onclick = function () {
    DOM.input.value = `@${member.clientData.name} `;
    DOM.input.focus();
  };
  el.appendChild(replyButton);
  return el;
}
