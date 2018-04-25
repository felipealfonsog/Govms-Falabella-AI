

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

*/

 
var builder = require('botbuilder'); 

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector); 

// posible bug en este porcion de codigo, parece funcionar en mi ultimo test
// bot.dialog('/', [
//     function(session) {
//         // session.send('Hola Mundo!');
//         let msj = session.message.text; 
//         session.send(`Me dijiste: ${msj}`); 
//     }
// ]); 

bot.dialog('/', [
    function(session) {
        // mediante Prompts obtenemos el texto y finalmente le respondemos 
        builder.Prompts.text(session, 'Commo te llamas?');
    },
    function(session, results) {
        let msj = results.response; 
        session.send(`Hola ${msj}!`); 
    }
]); 
