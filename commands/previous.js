module.exports = {
  name: 'previous',
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    const song = queue.previous()
    message.channel.send(`${client.emotes.success} | Now playing:\n${song.name}`)
  }
}