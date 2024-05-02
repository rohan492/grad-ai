import { Client } from "./Client";

const QueryRag = async (formdata) => {
    try {
        return await Client.post('/query/rag', formdata)
    } catch (e) {
        return e
    }
}

export {
    QueryRag
}
