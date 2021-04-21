module.exports = {
	name: 'args-info',
	description: 'Args Info!',
    cooldown: 5,
    args:true,
	execute(msg, args) {
		if (args[0]==='foo'){
            return msg.channel.send('bar');
        }
    
        msg.channel.send(`Arguments: ${args}\nArguments length: ${args.length}`);
	},
};