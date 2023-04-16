import { Socket } from "socket.io-client";

class CanvasController {
  public async draw(socket: Socket, data: any) {
        socket.emit("draw", data );
  }

  public async drawUpdate(socket: Socket): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        socket.on("draw_update", (data: any) => {
          if (data) {
            resolve(data);
          } else {
            reject("Error while loading");
          }
        });
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new CanvasController();
