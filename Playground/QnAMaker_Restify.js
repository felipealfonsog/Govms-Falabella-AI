
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

----------------------------------------------

https://chatbotslife.com/faq-chatbot-microsoft-bot-framework-node-js-qna-maker-e2e9b3f2d6d

*/

var restify = require('restify'); 
var builder = require('botbuilder'); 



// levantar restify 
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url); 
}); 

// 

// var connector = new builder.ChatConnector({
//     appId: '', 
//     appPassword: ''
// }); 

// creo a connector 

const connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword
});


//  usamos universalbot

// var connector = new builder.ConsoleConnector().listen();
server.post('/api/messages', connector.listen());
var bot = new builder.UniversalBot(connector, function (session) {
    session.send("You said: %s", session.message.text);
});


const recognizer = new cognitiveServices.QnAMakerRecognizer({
    knowledgeBaseId: process.env.KNOWLEDGE_BASE_ID,
    subscriptionKey: process.env.SUBSCRIPTION_KEY,
});

const qnaMakerDialog = new cognitiveServices.QnAMakerDialog({
    recognizers: [recognizer],
    defaultMessage: "No entiendo tu pregunta",
    qnaThreshold: 0.4,
});

var bot = new builder.UniversalBot(connector);

bot.dialog('/', qnaMakerDialog);bot.dialog('/', qnaMakerDialog);
