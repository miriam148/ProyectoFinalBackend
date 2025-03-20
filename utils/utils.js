// ESTE ARCHIVO LO VOY A UTILIZAR PARA GENERAR LOS TOKEN 
const jwt = require('jsonwebtoken')


const generateToken = (payload, isRefreshToken) => {
    if (isRefreshToken) {
        return jwt.sign(payload, process.env.REFRESH_SECRET, { 
            expiresIn: '7d',
        })

    }
    return jwt.sign(payload, process.env.ACCESS_SECRET, { 
        expiresIn: '60min',
    })
}



module.exports = { generateToken }