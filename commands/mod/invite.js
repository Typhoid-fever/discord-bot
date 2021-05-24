const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'invite',
    description: 'Create and check invites',
    aliases: ['invites'],
    usage: '.invite [create] [name]',
    category: 'mod',
    execute(client, message, args) {
        if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply('You can\'t use that.');

        let channel = message.guild.channels.cache.get('762495440955768852');

        /*if(['gather'].includes(args[0])) {
            message.guild.fetchInvites().then(guildInvites => {
                guildInvites.forEach(invite => {
                db.set('invites.code', invite.code)
                db.set(`invites.${invite.code}.name`, invite.inviter.username)
                db.set(`invites.${invite.code}.uses`, invite.uses)
                });
            })
            return message.channel.send('Gathered invites succesfully.')
        }*/

        if(!['create'].includes(args[0]) || !args[1]) {
            return message.channel.send('Hmm, that\'s not a valid use of this command.');
        }

        let name = args[1];

        channel.createInvite({ maxAge: 0, unique: true }).then(invite => {
            db.set(`invites.code`, invite.code)
            db.set(`invites.${invite.code}.name`, name)
            db.set(`invites.${invite.code}.uses`, 0)
            message.channel.send(invite.url);
        });
    }
}