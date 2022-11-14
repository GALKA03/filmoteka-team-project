import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  FacebookAuthProvider,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';

const providerG = new GoogleAuthProvider();
const signOut = document.getElementById('sign-out');
const signIn = document.getElementById('sign-in');
const textEl = document.getElementById('firebase-text');

const firebaseConfig = {
  apiKey: 'AIzaSyD7CsEm56jWNDQOKLhPLg-pdR78AzWnp1c',
  authDomain: 'team-project-movie.firebaseapp.com',
  databaseURL:
    'https://team-project-movie-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'team-project-movie',
  storageBucket: 'team-project-movie.appspot.com',
  messagingSenderId: '621199458479',
  appId: '1:621199458479:web:54f2e6677796ea7d8c145a',
  measurementId: 'G-WHTCB43FF1',
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();

onAuthStateChanged(auth, user => {
  if (user) {
    signOut.classList.remove('is-hidden');
    const uid = user.uid;
    signOut.addEventListener('click', onSignOutButton);
    console.log('logIn');
    textEl.classList.remove('is-hidden');
    textEl.textContent = `Hello ${user.displayName}`;
    return user;
  } else {
    textEl.classList.add('is-hidden');
    signIn.classList.remove('is-hidden');
    signIn.addEventListener('click', onSignInButton);
    console.log('logout');
  }
});

function onSignInButton() {
  signInWithPopup(auth, providerG)
    .then(result => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      signIn.classList.add('is-hidden');
      signOut.classList.remove('is-hidden');
      console.log(auth);
    })
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
}

function onSignOutButton() {
  signIn.classList.remove('is-hidden');
  signOut.classList.add('is-hidden');
  auth.signOut();
}
