import { Router } from 'express'

import userMiddleware from '../middlewares/user.js'
import { User } from '../db/index.js'

const router = Router()

router.post('/googleLogin', userMiddleware, (req, res) => {
    const { username, email } = req.headers
    if (req.exists) {
        res.status(200).json({ msg: `Welcome ${username}` })
    } else {
        User.create({
            username,
            email
        })
        res.json({ msg: "User Created Successfully" })
    }
})

export default router