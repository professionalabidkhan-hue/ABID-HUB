class WhatsAppAgent {
  constructor(number) {
    this.number = number;
  }

  sendMessage(message) {
    return `Sending WhatsApp message to ${this.number}: ${message}`;
  }
}

module.exports = WhatsAppAgent;
