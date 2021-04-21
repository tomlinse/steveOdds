module.exports = {
	name: 'hotfuzz',
    aliases: ['HotFuzz', 'Hotfuzz, hotFuzz'],
	description: 'For the Greater Good',
	execute(msg, args) {
        let choice = ['Yarp', 'Narp'];
        let x = Math.floor(Math.random() * 2);
		return msg.channel.send(`${choice[x]}`);
	},
};