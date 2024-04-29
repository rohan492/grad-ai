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

export {
    FileUploadService,
    AddToRAGCollection
}