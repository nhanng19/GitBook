const express = require("express");
const path = require("path");
const db = require("./config/connection");
const cors = require('cors');

const { ApolloServer } = require("apollo-server-express");
const { typeDefs, resolvers } = require("./schemas");
const { authMiddleware } = require("./utils/auth");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

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
app.use(cors());


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("/config", (req, res) => {
  res.send ({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  })
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
    })
  }
});

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
