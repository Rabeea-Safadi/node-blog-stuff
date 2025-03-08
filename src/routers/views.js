const { Router } = require("express");
const authMiddleware = require("../utils/auth-middleware");
const { blogModel } = require("../utils/database");

const viewsRouter = Router();

viewsRouter.get("/", (req, res) => {
    if (req.session.user) {
        res.redirect("/feed");
        return;
    }
    
    res.render("home");
});

viewsRouter.get("/register", (req, res) => {
    res.render("register");
});

viewsRouter.get("/feed", authMiddleware, async (req, res) => {
    try {
        const userId = req.session.user.id;
        const userBlogs = await blogModel.findAll({
            where: {
                userId
            },
            limit: 5,
            order: [['id', 'DESC']]
        })

        console.log(userBlogs.map(e => e.dataValues))

        res.render("feed", {
            user: req.session.user,
            userBlogs
        });
    } catch (error) {
        res.render("error", {
            errorMessage: error.message ?? "Something went wrong on our end :( <br> Please contact the admin"
        });
    }
});

viewsRouter.get("/add-blog", authMiddleware, (req, res) => {
    res.render("add-blog", {
        user: req.session.user
    });
});

viewsRouter.get("/log-out", authMiddleware, (req, res) => {
    req.session = null;
    res.redirect("/");
});

module.exports = viewsRouter;
