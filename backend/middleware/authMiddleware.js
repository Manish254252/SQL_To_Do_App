module.exports = (req, res, next) => {
    if(req.url==='/creatUser'){
        return next();
    }
    if (!req.session.user) {
        return res.status(401).json({ message: "Unauthorized access" });
    }
    next();
};
