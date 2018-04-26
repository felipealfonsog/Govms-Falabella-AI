//  Small Luis App for testing purposes 
//     -  C2018 Addessa Falabella - GovMS Corp. & Engineered by Soft. Engineer Lead Team - Felipe Gonzalez fgonzalez@govms.cl 
/*
//     appId: '4654af8d-5d1b-487e-a2aa-c5a965a30848',
//     appPassword: 'myAppSecret' (auth key : 6f065c7dfab74484bb9d2d8f24058975 )    ?????
*/
var restify = require('restify');
var builder = require('botbuilder');
var botbuilder_azure = require("botbuilder-azure");
var env = require('dotenv')

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.env.MicrosoftAppId,
    appPassword: process.env.MicrosoftAppPassword,
    openIdMetadata: process.env.BotOpenIdMetadata 
});

// Listen for messages from users 
server.post('/api/messages', connector.listen());

//-------------------------------------------------------------------------------------  

var bot = new builder.UniversalBot(connector, function (session, args) {
    session.send('You reached the default message handler. You said \'%s\'.', 
        session.message.text);
});

const LuisModelUrl = "https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4654af8d-5d1b-487e-a2aa-c5a965a30848?subscription-key=6f065c7dfab74484bb9d2d8f24058975&verbose=true&timezoneOffset=0&q=";

// Main dialog with LUIS
var recognizer = new builder.LuisRecognizer(LuisModelUrl);

var bot = new builder.UniversalBot(connector);

// Add the recognizer to the bot

var intents = new builder.IntentDialog({ recognizers: [recognizer] })

// Make sure you add code to validate these fields
var luisAppId = process.env.appId;
var luisAPIKey = process.env.appPassword;
var luisAPIHostName = process.env.openIdMetadata || 'westus.api.cognitive.microsoft.com';

// Create a recognizer that gets intents from LUIS, and add it to the bot
var recognizer = new builder.LuisRecognizer(LuisModelUrl);

var bot = new builder.UniversalBot(connector);

// Add a dialog for each intent that the LUIS app recognizes.
// See https://docs.microsoft.com/en-us/bot-framework/nodejs/bot-builder-nodejs-recognize-intent-luis 
bot.dialog('GreetingDialog',
    (session) => {
        session.send('You reached the Greeting intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Greeting'
})

bot.dialog('HelpDialog',
    (session) => {
        session.send('You reached the Help intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Help'
})

bot.dialog('CancelDialog',
    (session) => {
        session.send('You reached the Cancel intent. You said \'%s\'.', session.message.text);
        session.endDialog();
    }
).triggerAction({
    matches: 'Cancel'
})