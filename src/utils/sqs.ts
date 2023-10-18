import {
    DeleteMessageCommand,
    GetQueueUrlCommand,
    ReceiveMessageCommand,
    SendMessageCommand,
    DeleteMessageBatchCommand,
    SQSClient
} from '@aws-sdk/client-sqs';
import {fromIni} from "@aws-sdk/credential-providers";


let sqs = new SQSClient({})
if (process.env.NODE_ENV === 'local') {
    sqs = new SQSClient({
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
        },
        region: 'us-east-1'
    })
}

const get_ses_queue_name = async (queue_name: string) => {
    const command = new GetQueueUrlCommand({
        QueueName: queue_name
    })

    return await sqs.send(command)
}

const generate_sqs_message = (queue_name: string, message_body: any) => {
    return { "Id": `u-${queue_name}`, "MessageBody": JSON.stringify(message_body) }
}

const send = async (queue_name: string, message: any) => {
    try {
        const get_queue_url = await get_ses_queue_name(queue_name)
        const queue_url = get_queue_url.QueueUrl

        const sendMessageCommand = new SendMessageCommand({
            QueueUrl: queue_url,
            MessageBody: JSON.stringify(message),
        })

        await sqs.send(sendMessageCommand)
    } catch (e) {
        console.log(e)
        throw e
    }
}


const getAllMessages = async (queue: string) => {
    console.log("getting all messages from queue: ", queue)
    const get_queue_url = await get_ses_queue_name(queue)
    const queue_url = get_queue_url.QueueUrl

    console.log(`Fetching all messages from ${queue}...`);
    const allMessages: any = [];

    let messages = await sqs.send(new ReceiveMessageCommand({
        QueueUrl: queue_url,
        MaxNumberOfMessages: 10
    }));

    while (messages && messages.Messages && messages.Messages.length > 0) {
        messages.Messages.forEach((message) => {
            const obj = JSON.parse(message.Body!);
            obj.ReceiptHandle = message.ReceiptHandle;
            allMessages.push(obj);
        });
        messages = await sqs.send(new ReceiveMessageCommand({ QueueUrl: queue, MaxNumberOfMessages: 10 }));
    }

    console.log(`Fetched ${allMessages.length} messages.`);
    return allMessages;
};

const deleteMessage = async (queue: string, receipt: string) => {
    const get_queue_url = await get_ses_queue_name(queue)
    const queue_url = get_queue_url.QueueUrl

    console.log(`Deleting message ${receipt} from ${queue}...`);
    await sqs.send(new DeleteMessageCommand({
        QueueUrl: queue_url,
        ReceiptHandle: receipt
    }));
    console.log(`Deleted ${receipt}.`);
};

const deleteBatchMessages = async (queue: string, receiptHandles: any[]) => {
    const get_queue_url = await get_ses_queue_name(queue)
    const queue_url = get_queue_url.QueueUrl

    console.log(`Deleting ${receiptHandles.length} messages from ${queue}...`);
    const MAX_BATCH_SIZE = 10;
    for (let i = 0; i < receiptHandles.length; i += MAX_BATCH_SIZE) {
        const batch = receiptHandles.slice(i, i + MAX_BATCH_SIZE);
        const command = new DeleteMessageBatchCommand({
            QueueUrl: queue_url,
            Entries: batch.map((receiptHandle, index) => ({
                Id: `${index}`,
                ReceiptHandle: receiptHandle,
            })),
        });
        await sqs.send(command);
    }
    console.log(`Deleted ${receiptHandles.length} messages from ${queue}.`);
};


const getMessageFromEvent = (event: any) => {
    try {
        const records = event["Records"];
        const body = JSON.parse(records[0]["body"]);

        return body["MessageBody"]
    } catch (e) {
        return false
    }
}

export {
    generate_sqs_message,
    send,
    getAllMessages,
    deleteMessage,
    deleteBatchMessages,
    getMessageFromEvent
}