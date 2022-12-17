// this is for google auth, currently not using for project. 
// const nodemailer = require('nodemailer');

// const { google } = require('googleapis');

// const { OAuth2 } = google.auth;
// const oauth_link = "https://developers.google.com/oauthplayground";
// const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

// const auth = new OAuth2(
//     MAILING_ID,
//     MAILING_REFRESH,
//     MAILING_SECRET,
//     oauth_link
// );

// exports.sendVerificationEmail = (email, name, url) => {
//     auth.setCredentials({
//         refresh_token: MAILING_REFRESH,
//     });
//     const accessToken = auth.getAccessToken();
//     const stmp = nodemailer.createTransport({
//         service: "gmail",
//         auth: {
//             type: "OAuth2",
//             user: EMAIL,
//             clientId: MAILING_ID,
//             clientSecret: MAILING_SECRET,
//             refreshToken: MAILING_REFRESH,
//             accessToken,
//         },
//     });
//     const mailOptions = {
//         from: EMAIL,
//         to: email,
//         subject: "Gitbook email verification",
//         html: ``,
//     };
//     stmp.sendMail(mailOptions, (err, res) => {
//         if (err) return err;
//         return res;
//     })
// }