document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();
    let confirmationMessage = document.createElement("div");
    confirmationMessage.innerText = "Thank you for contacting us! We will get back to you shortly.";
    confirmationMessage.classList.add("confirmation-message");
    document.body.appendChild(confirmationMessage);
    
    setTimeout(() => {
        confirmationMessage.remove();
    }, 3000);
});

// function askAIDoctor() {
//     let userInput = document.getElementById("chat-input").value;
//     let responseBox = document.getElementById("chat-response");
    
//     if (userInput.trim() === "") {
//         responseBox.innerText = "Please enter a question.";
//         return;
//     }
    
//     responseBox.innerHTML = "<p>Processing...</p>";
//     setTimeout(() => {
//         responseBox.innerHTML = `<p><strong>AI-Doctor:</strong> Based on your question, I recommend consulting a specialist.</p>`;
//     }, 2000);
// }
function askAIDoctor() {
    let userInput = document.getElementById("chat-input").value;
    let responseBox = document.getElementById("chat-response");

    if (userInput.trim() === "") {
        responseBox.innerText = "Please enter a question.";
        return;
    }

    responseBox.innerHTML = "<p>Processing...</p>";

    fetch("http://127.0.0.1:5000/chatbot", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userInput })
    })
    .then(response => response.json())
    .then(data => {
        responseBox.innerHTML = `<p><strong>AI-Doctor:</strong> ${data.response}</p>`;
    })
    .catch(error => {
        responseBox.innerHTML = "<p>Error connecting to AI-Doctor.</p>";
        console.error("Error:", error);
    });
}

// Smooth Scrolling Effect
document.querySelectorAll("nav ul li a").forEach(anchor => {
    anchor.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Floating Chat Bot UI
document.addEventListener("DOMContentLoaded", () => {
    let chatBox = document.createElement("div");
    chatBox.id = "chat-box";
    chatBox.innerHTML = `<div id="chat-header">AI-Doctor Chat <span id="close-chat">×</span></div>
                          <div id="chat-content"></div>
                          <input type="text" id="chat-input-box" placeholder="Ask about symptoms...">
                          <button id="chat-send">Send</button>`;
    document.body.appendChild(chatBox);
    
    document.getElementById("close-chat").addEventListener("click", () => {
        chatBox.style.display = "none";
    });

    document.getElementById("chat-send").addEventListener("click", () => {
        let chatInput = document.getElementById("chat-input-box").value;
        let chatContent = document.getElementById("chat-content");
        
        if (chatInput.trim() === "") return;
        chatContent.innerHTML += `<p><strong>You:</strong> ${chatInput}</p>`;
        setTimeout(() => {
            chatContent.innerHTML += `<p><strong>AI-Doctor:</strong> I recommend consulting a professional for detailed advice.</p>`;
            chatContent.scrollTop = chatContent.scrollHeight;
        }, 2000);
    });
});
