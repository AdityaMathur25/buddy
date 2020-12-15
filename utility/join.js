module.exports = {
  name: "join",
  description: "test welcome",
  usage: "join",
  category: "utility",
  run: async (client, message, args) =>{
        client.emit('guildMemberAdd', message.member)
  console.log("Join command is used!")
  }
  }