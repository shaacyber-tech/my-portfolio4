exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        // Frontend-il ninnu varunna IP details edukkunnu
        const data = JSON.parse(event.body);
        
        // Netlify Locker-il ninnu Token-um ID-yum edukkunnu (Secure!)
        const botToken = process.env.BOT_TOKEN;
        const chatId = process.env.CHAT_ID;
        
        const message = `🚨 *New Portfolio Visitor!*\n\n🌐 *IP:* \`${data.userIP}\`\n📍 *Location:* ${data.city}, ${data.region}, ${data.country}\n📮 *PIN Code:* ${data.pin}\n🏢 *ISP/Network:* ${data.isp}\n🕒 *Time:* ${new Date().toLocaleString()}`;
        
        const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        // Telegram-lekku message ayakkunnu
        await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        return { statusCode: 200, body: JSON.stringify({ status: "Success" }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: "Failed" }) };
    }
};
