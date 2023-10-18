import { Telegraf } from "telegraf"

require('dotenv').config()

const NODE_ENV = process.env.NODE_ENV

if (!process.env.TG_BOT_TOKEN) {
    throw new Error('Telegram bot token is not defined')
}

const TG_BOT_TOKEN = NODE_ENV == 'local' ? process.env.TG_BOT_TOKEN_LOCAL : process.env.TG_BOT_TOKEN;

const sendMessage = async (chatId: string, message: string) => {
    const bot = new Telegraf(TG_BOT_TOKEN!)
    await bot.telegram.sendMessage(chatId, message, {
        disable_web_page_preview: true,
        parse_mode: 'Markdown'
    })    
}

export {
    sendMessage
}