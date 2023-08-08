module.exports = {
  name: 'pause',
  aliases: ['pause', 'hold'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    if (queue.paused) {
      queue.resume()
      return message.channel.send('Tocando a música novamente :)')
    }
    queue.pause()
    message.channel.send('Música pausada :)')
  }
}