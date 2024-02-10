import { FastifyInstance } from 'fastify'
import { Voting } from '../../utils/voting-pub-sub'
import { z } from 'zod'

export async function pollResults(app: FastifyInstance) {
  app.get(
    '/polls/:pollId/results',
    { websocket: true },
    (connection, request) => {
      const createPollParams = z.object({
        pollId: z.string().uuid(),
      })

      const { pollId } = createPollParams.parse(request.params)

      Voting.subscribe(pollId, (data) => {
        connection.socket.send(JSON.stringify(data))
      })
    }
  )
}
