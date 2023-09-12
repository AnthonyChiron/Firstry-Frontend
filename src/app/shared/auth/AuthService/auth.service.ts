import { UsersService } from './../../data/UsersService/users.service';
import { SignUpModel } from 'src/app/models/signUp.model';
import { Injectable } from '@angular/core';
import { CredentialsModel } from 'src/app/models/credentials.model';
import { UserModel } from 'src/app/models/user.model';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  auth = getAuth();
  constructor(private usersService: UsersService) {}

  signUp(signUpModel: SignUpModel) {
    createUserWithEmailAndPassword(
      this.auth,
      signUpModel.email,
      signUpModel.password
    )
      .then(({ user }) => {
        if (user) {
          let newUser: UserModel = {
            googleId: user.uid,
            email: <string>user.email,
            role: signUpModel.role,
            isValid: user.emailVerified,
          };
          this.usersService.create(newUser).subscribe({
            next: (user) => {
              console.log(user);
            },
            error: (err: firebase.FirebaseError) => {
              console.log(err);
            },
          });
        }
      })
      .catch((result) => console.log(result));
  }

  getCurrentUser() {
    return getAuth().currentUser;
  }

  isLoggedIn() {
    if (getAuth().currentUser) return true;
    return false;
  }

  async login(credentials: CredentialsModel) {
    try {
      await signInWithEmailAndPassword(
        this.auth,
        credentials.email,
        credentials.password
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(userCredential);
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode);
          console.log(errorMessage);
          // ..
        });
    } catch (e) {
      console.log(e);
    }
  }

  logout() {
    return this.auth.signOut();
  }
}
