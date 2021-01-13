module.exports = {
	name: 'pong',
	description: 'Pong!',
	args: false,
	cooldown: 5,
	execute(message, args) {
		message.channel.send('Ping.');
	},
};