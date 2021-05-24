const Discord = require('discord.js');
const fs = require('fs');

module.exports = {
    name: 'ticket',
    description: 'Open a support ticket',
    aliases: ['t'],
    usage: '.ticket [open] [name or reason]',
    category: 'info',
    execute: async (client, message, args) => {
        const target = message.author;

        const ticketEmbed =  new Discord.MessageEmbed()
            .setTitle('Support ticket')
            .setDescription(`Hi ${target.username}! Hope you're doing okay! While you wait for someone to help you, why not explain what's going on?\nYou can also use one of these commands if you need.\n \`.ticket adduser @user\` to add someone else to the ticket\n\`.ticket rename\` then what's going on \n \`.ticket close\` if you're done with the ticket!`);
        
        const reactEmbed = new Discord.MessageEmbed()
            .setTitle('Open a ticket!')
            .setDescription(`Hi! If you need a private place to talk or want to speak to a mentor one-on-one feel free to open a ticket! You can add the :white_check_mark: reaction or type \`.ticket\` and then a reason!`)
        
        const ticketOpen = new Discord.MessageEmbed()
            .setAuthor(target.tag, target.displayAvatarURL())
        
        if(!message.channel.name.startsWith('t-') || ['open', 'opn', 'create'].includes(args[0]) || !args[0]) {
            let name = target.username;
            if(args[0] && !['open', 'opn', 'create'].includes(args[0])) name = args.slice().join('-');
            if(['open', 'opn', 'create'].includes(args[0])) name = args.slice(1).join('-');
            if(['open', 'opn', 'create'].includes(args[0]) && !args[1]) name = target.username;

            message.guild.channels.create('t-' + name).then(ticket =>{
                ticket.setParent('690708732778119199');
                ticket.updateOverwrite(message.guild.roles.cache.find(x => x.id === '674476670190878730'), {
                    VIEW_CHANNEL: false
                })
                ticket.updateOverwrite(message.guild.roles.cache.find(x => x.id === '692993458033393664'), {
                    VIEW_CHANNEL: true
                })
                ticket.updateOverwrite(message.guild.roles.cache.find(x => x.id === '676653691381612545'),{
                    VIEW_CHANNEL: true
                })
                ticket.updateOverwrite(message.guild.roles.cache.find(x=> x.id === '710951280134324265'), {
                    VIEW_CHANNEL: true
                })
                ticket.updateOverwrite(target, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true
                })
                ticket.send(`${message.guild.member(target)} <@&676653691381612545>`);
                ticket.send(ticketEmbed);
                client.channels.cache.get('690700918399959104').send(ticketOpen.setDescription(`**Ticket - Opened - Command** \nSubject: ${name}`));
            })
        }

        if(['rct'].includes(args[0])) {
            return message.channel.send(reactEmbed).then(msg => msg.react('✅'));
        }

        if(!message.channel.name.startsWith('t-')) {
            return;
        } else if(['name', 'rename'].includes(args[0])) {
            if(!args[1]) return message.channel.send('What do you want it to be named?');
            else {
                message.channel.setName(`t-${args.slice(1).join('-')}`);
            }
        } else if(['close', 'c'].includes(args[0])) {
            if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');
            const messages = await message.channel.messages.fetch();
            const content = messages.map((m => `${m.author.username} - ${m.content} - ${m.createdTimestamp}`));
            content.reverse();

            fs.writeFile(`../ms-transcripts/${message.channel.name}-transcript.txt`, content.join('\n'), (error) => {
                if (error)
                    return message.channel.send('Something went wrong writing the transcript.');
            })
            
            await message.channel.delete();
            client.channels.cache.get('690700918399959104').send(ticketOpen.setDescription(`**Ticket - Closed** \nSubject: ${message.channel.name.replace('t-', '')}`));
            client.channels.cache.get('690700918399959104').send(new Discord.MessageAttachment(`../ms-transcripts/${message.channel.name}-transcript.txt`, `${message.channel.name}-transcript.txt`));

        } else if(['add', 'user', 'adduser', 'add-user', 'add user'].includes(args[0])) {
            addTarget = message.mentions.members.first() || message.mentions.roles.first();
            if(!addTarget) return message.channel.send('Who do you want to add?');
            message.channel.updateOverwrite(addTarget, {
                VIEW_CHANNEL: true,
                SEND_MESSAGES: true
            })
            message.channel.send(`Added user ${addTarget}`)
        } else if(['adminonly', 'admin-only', 'ao'].includes(args[0])) {
            message.channel.send('Ticket set to admin only.')
            message.channel.updateOverwrite(message.guild.roles.cache.find(x => x.id === '676653691381612545'), {
                VIEW_CHANNEL: false
            })
            message.channel.updateOverwrite(message.guild.roles.cache.find(x => x.id === '710951280134324265'), {
                VIEW_CHANNEL: false
            })
        } else if(['remove', 'removeuser', 'remove-user', 'ru'].includes(args[0])) {
            removeTarget = message.mentions.members.first() || message.mentions.roles.first();
            if(!removeTarget) return message.channel.send('Who do you want to remove?');
            message.channel.updateOverwrite(removeTarget, {
                VIEW_CHANNEL: false,
                SEND_MESSAGES: false
            })
            message.channel.send(`Removed user ${removeTarget}`)
        }   
    }
}