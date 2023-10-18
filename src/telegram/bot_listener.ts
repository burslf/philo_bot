import { bot } from "./bot";
import { philo_listener } from "./controllers/philo";

bot.on('message', async (ctx: any) => {
    if (ctx.session && ctx.session.state) {
        switch (ctx.session.state) {
            case 'philo':
                await philo_listener(ctx);
                break;
            default:
                break;
        }
    }
});