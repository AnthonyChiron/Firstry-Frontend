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
              localStorage.setItem('currentUser', JSON.stringify(user));
            },
            error: (err) => {
              console.log(err);
            },
          });
        }
      })
      .catch((result) => console.log(result));
  }

  getCurrentUser() {
    if (getAuth().currentUser)
      return JSON.parse(localStorage.getItem('currentUser'));
    else return getAuth().currentUser;
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
        .then(({ user }) => {
          // Signed in
          this.usersService.getByGoogleId(user.uid).subscribe({
            next: (user) => {
              localStorage.setItem('currentUser', JSON.stringify(user));
            },
            error: (err) => {
              console.log(err);
            },
          });
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
    return this.auth
      .signOut()
      .then(() => localStorage.removeItem('currentUser'));
  }
}
