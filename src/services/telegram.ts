// Telegram Service Component

export const sendTelegramMessage = async (message: string) => {
  try {
    console.log("Telegram Message Sent:", message);
    return true;
  } catch (error) {
    console.error("Error sending Telegram message:", error);
    return false;
  }
};
