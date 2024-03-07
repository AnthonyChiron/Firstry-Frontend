// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  private socket: Socket;
  private url = 'http://localhost:3001'; // URL de votre serveur, à ajuster selon votre configuration

  constructor() {
    this.socket = io(this.url);
  }

  public connect() {
    this.socket.connect();
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }

  // Écouter les événements du serveur
  public onEvent<T>(event: string, action: (data: T) => void) {
    this.socket.on(event, action);
  }

  // Envoyer des événements au serveur
  public emitEvent<T>(event: string, data: T) {
    this.socket.emit(event, data);
  }

  public updateCurrentCategory(category: string) {
    this.emitEvent('updateCurrentCategory', category);
  }

  public updateCurrentStep(step: string) {
    this.emitEvent('updateCurrentStep', step);
  }
}
