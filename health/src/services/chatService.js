const API_URL = "https://mindease-v3t3.onrender.com/api/v1/chat";

export const sendChatMessage = async (
  message,
  history = []
) => {

  const response = await fetch(API_URL, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      message: message,
      session_id: "demo-session",
      history,

      emergency_contact:
        localStorage.getItem("telegramChatId")
          ? {
              name: "Trusted Contact",

              telegram_chat_id:
                localStorage.getItem(
                  "telegramChatId"
                ),
            }
          : null,
    }),
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return response.json(); 
};