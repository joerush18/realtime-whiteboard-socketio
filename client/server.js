const ACTIONS = require("./src/actions");

const app = require("express")();
const server = require("http").createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const userSocketmap = {};
function getAllConnectedClients(roomID) {
  return Array.from(io.sockets.adapter.rooms.get(roomID) || []).map(
    (socketID) => {
      return {
        socketID,
        username: userSocketmap[socketID],
      };
    }
  );
}

io.on("connection", (socket) => {
  console.log("Socket connected : ", socket.id);
  socket.on(ACTIONS.JOIN, ({ roomID, username }) => {
    // key: socketid  value: username  => { socketid : username }
    userSocketmap[socket.id] = username;
    // join certain id
    socket.join(roomID);
    console.log(`${roomID} joined by socket : ${socket.id}`);
    //  get clients connected to the room
    const clients = getAllConnectedClients(roomID);
    console.log(clients);

    // for all sockets emit and Action and pass the values.
    clients.forEach(({ socketID }) => {
      io.to(socketID).emit(ACTIONS.JOINED, {
        clients,
        username,
        socketID: socket.id,
      });
    });
  });

  socket.on("disconnecting", () => {
    const rooms = [...socket.rooms];
    rooms.forEach((roomID) => {
      socket.in(roomID).emit(ACTIONS.DISCONNECTED, {
        socketID: socket.id,
        username: userSocketmap[socket.id],
      });
    });
    delete userSocketmap[socket.id];
    socket.leave();
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Listening on PORT:", PORT);
});
