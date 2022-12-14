const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const formatMessage = require("./utils/message");
const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");
const db = require("./config/connection");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 3001;
const app = express();

// dependencies for socket.io
const server = require("http").createServer(app);
// const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets

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
// Starting Apollo Server
const startApolloServer = async (typeDefs, resolvers) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: authMiddleware,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  //Opening MongoDB database
  db.once("open", () => {
    const server = app.listen(PORT, () =>
      console.log(`🌍 Now listening on localhost:${PORT}`)
    );
    const io = require("socket.io")(server);
    // Connecting Socket IO
    io.on("connection", (socket) => {
      // Welcome current user
      socket.emit("message",  formatMessage('Admin', 'Welcome to Chat'));

      // Broadcast when a user connects
      socket.broadcast.emit("message", formatMessage('ChatBott', 'A user has joined the chat'));

      // Listen for ChatMessage
      socket.on("chatMessage", (msg) => {
        socket.emit("message", formatMessage("USER", msg));
      });

      // Broadcast when a user disconnect
      socket.on("disconnect", () => {
        io.emit("message", "A user has left the chat");
      });
    });
  });
};

startApolloServer(typeDefs, resolvers);
