const express = require("express");
const helmet = require("helmet"); 
const cors = require("cors");   
const nodemailer = require("nodemailer");
require("dotenv").config();
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
                <html>
                    <head>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f4f4f4;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                width: 80%;
                                max-width: 600px;
                                margin: 0 auto;
                                background-color: #fff;
                                padding: 20px;
                                border-radius: 10px;
                                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                color: #333;
                                font-size: 24px;
                                margin-bottom: 20px;
                            }
                            p {
                                color: #555;
                                font-size: 16px;
                                line-height: 1.5;
                            }
                            .footer {
                                margin-top: 20px;
                                text-align: center;
                                font-size: 14px;
                                color: #888;
                            }
                            .footer a {
                                color: #007bff;
                                text-decoration: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Bienvenue ${email} !</h1>
                            <p>Merci de vous être inscrit à notre newsletter. Vous recevrez bientôt nos dernières informations et mises à jour !</p>
                            <p>Nous sommes ravis de vous avoir parmi nos abonnés.</p>
                            <div class="footer">
                                <p>Si vous avez des questions, n'hésitez pas à nous contacter.</p>
                                <p><a href="mailto:maigaladji47@gmail.com">Contactez-nous</a></p>
                            </div>
                        </div>
                    </body>
                </html>
            `,
            attachments: [
                {
                    filename: 'newsletter.pdf', 
                    path: '../icons/Newsletter.pdf'
                }
            ]
        });
        
        res.status(200).json({ message: "Inscription réussie et email envoyé." });
    } catch (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ message: "Erreur lors de l'inscription", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Serveur lancé sur le port ${port}`);
});
