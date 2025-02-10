// Dependency: Express.js, Nodemon
// Start Server Run: npm run dev
// Game Start URL: http://localhost:8080/game


const express = require("express");
const app = express();

// --------------------------------------------
const path = require("path");
// --------------------------------------------

app.use(express.static("public"));

// Game Page
const gamePageRoute = require("./routes/game/game-route.js");
app.use(gamePageRoute);

// Page not Found
const pageNotFoundRoute = require("./routes/page-not-found/page-not-found-route.js");
app.use(pageNotFoundRoute);

app.listen(8080);