import { NODE_ENV, SECRET_JWT_KEY } from '../config.js';
import { validateUser } from '../validators/userValidation.js';
import jwt from 'jsonwebtoken'

export class UserController {
    constructor({ userModel }) {
        this.userModel = userModel;
    }

    root = (req, res) => {
        const { user } = req.session
        res.render('index', user)
    }

    login = async (req, res) => {
        const result = validateUser(req.body)
        if (!result.success) return res.status(400).json(result.error);


        try {
            const user = await this.userModel.login(result.data)
            if (user.error) return res.status(400).json(user.error);
            const token = jwt.sign({ id: user._id, username: user.username }, SECRET_JWT_KEY, {
                expiresIn: '1h',
            })
            res
                .cookie('access_token', token, {
                    httpOnly: true,  // La cookie solo se puede acceder desde el servidor
                    secure: NODE_ENV !== 'production', // La cookie solo se puede acceder en https
                    sameSite: 'strict', // La cookie solo se puede acceder en el mismo dominio
                    maxAge: 1000 * 60 * 60 // la cookie tinee un tiempo de validez de 1 hora
                })
                .send(user)
        } catch (error) {
            res.status(401).send("Invalid username or password")
        }
    }

    register = async (req, res) => {
        const result = validateUser(req.body)
        if (!result.success) return res.status(400).json({ error: JSON.parse(result.error) });

        try {
            const id = await this.userModel.create(result.data)
            if (id.error) return res.status(404).json(id.error);
            res.send(id);
        } catch (error) {
            res.status(400).send('Error to create user');
        }
    }

    logout = (req, res) => {
        res
            .clearCookie('access_token')
            .end()
    }

    protected = (req, res) => {
        const { user } = req.session
        if (!user) return res.status(401).send('Unauthorized');
        res.render('protected', user)
    }

}