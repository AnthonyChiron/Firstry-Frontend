import { environment } from './../../../../environments/environment';
// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  private socket: Socket;
  private url = environment.socketIOUrl; // URL de votre serveur, à ajuster selon votre configuration

  constructor() {
    this.socket = io(this.url);
  }

  public connect() {
    this.socket.connect();
    console.log('Connected to socket');
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

  public updateNbPools(nbPools: number) {
    this.emitEvent('updateNbPools', nbPools);
  }

  public updateCurrentPool(pool: any) {
    this.emitEvent('updateCurrentStep', pool);
  }

  public updateCurrentRiders(riders: any) {
    this.emitEvent('updateCurrentRiders', riders);
  }

  public updateCurrentRider(rider: any) {
    this.emitEvent('updateCurrentRider', rider);
  }

  public updateWaitingTimer(timer: any) {
    this.emitEvent('updateWaitingTimer', timer);
  }

  public startWaitingTimer() {
    this.emitEvent('callToWaitingStartTimer', '');
  }

  public stopWaitingTimer() {
    this.emitEvent('callToWaitingStopTimer', '');
  }

  public resetWaitingTimer() {
    this.emitEvent('callToWaitingResetTimer', '');
  }

  public updateCurrentStepFormat(stepFormat: any) {
    this.emitEvent('updateCurrentStepFormat', stepFormat);
  }

  public updateCurrentTimer(timer: any) {
    this.emitEvent('updateCurrentTimer', timer);
  }

  public updateIsWaitingDisplayed(isDisplayed: any) {
    this.emitEvent('updateIsWaitingDisplayed', isDisplayed);
  }

  public updateIsMainDisplayed(isDisplayed: any) {
    this.emitEvent('updateIsMainDisplayed', isDisplayed);
  }

  public startTimer() {
    this.emitEvent('callToStartTimer', '');
  }

  public stopTimer() {
    this.emitEvent('callToStopTimer', '');
  }

  public resetTimer() {
    this.emitEvent('callToResetTimer', '');
  }
}
