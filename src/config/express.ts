import express, { Express } from 'express'

function createExpressApp():Express {
    const app = express()
    return app
}

export default {
    createExpressApp
}