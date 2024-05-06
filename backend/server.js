import express from "express";
import dbCon from "./utils/db.js";
import routes from "./routes/routes.js"; // Import your routes
import cors from "cors"
import path from "path"
import session from 'express-session';
import dotenv from 'dotenv';


dotenv.config();

const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET, // Use a secret string for session encryption
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
}));

dbCon();

const __dirname = path.dirname(new URL(import.meta.url).pathname);
// Mount your routes
app.use(express.json());
app.use(cors());
app.use('/', routes);
app.use(express.static('public'));
// app.use('/public/images', express.static(__dirname + '/public/images/'));

app.listen(process.env.PORT, "127.0.0.1", () => {
    console.log(`Server is running at http://127.0.0.1:${process.env.PORT}`);
});
