module.exports = {
  name: 'resume',
  aliases: ['resume', 'unpause'],
  inVoiceChannel: true,
  run: async (client, message) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    if (queue.paused) {
      queue.resume()
      message.channel.send('Tocando a música de novo :)')
    } else {
      message.channel.send('A fila não foi pausada!')
    }
  }
}