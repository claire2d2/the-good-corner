import "reflect-metadata";
import 'module-alias/register'

import { ApolloServer } from "../node_modules/@apollo/server/dist/esm/ApolloServer";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";


// Resolvers define how to fetch the types defined in your schema.
// This resolver retrieves books from the "books" array above.


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
async function main() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    
  });
  console.log(`🚀  Server ready at: ${url}`);
}
main();

// import express from "express";
// import adsRouter from "./routes/ads.routes";
// import categoriesRouter from "./routes/categories.routes";
// import tagsRouter from "./routes/tags.routes";
// import datasource from "./lib/datasource";
// import cors from "cors";
// import path from "path";

// const app = express();

// app.use(cors({ origin: ["http://localhost:5173"] })); // on autorise le front à communiquer avec notre back
// app.use(express.json());
// app.use("/uploads", express.static(path.join(__dirname, "..", "uploads"))); // on expose à l'extérieur notre dossier uploads (http://localhost:4000/uploads)

// app.use("/ads", adsRouter);
// app.use("/categories", categoriesRouter);
// app.use("/tags", tagsRouter);

// app.listen(4000, async () => {
//   await datasource.initialize(); //initialisation de la base de données
//   console.log("Le serveur est lancé sur le port 4000");
// });