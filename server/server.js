import express from "express";
import { config } from "dotenv"
import { Client, GatewayIntentBits } from 'discord.js';
import cors from "cors"
import settings from "../settings.json";
config()

const botSettings = {
    channels_id: {
        web_emails: "1136646011004129310",
        //------------------------------------
        projects: "1184159567848951939",
        links: "1185923234844115075"
    },
    projects: [],
    links: []
}

const server = express();
const PORT = settings.server.port; // 3003


const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});


const channel = (id => bot.channels.cache.get(id))

async function update(arrData, channelID) {

    arrData = []; // remove all data

    const messages = await channel(channelID).messages.fetch(); // all messages in channel

    let i = 1;
    await messages.map((message) => {
        try {
            const msgArr = message.content.split("\n"); msgArr.shift(); msgArr.pop();
            var msgString = msgArr.join("");
            const msgObj = JSON.parse(msgString);
            arrData.push(msgObj);
        } catch (err) {
            console.log(`[ there is error in messages loop in message number ${i} ]:\n`, err);
            console.log(msgString);
        }
        i++;
    });

    return arrData
}

async function updateFunctions() {
    botSettings.projects = await update(botSettings.projects, botSettings.channels_id.projects);
    botSettings.links = await update(botSettings.links, botSettings.channels_id.links);
}


function runServer() {
    server.use(cors())

    server.get("/", (req, res) => {
        res.send("lala")
    })

    server.get('/api/data', (req, res) => {
        res.json(botSettings);
    });

    server.get('/api/messages', (req, res) => {
        const message = req.query.message;

        if (!message) {
            return res.status(400).send('Bad Request: Missing message parameter');
        }

        const emailsChannel = channel(botSettings.channels_id.web_emails);
        if (!emailsChannel) {
            return res.status(500).send('Internal Server Error: Channel not found');
        }

        const exambleEmbed = {
            color: 0x0099ff,
            description: message,
            thumbnail: {
                url: "https://rustacean.net/more-crabby-things/rustdocs.png",
            },
            timestamp: new Date().toISOString(),
            footer: {
                text: "",
                icon_url: "https://rustacean.net/more-crabby-things/rustdocs.png",
            }
        }

        emailsChannel.send({
            content: "🙦━━━━━{ 📪 New Email 🦀 }━━━━━🙤",
            embeds: [exambleEmbed]
        });

        console.log('Received message:', message);
        return res.send('Message successfully processed');
    });

    server.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        updateFunctions();
    });
}


bot.on('ready', async () => {
    const readyText = `${bot.user.username} is ready!`;
    console.log(readyText);
    runServer();
});


bot.on('messageCreate', async (message) => {
    if (message.content == "ping") {
        message.reply("Pong!");
    }
    if (message.content == "update" || message.content == "تحديث") {
        updateFunctions()
            .then(() => {
                message.reply(`\`\`\`تم تحديث المشاريع في الموقع الان يوجد [ ${botSettings.projects.length} ] مشاريع\nتم تحديث روابط السوشيل ميديا في الموقع الان يوجد [ ${botSettings.links.length} ] روابط\`\`\``);
            });
    }
});


bot.login(process.env.TOKEN);
