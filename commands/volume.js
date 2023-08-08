module.exports = {
  name: 'volume',
  aliases: ['v', 'set', 'set-volume'],
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há tocando neste momento!`)
    const volume = parseInt(args[0])
    if (isNaN(volume)) return message.channel.send(`${client.emotes.error} | Por favor, informe um número válido!`)
    queue.setVolume(volume)
    message.channel.send(`${client.emotes.success} | Volume está em: \`${volume}\``)
  }
}