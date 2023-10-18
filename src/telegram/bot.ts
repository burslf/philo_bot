import { Telegraf, session, Context } from 'telegraf';

import { redis_client } from '../redis/get_client';
import { Redis } from '@telegraf/session/redis';
import { SessionStore } from 'telegraf/typings/session';

if (!process.env.TG_BOT_TOKEN) {
    throw new Error('Telegram bot token is not defined')
}
const NODE_ENV = process.env.NODE_ENV
const TG_BOT_TOKEN = NODE_ENV == 'local' ? process.env.TG_BOT_TOKEN_LOCAL : process.env.TG_BOT_TOKEN;

const bot = new Telegraf(TG_BOT_TOKEN!, {
    handlerTimeout: 90_000,
})

bot.catch((err: any, ctx: any) => {
    console.log(`GLOBAL ERROR:  ${ctx.updateType}`, err);
    ctx.reply('Upps, something went wrong');
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

const store:SessionStore<any> = Redis({
    client: redis_client,
})

bot.use(session({store}))

export { bot }
