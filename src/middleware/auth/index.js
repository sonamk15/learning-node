const jwt = require('jsonwebtoken');

const createJwtToken = (data) => {
    return jwt.sign(data, process.env.JWT_SECRET_KEY, {expiresIn:'1d'})
} 

const authToken = (req, res, next) => {
    const authHeader = req.headers["x-access-token"] || req.headers["authorization"];
    let token = authHeader && authHeader.length > 0 ? authHeader.split(" ")[1] : null;
    if (!token && req.query.token) {
        token = req.query.token;
      }
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, userCtx) => {
        if (err) return res.sendStatus(403);
        req.userCtx = userCtx
        next()
    })  
}

module.exports = {
    createJwtToken,
    authToken
}