const schedule = require('node-schedule')
const Telegraf = require('telegraf')

const bot = new Telegraf(TOKEN)
//var savedCtx = undefined
groups = [-226076541]
index = 0

bot.start((ctx) => {
        ctx.reply('Welcome!')
        groups.push(ctx.message.chat.id)
    })

trivia = "*¿Sabías que ... ?*  -  #WittyTrivia \n  _WittyBot_ "
triviamsj = ["tiene acceso a todos tus mensajes, pero no se los vende a la NSA ni a la SIDE, él es fiel a la KGB.",
             "está hecho enteramente en JavaScript, y su código es un verdadero _espanto_.",
             "acepta donaciones en forma de pizza y birra.",
             "está actualmente en _OVERFLOW_ grupos de Telegram. ¡Son un montón!",
             "basa sus respuestas en una red neuronal de alta profundidad, que consta de muchos if-else.",
             "procesa todos los datos del grupo, los hace un rollito, y se los mete en donde no le da el sol.",
             "está en etapa de alpha, el release estable está programado para marzo de 2054. Lo sé, ¡Estamos ansiosos!",
             "también tiene sentimientos. No lo insulten.",
             "te cebaría un mate si pudiera, pero es sólo un bot.",
             "es invulnerable a sus vanos intentos de ingeniería reversa."
            ]

cuandoSale = "¿Cuándo sale "
cuandoSaleMsj = ["digni?", "un age?", "bicis?"]

meLoDijo = ["Me lo dijo?",
            "Me lo estaría diciendo",
            "Me lo quisiera haber dicho",
            "Me lo dijo",
            "Me lo re dijo",
            "Me lo super dijo",
            "Me lo quiso decir?",
            "Creo que me quiere decir algo",
            "Creo que me quiere decir que *SEGMENTATION FAULT (core dumped)*",
            "Me lo super quisiera haber dicho",
            "Creo que le habla a usted",
            ]

cumpleanos = [
            "1-13", //Murga
            "2-24", //Gastón
            "5-24", //Rulo
            "8-6",  //Rouli
            "10-2", //Gus
            "10-5", //Colo
            "10-21", //Tomo
            ]

toAscii = function(str) {
        return str.toLowerCase()
        .replace(/á/, 'a')
        .replace(/é/, 'e')
        .replace(/í/, 'i')
        .replace(/ó/, 'o')
        .replace(/ú/, 'u')
        .replace(/ü/, 'u')
        .replace(/¿/, '?')
        .replace(/\./, '')
}

schedule.scheduleJob('0 21 * * *', () => {
    index += 1
    groups.forEach(function(group) {
        bot.telegram.sendMessage(group, trivia + triviamsj[index % triviamsj.length], {parse_mode:"Markdown"})
    })
})

schedule.scheduleJob('0 15 * * *', () => {
    found = false
    cumpleanos.forEach(function(birthday) {
        birthdate = new Date(birthday + "-1970")
        if (new Date().getMonth() == birthdate.getMonth() && new Date().getDate() == birthdate.getDate()) {
                found = true
        }
    })
    if (found)
        bot.telegram.sendSticker(-226076541, "CAADAQADRQMAAtyP1QToOlnHF3aWcwI") // Smaugs
    else
        bot.telegram.sendMessage(-226076541, cuandoSale + cuandoSaleMsj[index % cuandoSaleMsj.length])
})

bot.on('text', (ctx) => {
    msgtext = toAscii(ctx.message.text)

    if (msgtext.match("dign|age") && msgtext.indexOf("sale") == 0)
        ctx.replyWithSticker("CAADAQAD0gAD6QqSCeW2bdJqwvZ1Ag") //sale
    else if (msgtext == "tu vieja")
        ctx.replyWithSticker("CAADAQADaAIAAm6kFAhx6aR_uItdqAI") //te lo dijo
    
    if (ctx.message.from.id === 160565993 && ctx.chat.id != -258588711) return 1; //Yo, test
    //if (ctx.message.message_id % 11 === 0) return 1;

    reply = undefined
    if (msgtext.match("^.?quien ") && !msgtext.includes("quienes") && msgtext.slice(-1) === "?") {
        reply = "Tu vieja"
    } else if (msgtext.match("^a (quien|alguien|alguno)") && msgtext.slice(-1) === "?") {
        reply = "A tu vieja"
    } else if (msgtext.match("^.{0,4}(alguno|alguien)") && msgtext.slice(-1) === "?") {
        reply = "Tu vieja"
    } else if (msgtext.match("^por que") && msgtext.slice(-1) === "?") {
        reply = "Porque sos un forro"
    } else if (msgtext.indexOf("xq") == 0 && msgtext.slice(-1) === "?") {
        reply = "xq sos un forro"
    } else if (msgtext == "donde?") {
        ctx.reply("donde caga el conde")
    } else if (msgtext.match("larga|grande|gigante|enorme|magnifica|sabrosa|deliciosa") && !msgtext.match("no|poco|opuesto")) {
        reply = "Como ésta"
    } else if (msgtext.match("corta |chica|microscopica") && !msgtext.match("no|poco|opuesto|chicas")) {
        reply = "Como la tuya"
    } else if (msgtext.includes("llendo")) {
        ctx.reply("*yendo")
        ctx.reply("forro")
    } else if (msgtext.indexOf("haber que") == 0) {
        ctx.reply("*a ver")
        ctx.reply("forro")
    } else if (msgtext.includes("louta")) {
        ctx.reply("a ver si la cortás con louta")
        ctx.reply("forro")
    } else if (msgtext.includes("domingo") && msgtext.includes("10") && msgtext.includes("am")) {
        ctx.reply("Nadie se levanta a esa hora")
        ctx.reply("forro")
    } else if (msgtext.includes("no puedo") && msgtext.match("hoy|mañana")) {
        ctx.reply("🐔")
    } else if (msgtext.includes("no puedo") && msgtext.includes("al final")) {
        ctx.replyWithSticker("CAADAQADdwAD6QqSCfn5rSTvqA21Ag") //B85
    } else if (msgtext.includes("sale alg")) {
        ctx.replyWithSticker("CAADAQADJgAD6QqSCRNz5RHk65xxAg") //Age
    } else if (msgtext.includes("festej") && msgtext.includes("cumple")) {
        ctx.reply("hay minitas?")
    } else if (msgtext.includes("espi") && msgtext.match("gato|gil|puto")) {
        ctx.reply(msgtext.replace("espi", "vos"))
    } else if (msgtext.includes("witty") && msgtext.length <= 9) { // witty / che witty
        ctx.reply("Qué?")
    } else if (msgtext.includes("witty") && msgtext.length > 9) { // witty y algo más
        n = Math.floor(Math.random() * meLoDijo.length)
        ctx.reply(meLoDijo[n])
    } else if (msgtext.slice(-1) == "8" || msgtext.slice(-4) == "ocho") {
        reply = "El culo te abrocho"
    }

    if (Math.random() > .4) {
        ctx.replyWithMarkdown(reply)
    }
    
})

bot.on('audio', (ctx) => ctx.replyWithSticker("CAADAQADiQADf1NpCXJ3mjKH0610Ag"))
bot.on('voice', (ctx) => ctx.replyWithSticker("CAADAQADiQADf1NpCXJ3mjKH0610Ag"))

bot.startPolling()

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)

