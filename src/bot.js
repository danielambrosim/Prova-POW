const { Telegraf } = require('telegraf');
const sqlite3 = require('sqlite3');
const { PrismaClient } = require('@prisma/client');

const bot = new Telegraf('7137182747:AAFXwmm8Fyzeja7cZSoSITCOo8IWkq2dpWI');
const db = new sqlite3.Database('./data.db');
const prisma = new PrismaClient();

bot.on('text', async (ctx) => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();

    if (currentHour >= 9 && currentHour < 18) {
        await ctx.reply('Horário comercial! Aqui está o link: https://uvv.br');
    } else {
        await ctx.reply('A empresa está fechada agora. Nosso horário de funcionamento é das 09:00 às 18:00. Por favor, deixe seu e-mail para que possamos entrar em contato.');
        // Armazenar e-mail no banco de dados
        const email = ctx.message.from.email || 'E-mail não fornecido';
        await prisma.emails.create({ data: { email } });
    }
});

bot.launch();
