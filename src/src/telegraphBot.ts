// Telegraph Bot Configuration & Setup
export const telegraphConfig = {
  botToken: "8633414899", // আপনার আইডি বা টোকেন
  apiUrl: "https://api.telegram.org/bot",
  
  // বট ইনিশিয়ালাইজ বা কানেক্ট করার ফাংশন
  initBot: function() {
    console.log("Telegraph Bot connected with ID/Token: " + this.botToken);
  }
};

// অটো রান করার জন্য
telegraphConfig.initBot();
