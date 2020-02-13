const bcr = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = process.env.SECRET

module.exports = {

    hashPass(pass) {
        let salt = bcr.genSaltSync(10)
        return bcr.hashSync(pass, salt)
    },
    checkPass(pass, hpass) {
        return bcr.compareSync(pass,hpass)
    },
    generateToken(payload) {
        return jwt.sign(payload,SECRET,{
            expiresIn: '1h'
        })
    },
    verifyToken(token) {
        console.log(SECRET)
        return jwt.verify(token,SECRET)
    }

}