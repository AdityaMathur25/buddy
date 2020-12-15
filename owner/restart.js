
module.exports = {
    name: "restart",
    category: "owner",
  aliases: ["r"],
  ownerOnly: true,
    run: async (client, message, args) => {
        if (message.author.id !== '480285300484997122') {
            return message.channel.send(`You cannot use this command!`)
        }
        await message.channel.send(`Restarting bot...`)
      process.exit(1);
    }
          }
