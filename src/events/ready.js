module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
    let activities = [ `Developed by J'Corp#5228`, `Type /help for more information`],i = 0
    setInterval(() => client.user.setActivity({ name: `${activities[i++ % activities.length]}`, type: "WATCHING" }), 12000);
}}
