[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![MIT License][license-shield]][license-url]

# GITBOOK 📚
Social Content Management System

## INTRODUCTION

Want an easy way to chat and collaborate with other developers? Tired of switching applications while working? Welcome to a GitBook, a perfect combination of Github, Facebook, and Slack! GitBook is an application that allows you to instantly connect to your Github account and chat/work with other Gitbook users. We wanted to create an efficient way for users to view Github repositories and chat with other users on various projects, while being able to assign specific roles on the projects.

![](./assets/landing.png)

## INSTALLATION

You can start collborating with like minded invdividuals by creating an account on our deployed website here.

### TO RUN LOCALLY
1. Clone/download the code in this repo
2. Navigate to the location of the code downloaded in your terminal
3. Rename ".env.EXAMPLE" to ".env"
4. Input API keys
6. Run the following command in your terminal (make sure you're in the root directory of the application)
```git
npm i && npm run develop
```

## TECHNOLOGY

### GitHub Repositories API
GitHub API makes it possible for us to connect your GitBook account to GitHub. You can keep all of your Github repositories and any other projects that you might have in one organized space! We also notify which project is in urgent need of your contribution as well. 

![](./assets/github.png)

### MongoDB and Mongoose
MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. This powerful database stores all GitBook projects, creating an open-source platform for all GitBook users to participate and contribute. 
![](/assets/mongo.png)

### GraphQL and Apollo
GraphQL is a query language for APIs and a runtime for fulfilling those queries with existing data. GraphQL provides a complete and understandable description of the data in any API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools. With organized queries, we were able to write functional mutation for our kanban board.
![](/assets/kanban.png)

### Socket.io
Socket.IO is an event-driven library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers. Socket.io allows GitBook to host multiple rooms for each unique projects, so you can collaborate real time with others.

![](/assets/chat.png)

### Cloudinary
Cloudinary provides cloud-based image and video management services. It enables users to upload, store, manage, manipulate, and deliver images and video for websites and apps. Gitbook utilizes cloudinary to allow users to personalize their profile picture, oh, and cover picture! 

![](/assets/profile.png)

### Stripe 
 Stripe's payment processing platform includes APIs to accept credit cards, manage subscriptions, send money, run a marketplace. Although GitBook is a non-profit organization, your donation can help us maintain our lightning speed service for you and GitBook users worldwide!

![](/assets/stripe.png)

### Nodemailer 
Nodemailer is a Node.js module that allows us to send emails from our server with ease. We send a welcoming email everytime a user signs up for our service.
```javascript
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

    transporter.verify((err, success) => {
      err
        ? console.log(err)
        : console.log(`=== Server is ready to take messages: ${success} ===`);
    });

    app.post("/Dashboard", function (req, res) {
      let mailOptions = {
        from: process.env.EMAIL,
        to: `${req.body.userData.email}`,
        subject: "Gitbook Registration",
        text: "Hello there! Welcome to Gitbook! Begin your exciting journey of collaborating with fellow developers now!",
      };

      transporter.sendMail(mailOptions, function (err, data) {
        if (err) {
          res.json({
            status: "fail",
          });
        } else {
          console.log("== Message Sent ==");
          res.json({
            status: "success",
          });
        }
      });
    });
```
## COLLABORATORS

[Richard You](https://github.com/yichanyourichard)

[Dat Nguyen](https://github.com/crestatic)

[Lydia Kim](https://github.com/lydiakim10)

[Nhan Nguyen](https://github.com/nhanng19)

## Submission
This project was uploaded to GitHub at the following repository link:
[https://github.com/nhanng19/GitBook/](https://github.com/nhanng19/GitBook/)


[contributors-shield]: https://img.shields.io/github/contributors/nhanng19/GitBook.svg?style=for-the-badge
[contributors-url]: https://github.com/nhanng19/GitBook/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/nhanng19/GitBook.svg?style=for-the-badge
[forks-url]: https://github.com/nhanng19/GitBook/network/members
[stars-shield]: https://img.shields.io/github/stars/nhanng19/GitBook.svg?style=for-the-badge
[stars-url]: https://github.com/nhanng19/GitBook/stargazers
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
