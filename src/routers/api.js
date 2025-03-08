const { Router } = require("express");
const { blogModel } = require("../utils/database");
const authMiddleware = require("../utils/auth-middleware");

const apiRouter = Router();

apiRouter.post("/create-blog", authMiddleware, async (req, res) => {
    try {
        const blogTitle = req.body.blogTitle ?? null;
        const blogContent = req.body.blogContent ?? null;

        if (!blogTitle) {
            res.status(406).render("error", {
                errorMessage: "Blog title is a required field"
            });
            return;
        }

        await blogModel.create({
            blogTitle,
            blogContent,
            userId: req.session.user.id
        });

        res.redirect("/feed");
    } catch (error) {
        res.status(404).render("error", {
            errorMessage: error.message ?? "We are facing issues at our end <br> Please check back soon or contact the admin!"
        });
        return;
    }
})

module.exports = apiRouter;