const Balance = require("../models/wallet")
const axios = require("axios");
const axiosInstance = axios.create({
    baseURL: "https://seerbitapi.com/"
})

const sendMoney = async (req, res) => {
    try {
        const token = req.token
        const reqREsponse = await axiosInstance({
            url: `api/v2/payments/initiates`,
            method: "post",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                "publicKey":"SBTESTPUBK_n4HFSPUTPy8jnXCI17tNsXssIFNwAZmF",
                "amount":"2000.00",
                "fee":"10",
                "fullName":"John Doe",
                "mobileNumber":"08037456590",
                "currency":"NGN",
                "country":"NG",
                "paymentReference":"UYTRE234566677RDFGFDDSS",
                "email":"johndoe@gmail.com",
                "productId":"Foods",
                "productDescription":"Uba Account Transaction ",
                "clientAppCode":"kpp64",
                "redirectUrl":"https://checkout.seerbit.com",
            }
        })
        console.log(reqREsponse.data)
    } catch (error) {
        res.status(500).json({error})
    }
}


module.exports = {
    sendMoney
}