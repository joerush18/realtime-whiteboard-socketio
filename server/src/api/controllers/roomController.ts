import { ConnectedSocket, MessageBody, OnDisconnect, OnMessage, SocketController, SocketIO } from "socket-controllers";
import { Socket, Server } from "socket.io";

interface MessageBody {
    roomId?: string
    username?: string
}

type TuserSocketMap = { [key: string]: string }

interface TClient {
    socketID: string
    username: string
}


@SocketController()
export class RoomController {
    public userSocketMap: TuserSocketMap = {};
    private getConnectedClients = (roomId: string, io: Server) : TClient[] => {
        const clients = Array.from(io.sockets.adapter.rooms.get(roomId) || []).map((socketID) => {
            return {
                socketID,
                username: this.userSocketMap[socketID],
            }
        });
        return clients;
    }


    @OnMessage("join")
    public join(@MessageBody() data: MessageBody, @ConnectedSocket() socket: Socket, @SocketIO() io: Server) {
        try {
            this.userSocketMap[socket.id] = data.username;
            socket.join(data.roomId);
            const clients = this.getConnectedClients(data.roomId, io);
            console.log(clients);
            clients.forEach(({ socketID }) => {
                io.to(socketID).emit("new_join", { clients, username: data.username, socketID});
            });
        } catch (error) {
            io.to(socket.id).emit("join_error", { error });
        }
    }

    @OnMessage("disconnected")
    @OnDisconnect()
    public disconnect(@MessageBody() data : MessageBody,  @ConnectedSocket() socket: Socket, @SocketIO() io: Server) {
        socket.leave(data.roomId);
        const clients = this.getConnectedClients(data.roomId , io).filter(({socketID}) => socketID !== socket.id);
        clients.forEach(({socketID}) => {
            io.to(socketID).emit("leave", {clients , username: data.username, socketID: socket.id});    
        });
    }
}
