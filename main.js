const MODULE_ID = "sneaky_fudger"
const SOCKETNAME = "module." + MODULE_ID;

Hooks.once('init', () => {
    game.socket.on(SOCKETNAME, (data, sender_id) => {
        console.debug("Received fudge request from: ", sender_id);
        const sender = game.users.get(sender_id);
        if (sender?.isGM) {
            globalThis[MODULE_ID].data = data;
        } else {
            console.error("Fudge request received from invalid user: ", sender);
        }

    })
})

function fudgeRolls(min, max) {
    if(!game.user.isGM) {
        console.error("Non-GMs are not allowed to fudge rolls");
        return;
    }
    // Clamp min and max such that they are not 0 or 1 but arbitrarily close,
    // because errors occur when the random number returned is 0 even though CONFIG.Dice.randomUniform can return numbers in the range [0,1).
    const data = {
        min: clampNumber(min, Number.MIN_VALUE, 0.9999999403953552),
        max: clampNumber(max, Number.MIN_VALUE, 0.9999999403953552)
    }
    ChatMessage.create({ content: `Changed rolls min and max to ${formatRollNumber(data.min)} and ${formatRollNumber(data.max)}`, whisper: ChatMessage.getWhisperRecipients("GM") });
    game.socket.emit(SOCKETNAME, data);
    globalThis[MODULE_ID].data = data;
}

function restoreRolls() {
    fudgeRolls(0, 1);
}

function formatRollNumber(num) {
    return Number.parseFloat(num.toFixed(2));
}

Hooks.once('ready', () => {
    globalThis[MODULE_ID] = {
        data: { min: 0, max: 1 },
        fudgeRolls,
        restoreRolls,
        formatRollNumber
    };
    libWrapper.register(MODULE_ID, "CONFIG.Dice.randomUniform", (wrapped, ...args) => {
        let { min, max } = globalThis[MODULE_ID].data;
        let original_result = wrapped();
        return original_result * (max - min) + min
    }, "WRAPPER");


});