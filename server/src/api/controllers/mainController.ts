import {
  ConnectedSocket,
  OnConnect,
  SocketController,
  SocketIO,
} from "socket-controllers";
import { Socket, Server } from "socket.io";

@SocketController()
export class MainContainer {
  @OnConnect()
  public connect(@ConnectedSocket() socket: Socket, @SocketIO() io: Server) {
    console.log("New Socket Connected : ", socket.id);
  }
}
