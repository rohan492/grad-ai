import { Router } from 'express'
import sdk from '@api/preemo'

import {
    GRADIENT_AUTH_TOKEN,
    GRADIENT_WORKSPACE_ID
} from '../environments/environment.js'

const router = Router()

router.post('/rag', (req, res) => {
    const { ragCollectionID, question } = req.body
    console.log(ragCollectionID)
    console.log(question)
    sdk.auth(GRADIENT_AUTH_TOKEN);
    sdk.generateAnswer({
        source: {
            type: 'rag',
            collectionId: ragCollectionID
        },
        question
    }, {
        'x-gradient-workspace-id': GRADIENT_WORKSPACE_ID
    })
        .then(({ data }) => {
            console.log(data)
            return res.status(200).json(data)
        })
        .catch(err => {
            console.error(err)
            return res.status(500).send("Error in Adding To RAG Collection")
        });
})

export default router
