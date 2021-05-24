const Discord = require('discord.js');
const ignored = new Set([
    '759244068176920607',
    '762495440955768852',
    '675963031024435230',
    '674478678482223114',
    '701937804451774569',
    '808180299677564938',
    '801639153741070356',
    '807455401032810527',
    '746381405629579325',
    '722156896659832893',
    '807466035304464444',
    '807463134226808853',
    '807464479620726834',
    '810228062598856744',
    '816581590054338560',
    '677350159373565963',
    '701932359808843777',
    '676798650994917387',
    '721933267288457267',
    '677071248827875348',
    '680645126506545158'
])

let lockdown = false;

module.exports = {
    name: 'lockdown',
    description: 'Lockdown the server and stop messages from being sent.',
    aliases: ['ld', 'lock'],
    category: 'mod',
    usage: 'ld [on] [off]',
    execute(client, message, args) {
        if(!message.member.roles.cache.some(role => role.id === '692993458033393664')) {
            return message.reply('You can\'t use that.');
         }

        if(args[0] === 'on') {
            lockdown = true;
            return lockon(client, message, args, lockdown)
        } else if(args[0] === 'off') {
            lockdown = false;
            return lockoff(client, message, args, lockdown)
        } else if(!args[0] && !lockdown) {
                lockdown = true;
                return lockon(client, message, args, lockdown)
        } else if(!args[0] && lockdown) {
                lockdown = false;
                return lockoff(client, message, args, lockdown)
        } else {
            return message.channel.send('Hmmm.... make sure you\'re using the command correctly.')
        }
    }
}


function lockon(client, message, args, lockdown) {
    message.guild.channels.cache.forEach(channel => {
        if(!ignored.has(channel.id)) {
            channel.updateOverwrite(message.guild.roles.cache.find(r => r.id === '674476670190878730'), {
                SEND_MESSAGES: false,
                ADD_REACTIONS: false,
                SPEAK: false
            })
            channel.updateOverwrite(message.guild.roles.cache.find(r => r.id === '692993458033393664'), {
                SEND_MESSAGES: true,
                SPEAK: true
            })
        }
    })
    const lockdownEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setColor('BLACK')
        .setDescription(`Lockdown ${lockdown}`)
    return message.channel.send(lockdownEmbed);
}

function lockoff(client, message, args, lockdown) {
    message.guild.channels.cache.forEach(channel => {
        if(!ignored.has(channel.id)) {
            channel.updateOverwrite(message.guild.roles.cache.find(r => r.id === '674476670190878730'), {
                SEND_MESSAGES: null,
                ADD_REACTIONS: null,
                SPEAK: null
            })
        }
    })
    const lockdownEmbed = new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name}`, message.guild.iconURL)
        .setColor('BLACK')
        .setDescription(`Lockdown ${lockdown}`)
    return message.channel.send(lockdownEmbed);
}