const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') return { statusCode: 405 };
    const data = JSON.parse(event.body);
    
    // Token-um ID-yum Netlify Settings-il ninnu varunnu
    const botToken = process.env.BOT_TOKEN; 
    const chatId = process.env.CHAT_ID;
    
    const message = `🚨 *New Portfolio Visitor!*\n\n🌐 *IP:* \`${data.userIP}\`\n📍 *Location:* ${data.city}, ${data.region}, ${data.country}\n📮 *PIN Code:* ${data.pin}\n🏢 *ISP:* ${data.isp}\n🕒 *Time:* ${new Date().toLocaleString()}`;
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
    });

    return { statusCode: 200, body: "Success" };
};
