

// working with Azure 
// https://www.youtube.com/watch?v=i7fREVbfPBA&index=1&list=PLdEZIomtmC1855g_qvudC_2-MhoROXijq
// Microsoft bot Builder 
// Para testeo por Felipe Gonzalez fgonzalez@govms.cl 

/*

Necesario : 
Git 2.16
Postman
SlackSetup
Bot/botframework-emulator-Setup-3.5.35
Node.JS-V8.9
VSCode 1.2.x
BD/StorageExplorer


// 
Intentando tecnica explicada aqui: 
https://chatbotslife.com/faq-chatbot-microsoft-bot-framework-node-js-qna-maker-e2e9b3f2d6d

*/

const restify = require('restify');
const builder = require('botbuilder');
const cognitiveServices = require('botbuilder-cognitiveservices');
require('dotenv').config()


const connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});


server.post('/api/messages', connector.listen());

// levantar restify 
// var server = restify.createServer();
// server.listen(process.env.port || process.env.PORT || 3978, function() {
//     console.log('%s listening to %s', server.name, server.url); 
// }); 

// 


var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});

/*

API's cuenta de Marco 

POST /knowledgebases/087b54bc-faf5-4931-9964-9109cea9b774/generateAnswer
Host: https://westus.api.cognitive.microsoft.com/qnamaker/v2.0
Ocp-Apim-Subscription-Key: e056f175bb2a45109232f24070cd7031
Content-Type: application/json
{"question":"hi"}

*/

server.post('/api/messages', connector.listen());

const recognizer = new cognitiveServices.QnAMakerRecognizer({
    knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
    subscriptionKey: process.env.SUBSCRIPTION_KEY,
});

// ahora usamos universalbot

// var connector = new builder.ConsoleConnector().listen();

const qnaMakerDialog = new cognitiveServices.QnAMakerDialog({
    recognizers: [recognizer],
    defaultMessage: "Lo siento, no entiendo tu pregunta.",
    qnaThreshold: 0.4,
});


// posible bug en este porcion de codigo, parece funcionar en mi ultimo test
// bot.dialog('/', [
//     function(session) {
//         // session.send('Hola Mundo!');
//         let msj = session.message.text; 
//         session.send(`Me dijiste: ${msj}`); 
//     }
// ]); 


var bot = new builder.UniversalBot(connector);

bot.dialog('/', qnaMakerDialog);


// bot.dialog('/', [
//     function(session) {
//         // mediante Prompts obtenemos el texto y finalmente le respondemos 
//         builder.Prompts.text(session, 'Como te llamas?');
//     },
//     function(session, results) {
//         let msj = results.response; 
//         session.send(`Hola ${msj}!`); 
//     }
// ]); 

