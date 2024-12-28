document.addEventListener('DOMContentLoaded', function () {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // Event listener for sending messages
    sendButton.addEventListener('click', sendMessage);

    // Function to send a message
    async function sendMessage(event) {
        event.preventDefault();
        const message = messageInput.value;
        
        try {
            const response = await fetch('/send-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });
    
            if (!response.ok) {
                throw new Error('Failed to send message');
            }
    
            const data = await response.json();
            displayMessage(message, 'user');
            displayMessage(data.text, 'model');
        } catch (error) {
            console.error('Error sending message:', error.message);
            // Optionally, display an error message to the user
            displayMessage('Failed to send message', 'error');
        }
    
        messageInput.value = ''; // Clear input field
    }
    
    // Function to display a message in the chat window
    function displayMessage(message, role) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.classList.add(role);
        messageElement.textContent = message;
        chatMessages.appendChild(messageElement);
    }
});


