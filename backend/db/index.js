import { mongoose } from 'mongoose'

import { MONGODB_CONNECTION_STRING } from '../environments/environment.js'

mongoose.connect(MONGODB_CONNECTION_STRING)

const UserSchema = new mongoose.Schema({
    username: String,
    email: String
})

const User = mongoose.model('User', UserSchema)

export { User }