import { Component,Input,  OnInit, AfterViewInit } from '@angular/core';
import { ChatService } from '../chat.service';
import { AuthserviceService } from '../authservice.service';
@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  //container:HTMLElement;
  currentUser: any;
  message:string;
  room:string;
  flag:number=0;
  messageArray: Array<{user:String,message:String}>= [];
  constructor(private chatService: ChatService ,private authenticationService: AuthserviceService) {
    this.currentUser = this.authenticationService.currentUserValue();
    this.chatService.getMessages().subscribe((data) => {
      this.messageArray.push(data);
    });
    this.chatService.joinMessage().subscribe((data) => {
      this.messageArray.push(data);
    });
    this.chatService.leaveMessage().subscribe((data) => {
      this.messageArray.push(data);
    });
   }
  
   ngOnInit() {         
    
  }
  // ngAfterViewInit()
  // {
  //   this.container = document.getElementById("msgContainer");           
  //   this.container.scrollTop = this.container.scrollHeight;   
  // }
 
  sendMessage() {
    if(!this.message)
    {
      alert("Please Enter the Message to Send");
    }
    if(this.room)
    {
    this.chatService.sendMessage({user:this.currentUser,message:this.message,room:this.room});
    this.message = ''; 
    }
    else{
      alert("You need to join the group first !");
    }
  }
  async join()
  {
    if(this.flag==0 && this.room){
    await this.chatService.joinRoom({user:this.currentUser.name,room:this.room});
    this.flag=1;
  }
    if(this.flag==1){
    alert("You have joined the room :"+this.room);
    }
    else{
      alert("Please select the room !");

    }
  }
  async leave()
  {
    if(this.flag==1){
    await this.chatService.leaveRoom({user:this.currentUser.name,room:this.room});
      this.flag=0;
      alert("You have left the room : "+this.room);
    }
    else{
      alert("You need to join the group first !");
    }
  }
  // updateRoom(roomname){
  // let roomlist=[];
  // roomlist.concat(roomname);
  // if(roomlist){
  //     alert("You first need to leave the room : "+roomlist[1]);
  //   }
  // }
}