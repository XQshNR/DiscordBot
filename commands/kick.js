module.exports = {
    name: 'kick',
    description: 'Kicks a user.',
    args: true,
    usage: '<user>',
    guildOnly: true,
	execute(message, args) {
        const taggedUser = message.mentions.users.first();
        message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	},
};