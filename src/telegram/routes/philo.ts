import { bot } from "../bot";
import { philo_controller } from "../controllers/philo";

bot.action('philo', philo_controller);