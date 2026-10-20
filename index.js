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
                gap:10px; padding:12px 26px;border-radius:50px;
                background:rgba(0,229,255,0.08);
                border:1.5px solid rgba(0,229,255,0.5);
                margin-bottom:20px;
            }
            .logo-badge i{font-size:20px;color:var(--primary);}
            .logo-badge span{
                font-family:'Orbitron',sans-serif;font-weight:700;
                font-size:18px;letter-spacing:3px;
                background:linear-gradient(90deg,var(--primary),var(--secondary));
                -webkit-background-clip:text;background-clip:text;
                -webkit-text-fill-color:transparent;
            }
            h1{ font-family:'Orbitron',sans-serif; font-size:20px; font-weight:700; letter-spacing:2px; margin-bottom:8px; color:#fff; }
            .subtitle{ font-size:13px; color:var(--muted); margin-bottom:26px; line-height:1.5; }
            .input-group{position:relative;margin-bottom:18px;}
            .input-group i{ position:absolute;left:18px;top:50%; transform:translateY(-50%); color:var(--primary); font-size:16px; }
            input[type="text"]{
                width:100%;padding:15px 15px 15px 48px;
                border-radius:14px; border:1.5px solid rgba(0,229,255,0.2);
                background:rgba(5,8,18,0.8); color:#fff; font-size:15px; outline:none;
            }
            .btn-main{
                width:100%;padding:15px; border-radius:14px;border:none;
                font-family:'Orbitron',sans-serif; font-size:15px; font-weight:700; letter-spacing:2px;
                color:#05060d; cursor:pointer;
                background:linear-gradient(90deg,var(--primary),var(--secondary),var(--accent),var(--primary));
                background-size:300% auto;
            }
            .code-box{
                margin-top:22px;padding:20px; background:rgba(0,229,255,0.05);
                border-radius:16px; border:1.5px dashed rgba(0,229,255,0.5); display:none;
            }
            .code-box h2{ font-family:'Orbitron',sans-serif; font-size:32px; letter-spacing:8px; color:var(--primary); }
            .dev-credits{
                margin-top:26px;padding-top:20px;
                border-top:1px solid rgba(255,255,255,0.06);
                display:flex;justify-content:center;gap:24px;
            }
            .dev{ display:flex;align-items:center;gap:8px; font-size:12px; color:var(--muted); }
            .dev b{color:var(--primary);font-weight:600;}
            .site-footer{ padding:16px 24px; text-align:center; font-size:11px; color:var(--muted); border-top:1px solid rgba(255,255,255,0.04); }
            .site-footer span{color:var(--primary);font-weight:600;}
        </style>
    </head>
    <body>
        <div class="particles" id="particles"></div>
        <nav class="navbar">
            <div class="nav-brand">
                <div class="brand-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                <div class="brand-text">VFX MINI<small>PREMIUM PAIRING</small></div>
            </div>
        </nav>
        <div class="main-wrap">
            <div class="card" id="mainCard">
                <div class="logo-badge"><i class="fa-solid fa-bolt"></i><span>VFX MINI</span></div>
                <h1>PAIRING PORTAL</h1>
                <p class="subtitle">Enter your WhatsApp number to receive<br>a secure pairing code</p>
                <div class="input-group">
                    <i class="fa-solid fa-phone"></i>
                    <input type="text" id="phone" value="919356730236" placeholder="e.g. 919356730236">
                </div>
                <button class="btn-main" onclick="getPairingCode()"><i class="fa-solid fa-bolt"></i> GET PAIRING CODE</button>
                <div id="codeContainer" class="code-box">
                    <div class="label" style="font-size:11px;color:var(--primary);margin-bottom:10px;">Your Pairing Code</div>
                    <h2 id="pairCode">-----</h2>
                </div>
                <div class="dev-credits">
                    <div class="dev"><i class="fa-solid fa-code"></i> <b>SOURAJITVFX</b></div>
                    <div class="dev"><i class="fa-solid fa-robot"></i> <b>RAHUL AI</b></div>
                </div>
            </div>
        </div>
        <footer class="site-footer">POWERED BY <span>RAHUL AI MINI</span> • DEVELOPED BY <span>RAHUL-MASTER</span></footer>
        <script>
            async function getPairingCode() {
                const phone = document.getElementById('phone').value.trim();
                if(!phone) return alert('Please enter phone number');
                const btn = document.querySelector('.btn-main');
                btn.innerHTML = 'GENERATING...';
                btn.disabled = true;
                try {
                    const res = await fetch('/pair?number=' + phone);
                    const data = await res.json();
                    if(data.code) {
                        document.getElementById('codeContainer').style.display = 'block';
                        document.getElementById('pairCode').innerText = data.code;
                    } else {
                        alert(data.error || 'Failed to get code.');
                    }
                } catch(e) {
                    alert('Error connecting to server');
                }
                btn.innerHTML = '<i class="fa-solid fa-bolt"></i> GET PAIRING CODE';
                btn.disabled = false;
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
        return res.json({ error: 'WhatsApp Socket is initialising, please wait 5 seconds and click again.' });
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

const startTime = Date.now();
let isAlwaysOnline = String(process.env.ALWAYS_ONLINE || 'false').toLowerCase() === 'true';
let isAutoStatusView = true;
let isAutoReact = true;
let isAutoDL = true;
let PREFIX = '.';

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
                const statusCode = lastDisconnect?.error?.output?.statusCode;
                const shouldReconnect = statusCode !== DisconnectReason.loggedOut;
                if (shouldReconnect && !reconnectTimer) {
                    reconnectTimer = setTimeout(() => {
                        reconnectTimer = null;
                        connectToWhatsApp().catch(err => console.error(err));
                    }, 3000);
                }
            } else if (connection === 'open') {
                console.log('✅ RAHUL MINI IS ONLINE & CONNECTED!');
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
                    const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
                    await sock.sendMessage(from, { react: { text: randomEmoji, key: msg.key } });
                }

                if (msg.key.remoteJid === 'status@broadcast' && isAutoStatusView) {
                    await sock.readMessages([msg.key]);
                    return;
                }

                const isGroup = from.endsWith('@g.us');
                const isCmd = text.startsWith(PREFIX);
                const body = isCmd ? text.slice(PREFIX.length).trim() : text.trim();
                const command = body.toLowerCase().split(' ')[0];
                const args = body.split(' ').slice(1).join(' ');

                if (!isCmd && command !== 'ping' && command !== 'menu') return;

                if (command === 'ping') {
                    const start = Date.now();
                    await sock.sendMessage(from, { text: '🚀 Speed testing...' }, { quoted: msg });
                    const end = Date.now();
                    await sock.sendMessage(from, { text: `⚡ *Latency:* \`${end - start} ms\`` }, { quoted: msg });
                }
                else if (command === 'menu' || command === 'help') {
                    const menuText = [
                        '╭━━━『 ✦ RAHUL AI MINI ✦ 』━━━╮',
                        '┃ ⚡ *PREMIUM WHATSAPP BOT*',
                        '┃ 👑 *OWNER:* RAHUL-MASTER',
                        '┃ ⌨️ *PREFIX:* ' + PREFIX,
                        '╰━━━━━━━━━━━━━━━━━━━━━━╯',
                        '',
                        '╭━━〔 🧰 TOOLS & MEDIA 🧰 〕━━╮',
                        '┃ ◈ ' + PREFIX + 'ping',
                        '┃ ◈ ' + PREFIX + 'url <website>',
                        '┃ ◈ ' + PREFIX + 'tourl (reply media)',
                        '┃ ◈ ' + PREFIX + 'play <song>',
                        '┃ ◈ ' + PREFIX + 'video <name>',
                        '┃ ◈ ' + PREFIX + 'ai <text>',
                        '┃ ◈ ' + PREFIX + 'sticker (reply image)',
                        '╰━━━━━━━━━━━━━━━━━━━━━━╯'
                    ].join('\n');
                    await sock.sendMessage(from, { text: menuText }, { quoted: msg });
                }
                else if (command === 'url' || command === 'preview') {
                    if (!args || !/^https?:\/\//i.test(args)) {
                        return await sock.sendMessage(from, { text: `❌ Valid URL taka! e.g. \`${PREFIX}url https://google.com\`` }, { quoted: msg });
                    }
                    await sock.sendMessage(from, { text: '🌐 *Fetching preview...*' }, { quoted: msg });
                    try {
                        const res = await axios.get(`https://api.microlink.io/?url=${encodeURIComponent(args.trim())}`, { timeout: 15000 });
                        const info = res.data?.data;
                        if (info) {
                            const caption = `🌐 *WEBSITE PREVIEW*\n\n📌 *Title:* ${info.title || 'N/A'}\n📝 *Desc:* ${info.description \vert{}\vert{} 'N/A'}\n🔗 *URL:* ${args.trim()}`;
                            if (info.image?.url) {
                                await sock.sendMessage(from, { image: { url: info.image.url }, caption }, { quoted: msg });
                            } else {
                                await sock.sendMessage(from, { text: caption }, { quoted: msg });
                            }
                        } else {
                            await sock.sendMessage(from, { text: '❌ Failed to fetch website preview.' }, { quoted: msg });
                        }
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Error processing URL.' }, { quoted: msg });
                    }
                }
                else if (command === 'tourl' || command === 'upload') {
                    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
                    const isMedia = msg.message.imageMessage || msg.message.videoMessage || msg.message.documentMessage || quoted?.imageMessage || quoted?.videoMessage || quoted?.documentMessage;
                    if (!isMedia) return await sock.sendMessage(from, { text: `❌ Konvtyahi media la reply karun \`${PREFIX}tourl\` type kara!` }, { quoted: msg });
                    await sock.sendMessage(from, { text: '📤 *Uploading media...*' }, { quoted: msg });
                    try {
                        const mediaBuffer = await downloadMediaMessage(quoted ? { message: quoted } : msg, 'buffer', {});
                        const form = new FormData();
                        form.append('file', mediaBuffer, { filename: 'media.bin' });
                        const uploadRes = await axios.post('https://telegra.ph/upload', form, { headers: { ...form.getHeaders() } });
                        if (uploadRes.data?.[0]?.src) {
                            await sock.sendMessage(from, { text: `🔗 *UPLOAD SUCCESS!*\n\n📌 *URL:* https://telegra.ph${uploadRes.data[0].src}` }, { quoted: msg });
                        } else {
                            await sock.sendMessage(from, { text: '❌ Upload failed.' }, { quoted: msg });
                        }
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Upload error.' }, { quoted: msg });
                    }
                }
                else if (command === 'play' || command === 'song') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ Song name taka! e.g. \`${PREFIX}play Blinding Lights\`` }, { quoted: msg });
                    await sock.sendMessage(from, { text: `🎵 Downloading audio: "${args}"...` }, { quoted: msg });
                    try {
                        const res = await axios.get(`https://api.sayan-nexuswork.workers.dev/music?query=${encodeURIComponent(args.trim())}`, { timeout: 20000 });
                        const data = res.data;
                        if (data?.status === 'success' && data?.url) {
                            const audioRes = await axios.get(data.url, { responseType: 'arraybuffer', timeout: 45000 });
                            await sock.sendMessage(from, { audio: Buffer.from(audioRes.data), mimetype: 'audio/mpeg', ptt: false }, { quoted: msg });
                        } else {
                            await sock.sendMessage(from, { text: '❌ Song not found.' }, { quoted: msg });
                        }
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Audio download failed.' }, { quoted: msg });
                    }
                }
                else if (command === 'owner') {
                    await sock.sendMessage(from, { text: `👑 *Owner:* RAHUL-MASTER & RAHUL AI` }, { quoted: msg });
                }

            } catch (err) {
                console.error('Message handler error:', err);
            }
        });
    } catch (err) {
        console.error('Connection setup failed:', err);
    } finally {
        isConnecting = false;
    }
}

connectToWhatsApp().catch(err => console.error(err));
