const jwt = require('jsonwebtoken');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) 
        {
            logger.warn("Token não fornecido" + req);    
            return res.status(401).json({ error: "Token não fornecido" }); 
        }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        logger.warn(error);
        return res.status(403).json({ error: 'Token inválido' });
    }
}