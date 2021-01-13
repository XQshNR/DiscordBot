module.exports = {
	name: 'flipacoin',
    description: 'Flips a coin.',
	args: false,
	aliases: ['flip', 'coin'],
	execute(message, args) {
		message.channel.send(Math.floor(Math.random() * 2) == 0 ? 'Heads' : 'Tails');
	},
};