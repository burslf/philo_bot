import { bot } from "./bot";

bot.telegram.setMyCommands(commands());

bot.command('start', (ctx: any) => {
    ctx.session = {};

    ctx.reply('Welcome!', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'Philo Correction',
                        callback_data: 'philo'
                    }
                ]
            ]
        }
    })
});

function commands() {
    let result = [];
    result.push({
        command: 'start',
        description: 'Starts the bot'
    })
    return result;
}