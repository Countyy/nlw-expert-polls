type Message = {
  pollOptionId: string
  votes: number
}
type Subscriber = (message: Message) => void

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {}

  subscribe(pollid: string, Subscriber: Subscriber) {
    if (!this.channels[pollid]) {
      this.channels[pollid] = []
    }

    this.channels[pollid].push(Subscriber)
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message)
    }
  }
}

export const Voting = new VotingPubSub()