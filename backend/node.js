const express = require("express");
const helmet = require("helmet"); 
const cors = require("cors");   
const nodemailer = require("nodemailer");
require("dotenv").config()
const app = express();
const port = 3001;


transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.post("/newsletter", async (req, res) => {
    const { nom, email } = req.body;
    console.log(nom, email);

    try {
        let info = await transporter.sendMail({
            from: "maigaladji47@gmail.com", 
            to: email,
            subject: "Merci pour votre inscription à la newsletter !", 
            html: `
            <h1>Bienvenue ${email}!</h1>
            <p>Merci de vous être inscrit</p>
        `, attachments: [
            {
                filename: 'newsletter.png', 
                path: '../icons/Newsletter.pdf'
            }
        ]
        });

        console.log("Email sent: ", info.response); 
        res.json({ message: "Inscription réussie", nom, email });
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
