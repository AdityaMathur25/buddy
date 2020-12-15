const { MessageEmbed } = require("discord.js")
const {default_prefix} = require("../../config.json")
module.exports = {
  name: "serverinfo",
  description: "get information about your server!",
  usage: "serverinfo|",
  category: "utility",
  run: async(client, message, args )=>{
  const db = client.db
  let prefix = await db.get(`prefix_${message.guild.id}`)
  if(prefix === null)  prefix = default_prefix
   let online = message.guild.members.cache.filter(member => member.presence.status !== "offline").size
   let offline = message.guild.members.cache.filter(member => member.presence.status === "offline").size
    let guild = message.guild
    let server = new MessageEmbed()
 
     . setThumbnail(message.guild.iconURL({dynamic: true}))
     .setAuthor(`${message.guild.name} INFO`, message.guild.iconURL() )
    .addField(`👑 **OWNED BY :** `,`${guild.owner}`, true)
     .addField(`🆔 ** ID : ** `,`${guild.id}`, true)
         .addField(`🌐 **REGION : ** `, `${message.guild.region}` , true)
       .addField(`<a:mainni:780806653510680576> **BOOST [${guild.premiumTier}] : ** `, `<a:nitro:756763806868308038> ${guild.premiumSubscriptionCount}` , true)

    
     .addField(`🛂 **EXPLICIT FILTER : ** :`,`${guild.explicitContentFilter}`, true)
         .addField(`🔹 **VATINITY URL  : ** `,`${guild.vanityURLCode || "NONE"} `, true)
     .addField(`✨ **VERIFICATION LEVEL : ** `,`${guild.verificationLevel}`, true)
    .addField(`👪 ** MEMBER INFO : ** `, `
**<a:online:778499673836486666> ONLINE : ** ${online}
**<a:offline:786486918639648768> OFFLINE : ** ${offline}
** 👨‍🦱 HUMANS : ** ${message.guild.members.cache.filter(member => !member.user.bot).size}
** 🤖 BOTS : ** ${message.guild.members.cache.filter(member => member.user.bot).size}`, true)
    .addField(`** CHANNELS  : [${guild.channels.cache.size}]** `, `
**<:jazzHastag:786485907024773140> TEXT : ** ${guild.channels.cache.filter(channel => channel.type === 'text').size}
**<:voice:786485777932222495> VOICE : ** ${guild.channels.cache.filter(channel => channel.type === 'voice').size}`, true)
     .setColor("YELLOW")
    .addField(`**<a:0042:784802818648309810> ROLES : ** [**${guild.roles.cache.size}**]`,`${prefix}roles for more information of roles!`, true)
    .setTimestamp()
    .setFooter(`Requested By ${message.author.username}`)
    return message.channel.send(server)
    }}