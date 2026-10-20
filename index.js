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
   🔥 RAHUL AI MINI — PHOTO STYLE WITH EDGE LIGHTING ANIMATION
   ============================================================ */
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RAHUL AI MINI • Pairing Portal</title>
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600;700;900&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
        <style>
            * { margin:0; padding:0; box-sizing:border-box; font-family:'Inter',sans-serif; transition: background 0.3s, color 0.3s; }
            :root{
                --red-glow:#ff2e4d; 
                --blue-glow:#00d2ff; 
                --bg:#050508;
                --card:#0a0d14;
                --text:#e2e8f0;
                --muted:#7c8798;
            }
            .light-mode {
                --bg:#f0f2f5;
                --card:#ffffff;
                --text:#1e293b;
                --muted:#64748b;
            }
            html,body{height:100%;}
            body{
                background: var(--bg);
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
                    radial-gradient(circle at 20% 20%, rgba(180, 20, 50, 0.35), transparent 50%),
                    radial-gradient(circle at 80% 85%, rgba(60, 20, 100, 0.3), transparent 50%);
                z-index:0;
            }
            
            /* --- TOP INFO BAR WITH EDGE LIGHTING ANIMATION --- */
            .top-bar-wrapper {
                position: relative;
                margin: 20px auto 10px;
                width: 92%; max-width: 420px;
                border-radius: 22px;
                padding: 2px;
                background: linear-gradient(90deg, var(--red-glow), var(--blue-glow), var(--red-glow));
                background-size: 200% 200%;
                animation: edgeLighting 3s linear infinite;
                z-index: 50;
            }
            .top-bar{
                display:flex;align-items:center;justify-content:space-between;
                padding:12px 18px;
                background: rgba(10, 13, 20, 0.95);
                border-radius: 20px;
            }
            .top-info-items {
                display: flex; gap: 12px; align-items: center; font-size: 11px; font-weight: 500; color: var(--muted);
            }
            .top-info-items span { display: flex; align-items: center; gap: 4px; }
            .theme-btn {
                background: rgba(255,255,255,0.05); border: none; width: 30px; height: 30px; border-radius: 50%;
                color: var(--red-glow); cursor: pointer; font-size: 12px; display: flex; align-items: center; justify-content:center;
            }
            
            .main-wrap{
                flex:1;display:flex;align-items:center;justify-content:center;
                padding:10px 20px 20px;position:relative;z-index:10;
            }

            /* --- MAIN CARD CONTAINER WITH EDGE LIGHTING ANIMATION --- */
            .card-wrapper {
                position: relative;
                width: 100%;
                max-width: 420px;
                border-radius: 30px;
                padding: 2.5px;
                background: linear-gradient(0deg, var(--red-glow), var(--blue-glow), var(--red-glow));
                background-size: 300% 300%;
                animation: edgeLighting 3s linear infinite;
                box-shadow: 0 0 30px rgba(255, 46, 77, 0.3), 0 0 30px rgba(0, 210, 255, 0.3);
            }

            @keyframes edgeLighting {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }

            .card {
                position: relative;
                width: 100%;
                background: var(--card);
                border-radius: 28px;
                padding: 34px 24px 28px;
                text-align: center;
            }

            .logo-badge{
                display:inline-flex;align-items:center;justify-content:center;
                gap:8px;
                padding:8px 20px;border-radius:30px;
                background:rgba(255,46,77,0.08);
                border:1px solid rgba(255,46,77,0.25);
                margin-bottom:16px;
            }
            .logo-badge i{font-size:14px;color:var(--red-glow);}
            .logo-badge span{
                font-family:'Orbitron',sans-serif;font-weight:700;
                font-size:13px;letter-spacing:1.5px;
                color: var(--text);
            }
            h1{
                font-family:'Orbitron',sans-serif;
                font-size:20px;font-weight:800;
                letter-spacing:1px;margin-bottom:8px;
                background:linear-gradient(90deg, var(--red-glow), var(--blue-glow));
                -webkit-background-clip: text; -webkit-text-fill-color: transparent;
            }
            .subtitle{
                font-size:12px;color:var(--muted);
                margin-bottom:26px;line-height:1.5;
            }
            .input-group{position:relative;margin-bottom:16px;}
            .input-group i{
                position:absolute;left:16px;top:50%;
                transform:translateY(-50%);
                color:var(--blue-glow);font-size:14px;
            }
            input[type="text"]{
                width:100%;padding:14px 14px 14px 44px;
                border-radius:14px;
                border:1px solid rgba(255,255,255,0.08);
                background:rgba(0,0,0,0.4);
                color:var(--text);font-size:14px;
                outline:none;
            }
            input[type="text"]:focus {
                border-color: var(--blue-glow);
                box-shadow: 0 0 10px rgba(0,210,255,0.25);
            }
            .btn-main{
                width:100%;padding:14px;
                border-radius:14px;border:none;
                font-family:'Orbitron',sans-serif;
                font-size:13px;font-weight:700;letter-spacing:1px;
                color:#fff;cursor:pointer;
                background:linear-gradient(90deg,var(--red-glow),var(--blue-glow));
                box-shadow:0 0 18px rgba(255,46,77,0.35);
                position: relative; overflow: hidden;
            }
            .code-box{
                margin-top:20px;padding:16px;
                background:rgba(0,210,255,0.04);
                border-radius:14px;
                border:1px dashed var(--blue-glow);
                display:none;
            }
            .code-box h2{
                font-family:'Orbitron',sans-serif;
                font-size:22px;letter-spacing:3px;
                color:var(--blue-glow);
                margin-bottom:8px;
            }
            .copy-btn {
                padding: 8px 16px; border-radius: 8px; border: none;
                background: linear-gradient(90deg, var(--red-glow), var(--blue-glow)); color: #fff; font-weight: bold;
                cursor: pointer; font-size: 11px; letter-spacing: 1px;
            }

            .wa-btn {
                display: flex; align-items: center; justify-content: center; gap: 8px;
                width: 100%; margin-top: 18px; padding: 13px;
                background: #10b981; color: #fff; border-radius: 14px;
                font-size: 13px; font-weight: 600; text-decoration: none;
                box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
            }

            .site-footer{
                padding:14px 20px;text-align:center;
                font-size:10px;color:var(--muted);
            }
        </style>
    </head>
    <body>
        <div class="top-bar-wrapper">
            <div class="top-bar">
                <div class="top-info-items">
                    <span id="liveTime"><i class="fa-regular fa-clock"></i> 04:41 PM</span>
                    <span id="currentDate"><i class="fa-regular fa-calendar"></i> Oct 20</span>
                    <span id="batteryStatus"><i class="fa-solid fa-bolt"></i> 18%</span>
                </div>
                <button class="theme-btn" onclick="toggleTheme()"><i class="fa-solid fa-moon" id="themeIcon"></i></button>
            </div>
        </div>

        <div class="main-wrap">
            <div class="card-wrapper">
                <div class="card">
                    <div class="logo-badge">
                        <i class="fa-solid fa-bolt"></i>
                        <span>PAIRING PORTAL</span>
                    </div>
                    <h1>RAHUL AI MINI</h1>
                    <p class="subtitle">Enter your WhatsApp number below to get<br>your secure pairing code instantly</p>
                    <div class="input-group">
                        <i class="fa-solid fa-phone"></i>
                        <input type="text" id="phone" value="919356730236" placeholder="e.g. 919356730236">
                    </div>
                    <button class="btn-main" onclick="getPairingCode()">
                        <i class="fa-solid fa-bolt"></i> GET PAIRING CODE
                    </button>
                    <div id="codeContainer" class="code-box">
                        <div style="font-size:10px;color:var(--blue-glow);margin-bottom:6px;letter-spacing:1px;">YOUR PAIRING CODE</div>
                        <h2 id="pairCode">-----</h2>
                        <button class="copy-btn" onclick="copyCode()"><i class="fa-solid fa-copy"></i> COPY CODE</button>
                    </div>
                    
                    <a href="https://wa.me/919356730236" target="_blank" class="wa-btn">
                        <i class="fa-brands fa-whatsapp" style="font-size: 16px;"></i> Contact Owner on WhatsApp
                    </a>
                </div>
            </div>
        </div>

        <footer class="site-footer">POWERED BY <span>RAHUL AI MINI</span> • DEVELOPED BY <span>RAHUL MASTER</span></footer>

        <script>
            setInterval(() => {
                const now = new Date();
                document.getElementById('liveTime').innerHTML = '<i class="fa-regular fa-clock"></i> ' + now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                const options = { month: 'short', day: 'numeric' };
                document.getElementById('currentDate').innerHTML = '<i class="fa-regular fa-calendar"></i> ' + now.toLocaleDateString('en-US', options);
            }, 1000);

            if (navigator.getBattery) {
                navigator.getBattery().then(battery => {
                    function updateBattery() {
                        const level = Math.round(battery.level * 100);
                        document.getElementById('batteryStatus').innerHTML = '<i class="fa-solid fa-bolt"></i> ' + level + '%';
                    }
                    updateBattery();
                });
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
                } catch(e) { 
                    alert('Error connecting to server'); 
                }
                btn.innerHTML = '<i class="fa-solid fa-bolt"></i> GET PAIRING CODE';
            }
        </script>
    </body>
    </html>
    `);
});

/* ============================================================
   🔧 FIXED /PAIR ENDPOINT WITH ROBUST WA PAIRING LOGIC
   ============================================================ */
app.get('/pair', async (req, res) => {
    let phone = req.query.number;
    if (!phone) {
        return res.json({ error: 'Please provide a valid phone number.' });
    }
    let cleanedNumber = phone.replace(/[^0-9]/g, '');

    try {
        const authDir = await getPersistentAuthDir();
        
        // जुनी सेशन फाईल्स पूर्णपणे क्लिन करू जेणेकरून नवीन नंबर जोडताना अडचण येणार नाही
        if (fs.existsSync(authDir)) {
            fs.rmSync(authDir, { recursive: true, force: true });
        }
        fs.mkdirSync(authDir, { recursive: true });

        if (sock) {
            try { await sock.logout(); } catch(e) {}
            try { sock.end(); } catch(e) {}
            sock = null;
        }

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

        // सॉकेट कनेक्ट होण्याची प्रतीक्षा करू
        let code = null;
        for (let i = 0; i < 15; i++) {
            await delay(2000);
            try {
                if (sock && sock.requestPairingCode) {
                    code = await sock.requestPairingCode(cleanedNumber);
                    if (code) break;
                }
            } catch (err) {
                // जोपर्यंत सॉकेट तयार होत नाही तोपर्यंत प्रयत्न सुरू ठेवेल
            }
        }

        if (code) {
            return res.json({ code: code, status: 'Success' });
        } else {
            return res.json({ error: 'Timeout: Could not generate pairing code. Please try again.' });
        }

    } catch (err) {
        return res.json({ error: 'Pairing Error: ' + err.message });
    }
});

app.listen(PORT, () => {
    console.log(`🌐 RAHUL AI MINI Web Server running on port ${PORT}`);
});

/* ============================================================
   ⚙️ BOT SETTINGS & FEATURES (EXPANDED FULL MENU & TOOLS)
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
                const shouldReconnect = lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut;
                if (shouldReconnect && !reconnectTimer) {
                    reconnectTimer = setTimeout(() => {
                        reconnectTimer = null;
                        connectToWhatsApp().catch(err => {});
                    }, 3000);
                }
            } else if (connection === 'open') {
                console.log('✅ RAHUL AI MINI IS CONNECTED!');
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
