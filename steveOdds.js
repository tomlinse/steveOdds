const fs = require('fs');
const Discord = require('discord.js');
const {prefix, token} = require('./config.json');

const cooldowns = new Discord.Collection();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');

for (const folder of commandFolders){

    const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${folder}/${file}`);

        client.commands.set(command.name, command);
    }
}


client.once('ready', () => {
    console.log('Bot is ready');
});

client.on('message', (msg) => { 
    if(!msg.content.startsWith(prefix) || msg.author.bot) return;

    const args = msg.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    if (!client.commands.has(commandName)) return;

    const command = client.commands.get(commandName);

    if (command.args && !args.length) {
        return msg.channel.send(`You didn't provide any arguments, ${msg.author}!`);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;

    if (timestamps.has(msg.author.id)){
        const expirationTime = timestamps.get(msg.author.id) + cooldownAmount;

        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return msg.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
        }
    }
    timestamps.set(msg.author.id, now);
    setTimeout(() => timestamps.delete(msg.author.id), cooldownAmount);

    try {
        command.execute(msg, args);
    }
    catch (error) {
        console.error(error);
        msg.reply('There was an error trying to execute that command!');
    }
    /*
    if (command === 'ping') {
        client.commands.get('ping').execute(msg, args);
    }
    else if (command === `Beep`) {
        client.commands.get('beep').execute(msg, args);
    }
    else if (command === `server`) {
        client.commands.get('server').execute(msg, args);
    }
    else if (command === 'args-info') {
        client.commands.get('args-info').execute(msg, args);
    }
    */
});

client.login(token);