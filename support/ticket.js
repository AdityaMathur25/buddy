const { MessageEmbed } = require("discord.js");
const Color = "RANDOM"
module.exports = {
  name: "ticket",
  aliases: ["t"],
  category: "support",
  usage: "ticket | <reason>",
  description: "Make A New Ticket!",
  run: async (client, message, args) => {
    
    let AllChannels = await message.guild.channels.cache.find(ch => ch.name === message.author.id);
    
    if (AllChannels) return message.channel.send(`Ticket Already Exists!`);
    
    let Category = await message.guild.channels.cache.filter(ch => ch.type === "category").find(ch => ch.name === "Tickets");
    
    if (!Category) {
      Category = await message.guild.channels.create(`Tickets`, { type: "category" });
    };
    
    let Channel = await message.guild.channels.create(message.author.id, { reason: args.join(" ") || "New Ticket Requested!", parent: Category.id, permissionOverwrites: [{
      id: message.guild.roles.cache.find(role => role.name === "@everyone").id,
      deny: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY"]
    }, {
      id: message.author.id,
      allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES"]
    }] });
    
    const Embed = new MessageEmbed()
    .setColor(Color)
    .setTitle(`New Ticket!`)
    .setDescription(`Hey Staff Team! Someone Created A New Ticket, Help Him!\n\nReason: ${args.join(" ") || "No Reason Provided!"}`)
    .setFooter(`Ticket By ${message.author.username}`)
    .setTimestamp();
    
    return Channel.send(Embed);
  }
}