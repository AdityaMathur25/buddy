const { MessageEmbed } = require("discord.js");


const Color = "RANDOM"

module.exports = {

  name: "adduser",

  aliases: ["au"],
  category: "support",

  usage: "Adduser <Mention User> | <reason>",

  description: "Add A User To Your Ticket!",

  run: async (client, message, args) => {

    

    let AllChannels = await message.guild.channels.cache.find(ch => ch.name === message.author.id);

    

    if (!AllChannels) return message.channel.send(`Ticket Does Not Exists!`);

    

    let Category = await message.guild.channels.cache.filter(ch => ch.type === "category").find(ch => ch.name === "Tickets");

    

    if (!Category) return message.channel.send(`Ticket Does Not Exists!`);

    

    let Member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    

    if (!Member) return message.channel.send(`Please Mention A User!`);

    

    if (AllChannels.permissionsFor(Member.user.id).has("SEND_MESSAGES")) return message.channel.send(`Already In Ticket With Send Messages Permission!`);

    

    await AllChannels.createOverwrite(Member.user.id, {

      READ_MESSAGE_HISTORY: true,

      VIEW_CHANNEL: true,

      SEND_MESSAGES: true

    });

    

    const Embed = new MessageEmbed()

    .setColor(Color)

    .setTitle(`New User Added!`)

    .setDescription(`New User Has Been Added!\n\nReason: ${args.slice(1).join(" ") || "No Reason Provided!"}`)

    .setFooter(`Added By ${message.author.username}`)

    .setTimestamp();

    

    return AllChannels.send(Embed);

  }

};