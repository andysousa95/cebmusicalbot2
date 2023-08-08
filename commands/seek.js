module.exports = {
  name: 'seek',
  inVoiceChannel: true,
  run: async (client, message, args) => {
    const queue = client.distube.getQueue(message)
    if (!queue) return message.channel.send(`${client.emotes.error} | Não há nada tocando neste momento!`)
    if (!args[0]) {
      return message.channel.send(`${client.emotes.error} | Por favor, informe (em segundos) para procurar!`)
    }
    const time = Number(args[0])
    if (isNaN(time)) return message.channel.send(`${client.emotes.error} | Por favor, informe um número válido!`)
    queue.seek(time)
    message.channel.send(`Procurou para ${time}!`)
  }
}