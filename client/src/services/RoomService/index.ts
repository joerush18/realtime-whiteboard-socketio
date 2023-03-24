import { Socket } from "socket.io-client";

class RoomService {
  public async joinRoom(
    socket: Socket,
    roomId?: string,
    username?: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      socket.emit("join", { roomId, username }, (response: any) => {
        if (response) {
          resolve(response);
        }
      });
      socket.on("join_error", (data: any) => {
        if (data) {
          reject(data);
        }
      });
    });
  }

  public async newUserAdded(socket: Socket): Promise<any> {
    return new Promise((resolve, reject) => {
      socket.on("new_join", (data: any) => {
        if (data) {
          resolve(data);
        }
      });
    });
  }

  public async disconnect(
    socket: Socket,
    roomId?: string,
    username?: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      socket.emit("disconnected", { roomId, username }, (res: any) => {
        if (res) {
          resolve(res);
        } else {
          reject(reject);
        }
      });
    });
  }

  public async onUserDisconnected(socket: Socket): Promise<any> {
    return new Promise((resolve, reject) => {
      socket.on("leave", (data: any) => {
        if (data) {
          resolve(data);
        } else {
          reject(reject);
        }
      });
    });
  }
}

export default new RoomService();
