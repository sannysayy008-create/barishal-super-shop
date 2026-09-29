# Firebase Setup গাইড

## Step 1: Firebase প্রজেক্ট তৈরি করুন

1. [firebase.google.com](https://firebase.google.com) খুলুন
2. **"Go to console"** বা **"Create a project"** ক্লিক করুন
3. প্রজেক্টের নাম দিন: `barishal-super-shop`
4. Google Analytics enable করুন (optional)
5. **Create project** ক্লিক করুন

## Step 2: Web App যোগ করুন

1. Console-এ গিয়ে **"<>"** (Web icon) ক্লিক করুন
2. অ্যাপের নাম দিন: `barishal-super-shop-web`
3. **Register app** ক্লিক করুন
4. নিচের config কপি করুন:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

## Step 3: Authentication Enable করুন

1. Firebase Console থেকে **Authentication** খুলুন
2. **Sign-in method** ট্যাবে যান
3. **Email/Password** enable করুন
4. **Save** ক্লিক করুন

## Step 4: Firestore Database তৈরি করুন

1. **Firestore Database** খুলুন
2. **Create database** ক্লিক করুন
3. **Start in test mode** নির্বাচন করুন (development-এর জন্য)
4. Region: **asia-southeast1** (ব্যাংকক - বাংলাদেশের কাছাকাছি)
5. **Enable** ক্লিক করুন

## Step 5: `.env.local` ফাইল তৈরি করুন

আপনার project root-এ `.env.local` ফাইল তৈরি করুন এবং Firebase config যোগ করুন:

```env
# Firebase
VITE_FIREBASE_API_KEY=YOUR_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_APP_ID

# API
VITE_API_BASE_URL=https://your-app.vercel.app
```

## Step 6: Dependencies ইনস্টল করুন

```bash
bun add firebase
```

## Step 7: Build করুন

```bash
bun run build
```

## Step 8: Vercel-এ Deploy করুন

### A. GitHub-এ Push করুন
```bash
git add .
git commit -m "feat: add Firebase integration and Vercel deployment"
git push origin main
```

### B. Vercel Connect করুন
1. [vercel.com](https://vercel.com) খুলুন
2. **Sign up** করুন (GitHub ব্যবহার করুন)
3. **Add New Project** ক্লিক করুন
4. আপনার `barishal-super-shop` repository খুঁজুন এবং **Import** করুন
5. **Environment Variables** যোগ করুন:
   - Name: `VITE_FIREBASE_API_KEY` → Value: (আপনার Firebase API Key)
   - Name: `VITE_FIREBASE_AUTH_DOMAIN` → Value: (আপনার অথ)
   - ... (বাকি সব Firebase config)

### C. Deploy করুন
1. **Deploy** বাটনে ক্লিক করুন
2. Deployment complete হওয়া অপেক্ষা করুন (2-3 মিনিট)
3. আপনার Live URL পাবেন: `https://your-app.vercel.app`

## Step 9: Firestore Security Rules (Test Mode থেকে Production)

১ মাস পরে production-এ নিয়ে যাওয়ার সময় এই rules ব্যবহার করুন:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth.uid == userId;
      allow write: if request.auth.uid == userId;
    }
    match /products/{productId} {
      allow read: if true;
      allow create: if request.auth != null;
      allow update, delete: if request.auth.uid == resource.data.userId;
    }
    match /orders/{orderId} {
      allow read: if request.auth.uid == resource.data.userId;
      allow create: if request.auth != null;
    }
    match /admin/{document=**} {
      allow read, write: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'moderator'];
    }
  }
}
```

---

## সাধারণ সমস্যা ও সমাধান

**Q: "Firebase config not found" error?**  
A: `.env.local` ফাইল সঠিক জায়গায় আছে কিনা চেক করুন।

**Q: "Permission denied" Firestore-এ?**  
A: Test mode enable আছে কিনা দেখুন বা উপরের rules প্রয়োগ করুন।

**Q: Vercel deployment fail হচ্ছে?**  
A: Environment variables সব যোগ আছে কিনা নিশ্চিত করুন।

**Q: পুরোনো ২০ জনের app update হবে?**  
A: হ্যাঁ! একই Vercel link থেকে install করলে Service Worker auto-update করবে।

---

**এখন শুরু করুন!** 🚀
