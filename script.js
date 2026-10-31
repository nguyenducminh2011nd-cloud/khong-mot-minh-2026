const coreScenarios = [
    {
        sender: "👤 Nick ẩn danh 'Bóc Phốt Học Đường'",
        dialogue: "Ê bạn ơi, mình vừa tìm thấy mấy bức ảnh cũ hơi ngố của bạn M. lớp bên cạnh. Giờ mình định đăng lên nhóm chung kèm vài câu trêu chọc cho vui cửa vui nhà, tương tác chắc cao phết đấy! Cậu có hùa vào bình luận cùng mình không?",
        choices: [
            { text: "A. Báo cáo (report) tài khoản giả mạo và chụp màn hình gửi giáo viên chủ nhiệm.", score: 30, feedback: "Xuất sắc! Xử lý triệt để, đúng chuẩn công dân số văn minh." },
            { text: "B. Hùa theo bình luận vài câu chọc ghẹo cho vui, chắc bạn ấy không để ý đâu.", score: 0, feedback: "Sai lầm! Hành vi này tiếp tay cho bạo lực mạng và gây tổn thương sâu sắc." },
            { text: "C. Nhắn tin can ngăn tài khoản đó và cảnh báo người bạn bị đăng ảnh ngay lập tức.", score: 25, feedback: "Tuyệt vời! Bản lĩnh số cực tốt, biết bảo vệ bạn bè trước làn sóng độc hại." },
            { text: "D. Âm thầm bấm like dạo và xem người khác tranh cãi mà không nói gì.", score: 10, feedback: "Chưa tốt. Sự im lặng của người chứng kiến vô tình cổ vũ kẻ xấu hoành hành." }
        ]
    },
    {
        sender: "🎁 Tin nhắn trúng thưởng giả mạo",
        dialogue: "🎉 CHÚC MỪNG! Tài khoản của bạn đã may mắn trúng giải Đặc biệt: 1 chiếc điện thoại cao cấp trị giá 25 triệu từ chương trình tri ân học sinh! Hãy click vào đường link lạ đăng nhập tài khoản mật khẩu để nhận thưởng ngay trong 5 phút!",
        choices: [
            { text: "A. Bỏ qua, xóa tin nhắn vì không có chương trình phát thưởng ngẫu nhiên nào như vậy.", score: 20, feedback: "Tỉnh táo! Đã nhận thức được các chiêu trò lừa đảo qua mạng phổ biến." },
            { text: "B. Sướng quá, click ngay vào link và điền tài khoản mật khẩu để nhận quà.", score: 0, feedback: "Sập bẫy lừa đảo tinh vi! Mất tài khoản mạng xã hội chỉ trong một nốt nhạc." },
            { text: "C. Chặn ngay tài khoản, thông báo lên nhóm chung để cảnh báo mọi người cùng tránh.", score: 30, feedback: "Quá đỉnh! Không những né bẫy mà còn bảo vệ cộng đồng xung quanh." },
            { text: "D. Bán tín bán nghi nhưng cứ thử bấm vào xem sao, nhỡ trúng thật thì sao.", score: 5, feedback: "Nguy hiểm! Phishing link đánh cắp thông tin rất hay dùng chiêu trò này." }
        ]
    },
    {
        sender: "💬 Nhóm chat kín 'Góc Tâm Sự'",
        dialogue: "Này, dạo này thấy bạn H. hay thui thủi một mình, hình như tính tình kỳ quặc lắm. Cả lũ mình lập hội kín lập poll chê bai ngoại hình đi, xem ai bình chọn độc miệng nhất sẽ được thưởng thẻ cào nhé!",
        choices: [
            { text: "A. Lên tiếng phản đối trong nhóm, yêu cầu dừng ngay trò đùa độc hại này lại.", score: 25, feedback: "Dũng cảm! Dám đứng lên chống lại cái xấu và bảo vệ nạn nhân." },
            { text: "B. Đứng ngoài xem mọi người chơi chứ không trực tiếp tham gia bình chọn.", score: 10, feedback: "Thiếu bản lĩnh. Bàng quan trước nỗi đau của người khác là hành vi thiếu văn minh." },
            { text: "C. Tham gia bình chọn ngay cho vui vì đằng nào cũng có thưởng.", score: 0, feedback: "Trầm trọng! Đây là hành vi bạo lực mạng có tổ chức và đáng lên án." },
            { text: "D. Rời nhóm ngay lập tức và báo cáo hành vi bắt nạt với nhà trường.", score: 30, feedback: "Hoàn hảo! Hành động kiên quyết, bảo vệ tuyệt đối an toàn tâm lý cho mọi người." }
        ]
    }
];

const expansionBank = [
    {
        sender: "💻 Tuyển dụng việc làm online",
        dialogue: "Tin tuyển dụng: 'Cần tuyển cộng tác viên gõ văn bản, like video TikTok kiếm 300k - 500k mỗi ngày. Không cần kinh nghiệm, nhận lương ngay qua tài khoản. Phí đăng ký hồ sơ ban đầu chỉ 50k'. Bạn sẽ phản ứng thế nào?",
        choices: [
            { text: "A. Lờ đi vì biết chắc đây là chiêu trò lừa đảo chiếm đoạt tài sản.", score: 25, feedback: "Rất tỉnh táo! Tránh xa các cạm bẫy việc nhẹ lương cao." },
            { text: "B. Đóng ngay 50k phí để thử việc vì số tiền quá nhỏ.", score: 0, feedback: "Sập bẫy lừa đảo việc làm online! Bạn đã mất tiền oan." },
            { text: "C. Báo cáo bài viết lừa đảo để bảo vệ cộng đồng mạng.", score: 30, feedback: "Xuất sắc! Hành động văn minh của một công dân số." },
            { text: "D. Nhắn tin hỏi xem có thể trừ tiền phí vào lương đầu tiên không.", score: 10, feedback: "Chưa sắc sảo. Các công ty uy tín tuyệt đối không thu phí tuyển dụng." }
        ]
    },
    {
        sender: "🤖 Cuộc gọi Video từ 'Người thân'",
        dialogue: "Bạn nhận được cuộc gọi video call từ tài khoản của một người bạn thân. Hình ảnh hơi mờ, giật cục và thông báo đang bị kẹt ở đồn công an nước ngoài, cần bạn chuyển gấp 2 triệu để giải cứu.",
        choices: [
            { text: "A. Cúp máy ngay lập tức và gọi điện thoại trực tiếp bằng số di động thông thường để xác thực.", score: 25, feedback: "Quá thông minh! Luôn có kênh xác thực độc lập cho các tình huống khẩn cấp." },
            { text: "B. Vội vàng chuyển khoản ngay vì thấy đúng mặt và nghe giọng bạn mình.", score: 0, feedback: "Mắc bẫy công nghệ Deepfake AI giả mạo hình ảnh và giọng nói cực kỳ tinh vi!" },
            { text: "C. Cảnh báo cho nhóm chung của lớp về thủ đoạn giả mạo công nghệ cao này.", score: 30, feedback: "Tuyệt đối xuất sắc! Bản lĩnh phòng thủ không gian mạng tuyệt vời." },
            { text: "D. Bán tín bán nghi, hỏi thêm vài câu thử thách xem có đúng là bạn mình không.", score: 10, feedback: "Nguy hiểm! Kẻ gian dùng AI có thể lừa được các câu trả lời xã giao." }
        ]
    }
];

let scenarios = [...coreScenarios];
// Vòng lặp chạy trọn vẹn 300 tình huống, không bị hụt câu hỏi số 3
for (let i = 3; i <= 300; i++) {
    let template = expansionBank[(i - 3) % expansionBank.length];
    scenarios.push({
        sender: `${template.sender} (Ca #${i})`,
        dialogue: `${template.dialogue} (Tình huống phát sinh #${i}). Hãy chọn phương án xử lý khôn ngoan nhất:`,
        choices: JSON.parse(JSON.stringify(template.choices))
    });
}

let currentIdx = 0;
let score = 0;
let gameMode = 'standard';
let playerName = '';

let leaderboard = JSON.parse(localStorage.getItem('khongmotminh_lb')) || [
    { name: "Thành viên A", score: 1200, rank: "Kim Cương 💎" },
    { name: "Thành viên B", score: 950, rank: "Bạch Kim 🏆" },
    { name: "Thành viên C", score: 800, rank: "Vàng ⭐" },
    { name: "Thành viên D", score: 500, rank: "Bạc 🛡️" }
];

function calculateRank(currentScore) {
    if (currentScore >= 2000) return "Thách Đấu 👑";
    if (currentScore >= 1500) return "Kim Cương 💎";
    if (currentScore >= 1000) return "Bạch Kim 🏆";
    if (currentScore >= 500) return "Vàng ⭐";
    if (currentScore >= 200) return "Bạc 🛡️";
    return "Đồng 🥉";
}

function changeTheme(themeVal) {
    document.documentElement.setAttribute('data-theme', themeVal);
}

function selectMode(mode) {
    gameMode = mode;
    const btnStd = document.getElementById('btn-mode-std');
    const btnExp = document.getElementById('btn-mode-exp');
    if (btnStd && btnExp) {
        if (mode === 'standard') {
            btnStd.classList.add('active');
            btnExp.classList.remove('active');
        } else {
            btnExp.classList.add('active');
            btnStd.classList.remove('active');
        }
    }
}

function renderGlobalLeaderboard() {
    const globalContainer = document.getElementById('global-leaderboard-container');
    if (globalContainer) {
        globalContainer.innerHTML = '';
        leaderboard.forEach((item, index) => {
            globalContainer.innerHTML += `
                <div class="leaderboard-item" style="display: flex; justify-content: space-between; padding: 10px 14px; font-size: 13px; align-items: center; background: rgba(0,0,0,0.2); border-radius: 8px; margin-bottom: 6px; border: 1px solid rgba(255,255,255,0.1);">
                    <span>#${index + 1} - <strong>${item.name}</strong> (${item.rank})</span>
                    <span style="font-weight: 700; color: var(--accent);">${item.score} điểm</span>
                </div>
            `;
        });
    }
}

function openLeaderboard() {
    document.getElementById('welcome-screen').classList.remove('active');
    document.getElementById('leaderboard-screen').classList.add('active');
    renderGlobalLeaderboard();
}

function backToHome() {
    document.getElementById('leaderboard-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
}

function startGame() {
    const inputEl = document.getElementById('playerName');
    const typedName = inputEl && inputEl.value.trim() ? inputEl.value.trim() : "";
    
    const savedGame = localStorage.getItem('khongmotminh_save');
    if (savedGame) {
        const data = JSON.parse(savedGame);
        showCustomPopup(`Phát hiện tiến độ đã lưu trước đó của "${data.playerName}":\n- Đang ở câu hỏi: ${data.currentIdx + 1}/300\n- Tổng điểm: ${data.score}\n\nCậu có muốn tiếp tục phần chơi này không?`, (isYes) => {
            if (isYes) {
                playerName = data.playerName;
                currentIdx = data.currentIdx;
                score = data.score;
                gameMode = data.gameMode || 'standard';
                if(inputEl) inputEl.value = playerName;
            } else {
                localStorage.removeItem('khongmotminh_save');
                playerName = typedName || "Thành viên ẩn danh";
                currentIdx = 0;
                score = 0;
            }
            document.getElementById('welcome-screen').classList.remove('active');
            document.getElementById('game-screen').classList.add('active');
            loadQuestion();
        }, true);
    } else {
        playerName = typedName || "Thành viên ẩn danh";
        currentIdx = 0;
        score = 0;
        localStorage.removeItem('khongmotminh_save');
        document.getElementById('welcome-screen').classList.remove('active');
        document.getElementById('game-screen').classList.add('active');
        loadQuestion();
    }
}

function pauseGame() {
    const saveData = { playerName, currentIdx, score, gameMode };
    localStorage.setItem('khongmotminh_save', JSON.stringify(saveData));
    
    let currentRank = calculateRank(score);
    let existingIndex = leaderboard.findIndex(item => item.name === playerName);
    if (existingIndex !== -1) {
        leaderboard[existingIndex].score = score;
        leaderboard[existingIndex].rank = currentRank;
    } else {
        leaderboard.push({ name: playerName, score: score, rank: currentRank });
    }
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem('khongmotminh_lb', JSON.stringify(leaderboard));

    showCustomPopup(`☕ Đã lưu tiến độ thành công tại câu số ${currentIdx + 1}!\n\n📊 Phong độ hiện tại của cậu:\n- Tổng điểm: ${score}\n- Mức Rank: ${currentRank}\n\nTiến độ đã được giữ lại an toàn!`, () => {
        document.getElementById('game-screen').classList.remove('active');
        document.getElementById('welcome-screen').classList.add('active');
    });
}

function loadQuestion() {
    if (currentIdx >= scenarios.length) {
        localStorage.removeItem('khongmotminh_save');
        endGame();
        return;
    }

    const saveData = { playerName, currentIdx, score, gameMode };
    localStorage.setItem('khongmotminh_save', JSON.stringify(saveData));

    const current = scenarios[currentIdx];
    document.getElementById('current-q').textContent = currentIdx + 1;
    document.getElementById('total-q').textContent = scenarios.length;
    document.getElementById('current-score').textContent = score;
    document.getElementById('scenario-sender').textContent = current.sender;

    const alertEl = document.getElementById('alert-level');
    if (alertEl) {
        if (score < 30) {
            alertEl.textContent = "Báo động đỏ 🚨";
            alertEl.style.color = "#f87171";
        } else if (score < 80) {
            alertEl.textContent = "Cảnh giác ⚠️";
            alertEl.style.color = "#fbbf24";
        } else {
            alertEl.textContent = "An toàn vững vàng 🛡️";
            alertEl.style.color = "#34d399";
        }
    }

    const chatBox = document.getElementById('chat-messages');
    if (chatBox) {
        chatBox.innerHTML = `<div class="chat-bubble incoming">${current.dialogue}</div>`;
    }

    const choicesBox = document.getElementById('choices-box');
    if (choicesBox) {
        choicesBox.innerHTML = '';
        current.choices.forEach((choice) => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = choice.text;
            btn.type = 'button';
            btn.onclick = () => handleChoice(choice.score, choice.feedback);
            choicesBox.appendChild(btn);
        });
    }

    const customArea = document.getElementById('custom-answer-area');
    if (customArea) {
        if (gameMode === 'expert') {
            customArea.classList.remove('hidden');
        } else {
            customArea.classList.add('hidden');
        }
    }
}

function showCustomPopup(message, callback, isConfirm = false) {
    let existingOverlay = document.getElementById('custom-popup-overlay');
    if (existingOverlay) existingOverlay.remove();

    const overlay = document.createElement('div');
    overlay.id = 'custom-popup-overlay';
    overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(5px);
        display: flex; justify-content: center; align-items: center; z-index: 999999;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: #111827; border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 20px 25px; border-radius: 16px; width: 90%; max-width: 420px;
        color: #f3f4f6; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        font-family: 'Plus Jakarta Sans', sans-serif; white-space: pre-line;
    `;

    let buttonsHTML = `<button id="popup-ok-btn" type="button" style="width: 100%; padding: 12px; background: var(--accent); color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px; margin-top: 10px;">Xác Nhận</button>`;
    
    if (isConfirm) {
        buttonsHTML = `
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button id="popup-no-btn" type="button" style="flex: 1; padding: 12px; background: rgba(255,255,255,0.1); color: #f3f4f6; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">Chơi Mới</button>
                <button id="popup-yes-btn" type="button" style="flex: 1; padding: 12px; background: var(--accent); color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">Tiếp Tục</button>
            </div>
        `;
    }

    box.innerHTML = `
        <div style="font-size: 28px; margin-bottom: 8px;">🏆</div>
        <h3 style="font-size: 16px; margin-bottom: 8px; color: var(--accent);">Hệ Thống Bản Lĩnh Số</h3>
        <p style="font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 10px; text-align: left; padding: 0 10px;">${message}</p>
        ${buttonsHTML}
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    if (isConfirm) {
        document.getElementById('popup-yes-btn').onclick = () => {
            overlay.remove();
            if (callback) callback(true);
        };
        document.getElementById('popup-no-btn').onclick = () => {
            overlay.remove();
            if (callback) callback(false);
        };
    } else {
        document.getElementById('popup-ok-btn').onclick = () => {
            overlay.remove();
            if (callback) callback();
        };
    }
}

function handleChoice(points, feedback) {
    score += points;
    showCustomPopup(feedback, () => {
        currentIdx++;
        loadQuestion();
    });
}

// Chống gõ bừa/nhảm ở chế độ chuyên gia bằng từ khóa an toàn số
function submitCustomAnswer() {
    const customInput = document.getElementById('custom-input');
    const text = customInput ? customInput.value.trim() : "";
    
    if (!text || text.length < 5) {
        showCustomPopup("⚠️ Câu trả lời quá ngắn hoặc chưa hợp lệ! Cậu hãy nhập ý kiến xử lý chi tiết hơn (tối thiểu 5 ký tự) để hệ thống ghi nhận.");
        return;
    }

    const validKeywords = [
        "báo", "chặn", "xóa", "không", "gọi", "công an", "báo cáo", "report", 
        "tránh", "ngờ", "xác thực", "kiểm tra", "bảo vệ", "nhắc", "tố giác", 
        "từ chối", "im lặng", "chụp", "bằng chứng", "thận trọng", "block", "tin"
    ];

    const lowerText = text.toLowerCase();
    const hasValidKeyword = validKeywords.some(keyword => lowerText.includes(keyword));

    if (!hasValidKeyword && text.length < 15) {
        showCustomPopup("🚨 Phát hiện câu trả lời sơ sài hoặc gõ bừa! Cậu cần đưa ra phương án xử lý cụ thể hơn (ví dụ: chặn, báo cáo, không tin tưởng...) mới được tính điểm.");
        return;
    }

    let bonus = text.length > 25 ? 25 : 15;
    score += bonus;
    showCustomPopup(`💡 Đánh giá từ hệ thống chuyên gia: Câu trả lời rất có trách nhiệm và sắc sảo! (+${bonus} điểm vào bảng xếp hạng).`, () => {
        if (customInput) customInput.value = '';
        currentIdx++;
        loadQuestion();
    });
}

function submitUserFeedback() {
    const feedbackInput = document.getElementById('user-feedback-input');
    const feedbackText = feedbackInput ? feedbackInput.value.trim() : "";
    if (!feedbackText) {
        showCustomPopup("Cậu vui lòng viết vài dòng đánh giá hoặc góp ý trước khi gửi nhé!");
        return;
    }
    let allFeedbacks = JSON.parse(localStorage.getItem('khongmotminh_feedbacks')) || [];
    allFeedbacks.push({ name: playerName, text: feedbackText, time: new Date().toLocaleString() });
    localStorage.setItem('khongmotminh_feedbacks', JSON.stringify(allFeedbacks));

    showCustomPopup("❤️ Cảm ơn đánh giá và góp ý tuyệt vời của cậu! Phản hồi đã được ghi nhận thành công.");
    if (feedbackInput) feedbackInput.value = '';
}

function endGame() {
    document.getElementById('game-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');

    const finalScoreEl = document.getElementById('final-score');
    if (finalScoreEl) finalScoreEl.textContent = score;

    let rankTitle = calculateRank(score);
    const resultDesc = document.getElementById('result-desc');
    const resultIcon = document.getElementById('result-icon');

    if (resultDesc && resultIcon) {
        resultIcon.textContent = "🏆";
        resultDesc.innerHTML = `Chúc mừng ${playerName} đã hoàn thành hành trình! Mức rank đạt được: <strong style="color: var(--accent);">${rankTitle}</strong> với tổng điểm tích lũy là <strong>${score}</strong> điểm!`;
    }

    leaderboard.push({ name: playerName, score: score, rank: rankTitle });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem('khongmotminh_lb', JSON.stringify(leaderboard));

    const lbContainer = document.getElementById('leaderboard-container');
    if (lbContainer) {
        lbContainer.innerHTML = '';
        leaderboard.forEach((item, index) => {
            lbContainer.innerHTML += `
                <div class="leaderboard-item" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1);">
                    <span>#${index + 1} - <strong>${item.name}</strong> (${item.rank})</span>
                    <span><strong>${item.score} điểm</strong></span>
                </div>
            `;
        });
    }

    const resultScreen = document.getElementById('result-screen');
    if (resultScreen && !document.getElementById('feedback-wrapper-box')) {
        const feedbackBox = document.createElement('div');
        feedbackBox.id = 'feedback-wrapper-box';
        feedbackBox.style.cssText = `
            margin-top: 20px; padding: 15px; background: rgba(0,0,0,0.25);
            border: 1px solid rgba(255,255,255,0.12); border-radius: 12px; text-align: left;
        `;
        feedbackBox.innerHTML = `
            <h4 style="font-size: 14px; color: var(--accent); margin-bottom: 8px;">📝 Gửi Đánh Giá & Góp Ý Cho Tác Giả:</h4>
            <textarea id="user-feedback-input" placeholder="Cậu thấy trò chơi thế nào? Có cần thêm tình huống gì không..." style="width: 100%; height: 70px; background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; padding: 10px; color: #fff; font-size: 13px; resize: none; margin-bottom: 8px; font-family: 'Plus Jakarta Sans', sans-serif;"></textarea>
            <button type="button" onclick="submitUserFeedback()" style="width: 100%; padding: 10px; background: var(--accent); color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">Gửi Đánh Giá 🚀</button>
        `;
        resultScreen.appendChild(feedbackBox);
    }
}

function restartGame() {
    localStorage.removeItem('khongmotminh_save');
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('welcome-screen').classList.add('active');
}
