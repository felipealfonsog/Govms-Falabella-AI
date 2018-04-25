//  Small Luis App for testing purposes 
//     -  C2018 Addessa Falabella - GovMS Corp. & Engineered by Soft. Engineer Lead Team - Felipe Gonzalez fgonzalez@govms.cl 
/*
//     appId: '4654af8d-5d1b-487e-a2aa-c5a965a30848',
//     appPassword: 'myAppSecret' (auth key : 6f065c7dfab74484bb9d2d8f24058975 )    ?????
*/

var restify = require('restify')
var env = require('dotenv')
var builder = require('botbuilder')


//Bot setting up

//Setup restify server
var server = restify.createServer()
server.listen(process.env.port || process.env.PORT || 3978, function() {
// server.listen(process.env.port || process.env.PORT || 53974, function() {
    console.log('%s listening to %s', server.name, server.url)
})

// crear chat bot

/*
otros usados:
 LUIS_MODEL=https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/37391ca9-d5cc-434f-995f-379a60bfd512?subscription-key=038dc2b0b5064bcaa02666f2ccd4954d&staging=true&timezoneOffset=-180&q=
QNA_ID=14d32c78-2c40-4d58-96ba-3a1a3f8c6a1d
QNA_KEY=2ea6057e218f4e14a965dbd2fe43201a

// actuales
KNOWLEDGE_BASE_ID=[087b54bc-faf5-4931-9964-9109cea9b774]
SUBSCRIPTION_KEY=[e056f175bb2a45109232f24070cd7031]
*/
var connector = new builder.ChatConnector({
    // appId: '4654af8d-5d1b-487e-a2aa-c5a965a30848',
    // appPassword: '6f065c7dfab74484bb9d2d8f24058975'
    appId: process.env.KNOWLEDGE_BASE_ID,
    appPassword: process.env.SUBSCRIPTION_KEY,
})
var bot = new builder.UniversalBot(connector)
// server.post('/api/messages/', connector.listen());

// possible error taking out the slash de messages
server.post('/api/messages', connector.listen())

//Bots dialogos
var intents = new builder.IntentDialog()
bot.dialog('/', intents)

intents.matches(/^change name/i, [
    function(session) {
        session.beginDialog('/profile');
    },
    function(session, results) {
        session.send('tu nombre se cambió a : %s', session.userData.name);
    }
])

intents.onDefault([
    function(session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile')
        } else {
            next()
        }
    },
    function(session, results) {
        session.send('Hola! %s!', session.userData.name)
    }
])

bot.dialog('/profile', [
    function(session) {
        builder.Prompts.text(session, 'hola!')
    },
    function(session, results) {
        session.userData.name = results.response
        builder.Prompts.text(session, 'Cual es tu edad ?')
    },
    function(session, results) {
        session.userData.age = results.response
        session.send('Gracias %s %s', session.userData.name, session.userData.age)
        session.endDialog()
    }
])

console.log('results')