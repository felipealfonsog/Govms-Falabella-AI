 


// luis app 

 
//     appId: '4654af8d-5d1b-487e-a2aa-c5a965a30848', 
//     appPassword: 'myAppSecret' (auth key : 6f065c7dfab74484bb9d2d8f24058975 )    ?????
 
// 


var restify = require('restify');
  try {
  var builder = require('botbuilder');
     } catch (err) {
            console.log(err.message);
  }
//Bot setting up 

//Setup restify server
var server = restify.createServer();
        server.listen(process.env.port || process.env.PORT || 3978, function() {
        // server.listen(process.env.port || process.env.PORT || 53974, function() {
        console.log('%s listening to %s', server.name, server.url);
});

//crear chat bot
var connector = new builder.ChatConnector({
        appId: '4654af8d-5d1b-487e-a2aa-c5a965a30848',
        appPassword: '6f065c7dfab74484bb9d2d8f24058975'
});
var bot = new builder.UniversalBot(connector);
// server.post('/api/messages/', connector.listen());

// posible error retirando el slash de messages
server.post('/api/messages', connector.listen());


//Bots dialogos 
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^change name/i, [
        function (session) {
        session.beginDialog('/profile');
        },
        function (session, results) {
        session.send('tu nombre se cambio a : %s', session.userData.name);
        }
]);

intents.onDefault([
        function (session, args, next) {
                if (!session.userData.name) {
                session.beginDialog('/profile');
                } else {
                next();
                }
        },
        function (session, results) {
            session.send('Hola! %s!', session.userData.name);
        }   
]);

bot.dialog('/profile', [
        function (session) {
        builder.Prompts.text(session, 'hola!');
        },
            function (session, results) {
            session.userData.name = results.response;
            builder.Prompts.text(session, 'Cual es tu edad ?');
            },
                function (session, results) {
                session.userData.age = results.response;
                session.send('Gracias %s %s', session.userData.name, session.userData.age);
                session.endDialog();
                }
]);


