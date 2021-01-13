module.exports = {
	name: 'avatar',
    description: 'User avatar',
    aliases: ['icon', 'pfp'],
	execute(message, args) {
		if (!message.mentions.users.size) {
            message.channel.send(`${message.author.displayAvatarURL}`);
        } else if (args[0] == 'everyone') {
            message.reply('Ha, you thought.');
        } else {
            const userList = message.mentions.users.map(user => {
                return `${user.displayAvatarURL}`;
            });
            message.channel.send(userList);
        }
	},
};