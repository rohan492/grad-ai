import { Client } from "./Client";

const GoogleLoginService = async (formdata) => {
    try {
        const config = {
            headers: formdata
        }
        return await Client.post('/user/googleLogin', formdata, config)
    } catch (e) {
        return e
    }
}

export {
    GoogleLoginService
}