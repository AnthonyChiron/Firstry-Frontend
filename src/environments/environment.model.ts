/** Forme commune des objets `environment` (remplacements fileReplacements Angular). */
export interface FirstryEnvironment {
  production: boolean;
  /** Si true, l’overlay /live-assets affiche le bloc principal sans attendre le toggle live. */
  liveAssetsDefaultMainVisible: boolean;
  backendUrl: string;
  socketIOUrl: string;
  stripe_public_key: string;
  firebaseConfig: {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
  };
}
