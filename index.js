const nodemailer = require("nodemailer");
const dotenv = require('dotenv')
const {google} = require('googleapis');


dotenv.config();  // getting all env keys from here

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const RIDERECT_URI ='https://developers.google.com/oauthplayground';
const oAuth2Client =  new google.auth.OAuth2(CLIENT_ID,CLIENT_SECRET,RIDERECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN })       //Creating access Token freshly using refresh token



async function sendMail() {
 
    try {
        const accessToken = await oAuth2Client.getAccessToken();

        const transport = nodemailer.createTransport({
            service :'gmail',
            auth:{
                type:'OAuth2',
                user:'bulkemailtool@gmail.com',
                clientId:CLIENT_ID,
                clientSecret:CLIENT_SECRET,
                refreshToken:REFRESH_TOKEN,
                accessToken:accessToken
            }
        })
        
        // send mail with defined transport object
        const mailOptions={
            from:'Karthik👻 <bulkemailtool@gmail.com>',
            to: "kk202122@gmail.com, kalam1993@gmail.com", // list of receivers
            subject: "Hello ", // Subject line
            text: "Hello world?", // plain text body
            html: "<b>Hello world?</b>", // html body
        }

        const result = await transport.sendMail(mailOptions)
        return result
    } catch (error) {
        return error;
    }
  }
  
sendMail().then(result => console.log('Email Sent ', result))
.catch((error)=>console.log(error.message))