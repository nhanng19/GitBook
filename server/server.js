const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');

const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const sendEmail = require('./utils/sendEmail');
const dotenv = require("dotenv").config();
// const bodyParser = require("body-parser");
// const cors = require("cors");

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// app.use(bodyParser.json());
// app.use(cors());

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// app.post("/api/sendemail", async (req, res) => {
//     const {email} = req.body;

//     try {
//         const send_to = email;
//         const sent_from = process.env.EMAIL_USER;
//         const reply_to = email;
//         const subject = "Thank you for signing up!";
//         const message = `
//             <h2>Hello and welcome to Gitbook!</h2>
//             <p>We wish you the best experience when you begin your journey collaborating with fellow developers!</p>
//         `
//         await sendEmail(subject, message, send_to, sent_from, reply_to)
//         res.status(200).json({ message: "Email sent!" })
//     } catch (error) {
//         res.status(500).json(error.message);
//     }
// });

const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  startApolloServer(typeDefs, resolvers);
