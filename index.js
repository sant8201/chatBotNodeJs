import openai from "./config/open-ai.js";
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
    console.log(colors.bold.blue('--------------Bem vindo ao ChatBot!---------------'))
    console.log(colors.bold.blue('----------Você pode iniciar um bate-papo----------'))
    const chatHistory = [];
    while (true) {
        const userInput = readlineSync.question(colors.bold.cyan('Pergunte: '));
        try {
            //Constroe mensagens das interações com o Bot
            const messages = chatHistory.map(([role, content])=>({role, content}))
            //Add ultimas entradas do usuário
            messages.push({role: 'user', content: userInput });
            //Chama a API com a entrada do usuário
            const completion = await openai.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: messages, temperature: 0.8,
            });
            // Get completion text/content
            const completionText = completion.data.choices[0].message.content;
            
            if (userInput.toLowerCase() === 'exit') {
                console.log(colors.yellow('MeuBot: ') + completionText);
                return;
            }
            console.log(colors.yellow('MeuBot: ') + completionText);
            //Atualização do history com as entradas do user e respostas do bot
            chatHistory.push(['user', userInput]);
            chatHistory.push(['assistant', completionText]);
        } catch (error) {
            console.error(colors.red(error));
        }
    }
}

main();





