const API_URL =
  "https://mindease-v3t3.onrender.com/api/v1/chat";

export const sendChatMessage = async (
  message,
  history = []
) => {

  // create unique session once
  let sessionId =
    localStorage.getItem("sessionId");

  if (!sessionId) {

    sessionId = crypto.randomUUID();

    localStorage.setItem(
      "sessionId",
      sessionId
    );
  }

  const response = await fetch(API_URL, {

    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({

      // chat message
      message: message,

      // persistent session
      session_id: sessionId,

      // previous messages
      history,

      // user name
      user_name:
        localStorage.getItem(
          "userName"
        ) || "MindEase User",

      // telegram + trusted contact
      emergency_contact:
        localStorage.getItem(
          "telegramChatId"
        )
          ? {

              name:
                localStorage.getItem(
                  "emergencyContactName"
                ) || "Trusted Contact",

              telegram_chat_id:
                localStorage.getItem(
                  "telegramChatId"
                ),

            }
          : null,
    }),
  });

  if (!response.ok) {
    throw new Error(
      "Backend request failed"
    );
  }

  return response.json();
};