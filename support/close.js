const { MessageEmbed } = require("discord.js");

const Color = "RANDOM"
module.exports = {
  name: "close",
  aliases: ["ct"],
  category: "support",
  usage: "close | <reason>",
  description: "Close A Ticket!",
  run: async (client, message, args) => {
    let AllChannels = await message.guild.channels.cache.find(
      ch => ch.name === message.author.id
    );
    if (!AllChannels) return message.channel.send(`Ticket Does Not Exists!`);
    if (AllChannels.id !== message.channel.id)
      return message.channel.send("Please Use This In Ticket Channel!");
    let Category = await message.guild.channels.cache
      .filter(ch => ch.type === "category")
      .find(ch => ch.name === "Tickets");
    if (!Category) return message.channel.send(`Ticket Does Not Exists!`);
    const Embed = new MessageEmbed()
      .setColor(Color)
      .setTitle(`Deleting Ticket!`)
      .setDescription(`Deleting Ticket In 5 Seconds!`)
      .setFooter(`Ticket By ${message.author.username}`)
      .setTimestamp();
    await message.channel.send(Embed);
    setTimeout(async () => {
      try {
        await AllChannels.delete({
          reason: args.join(" ") || "Ticket Delete Requested!"
        });
        if (!Category.children.array()[0])
          Category.delete({ reason: "No Tickets!" });
      } catch (error) {
        return message.channel.send(`Something Went Wrong, Try Again Later!`);
      }
    }, 5000);
  }
};
