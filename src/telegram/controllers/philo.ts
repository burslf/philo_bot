import { Context } from "telegraf";
import { string_store } from "../utils/string_store";
import { gpt_correct } from "../../gpt/philo_correct";

interface ContextSession extends Context {
    [key: string]: any
}

export const philo_controller = async (ctx: ContextSession) => {
    console.log('philo_controller')
    ctx.session = {
        state: 'philo'
    }
    await ctx.reply(string_store.ENTER_PHILO_SUBJECT, {
        parse_mode: 'Markdown'
    });
};

export const philo_listener = async (ctx: any) => {
    switch (ctx.session.state) {
        case 'philo':
            const message = ctx.message.text;

            await ctx.reply('Mmm, laisses moi réfléchir...');
            await ctx.sendChatAction('typing');

            const corection = await gpt_correct(message)

            // const gpt_history = ctx.session.gpt_history || [];

            console.log('corection', corection);

            await ctx.sendMessage(corection, {
                parse_mode: 'Markdown'
            });
            break;
        default:
            break
    }
};