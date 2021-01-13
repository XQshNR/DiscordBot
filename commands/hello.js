module.exports = {
	name: 'hello',
	description: 'Hello!',
	execute(message, args) {
        if (!message.mentions.users.size) {
            message.reply('Hello friend!');
        } else {
            const taggedUser = message.mentions.users.first();
            message.channel.send(`${taggedUser.username}, ${message.author.username} thinks you're cute ;)`);
        }   
	},
};