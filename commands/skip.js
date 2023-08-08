module.exports = {
  name: 'skip',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    try {
      const song = await queue.skip()
      message.channel.send(`${client.emotes.success} | Pulei! Tocando agora:\n${song.name}`)
    } catch (e) {
      message.channel.send(`${client.emotes.error} | ${e}`)
    }
  }
}