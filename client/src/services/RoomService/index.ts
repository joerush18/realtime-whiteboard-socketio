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


  public async leaveRoom(
    socket: Socket,
    roomId?: string,
    username?: string
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      socket.emit("leave", { roomId, username }, (response: any) => {
        if (response) {
          resolve(response);
        }
      });
      socket.on("leave_error", (data: any) => {
        if (data) {
          reject(data);
        }
      });
    });
  }

 public newUserLeft(socket: Socket): Promise<any> {
    return new Promise((resolve, reject) => {
      socket.on("new_leave", (data: any) => {
        if (data) {
          resolve(data);
        }
      });
    });
  }



}

export default new RoomService();
