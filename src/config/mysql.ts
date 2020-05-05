import * as mysql from 'mysql'

let mysqlInstance: mysql.Connection = null

const getMySqlInstance = () => {
    if(mysqlInstance) {
        if(mysqlInstance.state)
        return mysqlInstance
    }
    mysqlInstance = mysql.createConnection({
        host     : process.env.MYSQL_SERVER,
        user     : process.env.MYSQL_USERNAME,
        password : process.env.MYSQL_PASSWORD,
        database : process.env.MYSQL_DATABASE,
        port: parseInt(process.env.MYSQL_PORT),
        debug: Boolean(process.env.DEBUG_MODE)
    });

    return mysqlInstance
}

export default {
    getMySqlInstance
}