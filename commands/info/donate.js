const Command = require('../../base/commands/Command.js')


class Donate extends Command {
    constructor(client) {
        super(client, {
            name: 'donate',
            category: 'Info',
            description: 'Unterstütze designhub',
            usage: 'donate',
            aliases: ['donations']
        })
    }

    async run(message) {
        return ("Wenn du designhub magst und uns unterstützen möchtest, um das Projekt aktiv zuhalten, freuen wir uns über deine Hilfe!" +
            "\nAls Dankeschön erhälst du coole Belohnungen. Außerdem erwähnen wir dich auf unserer Website und bieten dir 'nen extra Rang auf unserem Discord an." +
            "\n≫ https://designhub.fun/donate ")
    }
}

module.exports = Donate
