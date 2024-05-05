import { mongoose } from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

mongoose.connect(process.env.MONGODB_CONNECTION_STRING)

const UserSchema = new mongoose.Schema({
    username: String,
    email: String
})

const User = mongoose.model('User', UserSchema)

export { User }