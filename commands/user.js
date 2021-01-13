module.exports = {
	name: 'user',
	description: 'User info.',
	execute(message, args) {
		if (!message.mentions.users.size) {
            message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}\nYour avatar: ${message.author.displayAvatarURL}`);
        } else {
            const userList = message.mentions.users.map(user => {
                return `Username: ${user.username}\nID: ${user.id}\nAvatar: ${user.displayAvatarURL}`;
            });
            message.channel.send(userList);
        }
	},
};