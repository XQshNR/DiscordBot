module.exports = {
	name: 'randomgame',
	description: 'A simple guessing game.',
	args: false,
	execute(message, args) {
        var number = Math.floor(Math.random() * 100) + 1;
        message.channel.send('Guess a number from 1-100!');
        var run = true;
		while(run) {
            client.on('message', message => {
                if(message == 'quit' || message == 'exit') {
                    message.channel.send('Thanks for playing!');
                    run = false;
                }
                else if(isNaN(message)) {
                    message.channel.send('That doesn\'t seem to be a valid number. Try again.');
                }
                else if(message == number) {
                    message.channel.send('Congratulations! You guessed the number!');
                    run = false;
                }
                else if(message > number) {
                    message.channel.send('Too high. Try again.');
                }
                else if(message < number) {
                    message.channel.send('Too low. Try again.');
                }
            });
        }
	},
};