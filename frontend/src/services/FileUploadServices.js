import { Client } from "./Client";

const FileUploadService = async (formdata) => {
    try {
        return await Client.post('/file/upload', formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    } catch (e) {
        return e
    }
}

const AddToRAGCollection = async (formdata) => {
    try {
        return await Client.post('/file/addToRag', formdata)
    } catch (e) {
        return e
    }
}

const GetTranscriptionID = async (formdata) => {
    try {
        return await Client.post('/file/getTranscriptionID', formdata)
    } catch (e) {
        return e
    }
}

const GetAudioTranscription = async (formdata) => {
    try {
        return await Client.post('/file/getAudioTranscription', formdata)
    } catch (e) {
        return e
    }
}

export {
    FileUploadService,
    AddToRAGCollection,
    GetTranscriptionID,
    GetAudioTranscription
}