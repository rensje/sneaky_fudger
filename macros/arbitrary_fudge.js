let { min, max } = sneaky_fudger.data
let content = `min: <input id="min" value="${sneaky_fudger.formatRollNumber(min)}"></input> </br>
max: <input id="max" value="${sneaky_fudger.formatRollNumber(max)}"></input>
`
let d = new Dialog({
    title: "Fudger",
    content: content,
    buttons: {
        done: {
            label: "Fudge",
            callback: (html) => {
                let min = html.find('#min').val();
                let max = html.find('#max').val();
                sneaky_fudger.fudgeRolls(min, max);
            }
        }
    },
    default: "done"
})
d.render(true);