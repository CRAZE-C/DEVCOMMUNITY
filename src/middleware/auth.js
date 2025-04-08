const adminAuth = (req, res, next) => {
    const adminName = "dharan";
    const authCheck = adminName === "dharan";
    if (authCheck)
        next();
    else
        res.status(401).send("Unauthorized Entry!!!");
}

const userAuth = (req, res, next) => {
    const userName = "Raj";
    const authCheck = userName === "Raj";
    if (authCheck)
        next();
    else
        res.status(401).send("Unauthorized Entry!!!");
}

module.exports = {
    adminAuth,
    userAuth,
}