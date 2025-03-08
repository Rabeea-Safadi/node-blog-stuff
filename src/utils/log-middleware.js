function logMiddleware(req, res, next) {
    console.log("======== Session ========");
    console.log(req.session);
    console.log("=========================");

    next();
}

module.exports = logMiddleware;