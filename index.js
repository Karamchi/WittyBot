const schedule = require('node-schedule')
const Telegraf = require('telegraf')

const bot = new Telegraf(TOKEN)
groups = new Set([])
index = 16

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

//user/chat ids
const ME = 160565993
const WITTY = 573582514
const SMAUGS = -226076541
const TEST = -258588711

//Stickers
const METETE = "CAADAQADRQMAAtyP1QToOlnHF3aWcwI"
const AUDIO = "CAADAQADiQADf1NpCXJ3mjKH0610Ag"
const B85 = "CAADAQADdwAD6QqSCfn5rSTvqA21Ag"
const SALE = "CAADAQAD0gAD6QqSCeW2bdJqwvZ1Ag"
const TELODIJO = "CAADAQADaAIAAm6kFAhx6aR_uItdqAI"
const AGE = "CAADAQADJgAD6QqSCRNz5RHk65xxAg"

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
        bot.telegram.sendSticker(SMAUGS, METETE) // Smaugs
    else
        bot.telegram.sendMessage(SMAUGS, cuandoSale + cuandoSaleMsj[index % cuandoSaleMsj.length])
})

bot.on('new_chat_members', (ctx) => {
    if (ctx.message.new_chat_participant.id == WITTY) { //Witty
        bot.telegram.sendMessage(TEST, "Added to group " + ctx.message.chat.id) //Test
    }
})

bot.on('new_chat_title', (ctx) => {
    if (ctx.message.new_chat_title.match("dign")) { 
        ctx.replyWithSticker(SALE)
    }
})

//Regla: match all, don't match any, reply, reply type
reglas = [[["^sale.*(dign|age)"], [], SALE, "Sticker"], //Sale
		[["^tu vieja$"], [], TELODIJO, "Sticker"], //Te lo dijo
		[["^.?quien.*\\?$"], ["quienes"], "Tu vieja", "Random"],
    	[["^a (quien|alguien|alguno).*\\?$"], [], "A tu vieja", "Text"],
		[["^.{0,4}(alguno|alguien).*\\?$"], [], "Tu vieja", "Random"],
		[["^por que.*\\?$"], [], "Porque sos un forro", "Random"],
		[["^.{0,4}x.?q.*\\?$"], [], "xq sos un forro", "Text"],
		[["^.?donde\\?$"], [], "donde caga el conde", "Text"],
		[["larga |grande|gigante|enorme|magnifica|sabrosa|deliciosa"], ["no|poco|opuesto"], "Como ésta", "Random"],
		[["corta |chica|microscopica"], ["no|poco|opuesto|chicas"], "Como ésta", "Random"],
		[["llendo"], [], "*yendo", "Forro"],
		[["^haber que"], [], "*a ver", "Forro"],
		[["louta"], [], "a ver si la cortás con louta", "Forro"],
		[["domingo", "10", "am"], [], "Nadie se levanta a esa hora", "Forro"],
		[["no puedo|se me complica", "hoy|mañana|ir"], [], "🐔", "Text"],
		[["no puedo|se me complica", "al final"], [], B85, "Sticker"], //B85
		[["sale alg"], [], AGE, "Sticker"], //Age
		[["festej", "cumple"], [], "hay minitas?", "Text"],
		[["ocho$"], [], "El culo te abrocho", "Text"],
		[["8$"], [], "El culo te abrocho", "Text"],
		[["que marcelo\\?$"], [], "Agachate y conocelo", "Text"],
		[["marcelou.?$"], [], "Agachate y conocelou", "Text"],
	    [["que fiesta?"], [], "La de tu culo y ésta", "Text"],
		[["que foto?"], [], "La de tu culo y mi choto", "Text"],
    	[[refranes.join(".{0,4}$|")], [], "...se lo cogen entre todos", "Text"],
		[["witty", "bolas|huevos"], [], "Yo sólo quería ser popular", "Text"],
		[["sa.{2,3}mos a witty.*\\??$"], [], "CAADAQADVAAD8MuSFJGuP3uwKyXfAg", "Sticker"],
		[["witty", "chau"], [], "CAADAQADVAAD8MuSFJGuP3uwKyXfAg", "Sticker"],
		[["^(che,? )?witty\\??$"], [], "Qué?", "Text"],
		[["witty.*\\?$"], [], "Me lo preguntó", "Text"]
		]

bot.on('text', (ctx) => {

    msgtext = toAscii(ctx.message.text)
    groups.add(ctx.message.chat.id)

	if (ctx.message.forward_from != undefined) return 1;
    if (ctx.message.from.id === ME && ctx.chat.id != -258588711) return 1; //Yo, test

	for (i = 0; i < reglas.length; i++) {

		if (reglas[i][0].every(function(regex) {return msgtext.match(regex)}) 
			&& !reglas[i][1].some(function(regex) {return msgtext.match(regex)})) {
			if (reglas[i][3] === "Text") {
				ctx.replyWithMarkdown(reglas[i][2])
			} else if (reglas[i][3] === "Sticker") {
				ctx.replyWithSticker(reglas[i][2])
			} else if (reglas[i][3] === "Forro") {
				ctx.reply(reglas[i][2])
				ctx.reply("Forro")
			} else if (reglas[i][3] === "Random" && Math.random() > .5) {
				ctx.replyWithMarkdown(reglas[i][2])
			}
			return 1
		}
	}

    if (msgtext.includes("espi") && msgtext.match("gato|gil|puto|forro|chupala")) {
        ctx.reply(msgtext.replace("espi", "vos").replace("es", "sos"))
    } else if (msgtext.split(" ").indexOf("witty") > -1 && msgtext.match("gato|gil|puto|forro|chupala") && !msgtext.match("no|nunca")) {
        ctx.reply(msgtext.replace("witty", "vos").replace("es", "sos"))
    } else if (msgtext.split(" ").indexOf("witty") > -1 && msgtext.split(" ").indexOf("sos") > -1) { // witty y algo más
        n = Math.floor(Math.random() * meLoDijo.length)
        ctx.reply(meLoDijo[n])
	} else if (msgtext.split(" ").indexOf("witty") > -1 && msgtext.match("te amo|crack")) {
        ctx.reply("😘")
    } 
})

bot.on('audio', (ctx) => ctx.replyWithSticker(AUDIO))
bot.on('voice', (ctx) => ctx.replyWithSticker(AUDIO))

bot.startPolling()

const {createServer} = require('http')
const server = createServer(() => {})
server.listen(3000)

