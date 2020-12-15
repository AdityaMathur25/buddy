const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "rrdel",
    category: "reaction-role",
    description: "Removes a reaction role from a message.",
    usage: "rrdel <#channel> <messageID> <emoji>",
    async run(client, message, args, flags) {
          const invalidEmbed = new Discord.MessageEmbed()
            .setAuthor("Reaction Role Delete Command", client.user.displayAvatarURL({
                format: "png",
                dynamic: true,
                size: 2048
            }))
            .setColor("#eb0936")
            .setTitle("Invalid Arguments")
            .addFields({
                name: "USAGE",
                value: "```rrdel <messageID> <emoji>```"
            }, {
                name: "EXAMPLES",
                value: "`rrdel 770636560281632768 🐒`"
            });
            
            if(!args[0]) return message.channel.send(invalidEmbed);

            const rr = new db.table('REACTION_ROLES');

            let channel = await rr.get(`rrremove_${message.guild.id}_${args[0]}2`);

            let messageid = await rr.get(`rerremove_${message.guild.id}_${args[0]}`);

            if(!channel) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please enter a valid channel."}});

            if(!messageid || isNaN(messageid)) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please enter a valid Message ID."}});

            let a = client.channels.cache.get(channel).messages.fetch(args[0]);

            if(!a) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> The entered Message ID is invalid."}});
            
            let customemoji = Discord.Util.parseEmoji(args[1]);

            if(!customemoji) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> Please enter a valid emoji for the reaction role."}});
        
            let emojicheck = client.emojis.cache.find(emoji => emoji.id === `${customemoji.id}`);

            if(!emojicheck) return message.channel.send({embed: {color:'#de2121', description:"<:tick_no:746298075643117620> The entered emoji is not valid. Please enter the emoji correctly."}});

            let emote = await rr.get(`rrremove_${message.guild.id}_${args[0]}_${args[1]}`)

            if(!emote) return message.channel.send({embed: {color:'#de2121', description:`<:tick_no:746298075643117620> There is no reaction role with ${customemoji} in this message.`}});

            client.channels.cache.get(channel).messages.fetch(args[0]).then(darkcodes => {
            darkcodes.reactions.cache.get(`${emojicheck.id}`).remove() 
            });

            let embed = new Discord.MessageEmbed()
                .setColor('#10de47')
                .setDescription(`<:tick_yes:746298071951867906> Removed ${emojicheck}.`)
                message.channel.send(embed)

                rr.delete(`emoteid_${message.guild.id}_${emojicheck}`)
                rr.delete(`role_${message.guild.id}_${emojicheck}`)
                rr.delete(`message_${message.guild.id}_${emojicheck}`)
                rr.delete(`rrremove_${message.guild.id}_${args[0]}2`)
                rr.delete(`rrremove_${message.guild.id}_${args[0]}_${args[1]}`)
                rr.delete(`rerremove_${message.guild.id}_${args[0]}`)


    }
}