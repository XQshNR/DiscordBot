module.exports = {
	name: 'args',
    description: 'Information about the arguments provided.',
	args: true,
	usage: '<arguments>',
	execute(message, args) {
		if (args[0] === 'foo') {
			return message.channel.send('bar');
		}
		message.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};