const { Constants } = require('discord.js');

module.exports = {
  name: 'join',
  aliases: ['move'],
  run: async (bot, message, args) => {
    let voiceChannel = message.member.voice.channel
    if (args[0]) {
      voiceChannel = await bot.channels.fetch(args[0])
      if (!Constants.VoiceBasedChannelTypes.includes(voiceChannel?.type)) {
        return message.channel.send(`${bot.emotes.error} | ${args[0]} não é um canal válido!`);
      }
    }
    if (!voiceChannel) {
      return message.channel.send(
        `${bot.emotes.error} | Você deve estar em um canal de voz!`)
    }
    bot.distube.voices.join(voiceChannel);
  }
}