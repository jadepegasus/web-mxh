import { host } from "../../env";

const BASE_URL = '/api/message'; 

export const MessageService = {
  getMessages: async (friendId) => {
    const response = await fetch(host+`${BASE_URL}/get-messages/${friendId}`, {credentials: 'include'});
    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.status}`);
    }
    return response.json();
  },

  sendMessage: async ({ receiver, content }) => {
    const response = await fetch(host+`${BASE_URL}/send-message`, {
      credentials: 'include',
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