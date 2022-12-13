const express = require("express");
const path = require("path");
const db = require("./config/connection");

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const app = express();
const PORT = process.env.PORT || 3001;

// dependencies for socket.io
const server = require("http").createServer(app);
const io =  require("socket.io")(server);


const startServer = async () => {

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await server.start();
  server.applyMiddleware({ app });
  console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
};

startServer();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

db.once("open", () => {
  server.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
});



io.on("connection", socket => {

  // Welcome current user
  socket.emit('message', 'Welcome to Chat');

  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A user has joined the chat');

  // Broadcast when a user disconnect
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
});
