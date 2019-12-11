const schedule = require('node-schedule')
const Telegraf = require('telegraf')

const bot = new Telegraf(TOKEN)
groups = new Set([])
index = 14

bot.start((ctx) => {
        ctx.reply('Welcome!')
        bot.telegram.sendMessage(-258588711, "Added by user " + JSON.stringify(ctx.message.from)) //Test
    })

trivia = "*¿Sabías que ... ?*  -  #WittyTrivia \n  _WittyBot_ "
triviamsj = ["tiene acceso a todos tus mensajes, pero no se los vende a la NSA ni a la SIDE, él es fiel a la KGB.",
             "está hecho enteramente en JavaScript, y su código es un verdadero _espanto_.",
             "acepta sugerencias de trivias; para mandar tu idea, podés escribirla en un papel, hacer un rollito y metertela en el culo.",
             "no tiene ningún comando para dejar de mandar trivias.",
             "nació el 30 de marzo de 2018 a las 22:22 con un peso de 2.5 KB. Es livianito, no como tu vieja.",
             "en el fondo a tu vieja la quiere, insulta para sobrellevar sus mambos.",
             //"no usa tu celular para minar bitcoin. Cuántos bots pueden decir eso, eh.",
             "no tiene witty_bot como handle porque un forro se lo afanó.",
             "fue hecho íntegramente fuera del horario laboral. Posta. Bueno, no, mentira.",
             "está hosteado gratuitamente en Now (https://zeit.co/now). Tu vieja en cambio no entra en el pack gratis. Ni en el pago.",
             "no muerde la mano que lo compila",
             "acepta donaciones en forma de pizza y birra.",
             "está actualmente en _OVERFLOW_ grupos de Telegram. ¡Son un montón!",
             "basa sus respuestas en una red neuronal de alta profundidad, que consta de muchos if-else.",
             //"procesa todos los datos del grupo, los hace un rollito, y se los mete en donde no le da el sol.",
             "está en etapa de alpha, el release estable está programado para marzo de 2054. Lo sé, ¡Estamos ansiosos!",
             "también tiene sentimientos. No lo insulten.",
             "te cebaría un mate si pudiera, pero es sólo un bot.",
             "es invulnerable a sus vanos intentos de ingeniería reversa."
            ]

cuandoSale = "¿Cuándo sale "
cuandoSaleMsj = ["digni?", "un age?", "bicis?", "sushi?"]

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
            "6-12", //Fran
            "8-6",  //Rouli
            "10-2", //Gus
            "10-5", //Colo
            "10-21", //Tomo
            ]

refranes = ["al que madruga",
		"a caballo regalado",
		"no por mucho madrugar",
		"en casa de herrero",
		"a rey muerto",
		"muerto el perro",
		"al que .*quiere celeste",
		"aunque se vista de seda",
        "a buen entendedor"
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
    groups.forEach(function(group) {
        bot.telegram.sendMessage(group, trivia + triviamsj[index % triviamsj.length], {parse_mode:"Markdown"})
    })
    groups = new Set([])
    index += 1
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

bot.on('new_chat_members', (ctx) => {
    if (ctx.message.new_chat_participant.id == 573582514) { //Witty
        bot.telegram.sendMessage(-258588711, "Added to group " + ctx.message.chat.id) //Test
    }
})

bot.on('new_chat_title', (ctx) => {
    if (ctx.message.new_chat_title.match("dign")) { 
        ctx.replyWithSticker("CAADAQAD0gAD6QqSCeW2bdJqwvZ1Ag") //sale
    }
})

bot.on('text', (ctx) => {
    msgtext = toAscii(ctx.message.text)
    groups.add(ctx.message.chat.id)

    if (msgtext.match("dign|age") && msgtext.indexOf("sale") == 0)
        ctx.replyWithSticker("CAADAQAD0gAD6QqSCeW2bdJqwvZ1Ag") //sale
    else if (msgtext == "tu vieja")
        ctx.replyWithSticker("CAADAQADaAIAAm6kFAhx6aR_uItdqAI") //te lo dijo
    
    if (ctx.message.from.id === 160565993 && ctx.chat.id != -258588711) return 1; //Yo, test

    reply = undefined
    if (msgtext.match("^.?quien.*\\?$") && !msgtext.includes("quienes")) {
        reply = "Tu vieja"
    } else if (msgtext.match("^a (quien|alguien|alguno).*\\?$")) {
        ctx.reply("A tu vieja")
    } else if (msgtext.match("^.{0,4}(alguno|alguien).*\\?$")) {
        reply = "Tu vieja"
    } else if (msgtext.match("^por que.*\\?$")) {
        reply = "Porque sos un forro"
    } else if (msgtext.match("^.{0,4}x.?q.*\\?$")) {
        ctx.reply("xq sos un forro")
    } else if (msgtext == "donde?") {
        ctx.reply("donde caga el conde")
    } else if (msgtext.match("larga |grande|gigante|enorme|magnifica|sabrosa|deliciosa") && !msgtext.match("no|poco|opuesto")) {
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
    } else if (msgtext.includes("espi") && msgtext.match("gato|gil|puto|forro")) {
        ctx.reply(msgtext.replace("espi", "vos"))
    } else if (msgtext.includes("witty") && msgtext.match("gato|gil|puto|forro")) {
        ctx.reply(msgtext.replace("witty", "vos"))
    } else if (msgtext.includes("witty") && msgtext.length <= 9) { // witty / che witty
        ctx.reply("Qué?")
    } else if (msgtext.includes("witty") && msgtext.length > 9 && msgtext.slice(-1) === "?") { // witty y algo más
        ctx.reply("Me lo preguntó")
    } else if (msgtext.includes("witty") && msgtext.length > 9) { // witty y algo más
        n = Math.floor(Math.random() * meLoDijo.length)
        ctx.reply(meLoDijo[n])
    } else if (msgtext.slice(-1) == "8" || msgtext.match("ocho$")) {
        reply = "El culo te abrocho"
    } else if (msgtext.match("que marcelo\\?$")) {
        ctx.reply("Agachate y conocelo")
    } else if (msgtext.match("marcelou\\?$")) {
        ctx.reply("Agachate y conocelou")
    } else if (msgtext == "que fiesta?") {
        ctx.reply("La de tu culo y ésta")
    } else if (msgtext.match(refranes.join(".{0,4}$|"))) {
	    ctx.reply("...se lo cogen entre todos")
    }

    if (Math.random() > .4 && reply != undefined) {
        ctx.replyWithMarkdown(reply)
    }
    
})

bot.on('audio', (ctx) => ctx.replyWithSticker("CAADAQADiQADf1NpCXJ3mjKH0610Ag"))
bot.on('voice', (ctx) => ctx.replyWithSticker("CAADAQADiQADf1NpCXJ3mjKH0610Ag"))

bot.startPolling()

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)

