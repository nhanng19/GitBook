const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const path = require("path");
const cors = require("cors");
const nodemailer = require("nodemailer");
const socketServer = require('./socketServer');

const { authMiddleware } = require("./utils/auth");

const { typeDefs, resolvers } = require("./schemas");

const db = require("./config/connection");

const PORT = process.env.PORT || 3001;
const app = express();

require("dotenv").config();


app.use(cors());

// dependencies for socket.io
// const server = require("http").createServer(app);
// const io = require("socket.io")(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
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
    const server = require("http")
      .createServer(app)
      .listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.EMAIL,
        pass: process.env.WORD,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    });

    // transporter.verify((err, success) => {
    //   err
    //     ? console.log(err)
    //     : console.log(`=== Server is ready to take messages: ${success} ===`);
    // });

    // app.post("/Dashboard", function (req, res) {
    //   let mailOptions = {
    //     from: process.env.EMAIL,
    //     to: `${req.body.userData.email}`,
    //     subject: "Gitbook Registration",
    //     text: "Hello there! Welcome to Gitbook! Begin your exciting journey of collaborating with fellow developers now!",
    //   };

      // transporter.sendMail(mailOptions, function (err, data) {
      //   if (err) {
      //     res.json({
      //       status: "fail",
      //     });
      //   } else {
      //     console.log("== Message Sent ==");
      //     res.json({
      //       status: "success",
      //     });
      //   }
      // });
    // });
    // Connecting Socket IO
    // const io = require("socket.io")(server);
    socketServer.registerSocketServer(server);
    
  });
};

startApolloServer(typeDefs, resolvers);
