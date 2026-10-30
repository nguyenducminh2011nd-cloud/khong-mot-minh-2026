:root {
    --bg-primary: #0b0f19;
    --card-bg: rgba(17, 24, 39, 0.85);
    --accent: #6366f1;
    --accent-hover: #4f46e5;
    --text-main: #f3f4f6;
    --text-muted: #9ca3af;
    --border: rgba(255, 255, 255, 0.1);
    --glow: rgba(99, 102, 241, 0.3);
}

[data-theme="neon"] {
    --bg-primary: #0d0221;
    --card-bg: rgba(26, 11, 46, 0.85);
    --accent: #f72585;
    --accent-hover: #b5179e;
    --glow: rgba(247, 37, 133, 0.4);
}

[data-theme="emerald"] {
    --bg-primary: #022c22;
    --card-bg: rgba(6, 78, 59, 0.85);
    --accent: #10b981;
    --accent-hover: #059669;
    --glow: rgba(16, 185, 129, 0.4);
}

[data-theme="sunset"] {
    --bg-primary: #2b0b0a;
    --card-bg: rgba(69, 10, 10, 0.85);
    --accent: #f97316;
    --accent-hover: #ea580c;
    --glow: rgba(249, 115, 22, 0.4);
}

* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: 'Plus Jakarta Sans', sans-serif;
}

body {
    background-color: var(--bg-primary);
    color: var(--text-main);
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-x: hidden;
    position: relative;
    transition: background 0.5s ease;
}

/* Hiệu ứng nền động */
[data-bg="grid"] body {
    background-image: linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px);
    background-size: 30px 30px;
}

[data-bg="matrix"] body {
    background: radial-gradient(circle at center, #111827 0%, #030712 100%);
}

[data-bg="gradient"] body {
    background: linear-gradient(135deg, var(--bg-primary), #1f2937, #111827);
    background-size: 400% 400%;
    animation: gradientBG 12s ease infinite;
}

@keyframes gradientBG {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.ambient-glow {
    position: absolute;
    width: 400px;
    height: 400px;
    background: var(--glow);
    filter: blur(120px);
    border-radius: 50%;
    z-index: 0;
    animation: floatGlow 8s ease-in-out infinite alternate;
}

@keyframes floatGlow {
    0% { transform: translateY(-30px) scale(0.9); }
    100% { transform: translateY(30px) scale(1.1); }
}

.app-container {
    position: relative;
    z-index: 1;
    width: 92%;
    max-width: 900px;
    background: var(--card-bg);
    backdrop-filter: blur(16px);
    border: 1px solid var(--border);
    border-radius: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    padding: 30px;
    margin: 20px 0;
}

/* Header */
.app-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border);
    padding-bottom: 20px;
    margin-bottom: 25px;
    flex-wrap: wrap;
    gap: 15px;
}

.logo-area {
    display: flex;
    align-items: center;
    gap: 12px;
}

.pulse-icon {
    font-size: 32px;
    animation: pulseIcon 2s infinite;
}

@keyframes pulseIcon {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    100% { transform: scale(1); }
}

.logo-area h1 {
    font-size: 20px;
    font-weight: 800;
}

.logo-area p {
    font-size: 12px;
    color: var(--text-muted);
}

.header-controls {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
}

.control-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.control-group label {
    font-size: 11px;
    color: var(--text-muted);
}

select {
    background: rgba(0, 0, 0, 0.3);
    color: var(--text-main);
    border: 1px solid var(--border);
    padding: 6px 12px;
    border-radius: 8px;
    font-size: 12px;
    outline: none;
    cursor: pointer;
}

/* Màn hình */
.screen {
    display: none;
    animation: fadeIn 0.4s ease forwards;
}

.screen.active {
    display: block;
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
}

/* Welcome Card */
.welcome-card h2 {
    font-size: 26px;
    margin-bottom: 12px;
    color: var(--accent);
}

.welcome-card p {
    font-size: 14px;
    color: var(--text-muted);
    line-height: 1.6;
    margin-bottom: 20px;
}

.input-group input {
    width: 100%;
    padding: 14px 18px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border);
    border-radius: 12px;
    color: var(--text-main);
    font-size: 15px;
    margin-bottom: 20px;
    outline: none;
}

.mode-selection h3 {
    font-size: 15px;
    margin-bottom: 12px;
}

.mode-cards {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    margin-bottom: 25px;
}

.mode-btn {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 16px;
    text-align: left;
    cursor: pointer;
    color: var(--text-main);
    display: flex;
    gap: 12px;
    align-items: center;
    transition: all 0.3s;
}

.mode-btn.active, .mode-btn:hover {
    border-color: var(--accent);
    background: rgba(99, 102, 241, 0.1);
}

.mode-icon {
    font-size: 26px;
}

.mode-btn strong {
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
}

.mode-btn p {
    font-size: 11px;
    color: var(--text-muted);
    margin: 0;
}

/* Nút bấm chính */
.primary-btn {
    width: 100%;
    padding: 16px;
    background: var(--accent);
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    transition: background 0.3s, transform 0.2s;
    box-shadow: 0 4px 15px var(--glow);
}

.primary-btn:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
}

/* Giao diện Game Chat */
.game-top-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    gap: 10px;
}

.stat-badge {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border);
    padding: 8px 14px;
    border-radius: 10px;
    font-size: 13px;
    font-weight: 650;
}

.chat-container {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--border);
    border-radius: 16px;
    height: 250px;
    overflow-y: auto;
    padding: 15px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.chat-header-sim {
    font-size: 12px;
    color: var(--text-muted);
    display: flex;
    align-items: center;
    gap: 8px;
    border-bottom: 1px solid var(--border);
    padding-bottom: 8px;
}

.status-dot {
    width: 8px;
    height: 8px;
    background: #10b981;
    border-radius: 50%;
    animation: blink 1.5s infinite;
}

@keyframes blink {
    0% { opacity: 0.3; }
    50% { opacity: 1; }
    100% { opacity: 0.3; }
}

.chat-bubble {
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 14px;
    line-height: 1.5;
    max-width: 85%;
}

.chat-bubble.incoming {
    background: rgba(255, 255, 255, 0.06);
    border: 1px solid var(--border);
    align-self: flex-start;
    border-top-left-radius: 2px;
}

.choices-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.choice-btn {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--border);
    padding: 14px 18px;
    border-radius: 12px;
    color: var(--text-main);
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;
}

.choice-btn:hover {
    background: var(--accent);
    border-color: var(--accent);
    transform: translateX(5px);
}

/* Khung tự trả lời */
.custom-answer-box {
    margin-top: 15px;
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid var(--border);
    padding: 15px;
    border-radius: 14px;
}

.custom-answer-box.hidden {
    display: none;
}

.custom-answer-box p {
    font-size: 13px;
    margin-bottom: 10px;
    color: var(--text-muted);
}

.custom-answer-box textarea {
    width: 100%;
    height: 80px;
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid var(--border);
    border-radius: 10px;
    color: var(--text-main);
    padding: 10px;
    font-size: 13px;
    resize: none;
    outline: none;
    margin-bottom: 10px;
}

.secondary-btn {
    background: #10b981;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    font-weight: 700;
    cursor: pointer;
    font-size: 13px;
}

/* Kết quả & Bảng xếp hạng */
.result-card h2 {
    font-size: 24px;
    margin-bottom: 10px;
}

.final-score-box {
    font-size: 20px;
    font-weight: 800;
    color: var(--accent);
    margin-bottom: 15px;
}

.result-card p {
    font-size: 14px;
    color: var(--text-muted);
    margin-bottom: 20px;
    line-height: 1.6;
}

.leaderboard-section {
    background: rgba(0, 0, 0, 0.25);
    border: 1px solid var(--border);
    border-radius: 14px;
    padding: 15px;
    margin-bottom: 20px;
    text-align: left;
}

.leaderboard-section h3 {
    font-size: 14px;
    margin-bottom: 12px;
    color: var(--text-main);
}

.leaderboard-item {
    display: flex;
    justify-content: space-between;
    padding: 8px 10px;
    border-bottom: 1px solid var(--border);
    font-size: 13px;
}

.leaderboard-item:last-child {
    border-bottom: none;
}

@media (max-width: 768px) {
    .mode-cards {
        grid-template-columns: 1fr;
    }
    .app-container {
        padding: 20px;
    }
}
