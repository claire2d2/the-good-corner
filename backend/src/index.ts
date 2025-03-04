import express from "express";
import adsRouter from "./routes/ads.routes"

const app = express();

app.use(express.json());

app.use("/ads", adsRouter);

app.listen(4000, () => {
    console.log("Server is launched on port 4000")
})