
const express = require("express");
const router = express.Router();
const path = require("path");

const words = [
    "Shark",
    "Tetra",
    "Gudge",
    "Molly",
    "Salmon",
    "Prawn",
    "Bream",
    "Codex",
    "Manta",
    "Solei",
    "Blenn",
    "Tunny",
    "Fryer",
    "Ruffe",
    "Bongo",
    "Clown",
    "Gudge",
    "Dolly",
    "Fines",
    "Sargo",
    "Fluke",
    "Branz",
    "Surge",
    "Manta",
    "Pesto",
    "Roach",
    "Doral"
];

const util = require("../../my-utils.js");;

router.get("/game/word", (request, response, next) => {

    const rand = util.getRandom(0, words.length-1);
    let word = words[rand];
    
    console.log("Current Fish: " + word);
    
    response.json(word);
    
});

router.get("/game", (request, response, next) => {

    response.sendFile(path.join(__dirname, "../../", "views", "game", "game.html"));

});

module.exports = router;