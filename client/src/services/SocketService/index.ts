import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

class SocketService {
  public socket: Socket | null = null;
  public connect = (
    url: string
  ): Promise<Socket<DefaultEventsMap, DefaultEventsMap>> => {
    return new Promise((resolve, reject) => {
      this.socket = io(url);
      this.socket.on("connect", () => {
        resolve(this.socket as Socket);
      });

      this.socket.on("connect_error", (err) => {
        reject(err);
      });
    });
  };

}

export default new SocketService();
