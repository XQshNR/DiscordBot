const Discord = require('discord.js');

const { prefix, token } = require('./config.json');

const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require('fs');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

const cooldowns = new Discord.Collection();

var value = 0;

client.once('ready', () => {
	console.log('Ready!');
});

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const commandName = args.shift().toLowerCase();

    switch(commandName) {
        case 'reset':
            if (args.length) return message.channel.send(`You provided arguments, ${message.author}!
                \nThe proper usage would be: \`${prefix}reset\``);
            value = 0;
            return message.channel.send(value);

        case 'add': 
            if (!args.length) return message.channel.send(`You didn't provide any arguments, ${message.author}!
                \nThe proper usage would be: \`${prefix}add <positive number>\``);
            amount = args[0]
            if (isNaN(amount)) return message.send('That doesn\'t seem to be a valid number.');
            value += Number(args[0]);
            return message.channel.send(value);

        case 'subtract': 
            if (!args.length) return message.channel.send(`You didn't provide any arguments, ${message.author}!
                \nThe proper usage would be: \`${prefix}subtract <positive number>\``);
            amount = args[0]
            if (isNaN(amount)) return message.send('That doesn\'t seem to be a valid number.');
            value -= Number(args[0]);
            return message.channel.send(value);

        case 'guess':
            goal = Math.floor(Math.random() * 100) + 1;
            guess = client.on('message');
            while (guess !== goal) {
                if (isNaN(guess)) message.channel.send('That doesn\'t seem to be a valid number.');
                if (guess > goal) message.channel.send('Lower');
                if (guess < goal) message.channel.send('Higher');
                if (guess === 'exit') return message.channel.send('Stopped game.');
                guess = client.on('message');
            }
            return message.channel.send('Congratulations! You have guessed my number!')
    }

    const command = client.commands.get(commandName) 
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return message.reply('I don\'t have such a command.');

    if (command.guildOnly && message.channel.type !== 'text') {
        return message.reply('I can\'t execute that command inside DMs!');
    }

    if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;
		if (command.usage) {
			reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
		}
		return message.channel.send(reply);
    }

    if (command.args === false && args.length) {
        return message.channel.send(`You provided arguments, ${message.author}!
            \nThe proper usage would be: \`${prefix}${command.name}\``);
    }

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }
    
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;
    
    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
        if (now < expirationTime) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the 
                \`${command.name}\` command.`);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    try {
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }

});

client.login(token);