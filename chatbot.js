(function () {
  // Read parameters from the global object
  var params = window.ChatbotParams || {};

  // Default values
  var defaultParams = {
    position: "bottom-right",
    primaryColor: "#0084ff",
    secondaryColor: "#f0f0f0",
    title: "Chat with us",
  };

  // Merge default parameters with provided parameters
  params = Object.assign({}, defaultParams, params);

  // Create chatbot container
  var chatbotContainer = document.createElement("div");
  chatbotContainer.id = "chatbot-container";
  chatbotContainer.style.cssText = `
        position: fixed;
        ${params.position.includes("bottom") ? "bottom: 20px;" : "top: 20px;"}
        ${params.position.includes("right") ? "right: 20px;" : "left: 20px;"}
        width: 300px;
        height: 400px;
        border: 1px solid ${params.primaryColor};
        border-radius: 5px;
        overflow: hidden;
        font-family: Arial, sans-serif;
    `;

  // Create chat header
  var chatHeader = document.createElement("div");
  chatHeader.style.cssText = `
        background-color: ${params.primaryColor};
        color: white;
        padding: 10px;
        font-weight: bold;
    `;
  chatHeader.textContent = params.title;

  // Create chat messages area
  var chatMessages = document.createElement("div");
  chatMessages.id = "chat-messages";
  chatMessages.style.cssText = `
        height: 310px;
        overflow-y: auto;
        padding: 10px;
        background-color: #f9f9f9;
    `;

  // Create user input field
  var userInput = document.createElement("input");
  userInput.id = "user-input";
  userInput.type = "text";
  userInput.placeholder = "Type your message...";
  userInput.style.cssText = `
        width: 100%;
        padding: 10px;
        border: none;
        border-top: 1px solid ${params.primaryColor};
    `;

  // Append elements
  chatbotContainer.appendChild(chatHeader);
  chatbotContainer.appendChild(chatMessages);
  chatbotContainer.appendChild(userInput);
  document.body.appendChild(chatbotContainer);

  // Add styles
  var style = document.createElement("style");
  style.textContent = `
        .message {
            margin-bottom: 10px;
            padding: 5px;
            border-radius: 5px;
        }
        .user-message {
            background-color: ${params.primaryColor};
            color: white;
            text-align: right;
        }
        .bot-message {
            background-color: ${params.secondaryColor};
        }
    `;
  document.head.appendChild(style);

  // Bot responses (you can extend this or load from an external source)
  var botResponses = {
    hello: "Hello! How can I help you today?",
    "how are you":
      "I'm doing well, thank you for asking. How can I assist you?",
    bye: "Goodbye! Have a great day!",
    default:
      "I'm sorry, I don't understand. Can you please rephrase your question?",
  };

  // Function to add message to chat
  function addMessage(message, isUser) {
    var messageElement = document.createElement("div");
    messageElement.classList.add("message");
    messageElement.classList.add(isUser ? "user-message" : "bot-message");
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Function to get bot response
  function getBotResponse(userMessage) {
    var lowerCaseMessage = userMessage.toLowerCase();
    return botResponses[lowerCaseMessage] || botResponses["default"];
  }

  // Event listener for user input
  userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      var userMessage = userInput.value.trim();
      if (userMessage) {
        addMessage(userMessage, true);
        userInput.value = "";

        setTimeout(() => {
          var botResponse = getBotResponse(userMessage);
          addMessage(botResponse, false);
        }, 500);
      }
    }
  });
})();
