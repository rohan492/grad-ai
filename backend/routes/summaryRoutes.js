import { Router } from "express";
import multer from 'multer'
import sdk from '@api/preemo'

import { GRADIENT_AUTH_TOKEN, GRADIENT_WORKSPACE_ID } from "../environments/environment.js";

const router = Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({ storage })

router.post('/pdf', upload.single('file'), (req, res) => {
    const file = req.file
    console.log(file.path)
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log(file)
    sdk.auth(GRADIENT_AUTH_TOKEN);
    sdk.extractPdf({file: file.path}, {
        'x-gradient-workspace-id': GRADIENT_WORKSPACE_ID
    })
        .then(({ data }) => {
            const mainText = data.pages.map(page => page.text).join('\n')
            res.json(mainText)
        })
        .catch(err => console.error(err));
})

router.post('/summary', (req, res) => {
    const { extractedTextFromPDF, length } = req.body
    // console.log(extractedTextFromPDF)
    sdk.auth(GRADIENT_AUTH_TOKEN);
    sdk.summarizeDocument({document: extractedTextFromPDF, length}, {
        'x-gradient-workspace-id': GRADIENT_WORKSPACE_ID
    })
        .then(({ data }) => {
            const { summary } = data
            res.json(summary)
        })
        .catch(err => console.error(err));
    })

export default router