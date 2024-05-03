import express from "express";
import dbCon from "./utils/db.js";
import routes from "./routes/routes.js"; // Import your routes
import cors from "cors"


const app = express();

// mongodb
dbCon();

// Mount your routes
app.use(express.json());
app.use(cors());
app.use('/', routes);

app.listen(process.env.PORT, "127.0.0.1", () => {
    console.log(`Server is running at http://127.0.0.1:${process.env.PORT}`);
});
