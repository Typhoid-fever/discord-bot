const Discord = require('discord.js');

module.exports = (client, reaction, user) => {
    if(reaction.emoji.name === '✅' && reaction.message.id === '742991820094439437') {
        reaction.users.remove(user);
        const ticketEmbed =  new Discord.MessageEmbed()
            .setTitle('Support ticket')
            .setDescription(`Hi ${user.username}! Hope you're doing okay! While you wait for someone to help you, why not explain what's going on?\nYou can also use one of these commands if you need.\n \`.ticket adduser @user\` to add someone else to the ticket\n\`.ticket rename\` then what's going on \n \`.ticket close\` if you're done with the ticket!`)
        reaction.message.guild.channels.create('t-' + user.username).then(ticket => {
            ticket.setParent('690708732778119199');
            ticket.updateOverwrite(reaction.message.guild.roles.cache.find(x => x.id === '674476670190878730'), {
                VIEW_CHANNEL: false
            })
            ticket.updateOverwrite(reaction.message.guild.roles.cache.find(x => x.id === '692993458033393664'), {
                VIEW_CHANNEL: true
            })
            ticket.updateOverwrite(reaction.message.guild.roles.cache.find(x => x.id === '676653691381612545'), {
                VIEW_CHANNEL: true
            })
            ticket.updateOverwrite(reaction.message.guild.roles.cache.find(x=> x.id === '710951280134324265'), {
                VIEW_CHANNEL: true
            })
            ticket.updateOverwrite(user, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            })
            const ticketOpen = new Discord.MessageEmbed()
                .setAuthor(user.tag, user.displayAvatarURL())
                .setDescription(`**Ticket - Opened - React** \nSubject: ${user.username}`)
            ticket.send(`${reaction.message.guild.member(user)} <@&676653691381612545> `);
            ticket.send(ticketEmbed);
            client.channels.cache.get('690700918399959104').send(ticketOpen);
        })
    }
};