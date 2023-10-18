require('dotenv').config();

import express from "express";
import cors from 'cors';
import serverless from 'serverless-http';

import { connect } from "../db/_connection";

import { bot } from "../telegram/bot";
import '../telegram/bot_commands';
import '../telegram/routes';
import '../telegram/bot_listener';

if (!process.env.TG_BOT_TOKEN) {
  throw new Error("Telegram bot token is not defined");
}

if (!process.env.WH_URL || (process.env.NODE_ENV == 'local' && !process.env.WH_URL_LOCAL)) {
  throw new Error("Webhook URL is not defined");
}

bot.launch(
  {
    webhook: {
      domain: process.env.NODE_ENV == 'local' ? process.env.WH_URL_LOCAL! : process.env.WH_URL!,
      hookPath: '/bot',
    },
  }
)
const app = express();

/**
 * Express configuration
 */
app.use(cors())
app.use(express.json())

app.use(bot.webhookCallback('/bot'));


app.get('/', async (req, res) => {
  res.json(`Health Check - ${new Date().toISOString()}}`)
})

/**
 * Local server configuration
 */
if (process.env.NODE_ENV == 'local') {
  connect().then(async () => {
    console.log("MongoDB connection established");
    app.listen(3000, () => console.log("Local server is listening on port 3000"));
  }).catch(e => console.log(e))
}


/**
 * Serverless configuration
 * The serverless configuration is used for AWS Lambda deployment
 * The serverless configuration is defined in serverless.yaml
 * @serverlessHandler is the wrapper function that wraps the express app with serverless-http
 * @server is the handler function defined in serverless.yaml
 */

// Uncomment those lines if you want to deploy to AWS Lambda

const serverlessHandler = serverless(app);
const server = async (event: any, context: any) => {
  if (event.source === "aws.events") {
    console.log("Warming up!");
  }
  try {
    await connect();
    console.log("MongoDB connection established");

    return await serverlessHandler(event, context);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { server };