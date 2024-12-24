import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private complete: BehaviorSubject<{ id: number; message: string }[]>;
  private error: BehaviorSubject<{ id: number; message: string }[]>;
  private completeArray: { id: number; message: string }[] = [];
  private errorArray: { id: number; message: string }[] = [];

  constructor() {
    this.complete = new BehaviorSubject<{ id: number; message: string }[]>([]);
    this.error = new BehaviorSubject<{ id: number; message: string }[]>([]);
  }

  sendCompleteMessage(arg: string) {
    this.completeArray.push({
      id: this.completeArray.length + 1,
      message: arg,
    });
    this.complete.next(this.completeArray);
  }

  sendErrorMessage(arg: string) {
    this.errorArray.push({
      id: this.completeArray.length + 1,
      message: arg,
    });
    this.error.next(this.errorArray);
  }

  get completeSub(): Observable<{ id: number; message: string }[]> {
    return this.complete.asObservable();
  }

  get errorSub(): Observable<{ id: number; message: string }[]> {
    return this.error.asObservable();
  }

  deleteTopMessageComplete(): void {
    if (this.completeArray.length > 0) {
      this.completeArray.shift();
      this.complete.next(this.completeArray);
    }
  }

  deleteMessageCompleteById(id: number): void {
    const index = this.completeArray.findIndex((v) => v.id == id);
    if (index !== -1) {
      this.completeArray.splice(index, 1);
      this.complete.next(this.completeArray);
    }
  }

  deleteTopMessageError() {
    if (this.errorArray.length > 0) {
      this.errorArray.shift();
      this.error.next(this.errorArray);
    }
  }

  deleteMessageErrorById(id: number): void {
    const index = this.errorArray.findIndex((v) => v.id == id);
    if (index !== -1) {
      this.errorArray.splice(index, 1);
      this.error.next(this.errorArray);
    }
  }
}
