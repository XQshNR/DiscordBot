module.exports = {
	name: 'random',
    description: 'Picks a random item from a given list.',
	args: true,
	usage: '<arguments>',
	execute(message, args) {
		message.channel.send(args[Math.floor(Math.random() * args.length)]);
	},
};