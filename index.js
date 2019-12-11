const schedule = require('node-schedule')
const Telegraf = require('telegraf')
const fs = require('fs')

const bot = new Telegraf(process.env.TOKEN)
var groups = new Set([])
var index = 3
var listening = 0
var enabled = 0

const RANDOM_CHANCE = 0.33

bot.start((ctx) => {
        ctx.reply('Welcome!')
        bot.telegram.sendMessage(-258588711, "Added by user " + JSON.stringify(ctx.message.from)) //Test
})

var trivia = "*¿Sabías que ... ?*  -  #WittyTrivia \n  _WittyBot_ "
var triviamsj = ["tiene acceso a todos tus mensajes, pero no se los vende a la NSA ni a la SIDE, él es fiel a la KGB.",
             "está hecho enteramente en JavaScript, y su código es un verdadero _espanto_.",
             "acepta sugerencias de trivias; para mandar tu idea, podés escribirla en un papel, hacer un rollito y metertela en el culo.",
             //"no tiene ningún comando para dejar de mandar trivias.",
             "nació el 30 de marzo de 2018 a las 22:22 con un peso de 2.5 KB. Es livianito, no como tu vieja.",
             "en el fondo a tu vieja la quiere, insulta para sobrellevar sus mambos.",
             //"no usa tu celular para minar bitcoin. Cuántos bots pueden decir eso, eh.",
             "no tiene witty_bot como handle porque un forro se lo afanó.",
             "fue hecho íntegramente fuera del horario laboral. Posta. Bueno, no, mentira.",
             //"está hosteado gratuitamente en Now (https://zeit.co/now). Tu vieja en cambio no entra en el pack gratis. Ni en el pago.",
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
const MESAZA = -1001257195611

//Stickers
const METETE = "CAADAQADRQMAAtyP1QToOlnHF3aWcwI"
const AUDIO = "CAADAQADiQADf1NpCXJ3mjKH0610Ag"
const B85 = "CAADAQADdwAD6QqSCfn5rSTvqA21Ag"
const SALE = "CAADAQAD0gAD6QqSCeW2bdJqwvZ1Ag"
const TELODIJO = "CAADAQADaAIAAm6kFAhx6aR_uItdqAI"
const AGE = "CAADAQADJgAD6QqSCRNz5RHk65xxAg"
const PONELAFECHA = "CAADAQADQgEAAukKkgmZiDn1BuNjnRYE"

var meLoDijo = ["Me lo dijo?",
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
            "Y vos sos un boludo",
            "Vení y decímelo en la cara, gato"
            ]

var refranes = ["al que madruga",
		"a caballo regalado",
		"no por mucho madrugar",
		"en casa de herrero",
		"a rey muerto",
		"muerto el perro",
		"al que (l.? )?quier.? celeste",
		"aunque se vista de seda",
        "a buen entendedor"
		]

var toAscii = function(str) {
        return str.toLowerCase()
        .replace(/á/g, 'a')
        .replace(/é/g, 'e')
        .replace(/í/g, 'i')
        .replace(/ó/g, 'o')
        .replace(/ú/g, 'u')
        .replace(/ü/g, 'u')
        .replace(/¿/g, '?')
        .replace(/\./g, '')
}

schedule.scheduleJob('0 21 * * *', () => {
    groups.forEach(function(group) {
        //bot.telegram.sendMessage(group, trivia + triviamsj[index % triviamsj.length], {parse_mode:"Markdown"})
    })
    groups = new Set([])
    index += 1
    fs.writeFile("./indice", index, function(err) {});
})

schedule.scheduleJob('15 15 * * *', () => {
    var buffer = fs.readFileSync("./indice", 'utf8');
    console.log(buffer)
    try {
      index = JSON.parse(buffer)
    } catch (error) {
      console.log("Error leyendo index")
    }
    if (new Date().getMonth() == 9 && new Date().getDate() == 17) {
      groups.forEach(function(group) {
        bot.telegram.sendMessage(group, "Feliz día del peroncho")        
        bot.telegram.sendSticker(group, "CAADAQADJwEAAukKkglIgtpkyo4i9QI") // Smaugs
      })
    } 
})

bot.on('new_chat_members', (ctx) => {
    if (ctx.message.new_chat_participant.id == WITTY) { //Witty
        bot.telegram.sendMessage(TEST, "Added to group " + ctx.message.chat.id) //Test
    }
})

bot.on('new_chat_title', (ctx) => {
    var msgtext = toAscii(ctx.message.new_chat_title)
    if (msgtext.match("dign") && !msgtext.match("ayer")) { 
        ctx.replyWithSticker(SALE)
    }
})

bot.hears(["/trivia", "/trivia@tuvieja_bot"], (ctx) => {
  var n = Math.floor(Math.random() * triviamsj.length)
  ctx.replyWithMarkdown(trivia + triviamsj[n])
})

bot.hears(["/enable", "/enable@tuvieja_bot"], (ctx) => {
    if (ctx.message.from.id === ME && ctx.chat.id == TEST)
      enabled = 1
})

bot.hears(["/disable", "/disable@tuvieja_bot"], (ctx) => {
    if (ctx.message.from.id === ME && ctx.chat.id == TEST)
      enabled = 0
})

//Regla: match all, don't match any, reply, reply type
var reglas = [[["^sale.*(dign|age)"], [], SALE, "Sticker"], //Sale
		[["^tu vieja$"], [], TELODIJO, "Sticker"], //Te lo dijo
		[["^.?quien.*\\?$"], ["quienes"], "Tu vieja", "Random"],
    	[["^a (quien|alguien|alguno).*\\?$"], [], "A tu vieja", "Text"],
		[["^.{0,4}(alguno|alguien).*\\?$"], [], "Tu vieja", "Random"],
		[["^por que.*\\?$"], [], "Porque sos un forro", "Random"],
		[["^.{0,4}x.?q.*\\?$"], [], "xq sos un forro", "Text"],
		[["^.?donde\\?$"], [], "donde caga el conde", "Text"],
		[["larga |grande|gigante|enorme|magnifica|sabrosa|deliciosa|sublime|extraordinaria"], ["no|poco|opuesto"], "Como ésta", "Random"],
		[["corta |chica|microscopica"], ["no|poco|opuesto|chicas"], "Como la tuya", "Random"],
		[["llendo"], [], "*yendo", "Forro"],
		[["^haber que"], [], "*a ver", "Forro"],
		[["louta"], [], "a ver si la cortás con louta", "Forro"],
		[["domingo", "10", "am"], [], "Nadie se levanta a esa hora", "Forro"],
		[["no puedo|se me complica", "hoy|mañana|el (lunes|martes|miercoles|jueves|viernes|sabado|domingo)| ir "], [], "🐔", "Text"],
		[["no puedo|se me complica", "al final"], [], "🐔", "Text"], //B85
		[["sale alg"], [], AGE, "Sticker"], //Age
		[["festej", "cumple"], [], "hay minitas?", "Text"],
    [[" var "], [], "el var es lo peor que le pasó al fútbol", "Text"],
		[["ocho$"], [], "El culo te abrocho", "Text"],
		[["8$"], [], "El culo te abrocho", "Text"],
		[["que marcelo\\?$"], [], "Agachate y conocelo", "Text"],
		[["marcelou.?$"], [], "Agachate y conocelou", "Text"],
	    [["que fiesta\\?"], [], "La de tu culo y ésta", "Text"],
		[["que foto\\?"], [], "La de tu culo y mi choto", "Text"],
    	[[refranes.join(".{0,4}$|")], [], "...se lo cogen entre todos", "Text"],
		[["/help"], [], "Agregame a un grupo y esperá a que alguien diga 'ocho', o poné /trivia", "Text"],
		[["frio$"], [" no ", "nunca"], "Ponete la capa de tu tío", "Text"],
		[["calor$"], [" no ", "nunca"], "Tocá el tambor", "Text"],
    [["algun dia"], [], PONELAFECHA, "Sticker"],
              
    [["est", "corriendo"], [], "En Glitch", "Text"],

		[["witty", "bolas|huevos|denso|basta"], [], "Yo sólo quería ser popular", "Text"],
		[["witty", "te amo|crack|s lo mas"], [" no ","nunca"], "😘", "Text"],
		[["witty", "te odio"], [" no "], "A la gilada ni cabida", "Text"],
		[["(saquemos|sacamos|matar|sacar|matemos|matamos|echar|echemos) a witty.*\\??$"], [], "CAADAQADVAAD8MuSFJGuP3uwKyXfAg", "Sticker"],
		[["witty", "chau"], [], "CAADAQADVAAD8MuSFJGuP3uwKyXfAg", "Sticker"],
		[["^(che,? )?witty\\??$"], [], "Qué?", "Listen"],
		[["witty.*\\?$"], [], "Me lo preguntó", "Text"],
		[["el bot |el bot$"], [], "¿Están hablando de mí? Tengo nombre", "Text"]
		]

var reglasListening = [
		[["bolas|huevos|denso|basta"], [], "Yo sólo quería ser popular", "Text"],
		[["te amo|crack"], [" no ","nunca"], "😘", "Text"],
		[["te odio"], [" no "], "A la gilada ni cabida", "Text"],
		[["chau"], [], "CAADAQADVAAD8MuSFJGuP3uwKyXfAg", "Sticker"],
		[["sos"], [], "Me lo dijo", "Text"],
  	[["forro"], [], "Forro vos", "Text"],
		[["no jodas"], [], "Sí jodo", "Text"],
		[["\\?$"], [], "Me lo preguntó", "Text"],
		[["hoy|mañana|el (lunes|martes|miercoles|jueves|viernes|sabado|domingo)"], [], SALE, "Sticker"]]

var getReply = (msgtext) => {
  	for (var i = 0; i < reglas.length; i++) {

		if (reglas[i][0].every(function(regex) {return msgtext.match(regex)}) 
			&& !reglas[i][1].some(function(regex) {return msgtext.match(regex)})) {
        return {text: reglas[i][2], type: reglas[i][3]}
		}
	}

    var tgt = [/espi+/gi, /javi/gi, /witty+(bot)?/gi]
    for (i = 0; i < tgt.length; i++) {
        if (msgtext.match(tgt[i]) && msgtext.match("gato|gil|puto|forro|chupala|morite|malisimo") && !msgtext.match("no|nunca")) {
            for (var j = 0; j < tgt.length; j++)
                msgtext = msgtext.replace(tgt[j], "vos")
            return (msgtext.replace(" es ", " sos ").replace(/yy/g, 'ss').replace(/sy/g, 'ss'));
        }
    }

    var tgt = ["del orto", "de mierda", "de verga"]
    for (i = 0; i < tgt.length; i++) {
        if (msgtext.match(tgt[i]) && msgtext.match("wittybot|witty")) {
            return "Humano " + tgt[i];
        }
    }

    if (msgtext.match("witty") && msgtext.split(" ").indexOf("sos") > -1) { // witty y algo más
        var n = Math.floor(Math.random() * meLoDijo.length)
        return meLoDijo[n]
	  } 

    if (listening == 1) {
	    for (i = 0; i < reglasListening.length; i++) {

	        if (reglasListening[i][0].every(function(regex) {return msgtext.match(regex)}) 
		        && !reglasListening[i][1].some(function(regex) {return msgtext.match(regex)})) {
                listening = 0
                return {text: reglasListening[i][2], type: reglasListening[i][3]}
	        }
        }
        listening = 0
    }

}


bot.on('text', (ctx) => {
    //try {
    
    var msgtext = toAscii(ctx.message.text)
    groups.add(ctx.message.chat.id)

	if (ctx.message.forward_from != undefined) return 1; //Ignorar mensajes forwardeados

  if (ctx.message.from.id === ME && ctx.chat.id != TEST && !enabled) return 1;
  if (msgtext.match("http")) return 1;

  var reply = getReply(msgtext)
  
  
    if (reply != undefined) {
      
      if (reply.text == undefined) {
        const reply2 = {text: reply, type: "Text"}
        reply = reply2
      }
  
      
      getGender(ctx.from).then(gender => {

        var greply = genderize(gender, reply.text)
        if (reply.type === "Text") {
          ctx.reply(greply)
        } else if (reply.type === "Sticker") {
          ctx.replyWithSticker(reply.text)
        } else if (reply.type === "Forro") {
          ctx.reply(greply)
          console.log(gender)
          ctx.reply(genderize(gender, "Forro"))
        } else if (reply.type === "Random" && (Math.random() < RANDOM_CHANCE || ctx.message.chat.id > 0)) {
          ctx.replyWithMarkdown(greply)
        } else if (reply.type === "Listen") {
          ctx.reply(greply)
          listening = 1
        }

      })
    }
    /*} catch (err) {
        bot.telegram.forwardMessage(-255486826, ctx.message.chat.id, ctx.message.message_id)
    }*/
})

const https = require('https');
var getGender = (from) => {
  return new Promise(function(resolve, reject) {
    var firstName = toAscii(from.first_name.split(" ")[0])
    https.get("https://api.genderize.io/?name=" + firstName, (resp) => {
      
      resp.setEncoding('utf8')
      resp.on('data', (chunk) => {
        chunk = JSON.parse(chunk)
        resolve(chunk.gender)
      })
    })
  })
}

var genderize = (gender, text) => {
    text = " " + text + " "
    if (gender == "male")
      return text
    if (gender == null)
      return text.replace(" un ", " unx ").replace(/forro/ig, "forrx").substring(1)
    if (gender == "female")
      return text.replace(" un ", " una ").replace(/forro/ig, "forra").substring(1)
}

bot.on(['audio', 'voice'], ctx => {
  if (ctx.message.chat.id != SMAUGS)
    ctx.replyWithSticker(AUDIO)
})

bot.startPolling()

//const {createServer} = require('http')
//const server = createServer(() => {})
//server.listen(process.env.PORT || 3000)

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
