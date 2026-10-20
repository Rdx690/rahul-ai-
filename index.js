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
   🔥 RAHUL AI MINI — PREMIUM PAIRING PORTAL (FIXED ALREADY LINKED BUG)
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
            * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; transition: background 0.3s, color 0.3s; }
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
            .light-mode {
                --bg:#f0f2f5;
                --card:rgba(255,255,255,0.85);
                --border:rgba(0,150,255,0.3);
                --text:#1e293b;
                --muted:#64748b;
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
            }
            .navbar{
                position:relative;z-index:50;
                display:flex;align-items:center;justify-content:space-between;
                padding:18px 32px;
                background:var(--card);
                backdrop-filter:blur(18px);
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
            .top-info {
                display: flex; gap: 15px; align-items: center; font-size: 13px; font-weight: 600; color: var(--muted);
            }
            .theme-btn {
                background: none; border: 1.5px solid var(--border); color: var(--text);
                padding: 8px 12px; border-radius: 8px; cursor: pointer; font-size: 14px;
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
                background:var(--bg);
                color:var(--text);font-size:15px;
                outline:none;
            }
            .btn-main{
                width:100%;padding:15px;
                border-radius:14px;border:none;
                font-family:'Orbitron',sans-serif;
                font-size:15px;font-weight:700;letter-spacing:2px;
                color:#fff;cursor:pointer;
                background:linear-gradient(90deg,var(--primary),var(--secondary),var(--accent),var(--primary));
                background-size:300% auto;
                box-shadow:0 0 25px rgba(0,229,255,0.5);
                animation: edgeGlow 3s linear infinite;
                position: relative; overflow: hidden;
            }
            @keyframes edgeGlow {
                0% { background-position: 0% 50%; box-shadow: 0 0 15px var(--primary); }
                50% { background-position: 100% 50%; box-shadow: 0 0 30px var(--secondary); }
                100% { background-position: 0% 50%; box-shadow: 0 0 15px var(--primary); }
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
                font-size:28px;letter-spacing:6px;
                color:var(--primary);
                margin-bottom:12px;
            }
            .copy-btn {
                padding: 8px 18px; border-radius: 8px; border: none;
                background: var(--primary); color: #000; font-weight: bold;
                cursor: pointer; font-size: 12px; letter-spacing: 1px;
            }
            .site-footer{
                padding:16px 24px;text-align:center;
                font-size:11px;color:var(--muted);
                border-top:1px solid var(--border);
            }
        </style>
    </head>
    <body>
        <nav class="navbar">
            <div class="nav-brand">
                <div class="brand-icon"><i class="fa-solid fa-wand-magic-sparkles"></i></div>
                <div class="brand-text">RAHUL AI MINI<small style="display:block;font-size:9px;letter-spacing:4px;color:var(--muted);">PREMIUM PAIRING</small></div>
            </div>
            <div class="top-info">
                <span id="liveTime"><i class="fa-regular fa-clock"></i> 00:00:00</span>
                <span id="batteryStatus"><i class="fa-solid fa-battery-full"></i> Loading...</span>
                <button class="theme-btn" onclick="toggleTheme()"><i class="fa-solid fa-moon" id="themeIcon"></i></button>
            </div>
        </nav>
        <div class="main-wrap">
            <div class="card">
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
                    <div style="font-size:11px;color:var(--primary);margin-bottom:8px;">YOUR PAIRING CODE</div>
                    <h2 id="pairCode">-----</h2>
                    <button class="copy-btn" onclick="copyCode()"><i class="fa-solid fa-copy"></i> COPY CODE</button>
                </div>
            </div>
        </div>
        <footer class="site-footer">POWERED BY <span>RAHUL AI MINI</span> • DEVELOPED BY <span>RAHUL MASTER</span></footer>
        <script>
            setInterval(() => {
                const now = new Date();
                document.getElementById('liveTime').innerHTML = '<i class="fa-regular fa-clock"></i> ' + now.toLocaleTimeString();
            }, 1000);

            if (navigator.getBattery) {
                navigator.getBattery().then(battery => {
                    function updateBattery() {
                        const level = Math.round(battery.level * 100);
                        document.getElementById('batteryStatus').innerHTML = '<i class="fa-solid fa-battery-three-quarters"></i> ' + level + '%';
                    }
                    updateBattery();
                });
            } else {
                document.getElementById('batteryStatus').style.display = 'none';
            }

            function toggleTheme() {
                document.body.classList.toggle('light-mode');
                const icon = document.getElementById('themeIcon');
                icon.className = document.body.classList.contains('light-mode') ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }

            function copyCode() {
                const codeText = document.getElementById('pairCode').innerText;
                navigator.clipboard.writeText(codeText);
                alert('✅ Pairing Code Copied: ' + codeText);
            }

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
        await delay(1500);
        let code = await sock.requestPairingCode(cleanedNumber);
        return res.json({ code: code, status: 'Success' });
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
let isAlwaysOnline = true;
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

                // 🔴 FIX: Agar logged out ya session invalid ho gaya hai toh session folder clear kar do
                if (statusCode === DisconnectReason.loggedOut) {
                    console.log('⚠️ Device logged out or session corrupted. Cleaning session folder...');
                    if (fs.existsSync(authDir)) {
                        fs.rmSync(authDir, { recursive: true, force: true });
                    }
                }

                if (shouldReconnect && !reconnectTimer) {
                    reconnectTimer = setTimeout(() => {
                        reconnectTimer = null;
                        connectToWhatsApp().catch(err => {});
                    }, 3000);
                }
            } else if (connection === 'open') {
                console.log('✅ RAHUL AI MINI IS CONNECTED!');
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

                if (isAlwaysOnline && from) {
                    await sock.sendPresenceUpdate('available', from);
                }

                if (msg.key.remoteJid === 'status@broadcast') {
                    if (isAutoStatusView) await sock.readMessages([msg.key]);
                    return;
                }

                if (isAutoDL && !text.startsWith(PREFIX)) {
                    const urlMatch = text.match(/(https?:\/\/[^\s]+)/g);
                    if (urlMatch) {
                        const url = urlMatch[0];
                        if (url.includes('instagram.com')) {
                            try {
                                await sock.sendMessage(from, { text: '📸 *Instagram AutoDL:* Downloading media...' }, { quoted: msg });
                                const res = await axios.get(`https://api.sayan-nexuswork.workers.dev/insta?url=${encodeURIComponent(url)}`, { timeout: 30000 });
                                const data = res.data;
                                const mediaUrl = data?.url || data?.urls?.[0];
                                if (data?.status === 'success' && mediaUrl) {
                                    if (data.type === 'image' || /\.jpe?g(\?|$)/i.test(mediaUrl) || /\.png(\?|$)/i.test(mediaUrl)) {
                                        await sock.sendMessage(from, { image: { url: mediaUrl }, caption: '' }, { quoted: msg });
                                    } else {
                                        await sock.sendMessage(from, { video: { url: mediaUrl }, caption: '' }, { quoted: msg });
                                    }
                                    return;
                                }
                            } catch (e) {}
                        }
                    }
                }

                const contextInfo = msg.message.extendedTextMessage?.contextInfo;
                if (contextInfo?.quotedMessage && contextInfo.remoteJid === 'status@broadcast') {
                    const triggerWords = ['send', 'dya', 'pathva', 'send me', 'पाठव'];
                    if (triggerWords.some(w => text.toLowerCase().includes(w))) {
                        await sock.sendMessage(from, { text: '⏳ Status download karat aahe...' }, { quoted: msg });
                        try {
                            const mediaBuffer = await downloadMediaMessage({ message: contextInfo.quotedMessage }, 'buffer', {});
                            if (contextInfo.quotedMessage.videoMessage) {
                                await sock.sendMessage(from, { video: mediaBuffer, caption: '🎬 *Status Video by RAHUL AI MINI*' }, { quoted: msg });
                            } else if (contextInfo.quotedMessage.imageMessage) {
                                await sock.sendMessage(from, { image: mediaBuffer, caption: '🖼️ *Status Image by RAHUL AI MINI*' }, { quoted: msg });
                            }
                        } catch (e) {
                            await sock.sendMessage(from, { text: '❌ Status download karun pathvnyat adchan aali.' }, { quoted: msg });
                        }
                    }
                }

                const isGroup = from.endsWith('@g.us');
                const isCmd = text.startsWith(PREFIX);
                const body = isCmd ? text.slice(PREFIX.length).trim() : text.trim();
                const command = body.toLowerCase().split(' ')[0];
                const args = body.split(' ').slice(1).join(' ');

                if (command === 'settings' || command === 'config' || command === 'setting') {
                    const settingsText = 
`⚙️ *RAHUL AI MINI - BOT SETTINGS* ⚙️

📌 *Current Configuration:*
[ 👑 ] *Prefix:* \`${PREFIX}\`
[ 🟢 ] *Always Online:* ${isAlwaysOnline ? '✅ ON' : '❌ OFF'}
[ 👀 ] *Auto Status View:* ${isAutoStatusView ? '✅ ON' : '❌ OFF'}
[ ❤️ ] *Auto React:* ${isAutoReact ? '✅ ON' : '❌ OFF'}
[ 📥 ] *Auto Downloader:* ${isAutoDL ? '✅ ON' : '❌ OFF'}

━━━━━━━ COMMANDS ━━━━━━━
⚙️ *Prefix change:* \`${PREFIX}setprefix <symbol>\`
🟢 *Always Online:* \`${PREFIX}alwaysonline on/off\`
👀 *Auto Status View:* \`${PREFIX}autostatus on/off\`
❤️ *Auto React:* \`${PREFIX}autoreact on/off\`
📥 *Auto Downloader:* \`${PREFIX}autodl on/off\`
━━━━━━━━━━━━━━━━━━━━━━`;
                    await sock.sendMessage(from, { text: settingsText }, { quoted: msg });
                }
                else if (command === 'alwaysonline' || command === 'autoonline') {
                    if (args.toLowerCase() === 'on') {
                        isAlwaysOnline = true;
                        await sock.sendMessage(from, { text: '🟢 *Always Online Activated!*' }, { quoted: msg });
                    } else if (args.toLowerCase() === 'off') {
                        isAlwaysOnline = false;
                        await sock.sendMessage(from, { text: '🔴 *Always Online Deactivated!*' }, { quoted: msg });
                    } else {
                        await sock.sendMessage(from, { text: `🟢 *Always Online:* ${isAlwaysOnline ? 'ON' : 'OFF'}\nUse: \`${PREFIX}alwaysonline on/off\`` }, { quoted: msg });
                    }
                }
                else if (command === 'autostatus' || command === 'statusview') {
                    if (args.toLowerCase() === 'on') {
                        isAutoStatusView = true;
                        await sock.sendMessage(from, { text: '🟢 *Auto Status View Activated!*' }, { quoted: msg });
                    } else if (args.toLowerCase() === 'off') {
                        isAutoStatusView = false;
                        await sock.sendMessage(from, { text: '🔴 *Auto Status View Deactivated!*' }, { quoted: msg });
                    } else {
                        await sock.sendMessage(from, { text: `👀 *Auto Status View:* ${isAutoStatusView ? 'ON' : 'OFF'}\nUse: \`${PREFIX}autostatus on/off\`` }, { quoted: msg });
                    }
                }
                else if (command === 'autoreact') {
                    if (args.toLowerCase() === 'on') {
                        isAutoReact = true;
                        await sock.sendMessage(from, { text: '❤️ *Auto React Activated!*' }, { quoted: msg });
                    } else if (args.toLowerCase() === 'off') {
                        isAutoReact = false;
                        await sock.sendMessage(from, { text: '🖤 *Auto React Deactivated!*' }, { quoted: msg });
                    } else {
                        await sock.sendMessage(from, { text: `❤️ *Auto React:* ${isAutoReact ? 'ON' : 'OFF'}\nUse: \`${PREFIX}autoreact on/off\`` }, { quoted: msg });
                    }
                }
                else if (command === 'autodl') {
                    if (args.toLowerCase() === 'on') {
                        isAutoDL = true;
                        await sock.sendMessage(from, { text: '📥 *Auto DL Activated!*' }, { quoted: msg });
                    } else if (args.toLowerCase() === 'off') {
                        isAutoDL = false;
                        await sock.sendMessage(from, { text: '📤 *Auto DL Deactivated!*' }, { quoted: msg });
                    } else {
                        await sock.sendMessage(from, { text: `📥 *Auto DL:* ${isAutoDL ? 'ON' : 'OFF'}\nUse: \`${PREFIX}autodl on/off\`` }, { quoted: msg });
                    }
                }
                else if (command === 'setprefix' || command === 'prefix') {
                    if (!args) return await sock.sendMessage(from, { text: `⚙️ *Current Prefix:* \`${PREFIX}\`` }, { quoted: msg });
                    PREFIX = args.trim();
                    await sock.sendMessage(from, { text: `✅ *Prefix changed to:* \`${PREFIX}\`` }, { quoted: msg });
                }
                else if (command === 'ping') {
                    const start = Date.now();
                    await sock.sendMessage(from, { text: `⚡ *Pong!* \`${Date.now() - start} ms\`` }, { quoted: msg });
                }
                else if (command === 'menu' || command === 'help') {
                    const menuText = 
`╭━━━『 ✦ RAHUL AI MINI ✦ 』━━━╮
┃ ⚡ *PREMIUM WHATSAPP BOT*
┃ 👑 *OWNER:* RAHUL MASTER
┃ ⌨️ *PREFIX:* ${PREFIX}
┃ 🟢 *STATUS:* ONLINE
┃ ⏱️ *UPTIME:* ${Math.floor(process.uptime() / 60)} Minutes
╰━━━━━━━━━━━━━━━━━━━━━━╯
╭━━〔 ✨ AI & FUN COMMANDS ✨ 〕━━╮
┃ ◈ ${PREFIX}ai <text>
┃ ◈ ${PREFIX}truth
┃ ◈ ${PREFIX}dare
┃ ◈ ${PREFIX}joke
┃ ◈ ${PREFIX}fact
╰━━━━━━━━━━━━━━━━━━━━━━╯
╭━━〔 🎬 MEDIA & DOWNLOADS 🎬 〕━━╮
┃ ◈ ${PREFIX}play <song name>
┃ ◈ ${PREFIX}insta <url>
┃ ◈ ${PREFIX}tourl (reply media)
┃ ◈ ${PREFIX}tomp3 (reply video)
┃ ◈ ${PREFIX}sticker (reply image)
┃ ◈ ${PREFIX}qr <text>
╰━━━━━━━━━━━━━━━━━━━━━━╯
╭━━〔 ⚙️ SETTINGS & CONFIG ⚙️ 〕━━╮
┃ ◈ ${PREFIX}settings
┃ ◈ ${PREFIX}alwaysonline on/off
┃ ◈ ${PREFIX}autostatus on/off
┃ ◈ ${PREFIX}autoreact on/off
┃ ◈ ${PREFIX}autodl on/off
┃ ◈ ${PREFIX}setprefix <symbol>
┃ ◈ ${PREFIX}owner
╰━━━━━━━━━━━━━━━━━━━━━━╯
⚡ *Powered by RAHUL MASTER*`;
                    await sock.sendMessage(from, { text: menuText }, { quoted: msg });
                }
                else if (command === 'menu2') {
                    const menu2Text = `🌟 *RAHUL AI MINI - QUICK MENU* 🌟\n\n🤖 *AI Assistant:* \`${PREFIX}ai\`\n🎵 *Music Downloader:* \`${PREFIX}play\`\n📥 *Instagram DL:* \`${PREFIX}insta\`\n🔗 *Media to Link:* \`${PREFIX}tourl\`\n🎧 *Video to MP3:* \`${PREFIX}tomp3\`\n⚙️ *Settings Panel:* \`${PREFIX}settings\`\n\n*Developer: RAHUL MASTER*`;
                    await sock.sendMessage(from, { text: menu2Text }, { quoted: msg });
                }
                else if (command === 'menu3') {
                    const menu3Text = `🚀 *RAHUL AI MINI ADVANCED V3* 🚀\n\n• [AI] \`${PREFIX}ai\`\n• [Music] \`${PREFIX}play\`\n• [Tools] \`${PREFIX}tourl\` | \`${PREFIX}tomp3\` | \`${PREFIX}sticker\` | \`${PREFIX}qr\`\n• [Fun] \`${PREFIX}truth\` | \`${PREFIX}dare\` | \`${PREFIX}joke\` | \`${PREFIX}fact\`\n• [Config] \`${PREFIX}settings\``;
                    await sock.sendMessage(from, { text: menu3Text }, { quoted: msg });
                }
                else if (command === 'tourl' || command === 'upload') {
                    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
                    const isMedia = msg.message.imageMessage || msg.message.videoMessage || msg.message.documentMessage || quoted?.imageMessage || quoted?.videoMessage || quoted?.documentMessage;
                    if (!isMedia) return await sock.sendMessage(from, { text: `❌ Konthyahi photo, video ya file la reply karun \`${PREFIX}tourl\` type kara!` }, { quoted: msg });
                    await sock.sendMessage(from, { text: '📤 *Uploading media to server, please wait...*' }, { quoted: msg });
                    try {
                        const mediaBuffer = await downloadMediaMessage(quoted ? { message: quoted } : msg, 'buffer', {});
                        const form = new FormData();
                        form.append('file', mediaBuffer, { filename: 'rahul-ai-media.bin' });
                        const uploadRes = await axios.post('https://telegra.ph/upload', form, { headers: { ...form.getHeaders() } });
                        if (uploadRes.data && uploadRes.data[0] && uploadRes.data[0].src) {
                            const fileUrl = 'https://telegra.ph' + uploadRes.data[0].src;
                            await sock.sendMessage(from, { text: `🔗 *MEDIA LINK SUCCESSFUL!*\n\n📌 *URL:* ${fileUrl}` }, { quoted: msg });
                        } else {
                            await sock.sendMessage(from, { text: '❌ Upload fail zali. Punha prayatna kara.' }, { quoted: msg });
                        }
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Tourl error: ' + e.message }, { quoted: msg });
                    }
                }
                else if (command === 'tomp3') {
                    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
                    const isVideo = msg.message.videoMessage || quoted?.videoMessage;
                    if (!isVideo) return await sock.sendMessage(from, { text: `❌ Konthyahi video la reply karun \`${PREFIX}tomp3\` type kara!` }, { quoted: msg });
                    await sock.sendMessage(from, { text: '🎵 *Converting video to MP3 audio...*' }, { quoted: msg });
                    try {
                        const mediaBuffer = await downloadMediaMessage(quoted ? { message: quoted } : msg, 'buffer', {});
                        await sock.sendMessage(from, { audio: mediaBuffer, mimetype: 'audio/mpeg', ptt: false }, { quoted: msg });
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Video to MP3 conversion error.' }, { quoted: msg });
                    }
                }
                else if (command === 'ai') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ Ask something! e.g. \`${PREFIX}ai Hello\`` }, { quoted: msg });
                    await sock.sendMessage(from, { text: '🤖 *RAHUL AI is thinking...*' }, { quoted: msg });
                    try {
                        const res = await axios.get(`https://eliteprotech-apis.zone.id/ai/chatgpt?prompt=${encodeURIComponent(args)}`, { timeout: 30000 });
                        const ans = res.data?.text || res.data?.response || 'No response';
                        await sock.sendMessage(from, { text: `🤖 *RAHUL AI Answer*\n\n${ans}` }, { quoted: msg });
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ AI API error. Try later.' }, { quoted: msg });
                    }
                }
                else if (command === 'play') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ Song name taka! e.g. \`${PREFIX}play Believer\`` }, { quoted: msg });
                    await sock.sendMessage(from, { text: `🎵 Searching "${args}"...` }, { quoted: msg });
                    try {
                        const res = await axios.get(`https://api.sayan-nexuswork.workers.dev/music?query=${encodeURIComponent(args)}`, { timeout: 20000 });
                        if (res.data?.status === 'success' && res.data?.url) {
                            await sock.sendMessage(from, { audio: { url: res.data.url }, mimetype: 'audio/mpeg' }, { quoted: msg });
                        } else {
                            await sock.sendMessage(from, { text: '❌ Song not found.' }, { quoted: msg });
                        }
                    } catch (e) {
                        await sock.sendMessage(from, { text: '❌ Audio download error.' }, { quoted: msg });
                    }
                }
                else if (command === 'sticker' || command === 's') {
                    const quoted = msg.message.extendedTextMessage?.contextInfo?.quotedMessage;
                    const isImage = msg.message.imageMessage || quoted?.imageMessage;
                    if (isImage) {
                        const media = await downloadMediaMessage(quoted ? { message: quoted } : msg, 'buffer', {});
                        const sticker = new Sticker(media, { pack: 'RAHUL AI MINI', author: 'RAHUL MASTER', type: StickerTypes.FULL });
                        const buffer = await sticker.toBuffer();
                        await sock.sendMessage(from, { sticker: buffer }, { quoted: msg });
                    } else {
                        await sock.sendMessage(from, { text: `❌ Reply to an image with \`${PREFIX}sticker\`` }, { quoted: msg });
                    }
                }
                else if (command === 'qr') {
                    if (!args) return await sock.sendMessage(from, { text: `❌ Enter text! e.g. \`${PREFIX}qr Hello\`` }, { quoted: msg });
                    const qrBuffer = await QRCode.toBuffer(args);
                    await sock.sendMessage(from, { image: qrBuffer, caption: `🔲 QR Code for: ${args}` }, { quoted: msg });
                }
                else if (command === 'truth') {
                    const truths = ["Tuzi sarvat mothi secret khabardari konachi aahe?", "Tula konavar crush aahe ka sathyat?", "Tuzi sarvat lahanpani keleli sarvat mothi chuk konti?"];
                    await sock.sendMessage(from, { text: `🎯 *TRUTH:* ${truths[Math.floor(Math.random() * truths.length)]}` }, { quoted: msg });
                }
                else if (command === 'dare') {
                    const dares = ["Tujha status 1 tasasathi 'I love coding' thev!", "Konala tari 'Mi Veda aahe' ani msg pathav!"];
                    await sock.sendMessage(from, { text: `🔥 *DARE:* ${dares[Math.floor(Math.random() * dares.length)]}` }, { quoted: msg });
                }
                else if (command === 'joke') {
                    await sock.sendMessage(from, { text: `😂 *JOKE:* Mulga: Mala ek changli mulgi pahije.\nMulgi: Mage bagh, mi ahe na!` }, { quoted: msg });
                }
                else if (command === 'fact') {
                    await sock.sendMessage(from, { text: `💡 *FACT:* Space madhe astronaut la radu yet nahi karan thithe thamb-themb asu khali padat nahit!` }, { quoted: msg });
                }
                else if (command === 'owner') {
                    await sock.sendMessage(from, { text: `👑 *Bot Owner Info*\n\nName: RAHUL MASTER\nBot: RAHUL AI MINI` }, { quoted: msg });
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
