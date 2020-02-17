import * as io from 'socket.io-client';
import {Injectable} from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
}
)

export class ChatService {
    private url = 'http://localhost:3000';
    private socket=io(this.url);
    public sendMessage(data) {
        this.socket.emit('message', data);
    }
    getMessages () {
        let observable=new Observable<{user:String, message:String}>(observer=> {
            this.socket.on('message', (data) => {
                observer.next((data));
            });
            return ()=>{this.socket.disconnect();}
        });
        return observable;
    }
}