const BASE_URL = '/api/message'; 

export const MessageService = {
  getMessages: async (friendId) => {
    const response = await fetch(`${BASE_URL}/get-messages/${friendId}`);
    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.status}`);
    }
    return response.json();
  },

  sendMessage: async ({ receiver, content }) => {
    const response = await fetch(`${BASE_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ receiver, content }),
    });

    if (!response.ok) {
      throw new Error(`Error sending message: ${response.status}`);
    }
    return response.json();
  },
};