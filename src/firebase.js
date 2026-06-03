import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDkVmtDS08qk36weGWU77qzTZ5A8EF-1Uw",
  authDomain: "kalinowski-fotografia.firebaseapp.com",
  projectId: "kalinowski-fotografia",
  appId: "1:745974561611:web:b10a1a872c277c8c5646ce",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);