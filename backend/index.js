import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
// import "dotenv/config";
import { configDotenv } from "dotenv";

configDotenv();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({
    origin: "*",  // Replace with your actual frontend URL
    methods: "GET,POST,PUT,DELETE",  // Specify allowed HTTP methods
    credentials: true,  // If you are dealing with cookies or sessions
}));



app.post("/sendMail", (req, res) => {

    console.log(process.env.user_ID);
    console.log(process.env.pass_);

    try {

        const { name, email, message } = req.body;
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.user_ID,
                pass: process.env.pass_,
                
            }

        });

        const msg = {
            from: process.env.user_ID,
            to: process.env.user_ID,
            subject: "General Enquiry from the website visitor",
            text: `A visitor named ${name}, email ${email}, tried to contact you and sent a message: ${message}`
        };

        transporter.sendMail(msg).then((response) => {
            res.json({ "message": "Email sent successfully" });
        }).catch((error) => {
            res.json({ "message": "Message was not sent, Try again later" });
        });

    } catch (err) {  // Fixed the catch block
        console.log(err);
        res.status(500).json({ "message": "An internal error occurred" });  // Respond with error
    }
});


app.listen(6006, () => {
    console.log("Server Started at port 6006");
});
