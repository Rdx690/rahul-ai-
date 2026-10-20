const express = require('express');
const path = require('path');
const fs = require('fs');
const { 
    default: makeWASocket, 
    useMultiFileAuthState, 
    DisconnectReason,
    fetchLatestBaileysVersion,
    downloadMediaMessage,
    Browsers,
    delay 
} = require('@whiskeysockets/baileys');
const pino = require('pino');
const axios = require('axios');
const QRCode = require('qrcode');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

const app = express();
const PORT = process.env.PORT || 8080;
app.use(express.json());

let sock = null;
let PREFIX = '.';
let isAlwaysOnline = true;
let isAutoStatusView = true;
let isAutoReact = true;

// 🌐 Pairing Portal Interface
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>RAHUL AI MINI • Portal</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body{background:#0a0c16;color:#fff;font-family:sans-serif;display:flex;align-items:center;justify-content:center;height:100vh;margin:0;}
            .box{background:#121629;padding:30px;border-radius:15px;text-align:center;box-shadow:0 0 20px #00e5ff33;border:1px solid #00e5ff55;}
            h2{color:#00e5ff;margin-bottom:15px;}
            input{padding:12px;width:80%;border-radius:8px;border:1px solid #00e5ff;background:#000;color:#fff;margin-bottom:15px;}
            button{padding:12px 25px;border-radius:8px;border:none;background:linear-gradient(90deg,#00e5ff,#a855f7);color:#000;font-weight:bold;cursor:pointer;}
            .code{margin-top:20px;font-size:24px;color:#00e5ff;letter-spacing:4px;}
        </style>
    </head>
    <body>
        <div class="box">
            <h2>⚡ RAHUL AI MINI ⚡</h2>
            <p>Enter WhatsApp Number with Country Code</p>
            <input type="text" id="phone" value="919356730236">
            <br>
            <button onclick="getCode()">GET PAIRING CODE</button>
            <div id="out" class="code"></div>
        </div>
        <script>
            async function getCode(){
                const num = document.getElementById('phone').value;
                const res = await fetch('/pair?number=' + num);
                const data = await res.json();
                document.getElementById('out').innerText = data.code || data.error;
            }
        </script>
    </body>
    </html>
    `);
});

// 🔑 Pairing Code API
app.get('/pair', async (req, res) => {
    let num = (req.query.number || '919356730236').replace(/[^0-9]/g, '');
    if (!sock) return res.json({ error: 'Socket initializing, wait 5s...' });
    try {
        if (!sock.authState.creds.registered) {
            await delay(1500);
            let code = await sock.requestPairingCode(num);
            return res.json({ code: code });
        }
        return res.json({ error: 'Bot already linked!' });
    } catch (e) {
        return res.json({ error: e.message });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// 🤖 WhatsApp Connection
async function connectToWA() {
    const authDir = path.resolve('session');
    const { state, saveCreds } = await useMultiFileAuthState(authDir);
    const { version } = await fetchLatestBaileysVersion();

    sock = makeWASocket({
        version,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false,
        auth: state,
        browser: Browsers.ubuntu("Chrome")
    });

    sock.ev.on('creds.update', saveCreds);

    sock.ev.on('connection.update', (update) => {
        const { connection, lastDisconnect } = update;
        if (connection === 'close') {
            const reconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
            if (reconnect) setTimeout(connectToWA, 3000);
        } else if (connection === 'open') {
            console.log('✅ RAHUL AI MINI IS CONNECTED!');
            const userJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
            sock.sendMessage(userJid, { text: `🚀 *RAHUL AI MINI Connected!*\n\n📌 Prefix: \`${PREFIX}\`` });
        }
    });

    sock.ev.on('messages.upsert', async (m) => {
        try {
            const msg = m.messages[0];
            if (!msg.message) return;
            const from = msg.key.remoteJid;
            const text = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || msg.message.videoMessage?.caption || '';

            // Auto React & Presence
            if (isAutoReact && !msg.key.fromMe && from !== 'status@broadcast') {
                const emojis = ['⚡', '❤️', '🔥', '🤖', '✨'];
                await sock.sendMessage(from, { react: { text: emojis[Math.floor(Math.random() * emojis.length)], key: msg.key } });
            }
            if (isAlwaysOnline && from) await sock.sendPresenceUpdate('available', from);

            // Auto Status View
            if (from === 'status@broadcast') {
                if (isAutoStatusView) await sock.readMessages([msg.key]);
                return;
            }

            if (!text.startsWith(PREFIX)) return;
            const body = text.slice(PREFIX.length).trim();
            const cmd = body.toLowerCase().split(' ')[0];
            const args = body.split(' ').slice(1).join(' ');

            // 📜 COMMANDS

            // ⚙️ SETTINGS MENU (Interactive Control Panel)
            if (cmd === 'settings' || cmd === 'config' || cmd === 'setting') {
                const settingsMenu = `⚙️ *RAHUL AI MINI - BOT SETTINGS* ⚙️

📌 *Current Configuration:*
[ 👑 ] *Prefix:* \`${PREFIX}\`
[ 🟢 ] *Always Online:* ${isAlwaysOnline ? '🟢 ON' : '🔴 OFF'}
[ 👀 ] *Auto Status View:* ${isAutoStatusView ? '🟢 ON' : '🔴 OFF'}
[ ❤️ ] *Auto React:* ${isAutoReact ? '🟢 ON' : '🔴 OFF'}

━━━━━━━ COMMANDS ━━━━━━━
🟢 *Always Online:*
└ \`${PREFIX}alwaysonline on\` / \`${PREFIX}alwaysonline off\`

👀 *Auto Status View:*
└ \`${PREFIX}autostatus on\` / \`${PREFIX}autostatus off\`

❤️ *Auto React:*
└ \`${PREFIX}autoreact on\` / \`${PREFIX}autoreact off\`
━━━━━━━━━━━━━━━━━━━━━━`;

                await sock.sendMessage(from, { text: settingsMenu }, { quoted: msg });
            }

            // 👁️ AUTO STATUS VIEW COMMAND
            else if (cmd === 'autostatus' || cmd === 'statusview') {
                if (args === 'on') {
                    isAutoStatusView = true;
                    await sock.sendMessage(from, { text: '✅ *Auto Status View ON केले आहे!*' }, { quoted: msg });
                } else if (args === 'off') {
                    isAutoStatusView = false;
                    await sock.sendMessage(from, { text: '❌ *Auto Status View OFF केले आहे!*' }, { quoted: msg });
                } else {
                    await sock.sendMessage(from, { text: `👀 *Auto Status Status:* ${isAutoStatusView ? '🟢 ON' : '🔴 OFF'}\n\nUse: \`${PREFIX}autostatus on\` किंवा \`${PREFIX}autostatus off\`` }, { quoted: msg });
                }
            }

            // 🟢 ALWAYS ONLINE COMMAND
            else if (cmd === 'alwaysonline' || cmd === 'autoonline') {
                if (args === 'on') {
                    isAlwaysOnline = true;
                    await sock.sendPresenceUpdate('available', from);
                    await sock.sendMessage(from, { text: '✅ *Always Online Status ON केले आहे!*' }, { quoted: msg });
                } else if (args === 'off') {
                    isAlwaysOnline = false;
                    await sock.sendPresenceUpdate('unavailable', from);
                    await sock.sendMessage(from, { text: '❌ *Always Online Status OFF केले आहे!*' }, { quoted: msg });
                } else {
                    await sock.sendMessage(from, { text: `🟢 *Always Online Status:* ${isAlwaysOnline ? '🟢 ON' : '🔴 OFF'}\n\nUse: \`${PREFIX}alwaysonline on\` किंवा \`${PREFIX}alwaysonline off\`` }, { quoted: msg });
                }
            }

            // ❤️ AUTO REACT COMMAND
            else if (cmd === 'autoreact') {
                if (args === 'on') {
                    isAutoReact = true;
                    await sock.sendMessage(from, { text: '✅ *Auto React ON केले आहे!*' }, { quoted: msg });
                } else if (args === 'off') {
                    isAutoReact = false;
                    await sock.sendMessage(from, { text: '❌ *Auto React OFF केले आहे!*' }, { quoted: msg });
                } else {
                    await sock.sendMessage(from, { text: `❤️ *Auto React Status:* ${isAutoReact ? '🟢 ON' : '🔴 OFF'}\n\nUse: \`${PREFIX}autoreact on\` किंवा \`${PREFIX}autoreact off\`` }, { quoted: msg });
                }
            }

            // ⚡ PING COMMAND
            else if (cmd === 'ping') {
                await sock.sendMessage(from, { text: '⚡ *Pong! RAHUL AI MINI Active!*' }, { quoted: msg });
            } 

            // 📑 MENU COMMAND
            else if (cmd === 'menu' || cmd === 'help') {
                const menu = `╭━━〔 ✦ RAHUL AI MINI ✦ 〕━━╮
┃ 👑 *Owner:* RAHUL MASTER
┃ ⌨️ *Prefix:* ${PREFIX}
┃
┃ ◈ ${PREFIX}settings (Control Panel)
┃ ◈ ${PREFIX}autostatus on/off
┃ ◈ ${PREFIX}alwaysonline on/off
┃ ◈ ${PREFIX}autoreact on/off
┃ ◈ ${PREFIX}ai <text>
┃ ◈ ${PREFIX}play <song>
┃ ◈ ${PREFIX}sticker (reply image)
┃ ◈ ${PREFIX}qr <text>
┃ ◈ ${PREFIX}ping
╰━━━━━━━━━━━━━━━━━━━━━━╯`;
                await sock.sendMessage(from, { text: menu }, { quoted: msg });
            } 

            // 🤖 AI COMMAND
            else if (cmd === 'ai') {
                if (!args) return await sock.sendMessage(from, { text: '❌ Ask something!' }, { quoted: msg });
                try {
                    const res = await axios.get(`https://eliteprotech-apis.zone.id/ai/chatgpt?prompt=${encodeURIComponent(args)}`);
                    const reply = res.data?.text || res.data?.response || 'No response';
                    await sock.sendMessage(from, { text: `🤖 *RAHUL AI:* ${reply}` }, { quoted: msg });
                } catch {
                    await sock.sendMessage(from, { text: '❌ AI server error!' }, { quoted: msg });
                }
            } 

            // 🎵 MUSIC PLAY COMMAND
            else if (cmd === 'play') {
                if (!args) return await sock.sendMessage(from, { text: '❌ Provide song name!' }, { quoted: msg });
                await sock.sendMessage(from, { text: '🎵 Downloading audio...' }, { quoted: msg });
                try {
                    const res = await axios.get(`https://api.sayan-nexuswork.workers.dev/music?query=${encodeURIComponent(args)}`);
                    if (res.data?.url) {
                        await sock.sendMessage(from, { audio: { url: res.data.url }, mimetype: 'audio/mpeg' }, { quoted: msg });
                    } else {
                        await sock.sendMessage(from, { text: '❌ Song not found!' }, { quoted: msg });
                    }
                } catch {
                    await sock.sendMessage(from, { text: '❌ Audio download error!' }, { quoted: msg });
                }
            } 

            // 🎨 STICKER MAKER COMMAND
            else if (cmd === 'sticker' || cmd === 's') {
                const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
                const isImg = msg.message.imageMessage || quoted?.imageMessage;
                if (isImg) {
                    const media = await downloadMediaMessage(quoted ? { message: quoted } : msg, 'buffer', {});
                    const sticker = new Sticker(media, { pack: 'RAHUL AI MINI', author: 'RAHUL MASTER', type: StickerTypes.FULL });
                    const buffer = await sticker.toBuffer();
                    await sock.sendMessage(from, { sticker: buffer }, { quoted: msg });
                } else {
                    await sock.sendMessage(from, { text: '❌ Reply to an image!' }, { quoted: msg });
                }
            } 

            // 🔲 QR CODE MAKER COMMAND
            else if (cmd === 'qr') {
                if (!args) return await sock.sendMessage(from, { text: '❌ Enter text!' }, { quoted: msg });
                const qrBuffer = await QRCode.toBuffer(args);
                await sock.sendMessage(from, { image: qrBuffer, caption: `🔲 QR Code for: ${args}` }, { quoted: msg });
            }

        } catch (e) {
            console.error('Msg Error:', e);
        }
    });
}

connectToWA();
