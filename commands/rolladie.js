module.exports = {
	name: 'rolladie',
    description: 'Rolls a die.',
	aliases: ['roll', 'die'],
	execute(message, args) {
        if(!args.length) {
            message.channel.send(Math.floor(Math.random() * 6) + 1);
        }
        else if(!isNaN(args[0])){
            message.channel.send(Math.floor(Math.random() * args[0]) + 1);
        }
        else {
            message.channel.send('That does not seem to be a valid number.');
        }
	},
};