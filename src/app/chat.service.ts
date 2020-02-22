import * as io from 'socket.io-client';
import {Injectable} from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
}
)

export class ChatService {
    private url = 'https://chattingdash.herokuapp.com';
    private socket=io(this.url);
    public sendMessage(data:any) {
        //alert(JSON.stringify(data));
        this.socket.emit('message', data);
    }
    getMessages () {
        let observable=new Observable<{user:String, message:String}>(observer=> {
            this.socket.on('message', (data) => {
                if(data.message)
                {
                observer.next((data));
                }
            });
            return ()=>{this.socket.disconnect();}
        });
        return observable;
    }
    joinRoom(data:any) {
        this.socket.emit('join',data);
    }
    joinMessage () {
        let observable=new Observable<{user:String, message:String}>(observer=> {
            this.socket.on('new user joined', (data) => {
                observer.next((data));
            });
            return ()=>{this.socket.disconnect();}
        });
        return observable;
    }
    leaveRoom(data:any) {
        this.socket.emit('leave',data);
    }
    leaveMessage () {
        let observable=new Observable<{user:String, message:String}>(observer=> {
            this.socket.on('left room', (data) => {
                observer.next((data));
            });
            return ()=>{this.socket.disconnect();}
        });
        return observable;
    }
}