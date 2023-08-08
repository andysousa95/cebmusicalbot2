module.exports = {
  name: 'forward',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada na fila neste momento!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Por favor informe (em segundos) quantos segundos quer que avance a música!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Por favor, informe um valor válido!`)
    queue.seek((queue.currentTime + time))
    message.channel.send(`Avançando a música em ${time}!`)
  }
}