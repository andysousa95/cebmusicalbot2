module.exports = {
  name: 'autoplay',
  inVoiceChannel: true,
  run: async (bot, message) => {
    const queue = bot.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    const autoplay = queue.toggleAutoplay()
    message.channel.send(`${client.emotes.success} | AutoPlay: \`${autoplay ? 'On' : 'Off'}\``)
  }
}