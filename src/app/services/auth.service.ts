import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { signOut, updateCurrentUser, updatePassword } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';

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

  async googleSignin() {
    const firebaseApp = initializeApp(firebaseConfig);
    const auth = getAuth();
    firebase.auth().useDeviceLanguage();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const uid = result.user.uid;
        const email = result.user.email;
      }).catch((error) => {
        return {
          'code': error.code,
          'message': error.message,
          'email': error.customData.email,
          'credential': GoogleAuthProvider.credentialFromError(error)
        }
    })
  }
  googleSignOut() {
    const auth = getAuth();
    signOut(auth).then(() => {
      sessionStorage.clear();
      return this.router.navigate(['/']);
    }).catch((error) => {
      return error.code
    });
  }

  // async facebookSignIn() {
  //
  // }
}
