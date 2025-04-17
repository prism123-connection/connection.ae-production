const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { Server } = require("socket.io");

console.log("👀 Starting server setup...");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
console.log(handle)

try {
  app
    .prepare()
    .then(() => {
      console.log("✅ Next.js app prepared");

      const server = createServer((req, res) => {
        try {
          const parsedUrl = parse(req.url, true);
          handle(req, res, parsedUrl); // Delegate requests to Next.js
        } catch (err) {
          console.error("❌ Error handling request:", err);
          res.statusCode = 500;
          res.end("Internal Server Error");
        }
      });

      const io = new Server(server, {
        path: "/api/socket_io",
      });

      io.on("connection", (socket) => {
        console.log("🔌 New socket connection:", socket.id);

        socket.on("join-room", (roomId) => {
          console.log(`👥 User ${socket.id} joined room: ${roomId}`);
          socket.join(roomId);
          socket.to(roomId).emit("user-joined", socket.id);
        });

        socket.on("offer", (data) => {
          console.log("📡 Offer received:", data);
          socket.to(data.room).emit("offer", data);
        });

        socket.on("answer", (data) => {
          console.log("🎤 Answer received:", data);
          socket.to(data.room).emit("answer", data);
        });

        socket.on("ice-candidate", (data) => {
          console.log("❄️ ICE candidate:", data);
          socket.to(data.room).emit("ice-candidate", data);
        });
      });

      server.listen(3000, () => {
        console.log("> 🚀 Server ready at http://localhost:3000");
      });
    })
    .catch((err) => {
      console.error("❌ Next.js app.prepare() failed:", err);
    });
} catch (err) {
  console.error("❌ Fatal error during server setup:", err);
}
