import { gpt_correct } from "../gpt/philo_correct";
import { sendMessage } from "../telegram/helpers/general_api";

async function philo_queue(event: any) {
    const body = JSON.parse(event["Records"][0]["body"]);
    const message_body = JSON.parse(body.MessageBody);

    const { chat_id, message } = message_body;

    const corection = await gpt_correct(message)

    await sendMessage(chat_id, corection);
}

export { philo_queue }