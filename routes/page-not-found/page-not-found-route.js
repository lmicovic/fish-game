const express = require("express");
const router = express.Router();
const path = require("path")

router.use((request, response, next) => {
    
    response.status(404).sendFile(path.join(__dirname, "../../", "views", "page-not-found", "page-not-found.html"));

});

module.exports = router;