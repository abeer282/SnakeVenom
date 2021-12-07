require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())

const init = async () => {
    try{
        const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
        console.log(res.data)
    }
    catch(err){
        console.log(`${JSON.stringify(err)}`)
        // console.log(err)
    }
}

app.post(URI, async (req, res) => {
    console.log(req.body)

    const chatId = req.body.message.chat.id
    const text = req.body.message.text

    await axios.post(`${TELEGRAM_API}/sendMessage`, {
        chat_id: chatId,
        text: text
    })
    return res.send()
})

app.listen(process.env.PORT || 5000, async () => {
    console.log('App running on port', process.env.PORT || 5000)
    try{
        const res = await axios.get(`${TELEGRAM_API}/getWebhookInfo`)
        console.log(res.data)
    }
    catch(err){
        console.log(`${JSON.stringify(err)}`)
    }
    await init()
})