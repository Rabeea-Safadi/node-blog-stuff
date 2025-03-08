const { Router } = require("express");
const { userModel } = require("../utils/database");

const authRouter = Router();

authRouter.post("/login", async (req, res) => {
    try {
        const username = req.body.username ?? null;
        const password = req.body.password ?? null;

        if (!username || !password) {
            res.status(406).render("error", {
                errorMessage: "Username and password required fields"
            });
            return;
        }

        let user = await userModel.findOne({
            where: {
                username,
                password
            }
        });

        if (user == null) {
            res.status(404).render("error", {
                errorMessage: "User not found"
            });
            return;
        }

        delete user.dataValues.password;
        delete user.dataValues.updatedAt;
        
        req.session.user = user;
        res.redirect("/feed");
    } catch (error) {
        res.status(404).render("error", {
            errorMessage: error.message ?? "We are facing issues at our end <br> Please check back soon or contact the admin!"
        });
        return;
    }
});

authRouter.post("/register", async (req, res) => {
    try {
        const username = req.body.username ?? null;
        const password = req.body.password ?? null;

        if (!username || !password) {
            res.status(406).render("error", {
                errorMessage: "Username and password required fields"
            });
            return;
        }

        const user = await userModel.findOne({
            where: {
                username
            }
        });

        if (user != null) {
            res.status(401).render("error", {
                errorMessage: "Username already exists"
            });
            return;
        }

        const newUser = await userModel.create({
            username,
            password
        });

        delete newUser.dataValues.password;
        delete newUser.dataValues.updatedAt;
        
        req.session.user = newUser;
        res.redirect("/feed");
    } catch (error) {
        res.status(404).render("error", {
            errorMessage: error.message ?? "We are facing issues at our end <br> Please check back soon or contact the admin!"
        });
        return;
    }
});

module.exports = authRouter;
