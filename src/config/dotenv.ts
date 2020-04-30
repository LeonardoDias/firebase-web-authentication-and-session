import dotenv from 'dotenv'

function loadEnv(path: string = '.env') {
    let result = dotenv.config({
        path,
        debug: false
    })

    if(result.error) {
        throw result.error
    }
}

export default {
    loadEnv   
}