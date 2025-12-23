class ChatAgent {
  constructor(name) {
    this.name = name;
  }

  reply(message) {
    return `ChatAgent ${this.name} received: ${message}`;
  }
}

module.exports = ChatAgent;
