import { Router } from 'express'
import sdk from '@api/preemo'
import multer from 'multer'
import dotenv from 'dotenv'

dotenv.config()

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

router.post('/multi-upload', upload.array('files'), (req, res) => {
    const { ragCollectionName } = req.body
    const files = req.files
    // console.log(files)

    if (Array.isArray(files) && files.length > 0) {
        sdk.auth(process.env.GRADIENT_AUTH_TOKEN);

        // Create an array of promises to upload files
        const uploadPromises = files.map((file) =>
            sdk.uploadFile(
                { file: file.path },
                {
                    type: 'ragUserFile',
                    'x-gradient-workspace-id': process.env.GRADIENT_WORKSPACE_ID,
                }
            ).then(({ data }) => ({
                id: data.id,
                name: file.originalname,
            }))
        );

        // Use Promise.allSettled to get the results for each promise
        Promise.allSettled(uploadPromises)
            .then((results) => {
                const success = [];
                const failure = [];

                // Iterate over the results to categorize success and failure
                results.forEach((result, index) => {
                    if (result.status === 'fulfilled') {
                        success.push(result.value); // If fulfilled, add to success
                    } else {
                        failure.push({
                            error: result.reason,
                            ogName: files[index].originalname, // Original filename
                        }); // If rejected, add to failure with error reason
                    }
                });

                sdk.createRagCollection({
                  slug: 'bge-large',
                  name: ragCollectionName,
                  files: success
                }, {
                  'x-gradient-workspace-id': process.env.GRADIENT_WORKSPACE_ID
                })
                  .then(({ data }) => {
                    const { id } = data
                    if (failure.length > 0) { // If there were failures
                        return res.status(201).json({ // 201 since I want to extract successfull uploaded IDs
                            message: 'Some files could not be uploaded',
                            ragCollectionID: id,
                            success,
                            failure, // Return both successful and failed uploads
                        });
                    } else { // If all uploads succeeded
                        return res.status(200).json({ success, ragCollectionID: id, });
                    }
                  })
                  .catch((err) => {
                    console.error(err);
                    return res.status(500).send('Error while Creating RAG Collection');
                  });
            })
            .catch((err) => { // Handle any other unexpected errors
                console.error(err);
                return res.status(500).send('An unexpected error occurred');
            });
    } else {
        return res.status(400).send('No file uploaded.');
    }
})

router.post('/upload', upload.single('file'), (req, res) => {
    const file = req.file
    console.log(file.path)
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    console.log(file)
    sdk.auth(process.env.GRADIENT_AUTH_TOKEN);
    sdk.uploadFile({file: file.path}, {
        type: 'audioFile',
        'x-gradient-workspace-id': process.env.GRADIENT_WORKSPACE_ID
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
    sdk.auth(process.env.GRADIENT_AUTH_TOKEN);
    sdk.server('https://api.gradient.ai/api');
    sdk.addFilesToRagCollection({
    files: [
        {
        id,
        name: ogName
        }
    ]
    }, {
    id: process.env.GRADIENT_RAG_ID,
    'x-gradient-workspace-id': process.env.GRADIENT_WORKSPACE_ID
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
    sdk.auth(process.env.GRADIENT_AUTH_TOKEN);
    sdk.createAudioTranscription({
        fileId: id
      }, {
        'x-gradient-workspace-id': process.env.GRADIENT_WORKSPACE_ID
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
    sdk.auth(process.env.GRADIENT_AUTH_TOKEN);
    sdk.getAudioTranscription({
        transcriptionId,
        'x-gradient-workspace-id': process.env.GRADIENT_WORKSPACE_ID
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