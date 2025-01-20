import "reflect-metadata";

import express from "express";
import adsRouter from "./routes/ads.routes"
import categoriesRouter from "./routes/categories.routes"
import tagsRouter from "./routes/tags.routes"
import datasource from "./lib/datasource";


const app = express();

app.use(express.json());

app.use("/ads", adsRouter);
app.use("/categories", categoriesRouter)
app.use("/tags", tagsRouter)

app.listen(4000, async () => {
    await datasource.initialize();
    console.log("Server is launched on port 4000")
})

