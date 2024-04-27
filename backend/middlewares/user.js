import { User } from '../db/index.js'

const userMiddleware = (req, res, next) => {
    const { username, email } = req.headers

    if (!username || !email) {
        return res.status(400).json({ msg: "Username AND Email are required" })
    }

    User.findOne({
        username,
        email
    })
    .then((value) => {
        req.exists = Boolean(value) // Sets to true or false
        next()
    })
    .catch((err) => {
        console.error(`Error in user middleware: ${err}`)
        res.status(500).json({ msg: "An error occured in userMiddleware" })
    })
}

export default userMiddleware