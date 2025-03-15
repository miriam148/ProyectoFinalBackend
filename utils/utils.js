// ESTE ARCHIVO LO VOY A UTILIZAR PARA GENERAR LOS TOKEN 
const jwt = require('jsonwebtoken')


const generateToken = (payload, isRefreshToken) => {
    if (isRefreshToken) {
        return jwt.sign(payload, process.env.REFRESH_SECRET, { 
            expiresIn: '60min', 
        })

    }
    return jwt.sign(payload, process.env.ACCESS_SECRET, { 
        expiresIn: '15min',
    })
}



module.exports = { generateToken }