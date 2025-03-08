const { Router } = require("express");

const wildCardRouter = Router();

wildCardRouter.all("*", (req, res) => {
    res.status(404).render("error", {
        errorMessage: "You seem lost"
    });
});

module.exports = wildCardRouter;
