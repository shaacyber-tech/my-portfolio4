const fetch = require('node-fetch');

exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') return { statusCode: 405 };
    
    // IP address correct aayi kittan ee line shradhikkuka
    // Netlify-il ninnu varunna real IP header-il ninnu edukkunnu
    const realIP = event.headers['x-forwarded-for'] ? event.headers['x-forwarded-for'].split(',')[0] : 'Unknown';
    
    const data = JSON.parse(event.body);
    
    const botToken = process.env.BOT_TOKEN; 
    const chatId = process.env.CHAT_ID;
    
    // IP-kku pakaram realIP variable use cheyyunnu
    const message = `🚨 *New Portfolio Visitor!*\n\n🌐 *Real IP:* \`${realIP}\`\n📍 *Location:* ${data.city}, ${data.region}, ${data.country}\n📮 *PIN Code:* ${data.pin}\n🏢 *ISP:* ${data.isp}\n🕒 *Time:* ${new Date().toLocaleString()}`;
    
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: 'Markdown' })
    });

    return { statusCode: 200, body: "Success" };
};
