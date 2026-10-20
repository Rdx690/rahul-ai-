const express = require('express');
const fs = require('fs');
const path = require('path');
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
const yts = require('yt-search');
const QRCode = require('qrcode');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');
const { exec } = require('child_process');
const FormData = require('form-data');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let sock = null;

/* ============================================================
   🔥 RAHUL AI MINI — PREMIUM PAIRING PORTAL (NEW STYLE)
   ============================================================ */
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RAHUL AI MINI • Premium Pairing Portal</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; }
            :root{
                --primary:#00e5ff;
                --secondary:#a855f7;
                --accent:#ff2e88;
                --bg:#05060d;
                --card:rgba(15,17,30,0.75);
                --border:rgba(0,229,255,0.25);
                --text:#e2e8f0;
                --muted:#7c8798;
            }
            html,body{height:100%;}
            body{
                background:var(--bg);
                color:var(--text);
                min-height:100vh;
                overflow-x:hidden;
                position:relative;
                display:flex;
                flex-direction:column;
            }
            body::before{
                content:'';position:fixed;inset:0;
                background:
                    radial-gradient(ellipse at 15% 20%, rgba(0,229,255,0.18), transparent 55%),
                    radial-gradient(ellipse at 85% 25%, rgba(168,85,247,0.18), transparent 55%),
                    radial-gradient(ellipse at 50% 95%, rgba(255,46,136,0.15), transparent 60%);
                z-index:0;
                animation:pulseBg 10s ease-in-out infinite;
            }
            @keyframes pulseBg{
                0%,100%{opacity:0.85;}
                50%{opacity:1;}
            }
            body::after{
                content:'';position:fixed;inset:0;
                background-image:
                    linear-gradient(rgba(0,229,255,0.05) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(0,229,255,0.05) 1px, transparent 1px);
                background-size:50px 50px;
                z-index:0;
                mask-image:radial-gradient(circle at center, black 30%, transparent 85%);
                -webkit-mask-image:radial-gradient(circle at center, black 30%, transparent 85%);
                animation:gridMove 20s linear infinite;
            }
            @keyframes gridMove{
                0%{background-position:0 0;}
                100%{background-position:50px 50px;}
            }
            .particles{position:fixed;inset:0;z-index:0;overflow:hidden;pointer-events:none;}
            .particle{
                position:absolute;width:3px;height:3px;border-radius:50%;
                background:var(--primary);box-shadow:0 0 10px var(--primary);
                animation:float linear infinite;
            }
            @keyframes float{
                0%{transform:translateY(100vh) scale(0);opacity:0;}
                10%{opacity:1;}
                90%{opacity:1;}
                100%{transform:translateY(-10vh) scale(1.2);opacity:0;}
            }
            .navbar{
                position:relative;z-index:50;
                display:flex;align-items:center;justify-content:space-between;
                padding:18px 32px;
                background:rgba(8,10,20,0.75);
                backdrop-filter:blur(18px);
                -webkit-backdrop-filter:blur(18px);
                border-bottom:1px solid var(--border);
            }
            .nav-brand{
                display:flex;align-items:center;gap:12px;
                font-family:'Orbitron',sans-serif;font-weight:900;
                font-size:22px;letter-spacing:2px;
            }
            .brand-icon{
                width:42px;height:42px;border-radius:12px;
                background:linear-gradient(135deg,var(--primary),var(--secondary));
                display:flex;align-items:center;justify-content:center;
                font-size:20px;color:#05060d;
                box-shadow:0 0 20px rgba(0,229,255,0.6);
            }
            .brand-text{
                background:linear-gradient(90deg,var(--primary),var(--secondary),var(--accent));
                -webkit-background-clip:text;background-clip:text;
                -webkit-text-fill-color:transparent;
            }
            .brand-text small{
                display:block;font-size:9px;letter-spacing:4px;
                font-family:'Inter';font-weight:600;color:var(--muted);
                -webkit-text-fill-color:var(--muted);
            }
            .main-wrap{
                flex:1;display:flex;align-items:center;justify-content:center;
                padding:40px 20px;position:relative;z-index:10;
            }
            .card{
                position:relative;
                width:100%;max-width:440px;
                background:var(--card);
                backdrop-filter:blur(24px);
                -webkit-backdrop-filter:blur(24px);
                border-radius:26px;
                padding:38px 30px 30px;
                border:1px solid var(--border);
                box-shadow:0 25px 60px rgba(0,0,0,0.7), 0 0 60px rgba(0,229,255,0.12);
                text-align:center;
            }
            .logo-badge{
                display:inline-flex;align-items:center;justify-content:center;
                gap:10px;
                padding:12px 26px;border-radius:50px;
                background:rgba(0,229,255,0.08);
                border:1.5px solid rgba(0,229,255,0.5);
                margin-bottom:20px;
                box-shadow:0 0 25px rgba(0,229,255,0.35);
            }
            .logo-badge i{font-size:20px;color:var(--primary);}
            .logo-badge span{
                font-family:'Orbitron',sans-serif;font-weight:700;
                font-size:18px;letter-spacing:3px;
                background:linear-gradient(90deg,var(--primary),var(--secondary));
                -webkit-background-clip:text;background-clip:text;
                -webkit-text-fill-color:transparent;
            }
            h1{
                font-family:'Orbitron',sans-serif;
                font-size:20px;font-weight:700;
                letter-spacing:2px;margin-bottom:8px;
                color:#fff;
            }
            .subtitle{
                font-size:13px;color:var(--muted);
                margin-bottom:26px;line-height:1.5;
            }
            .input-group{position:relative;margin-bottom:18px;}
            .input-group i{
                position:absolute;left:18px;top:50%;
                transform:translateY(-50%);
                color:var(--primary);font-size:16px;
            }
            input[type="text"]{
                width:100%;padding:15px 15px 15px 48px;
                border-radius:14px;
                border:1.5px solid rgba(0,229,255,0.2);
                background:rgba(5,8,18,0.8);
                color:#fff;font-size:15px;
                outline:none;
            }
            input[type="text"]:focus{
                border-color:var(--primary);
                box-shadow:0 0 20px rgba(0,229,255,0.35);
            }
            .btn-main{
                width:100%;padding:15px;
                border-radius:14px;border:none;
                font-family:'Orbitron',sans-serif;
                font-size:15px;font-weight:700;letter-spacing:2px;
                color:#05060d;cursor:pointer;
                background:linear-gradient(90deg,var(--primary),var(--secondary),var(--accent));
                background-size:300% auto;
                box-shadow:0 0 25px rgba(0,229,255,0.5);
                transition:all .4s ease;
            }
            .code-box{
                margin-top:22px;padding:20px;
                background:rgba(0,229,255,0.05);
                border-radius:16px;
                border:1.5px dashed rgba(0,229,255,0.5);
                display:none;
            }
            .code-box h2{
                font-family:'Orbitron',sans-serif;
                font-size:32px;letter-spacing:8px;
                color:var(--primary);
            }
            .dev-credits{
                margin-top:26px;padding-top:20px;
                border-top:1px solid rgba(255,255,255,0.06);
                display:flex;justify-content:center;gap:24px;
            }
            .dev{
                display:flex;align-items:center;gap:8px;
                font-size:12px;color:var(--muted);
            }
            .dev b{color:var(--primary);font-weight:600;}
            .site-footer{
                padding:16px 24px;text-align:center;
                font-size:11px;color:var(--muted);
                border-top:1px solid rgba(255,255,255,0.04);
            }
        </style>
    </head>
    <body>
        <div class="particles" id="particles"></div>
        <nav class="navbar">
            <div class="nav-brand">
                <div class="brand-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                <div class="brand-text">RAHUL AI MINI<small>PREMIUM PAIRING</small></div>
            </div>
        </nav>
        <div class="main-wrap">
            <div class="card" id="mainCard">
                <div class="logo-badge">
                    <i class="fa-solid fa-bolt"></i>
                    <span>RAHUL-AI MINI</span>
                </div>
                <h1>PAIRING PORTAL</h1>
                <p class="subtitle">Enter your WhatsApp number to receive<br>a secure pairing code</p>
                <div class="input-group">
                    <i class="fa-solid fa-phone"></i>
                    <input type="text" id="phone" value="919356730236" placeholder="e.g. 919356730236">
                </div>
                <button class="btn-main" onclick="getPairingCode()">
                    <i class="fa-solid fa-bolt"></i> GET PAIRING CODE
                </button>
                <div id="codeContainer" class="code-box">
                    <div style="font-size:11px;color:var(--primary);margin-bottom:10px;">YOUR PAIRING CODE</div>
                    <h2 id="pairCode">-----</h2>
                </div>
                <div class="dev-credits">
                    <div class="dev"><i class="fa-solid code"></i> <b>RAHUL MASTER</b></div>
                    <div class="dev"><i class="fa-solid fa-robot"></i> <b>RAHUL AI MINI</b></div>
                </div>
            </div>
        </div>
        <footer class="site-footer">POWERED BY <span>RAHUL AI MINI</span> • DEVELOPED BY <span>RAHUL-MASTER</span></footer>
        <script>
            (function(){
                const container = document.getElementById('particles');
                for(let i=0;i<20;i++){
                    const p = document.createElement('div');
                    p.className = 'particle';
                    p.style.left = Math.random()*100 + '%';
                    p.style.animationDuration = (Math.random()*8 + 5) + 's';
                    container.appendChild(p);
                }
            })();
            async function getPairingCode() {
                const phone = document.getElementById('phone').value.trim();
                if(!phone) return alert('Please enter phone number');
                const btn = document.querySelector('.btn-main');
                btn.innerHTML = 'GENERATING...';
                try {
                    const res = await fetch('/pair?number=' + phone);
                    const data = await res.json();
                    if(data.code) {
                        document.getElementById('codeContainer').style.display = 'block';
                        document.getElementById('pairCode').innerText = data.code;
                    } else {
                        alert(data.error || 'Failed to get code.');
                    }
                } catch(e) { alert('Error connecting to server'); }
                btn.innerHTML = '<i class="fa-solid fa-bolt"></i> GET PAIRING CODE';
            }
        </script>
    </body>
    </html>
    `);
});

app.get('/pair', async (req, res) => {
    let phone = req.query.number || '919356730236';
    let cleanedNumber = phone.replace(/[^0-9]/g, '');
    if (!sock) {
        return res.json({ error: 'WhatsApp Socket is initialising, please wait 5 seconds and try again.' });
    }
    try {
        if (!sock.authState.creds.registered) {
            await delay(1500);
            let code = await sock.requestPairingCode(cleanedNumber);
            return res.json({ code: code, status: 'Success' });
        } else {
            return res.json({ error: 'Bot is already linked/registered!' });
        }
    } catch (err) {
        return res.json({ error: 'Pairing Error: ' + err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🌐 RAHUL AI MINI Web Server running on port ${PORT}`);
});

/* ============================================================
   ⚙️ BOT SETTINGS & FEATURES
   ============================================================ */
const startTime = Date.now();
let isAlwaysOnline = String(process.env.ALWAYS_ONLINE || 'false').toLowerCase() === 'true';
let isAutoStatusView = true;
let isAutoReact = true;
let isAutoDL = true;
let PREFIX = '.';

let presenceHeartbeat = null;
function syncAlwaysOnlineHeartbeat() {
    if (presenceHeartbeat) { clearInterval(presenceHeartbeat); presenceHeartbeat = null; }
    if (isAlwaysOnline) {
        presenceHeartbeat = setInterval(async () => {
            try { if (sock?.user) await sock.sendPresenceUpdate('available'); } catch (err) {}
        }, 25000);
        presenceHeartbeat.unref?.();
    }
}

let reconnectTimer = null;
let isConnecting = false;

async function getPersistentAuthDir() {
    const localDir = path.resolve('session');
    const volumeDir = '/data';
    if (fs.existsSync(volumeDir)) {
        const persistentDir = path.join(volumeDir, 'session');
        fs.mkdirSync(persistentDir, { recursive: true });
        const hasPersistentFiles = fs.existsSync(persistentDir) &&
            fs.readdirSync(persistentDir).some(name => name.endsWith('.json'));
        if (!hasPersistentFiles && fs.existsSync(localDir)) {
            fs.cpSync(localDir, persistentDir, { recursive: true, force: false, errorOnExist: false });
        }
        return persistentDir;
    }
    return localDir;
}

async function connectToWhatsApp() {
    if (isConnecting) return;
    isConnecting = true;
    try {
        const authDir = await getPersistentAuthDir();
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

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect } = update;
            if (connection === 'close') {
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                if (shouldReconnect && !reconnectTimer) {
                    reconnectTimer = setTimeout(() => {
                        reconnectTimer = null;
                        connectToWhatsApp().catch(err => {});
                    }, 3000);
                }
            } else if (connection === 'open') {
                console.log('✅ RAHUL AI MINI CONNECTED SUCCESSFULLY!');
                try {
                    const userJid = sock.user.id.split(':')[0] + '@s.whatsapp.net';
                    await sock.sendMessage(userJid, { text: `🔴 *RAHUL AI MINI CONNECTED SUCCESSFULLY!* ⚡\n\n👨‍💻 *Developer:* RAHUL MASTER\n📌 *Prefix:* \`${PREFIX}\`` });
                } catch (err) {}
            }
        });

        sock.ev.on('messages.upsert', async (m) => {
            try {
                const msg = m.messages[0];
                if (!msg.message) return;

                const from = msg.key.remoteJid;
                const text = msg.message.conversation || msg.message.extendedTextMessage?.text || msg.message.imageMessage?.caption || msg.message.videoMessage?.caption || '';

                if (isAutoReact && !msg.key.fromMe && from !== 'status@broadcast') {
                    const emojis = ['❤️', '🔥', '⚡', '🤖', '👍', '⭐', '✨'];
                    await sock.sendMessage(from, { react: { text: emojis[Math.floor(Math.random() * emojis.length)], key: msg.key } });
                }

                if (msg.key.remoteJid === 'status@broadcast') {
                    if (isAutoStatusView) await sock.readMessages([msg.key]);
                    return;
                }

                const isCmd = text.startsWith(PREFIX);
                const body = isCmd ? text.slice(PREFIX.length).trim() : text.trim();
                const command = body.toLowerCase().split(' ')[0];
                const args = body.split(' ').slice(1).join(' ');

                // ==================== NEW & EXISTING COMMANDS ====================

                if (command === 'ping') {
                    const start = Date.now();
                    await sock.sendMessage(from, { text: `⚡ *RAHUL AI MINI PONG!*\n⏱️ *Latency:* \`${Date.now() - start} ms\`` }, { quoted: msg });
                }
                else if (command === 'menu' || command === 'help') {
                    const menuText = `╭━━━『 ✦ RAHUL AI MINI ✦ 』━━━╮
┃ ⚡ *PREMIUM WHATSAPP BOT*
┃ 👑 *OWNER:* RAHUL MASTER
┃ ⌨️ *PREFIX:* ${PREFIX}
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 ✨ NEW & AI FEATURES ✨ 〕━━╮
┃ ◈ ${PREFIX}ai <prompt>
┃ ◈ ${PREFIX}toimg (reply to sticker)
┃ ◈ ${PREFIX}tempmail (generate temporary email)
┃ ◈ ${PREFIX}lyrics <song name>
┃ ◈ ${PREFIX}tts <text> (Text to Speech audio)
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 🎬 DOWNLOADERS 🎬 〕━━╮
┃ ◈ ${PREFIX}play <song name>
┃ ◈ ${PREFIX}video <video name>
┃ ◈ ${PREFIX}insta <url>
╰━━━━━━━━━━━━━━━━━━━━━━╯

╭━━〔 ⚙️ SETTINGS ⚙️ 〕━━╮
┃ ◈ ${PREFIX}setprefix <symbol>
┃ ◈ ${PREFIX}alwaysonline on/off
┃ ◈ ${PREFIX}autoreact on/off
┃ ◈ ${PREFIX}autodl on/off
╰━━━━━━━━━━━━━━━━━━━━━━╯
⚡ *Powered by RAHUL MASTER*`;
                    await sock.sendMessage(from, { text: menuText }, { quoted: msg });
                }
                else if (command === 'ai') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ Please enter a prompt! e.g. \`${PREFIX}ai Hello\`` }, { quoted: msg });
                    await sock.sendMessage(from, { text: '🤖 *RAHUL AI is thinking...*' }, { quoted: msg });
                    try {
                        const res = await axios.get(`https://eliteprotech-apis.zone.id/ai/chatgpt?prompt=${encodeURIComponent(args)}`, { timeout: 30000 });
                        const ans = res.data?.text || res.data?.response || 'No response from AI.';
                        await sock.sendMessage(from, { text: `🤖 *RAHUL AI Answer*\n\n${ans}` }, { quoted: msg });
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ AI API is busy right now. Try again later.' }, { quoted: msg });
                    }
                }
                else if (command === 'toimg' || command === 'image') {
                    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
                    if (!quoted || !quoted.stickerMessage) {
                        return await sock.sendMessage(from, { text: `❌ Krupaya animated naslelya sticker la reply karun \`${PREFIX}toimg\` type kara!` }, { quoted: msg });
                    }
                    await sock.sendMessage(from, { text: '🔄 Converting sticker to image...' }, { quoted: msg });
                    try {
                        const mediaBuffer = await downloadMediaMessage({ message: quoted }, 'buffer', {});
                        await sock.sendMessage(from, { image: mediaBuffer, caption: '✅ *Converted by RAHUL AI MINI*' }, { quoted: msg });
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Sticker convert hotana error aala.' }, { quoted: msg });
                    }
                }
                else if (command === 'tempmail' || command === 'mail') {
                    try {
                        const res = await axios.get('https://api.sayan-nexuswork.workers.dev/tempmail', { timeout: 15000 });
                        if (res.data?.email) {
                            await sock.sendMessage(from, { text: `📧 *Temporary Email Generator*\n\n✉️ *Email:* \`${res.data.email}\`\n\n(Note: Use this for quick signups!)` }, { quoted: msg });
                        } else {
                            await sock.sendMessage(from, { text: '❌ Temp mail generate hot a nahiye.' }, { quoted: msg });
                        }
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Tempmail API error.' }, { quoted: msg });
                    }
                }
                else if (command === 'lyrics') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ Song name taka! e.g. \`${PREFIX}lyrics Kesariya\`` }, { quoted: msg });
                    try {
                        const res = await axios.get(`https://api.sayan-nexuswork.workers.dev/lyrics?query=${encodeURIComponent(args)}`, { timeout: 15000 });
                        if (res.data?.lyrics) {
                            await sock.sendMessage(from, { text: `🎵 *Lyrics for: ${args}*\n\n${res.data.lyrics}` }, { quoted: msg });
                        } else {
                            await sock.sendMessage(from, { text: '❌ Lyrics sapadli nahit.' }, { quoted: msg });
                        }
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Lyrics fetch karnyat error aala.' }, { quoted: msg });
                    }
                }
                else if (command === 'tts' || command === 'say') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ Text taka! e.g. \`${PREFIX}tts Hello Rahul\`` }, { quoted: msg });
                    try {
                        const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(args)}&tl=hi&client=tw-ob`;
                        await sock.sendMessage(from, { audio: { url: ttsUrl }, mimetype: 'audio/mpeg', ptt: true }, { quoted: msg });
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ TTS audio banvnyat apyash aale.' }, { quoted: msg });
                    }
                }
                else if (command === 'play') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ Song name taka! e.g. \`${PREFIX}play Believer\`` }, { quoted: msg });
                    await sock.sendMessage(from, { text: `🎵 Searching "${args}"...` }, { quoted: msg });
                    try {
                        const res = await axios.get(`https://api.sayan-nexuswork.workers.dev/music?query=${encodeURIComponent(args)}`, { timeout: 20000 });
                        if (res.data?.status === 'success' && res.data?.url) {
                            await sock.sendMessage(from, { audio: { url: res.data.url }, mimetype: 'audio/mpeg', ptt: false }, { quoted: msg });
                        } else {
                            await sock.sendMessage(from, { text: '❌ Song not found.' }, { quoted: msg });
                        }
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Music download error.' }, { quoted: msg });
                    }
                }
                else if (command === 'setprefix') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ New symbol taka! e.g. \`${PREFIX}setprefix !\`` }, { quoted: msg });
                    PREFIX = args.trim();
                    await sock.sendMessage(from, { text: `✅ Prefix successfully changed to: \`${PREFIX}\`` }, { quoted: msg });
                }

            } catch (err) {
                console.error('Error handling message:', err);
            }
        });

    } catch (err) {
        console.error('WhatsApp connection error:', err);
    } finally {
        isConnecting = false;
    }
}

connectToWhatsApp().catch(err => {});
