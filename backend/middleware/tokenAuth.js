require("dotenv").config()
const authUrl = process.env.AUTH_URL
const apikey = process.env.API_KEY
const axios = require("axios");
const axiosInstance = axios.create({
    baseURL: authUrl
})

const authenticator = async (req, res, next) => {
    try {

        const userResponse = await axiosInstance({
            url: `encrypt/keys`,
            method: "post",
            data: {
                "key": apikey
            }
        });

        const token = userResponse.data.data.EncryptedSecKey.encryptedKey
        req.token = token 
        // res.header("authorization", "Bearer token")
        next()
        
    } catch (error) {
        res.status(500).json(error.message)
    }
}


module.exports = { authenticator }