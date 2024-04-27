import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import multer from 'multer'

import authMiddleware from './middlewares/authMiddleware.js'
import userRouter from './routes/userRoutes.js'

import { PORT } from './environments/environment.js'

const corsOptions = {
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
    credentials: false // Do not allow credentials when using wildcard origins
}

const app = express()

app.use(cors(corsOptions))

// Middleware to parse JSON bodies
app.use(bodyParser.json()); // or app.use(express.json());
// Middleware to parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));
// Middleware to parse multipart/form-data (for file uploads)
app.use(multer().any());

app.use(authMiddleware)

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`SERVER RUNNING ON PORT ${PORT}`)
})