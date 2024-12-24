import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from "./app/components/nav-bar/nav-bar.component";
import { Subscription } from 'rxjs';
import { NotificationService } from './core/services/notification/notification.service';
import { NotificationCompleteComponent } from "./app/components/notifications/notification-complete/notification-complete.component";
import { NotificationErrorComponent } from "./app/components/notifications/notification-error/notification-error.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, NotificationCompleteComponent, NotificationErrorComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontApp';

  public completeMessages: { id: number; message: string }[] = [];
  public errorMessages: { id: number; message: string }[] = [];

  public Subs:Subscription[]=[];

  constructor(private notificationService: NotificationService) {
    this.Subs[0]=this.notificationService.completeSub.subscribe({
      next: (value) => {
          if (value.length >= 3) {
            const intervalId = setInterval(()=>{
              if(value.length>0){
                this.notificationService.deleteTopMessageComplete(); 
              }else{
                clearInterval(intervalId);  // Detiene el setInterval
              }
            },5000)
            
          } else {
            console.log("El array está vacío");
          }
        this.completeMessages = value;
      },
    });
    this.Subs[1]=this.notificationService.errorSub.subscribe({
      next: (value) => {

        if (value.length >= 3) {
          const intervalId = setInterval(()=>{
            if(value.length>0){
              this.notificationService.deleteTopMessageError(); 
            }else{
              clearInterval(intervalId);  // Detiene el setInterval
            }
          },5000)
          
        } else {
          console.log("El array está vacío");
        }

        this.errorMessages = value;
      },
    });
  }

  ngOnDestroy(): void {
    this.Subs[0].unsubscribe()
    this.Subs[2].unsubscribe()
  }

  onDestroyElementComplete(id: number) {
    this.notificationService.deleteMessageCompleteById(id);
  }

  onDestroyElementError(id: number) {
    this.notificationService.deleteMessageErrorById(id);
  }
}
