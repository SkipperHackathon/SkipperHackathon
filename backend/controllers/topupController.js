const Balance = require("../models/wallet")
const axios = require("axios");;
const axiosInstance = axios.create({
    baseURL: "https://seerbitapi.com/"
})


const makePayment = async (req, res) => {
    try {
        const token = req.token
        const userResponse = await axiosInstance({
            url: `paymentlink/v2/payLinks/api`,
            method: "post",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            data: {
                "status": "ACTIVE",
                "paymentLinkName": "Donations",
                "description": "Give out donations",
                "currency": "NGN",
                "successMessage": "Thank you for your payment",
                "publicKey": "PublicKey",
                "customizationName": "utbesti22",
                "paymentFrequency": "RECURRENT",
                "paymentReference": "",  // optional
                "email": "js@emaildomain.com",
                "requiredFields": {
                    "address": true,
                    "amount": true,
                    "customerName": true,
                    "mobileNumber": true,
                    "invoiceNumber": false
                },
                "additionalData": "custom1:null||custom2:null||custom3:null", //optional
                "linkExpirable": false,
                "expiryDate": "",
                "oneTime": false
            }
        });

        console.log(userResponse)
    } catch (error) {
        res.status(500).json("Something went wrong")
    }
}



module.exports = {
    makePayment
}