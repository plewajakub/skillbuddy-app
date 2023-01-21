import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {signOut, updateCurrentUser, updatePassword, user} from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie'

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../config';
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  createUserWithEmailAndPassword,

} from 'firebase/auth';

import { Observable, of} from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { User } from './user.model'
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    this.user$ = this.afAuth.authState.pipe(
      mergeMap(user => {
        if (!user) {
          return of(null);
        }else {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
      })
    )
  }

  async googleSignIn() {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth();
    firebase.auth().useDeviceLanguage();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const userInfo = result.user;
        userInfo.metadata.lastSignInTime;
        const googleInfo = {
          "accessToken": credential?.accessToken || "undefined",
          "secret": credential?.secret,
          "uid": userInfo.uid,
          "email": userInfo.email,
          "displayName": userInfo.displayName,
          "photoURL": userInfo.photoURL,
        };
        if(!userInfo.emailVerified) {
          this.router.navigate(
            ['/'],
            { queryParams: { emailVerified: '0' } }
          )
        } else {
          this.router.navigate(['/home'])
        }
        setCookie('googleInfo', JSON.stringify(googleInfo), {expires: 420});
        console.log(googleInfo)
      }).catch((error) => {
        return {
          'code': error.code,
          'message': error.message,
          'email': error.customData.email,
          'credential': GoogleAuthProvider.credentialFromError(error)
        }
    })
  }
  signOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      if(getCookie('googleCreds') != undefined) {
        removeCookie('googleCreds');
      }
      if(getCookie('facebookCreds') != undefined) {
        removeCookie('facebookCreds');
      }
      return this.router.navigate(['/']);
    }).catch((error) => {
      return error.code
    });
  }

  async facebookSignIn() {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth();
    firebase.auth().useDeviceLanguage();
    const provider = new FacebookAuthProvider();
    provider.setCustomParameters({'display': 'popup'});
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const facebookCreds = {
          "accessToken": credential?.accessToken,
          "secret": credential?.secret,
          "user": result.user,
        };
        setCookie('facebookCreds', JSON.stringify(facebookCreds));
      }).catch((error) =>{

    })
  }
}
