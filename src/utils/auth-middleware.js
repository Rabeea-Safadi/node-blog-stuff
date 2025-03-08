function authMiddleware(req, res, next) {
    if (req.session.user == undefined) {
        res.redirect("/")
        return;
    }

    next();
}

module.exports = authMiddleware;