import './philo';
import { bot } from '../bot';

bot.action('start', (ctx: any) => {
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
