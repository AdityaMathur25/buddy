
const Discord = require("discord.js");

const { MessageEmbed } = require("discord.js");

const Color = "RANDOM";

const Random = require("srod-v2");

module.exports = {

    name: "changemymind",

    category: "images",

    description: "Generate A Fake Change My Mind Image!",

    usage: "Changemymind <Text>",

    run: async (client, message, args) => {

        //Start

        if (!args[0]) return message.channel.send(`Please Give Something!`);

        let Data = await Random.ChangeMyMind(args.join(" "), Color);

        return message.channel.send(Data);

        //End

    }

};

 