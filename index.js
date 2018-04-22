//const schedule = require('node-schedule')
const Telegraf = require('telegraf')

const bot = new Telegraf(TOKEN)
//var savedCtx = undefined

bot.start((ctx) => ctx.reply('Welcome!'))

/*schedule.scheduleJob('0 12 * * *', () => {
    savedctx.reply("Cuando sale digni?")
}) */

bot.on('text', (ctx) => {
/*
    if (!savedCtx && ctx.message.chat.id == -226076541) {
        savedCtx = ctx
    }*/
    period = 121
    if (ctx.message.chat.id == -226076541 && ctx.message.message_id % (3*period) == period)
        ctx.reply("¿cuando sale digni?")
    if (ctx.message.chat.id == -226076541 && ctx.message.message_id % (3*period) == (2*period))
        ctx.reply("¿cuando sale un age?")
    if (ctx.message.chat.id == -226076541 && ctx.message.message_id % (3*period) == 0)
        ctx.reply("¿cuando sale bicis?")

    msgtext = ctx.message.text.toLowerCase()
        .replace(/á/, 'a')
        .replace(/é/, 'e')
        .replace(/í/, 'i')
        .replace(/ó/, 'o')
        .replace(/ú/, 'u')
        .replace(/ü/, 'u')
        .replace(/¿/, '?')
        .replace(/\./, '')

    if ((msgtext.includes("dign") || msgtext.includes("age")) && msgtext.indexOf("sale") == 0)
        ctx.replyWithSticker("CAADAQAD0gAD6QqSCeW2bdJqwvZ1Ag") //sale
    else if (msgtext.indexOf("tu vieja") == 0)
        ctx.replyWithSticker("CAADAQADaAIAAm6kFAhx6aR_uItdqAI") //te lo dijo
    
    if (ctx.message.from.id === 160565993) return 1;
    //if (ctx.message.message_id % 11 === 0) return 1;

    if (msgtext.indexOf("quien") <= 1 && msgtext.indexOf("quien") >= 0 && msgtext.slice(-1) === "?" && !msgtext.includes("quienes")) {
        ctx.reply("Tu vieja")
    } else if ((msgtext.indexOf("a quien") == 0 || msgtext.indexOf("a alguien") == 0 || msgtext.indexOf("a alguno") == 0) && msgtext.slice(-1) === "?") {
        ctx.reply("A tu vieja")
    } else if (msgtext.indexOf("alguien") <= 5 && msgtext.indexOf("alguien") >= 0 && msgtext.slice(-1) === "?") {
        ctx.reply("Tu vieja")
    } else if (msgtext.indexOf("alguno") <= 5 && msgtext.indexOf("alguno") >= 0 && msgtext.slice(-1) === "?") {
        ctx.reply("Tu vieja")
    } else if ((msgtext.includes("larga") || msgtext.includes("grande") || msgtext.includes("gigante") || msgtext.includes("enorme") || msgtext.includes("magnifica") || msgtext.includes("sabrosa")  || msgtext.includes("deliciosa")) && !msgtext.includes("no") && !msgtext.includes("poco") && !msgtext.includes("opuesto")) {
        ctx.reply("Como ésta")
    } else if ((msgtext.includes("corta") || msgtext.includes("chica") || msgtext.includes("microscopica")) && !msgtext.includes("no") && !msgtext.includes("poco") && !msgtext.includes("opuesto") && !msgtext.includes("chicas")) {
        ctx.reply("Como la tuya")
    } else if (msgtext.indexOf("por que") == 0 && msgtext.slice(-1) === "?") {
        ctx.reply("Porque sos un forro")
    } else if (msgtext.indexOf("xq") == 0 && msgtext.slice(-1) === "?") {
        ctx.reply("xq sos un forro")
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
    } else if (msgtext.includes("no puedo") && (msgtext.includes("hoy") || msgtext.includes("mañana"))) {
        ctx.reply("🐔")
    } else if (msgtext.includes("no puedo") && msgtext.includes("al final")) {
        ctx.replyWithSticker("CAADAQADdwAD6QqSCfn5rSTvqA21Ag") //B85
    } else if (msgtext.includes("sale alg")) {
        ctx.replyWithSticker("CAADAQADJgAD6QqSCRNz5RHk65xxAg") //Age
    } else if (msgtext.includes("festej") && msgtext.includes("cumple")) {
        ctx.reply("hay minitas?")
    } else if (msgtext.includes("espi") && (msgtext.includes("gato") || msgtext.includes("gil") || msgtext.includes("puto"))) {
        ctx.reply(msgtext.replace("espi", "vos"))
    }
})

bot.on('audio', (ctx) => ctx.replyWithSticker("CAADAQADiQADf1NpCXJ3mjKH0610Ag"))
bot.on('voice', (ctx) => ctx.replyWithSticker("CAADAQADiQADf1NpCXJ3mjKH0610Ag"))

bot.startPolling()

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)

