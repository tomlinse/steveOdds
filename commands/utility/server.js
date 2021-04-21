module.exports = {
	name: 'server',
	description: 'Server Name',
	execute(msg, args) {
        msg.channel.send(`This server's name is: ${msg.guild.name}`);
	},
};