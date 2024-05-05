import { Client } from "./Client";

const PDFExtraction = async (formdata) => {
    try {
        return await Client.post('/summary/pdf', formdata, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    } catch (e) {
        return e
    }
}

const GetSummary = async (formdata) => {
    try {
        return await Client.post('/summary/summary', formdata)
    } catch (e) {
        return e
    }
}

export {
    PDFExtraction,
    GetSummary
}
