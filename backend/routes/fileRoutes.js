import { Router } from 'express'
import sdk from '@api/preemo'
import multer from 'multer'

import {
    GRADIENT_AUTH_TOKEN,
    GRADIENT_WORKSPACE_ID,
    GRADIENT_RAG_ID
} from '../environments/environment.js'

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

router.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file
    console.log(file.path)
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log(file)
    sdk.auth(GRADIENT_AUTH_TOKEN);
    sdk.uploadFile({file: file.path}, {
        type: 'audioFile',
        'x-gradient-workspace-id': GRADIENT_WORKSPACE_ID
    })
        .then(({ data }) => {
            console.log(data)
            const { id } = data
            res.status(200).json({ id, ogName: file.originalname })
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Error in Uploading File")
        });
})

router.post('/addToRag', (req, res) => {
    const { id, ogName } = req.body
    console.log(id)
    console.log(ogName)
    sdk.auth(GRADIENT_AUTH_TOKEN);
    sdk.server('https://api.gradient.ai/api');
    sdk.addFilesToRagCollection({
    files: [
        {
        id,
        name: ogName
        }
    ]
    }, {
    id: GRADIENT_RAG_ID,
    'x-gradient-workspace-id': GRADIENT_WORKSPACE_ID
    })
        .then(({ data }) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Error in Adding To RAG Collection")
        });
})

router.post('/getTranscriptionID', (req, res) => {
    const { id } = req.body
    console.log(id)
    sdk.auth(GRADIENT_AUTH_TOKEN);
    sdk.createAudioTranscription({
        fileId: id
      }, {
        'x-gradient-workspace-id': GRADIENT_WORKSPACE_ID
      })
        .then(({ data }) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Error in Getting Transcription ID")
        });
})

router.post('/getAudioTranscription', (req, res) => {
    const { transcriptionId } = req.body
    console.log(transcriptionId)
    sdk.auth(GRADIENT_AUTH_TOKEN);
    sdk.getAudioTranscription({
        transcriptionId,
        'x-gradient-workspace-id': GRADIENT_WORKSPACE_ID
      })
        .then(({ data }) => {
            console.log(data)
            res.status(200).json(data)
        })
        .catch(err => {
            console.error(err)
            res.status(500).send("Error in Creating Transcription")
        });
})

export default router