const { MessageEmbed } = require("discord.js");
const Color = "RANDOM"
module.exports = {
  name: "removeuser",
  category: "support",
  aliases: ["ru"],
  usage: "Removeuser <Mention User> | <reason>",
  description: "Remove A User From Your Ticket!",
  run: async (client, message, args) => {
    
    let AllChannels = await message.guild.channels.cache.find(ch => ch.name === message.author.id);
    
    if (!AllChannels) return message.channel.send(`Ticket Does Not Exists!`);
    
    let Category = await message.guild.channels.cache.filter(ch => ch.type === "category").find(ch => ch.name === "Tickets");
    
    if (!Category) return message.channel.send(`Ticket Does Not Exists!`);
    
    let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
    
    if (!Member) return message.channel.send(`Please Mention A User!`);
    
    let Perm = AllChannels.permissionsFor(Member.user.id);
    
    if (!Perm.has("SEND_MESSAGES") || !Perm.has("VIEW_CHANNEL") || !Perm.has("READ_MESSAGE_HISTORY")) return message.channel.send(`Already Not In Ticket!`);
        
    await AllChannels.createOverwrite(Member.user.id, {
      READ_MESSAGE_HISTORY: false,
      VIEW_CHANNEL: false,
      SEND_MESSAGES: false
    });
    
    const Embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`User Removed!`)
    .setDescription(`User Has Been Removed!\n\nReason: ${args.slice(1).join(" ") || "No Reason Provided!"}`)
    .setFooter(`Removed By ${message.author.username}`)
    .setTimestamp();
    
    return AllChannels.send(Embed);
  }
};