const { prefix } = require('../../config.json');

module.exports = {
	name: 'roll',
	description: 'Roll Some Dice',
	execute(msg, args) {

        if(args.length !== 2){
            return msg.channel.send(`Please enter \'${prefix}roll <number of dice> <number of sides on die>\'`)
        }

		const numDice = parseInt(args[0]);
        const numSides = parseInt(args[1]);

        if(numDice < 1){
            return msg.channel.send('Number of Dice has to be 1 or greater.');
        }

        if(numSides < 2){
            return msg.channel.send('A die has to have atleast 2 sides');
        }
        let total = 0;
        for(i = 0; i < numDice; i++){
            total += Math.floor(Math.random() * numSides) + 1;
        }

        return msg.channel.send(`You rolled a ${total} from ${numDice}d${numSides}`);
	},
};