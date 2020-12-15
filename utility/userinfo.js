const Discord = require("discord.js");
const { MessageEmbed } = require("discord.js");
const { COLOR } = require("../../config.json");

module.exports = {
  name: "userinfo",
  aliases: ["memberinfo", "whois"],
  category: "info",
  description: "Show User Information!",
  usage: "Userinfo | <Mention User>",
  accessableby: "everyone",
  run: async (client, message, args) => {

    //Start

    const member = message.mentions.members.first() ||
      message.member;

    const statuses = {
      online: `<a:online:778499673836486666>  \`Online\``,
      dnd: `<a:off:778499759521398794> \`Do Not Disturb\``,
      idle: `<a:idle:778499944218492930> \`Idle\``,
      offline: `<a:offline:786486918639648768> \`Offline/Invisible\``,
    };
    const user = member 
    let nitroBadge = user.user.avatarURL({dynamic: true})
      let flags = user.user.flags.toArray().join(`\n`)

        if(!flags) {

            flags = "User doesn't have any flags."

        }

    flags = flags.replace("HOUSE_BRAVERY", "• <a:hs1:780804487861764127> \`HypeSquad Bravery\`")

   flags = flags.replace("EARLY_SUPPORTER","• <a:nitro:756763806868308038> \`Early Supporter\`")

   flags = flags.replace("EARLY_VERIFIED_DEVELOPER","• <:developer:780804931950870529> \`Early Verified Developer\`")

   flags = flags.replace("HOUSE_BRILLIANCE","• <a:BrillianceNeon:780805106139529226> \`HypeSquad Brilliance\`")

   flags = flags.replace("HOUSE_BALANCE","• <a:BalanceNeon:780805418845995008> \`HypeSquad Balance\`")

   flags = flags.replace("DISCORD_PARTNER","• <a:partner:780805652317995029> \`Partner\`")

   flags = flags.replace("HYPESQUAD_EVENTS","• <a:hypesquad:780804260844929044>\`Hypesquad Event\`")

   flags = flags.replace("DISCORD_CLASSIC","• <a:cnitro:780806025842393088> \`Discord Classic\`")

   if(nitroBadge.includes("gif")) {

    flags = flags + `

• <a:mainni:780806653510680576>  \`Nitro\``

   }
    
      
  
    const embed = new MessageEmbed()
      .setTitle("User Info of "+member.user.username )
      .setColor(COLOR)
      .setThumbnail(member.user.displayAvatarURL())
      .addField('🔹 Full Name', member.user.tag, true)
      .addField('**🆔 ID :**', `\`${member.id}\``, true)
      .addField('📊 Status', statuses[member.presence.status], true)
     .addField('🔹 Bages ', flags, true)
         
     .addField(`Top Role`, `${member.roles.highest || "No Role!"}`, true)
      .addField(`🔹 Roles Count`, message.guild.members.cache.get(member.user.id).roles.cache.size || "No Roles!", true)
      .addField(`🔹 Avatar Url`, `[Link](${member.user.displayAvatarURL()})`, true)
      .addField('🔹 Joined Server At', member.joinedAt.toDateString())
      .addField('🔹 Joined Discord At', member.user.createdAt.toDateString())
      .setFooter(`Requested by ${message.author.username}`)
      .setTimestamp();

   let f =  message.channel.send(embed);

    
  }
};