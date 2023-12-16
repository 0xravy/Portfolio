import express from "express";
import { config } from "dotenv"
import { Client, GatewayIntentBits } from 'discord.js';
import cors from "cors"
config()

const botSettings = {
    channels_id: {
        web_emails: "1136646011004129310",
        projects: "1184159567848951939"
    },
    projects: []
}

const server = express();
const PORT = process.env.PORT; // 3003


const bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});


const channel = (id => bot.channels.cache.get(id))

async function updateProjects() {
    botSettings.projects = []; // remove all projects

    const messages = await channel(botSettings.channels_id.projects).messages.fetch(); // all messages in channel

    let i = 1;
    await messages.map((message) => {
        try {
            const msgArr = message.content.split("\n"); msgArr.shift(); msgArr.pop();
            var msgString = msgArr.join("");
            const msgObj = JSON.parse(msgString);
            botSettings.projects.push(msgObj);
        } catch (err) {
            console.log(`[ there is error in messages loop in message number ${i} ]:\n`, err);
            console.log(msgString);
        }
        i++;
    });
}


function runServer() {
    server.use(cors())

    server.get("/", (req, res) => {
        res.send("lala")
    })

    server.get('/api/data', (req, res) => {
        res.json(botSettings.projects);
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
        updateProjects()
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
    if (message.content == "update projects") {
        updateProjects().then(() => {
            const projects = botSettings.projects
            message.reply(`تم تحديث المشاريع في الموقع الان يوجد ${projects.length} مشاريع`);
            console.log(projects);
        })
    }
});


bot.login(process.env.TOKEN);
