const express = require("express");
const path = require("path");
const db = require("./config/connection");
const formatMessage = require("./utils/message");

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
const PORT = process.env.PORT || 3001;

// dependencies for socket.io
const server = require("http").createServer(app);
// const io =  require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

app.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntent.create({
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (e) {
    return res.status(400).send({
      error: {
        message: e.message,
      },
    });
  }
});

const startServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  db.once("open", () => {
    const io = require("socket.io")(server);
    io.on("connection", (socket) => {
      // Welcome current user
      socket.broadcast.emit(
        "message",
        formatMessage("ChatBot", "Welcome to Chat")
      );

      // Broadcast when a user connects
      socket.broadcast.emit(
        "message",
        formatMessage("ChatBott", "A user has joined the chat")
      );

      // Listen for ChatMessage
      socket.on("chatMessage", (msg) => {
        socket.broadcast.emit("message", formatMessage("USER", msg));
      });

      // Broadcast when a user disconnect
      socket.on("disconnect", () => {
        io.emit(
          "message",
          formatMessage("ChatBot", "A user has left the chat")
        );
      });
    });

    server.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
  });

  console.log(
    `Use GraphQL at http://localhost:${PORT}${apolloServer.graphqlPath}`
  );
};

startServer();
