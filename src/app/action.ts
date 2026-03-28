'use server'

import { getPayload } from 'payload'
import config from '@payload-config'

export default async function executeCommand(input: string) {
  const payload = await getPayload({ config })
  input = input.toLowerCase().trim()

  if (input === 'help') {
    const { docs: all } = await payload.find({ collection: 'commands' })
    const list = all.map(d => `> ${d.command.padEnd(12)} - ${d.description || 'No description'}`).join('\n')
    return list
  }

  if (input === 'clear') {
    return 'INTERMINAL_CLEAR_SIGNAL'
  }

  const { docs: command } = await payload.find({
    collection: 'commands',
    where: {
      command: {
        equals: input,
      },
    },
  })

  return command[0]?.response || `Unknown command: ${input}. Type 'help'.`
}
