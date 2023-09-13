import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HandleErrorService {
  constructor() {}

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Une erreur côté client ou un problème de réseau s'est produit.
      console.error("Une erreur s'est produite:", error.error.message);
    } else {
      // Le backend a renvoyé un code d'échec.
      console.error(
        `Le serveur a renvoyé le code ${error.status}, ` +
          `corps de la réponse: ${error.error}`
      );
    }
    return throwError(
      () => "Quelque chose de mal s'est passé; veuillez réessayer plus tard."
    );
  }
}
