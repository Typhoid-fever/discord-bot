const {readdirSync} = require('fs');

module.exports = (client, message) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));

        for (let file of commands) {
            let pull = require(`../commands/${dir}/${file}`);
            
            if(pull.name) {
                client.commands.set(pull.name, pull);
            } else {
                message.channel.send('Missing a commmand or command is not valid');
                continue;
            }
        if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
        }
    });
}