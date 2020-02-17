import { Component,Input,  OnInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthserviceService } from '../authservice.service';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  currentUser: any;
  message:string;
  messageArray: Array<{user:String,message:String}>= [];
  constructor(private chatService: ChatService ,private authenticationService: AuthserviceService) {
    this.currentUser = this.authenticationService.currentUserValue();
    this.chatService.getMessages().subscribe((data) => {
      this.messageArray.push(data);
    });
   }
  
  ngOnInit() {
 
  }
 
  sendMessage() {
    this.chatService.sendMessage({user:this.currentUser,message:this.message});
    this.message = ''; 
  }
}






 