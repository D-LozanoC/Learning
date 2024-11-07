import { SECRET_JWT_KEY } from "../config.js";
import jwt from 'jsonwebtoken'

export const getCookieToken = (req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const data = jwt.verify(token, SECRET_JWT_KEY)
        req.session.user = data;
    } catch { }

    next();
}