const baseScenarios = [
    {
        sender: "👤 Nick ẩn danh 'Bóc Phốt Học Đường'",
        dialogue: "Ê bạn ơi, mình vừa tìm thấy mấy bức ảnh cũ hơi ngố của bạn M. lớp bên cạnh. Giờ mình định đăng lên nhóm chung kèm vài câu trêu chọc cho vui cửa vui nhà, tương tác chắc cao phết đấy! Cậu có hùa vào bình luận cùng mình không?",
        choices: [
            { text: "A. Hùa theo bình luận vài câu chọc ghẹo cho vui, chắc bạn ấy không để ý đâu.", score: 0, feedback: "Sai lầm! Hành vi này tiếp tay cho bạo lực mạng và gây tổn thương sâu sắc." },
            { text: "B. Âm thầm bấm like dạo và xem người khác tranh cãi mà không nói gì.", score: 10, feedback: "Chưa tốt. Sự im lặng của người chứng kiến vô tình cổ vũ kẻ xấu hoành hành." },
            { text: "C. Nhắn tin can ngăn tài khoản đó và cảnh báo người bạn bị đăng ảnh ngay lập tức.", score: 25, feedback: "Tuyệt vời! Bản lĩnh số cực tốt, biết bảo vệ bạn bè trước làn sóng độc hại." },
            { text: "D. Báo cáo (report) tài khoản giả mạo và chụp màn hình gửi giáo viên chủ nhiệm.", score: 30, feedback: "Xuất sắc! Xử lý triệt để, đúng chuẩn công dân số văn minh." }
        ]
    },
    {
        sender: "🎁 Tin nhắn trúng thưởng giả mạo",
        dialogue: "🎉 CHÚC MỪNG! Tài khoản của bạn đã may mắn trúng giải Đặc biệt: 1 chiếc điện thoại cao cấp trị giá 25 triệu từ chương trình tri ân học sinh! Hãy click vào đường link lạ đăng nhập tài khoản mật khẩu để nhận thưởng ngay trong 5 phút!",
        choices: [
            { text: "A. Sướng quá, click ngay vào link và điền tài khoản mật khẩu để nhận quà.", score: 0, feedback: "Sập bẫy lừa đảo tinh vi! Mất tài khoản mạng xã hội chỉ trong một nốt nhạc." },
            { text: "B. Bán tín bán nghi nhưng cứ thử bấm vào xem sao, nhỡ trúng thật thì sao.", score: 5, feedback: "Nguy hiểm! Phishing link đánh cắp thông tin rất hay dùng chiêu trò này." },
            { text: "C. Bỏ qua, xóa tin nhắn vì không có chương trình phát thưởng ngẫu nhiên nào như vậy.", score: 20, feedback: "Tỉnh táo! Đã nhận thức được các chiêu trò lừa đảo qua mạng phổ biến." },
            { text: "D. Chặn ngay tài khoản, thông báo lên nhóm chung để cảnh báo mọi người cùng tránh.", score: 30, feedback: "Quá đỉnh! Không những né bẫy mà còn bảo vệ cộng đồng xung quanh." }
        ]
    },
    {
        sender: "💬 Nhóm chat kín 'Góc Tâm Sự'",
        dialogue: "Này, dạo này thấy bạn H. hay thui thủi một mình, hình như tính tình kỳ quặc lắm. Cả lũ mình lập hội kín lập poll chê bai ngoại hình đi, xem ai bình chọn độc miệng nhất sẽ được thưởng thẻ cào nhé!",
        choices: [
            { text: "A. Tham gia bình chọn ngay cho vui vì đằng nào cũng có thưởng.", score: 0, feedback: "Trầm trọng! Đây là hành vi bạo lực mạng có tổ chức và đáng lên án." },
            { text: "B. Đứng ngoài xem mọi người chơi chứ không trực tiếp tham gia bình chọn.", score: 10, feedback: "Thiếu bản lĩnh. Bàng quan trước nỗi đau của người khác là hành vi thiếu văn minh." },
            { text: "C. Lên tiếng phản đối trong nhóm, yêu cầu dừng ngay trò đùa độc hại này lại.", score: 25, feedback: "Dũng cảm! Dám đứng lên chống lại cái xấu và bảo vệ nạn nhân." },
            { text: "D. Rời nhóm ngay lập tức và báo cáo hành vi bắt nạt với nhà trường.", score: 30, feedback: "Hoàn hảo! Hành động kiên quyết, bảo vệ tuyệt đối an toàn tâm lý cho mọi người." }
        ]
    },
    {
        sender: "🔥 Tài khoản lạ rủ rê đầu tư",
        dialogue: "Chào bạn, mình thấy trang cá nhân của bạn rất uy tín. Bên mình có quỹ đầu tư công nghệ, chỉ cần bỏ ra 200k vốn là sau 1 tiếng thu về 5 triệu đồng. Cam kết hoàn tiền 100% nếu thua lỗ!",
        choices: [
            { text: "A. Chuyển khoản ngay 200k vì số tiền nhỏ, nhỡ kiếm được tiền tiêu vặt thì sao.", score: 0, feedback: "Mắc bẫy lừa đảo tài chính điển hình trên không gian mạng!" },
            { text: "B. Nhắn tin hỏi han thêm thông tin chi tiết xem họ thuyết phục thế nào.", score: 5, feedback: "Dễ bị thao túng tâm lý bởi những lời hứa hẹn lãi suất phi thực tế." },
            { text: "C. Từ chối thẳng thừng vì không có chuyện kiếm tiền dễ dàng như vậy.", score: 20, feedback: "Tỉnh táo trước cạm bẫy kiếm tiền nhanh chóng trên mạng." },
            { text: "D. Chặn và đăng bài cảnh giác về tài khoản lừa đảo này cho mọi người.", score: 30, feedback: "Tuyệt vời! Tư duy phản biện sắc bén và tinh thần trách nhiệm cao." }
        ]
    },
    {
        sender: "👥 Lời mời kết bạn từ người lạ",
        dialogue: "Một tài khoản không quen biết gửi lời kết bạn và liên tục nhắn tin hỏi chuyện riêng tư, đòi gửi ảnh cá nhân nhạy cảm để đổi lại ảnh đẹp.",
        choices: [
            { text: "A. Thoải mái trò chuyện và gửi ảnh cá nhân cho người lạ.", score: 0, feedback: "Cực kỳ nguy hiểm! Rất dễ rơi vào bẫy tống tiền ảo (sextortion)." },
            { text: "B. Nhắn qua lại vài câu xã giao nhưng giấu thông tin cá nhân thật.", score: 10, feedback: "Vẫn tiềm ẩn rủi ro lộ lọt thông tin cá nhân cho kẻ xấu." },
            { text: "C. Chặn ngay lập tức và cài đặt lại quyền riêng tư tài khoản.", score: 25, feedback: "Bảo mật tốt! Biết cách tự bảo vệ bản thân trước các nguy cơ ẩn giấu." },
            { text: "D. Chặn và báo cáo tài khoản có dấu hiệu quấy rối.", score: 30, feedback: "Quá xuất sắc! Ý thức an toàn số và ứng phó hoàn hảo." }
        ]
    }
];

let scenarios = [...baseScenarios];
const expansionTopics = [
    { title: "Tin giả mạng xã hội", text: "Có thông tin chưa được kiểm chứng lan truyền mạnh mẽ trên mạng về một sự việc nghiêm trọng xảy ra trong khu vực, nhiều người đang hoang mang chia sẻ." },
    { title: "Tệp đính kèm lạ", text: "Một tài khoản lâu ngày không liên lạc tự nhiên gửi một tệp tin nén có tên 'Tai_lieu_quan_trọng.zip' và giục mở ngay." },
    { title: "Bẫy cho thuê tài khoản", text: "Có người hỏi thuê tài khoản cá nhân hoặc tài khoản ngân hàng với giá cao chỉ để nhận tiền chuyển khoản trực tuyến." }
];

for (let i = 6; i <= 300; i++) {
    let template = expansionTopics[(i - 6) % expansionTopics.length];
    scenarios.push({
        sender: `🛡️ Tình huống An toàn số #${i}: ${template.title}`,
        dialogue: `${template.text} Bạn sẽ lựa chọn cách xử lý như thế nào để đảm bảo an toàn tuyệt đối cho bản thân và cộng đồng?`,
        choices: [
            { text: "A. Làm theo hướng dẫn hoặc hùa theo đám đông mà không kiểm chứng.", score: 0, feedback: "Thiếu cẩn trọng! Đây là nguyên nhân khiến tin giả và rủi ro lây lan." },
            { text: "B. Phớt lờ, không quan tâm đến sự việc xung quanh.", score: 10, feedback: "Tạm thời an toàn nhưng thiếu tinh thần trách nhiệm." },
            { text: "C. Dừng lại, tìm kiếm nguồn thông tin chính thống để xác minh.", score: 25, feedback: "Rất tốt! Tư duy phản biện giúp bạn đứng vững trước thông tin nhiễu loạn." },
            { text: "D. Xác minh kỹ lưỡng, cảnh báo cho mọi người và báo cáo cơ quan chức năng.", score: 30, feedback: "Xuất sắc! Xử lý thông minh và chuẩn mực của một công dân số." }
        ]
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

const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const pauseBtn = document.getElementById('pause-btn');
const playerNameInput = document.getElementById('playerName');
const themeSelect = document.getElementById('themeSelect');

if (themeSelect) {
    themeSelect.addEventListener('change', (e) => {
        document.documentElement.setAttribute('data-theme', e.target.value);
    });
}

document.querySelectorAll('.mode-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        gameMode = btn.getAttribute('data-mode');
    });
});

// Hàm tính rank dựa trên điểm số hiện tại
function calculateRank(currentScore) {
    if (currentScore >= 2000) return "Thách Đấu 👑";
    if (currentScore >= 1500) return "Kim Cương 💎";
    if (currentScore >= 1000) return "Bạch Kim 🏆";
    if (currentScore >= 500) return "Vàng ⭐";
    if (currentScore >= 200) return "Bạc 🛡️";
    return "Đồng 🥉";
}

// Kiểm tra tiến độ đã lưu khi tải trang
window.addEventListener('DOMContentLoaded', () => {
    const savedGame = localStorage.getItem('khongmotminh_save');
    if (savedGame) {
        const data = JSON.parse(savedGame);
        if (data && data.currentIdx > 0 && data.currentIdx < scenarios.length) {
            let savedRank = calculateRank(data.score);
            showCustomPopup(`Chào mừng ${data.playerName} trở lại!\nTiến độ đang ở câu: ${data.currentIdx + 1}/300\nĐiểm tích lũy: ${data.score} | Mức Rank: ${savedRank}\n\nCậu có muốn tiếp tục hành trình không?`, (isYes) => {
                if (isYes) {
                    playerName = data.playerName;
                    currentIdx = data.currentIdx;
                    score = data.score;
                    gameMode = data.gameMode || 'standard';
                    if (welcomeScreen) welcomeScreen.classList.remove('active');
                    if (gameScreen) gameScreen.classList.add('active');
                    loadQuestion();
                } else {
                    localStorage.removeItem('khongmotminh_save');
                }
            }, true);
        }
    }
});

if (startBtn) {
    startBtn.addEventListener('click', () => {
        playerName = playerNameInput.value.trim() || "Thành viên ẩn danh";
        currentIdx = 0;
        score = 0;
        localStorage.removeItem('khongmotminh_save');
        if (welcomeScreen) welcomeScreen.classList.remove('active');
        if (gameScreen) gameScreen.classList.add('active');
        loadQuestion();
    });
}

// Khi bấm tạm dừng: Lưu lại và hiển thị rõ mức rank, điểm số hiện tại
if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
        const saveData = { playerName, currentIdx, score, gameMode };
        localStorage.setItem('khongmotminh_save', JSON.stringify(saveData));
        
        let currentRank = calculateRank(score);
        showCustomPopup(`☕ Đã lưu tiến độ thành công tại câu số ${currentIdx + 1}!\n\n📊 Phong độ hiện tại của cậu:\n- Tổng điểm: ${score}\n- Mức Rank: ${currentRank}\n\nCậu có thể yên tâm nghỉ ngơi, lần sau vào lại web sẽ tự động khôi phục đúng tiến độ này!`);
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
            btn.addEventListener('click', () => handleChoice(choice.score, choice.feedback));
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
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.6); backdrop-filter: blur(5px);
        display: flex; justify-content: center; align-items: center; z-index: 9999;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
        background: #111827; border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 20px 25px; border-radius: 16px; width: 90%; max-width: 420px;
        color: #f3f4f6; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        font-family: 'Plus Jakarta Sans', sans-serif; white-space: pre-line;
    `;

    let buttonsHTML = `<button id="popup-ok-btn" style="width: 100%; padding: 10px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px; margin-top: 10px;">Xác Nhận</button>`;
    
    if (isConfirm) {
        buttonsHTML = `
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button id="popup-no-btn" style="flex: 1; padding: 10px; background: rgba(255,255,255,0.1); color: #f3f4f6; border: 1px solid rgba(255,255,255,0.2); border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">Chơi Mới</button>
                <button id="popup-yes-btn" style="flex: 1; padding: 10px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;">Tiếp Tục</button>
            </div>
        `;
    }

    box.innerHTML = `
        <div style="font-size: 28px; margin-bottom: 8px;">🏆</div>
        <h3 style="font-size: 16px; margin-bottom: 8px; color: #6366f1;">Hệ Thống Bản Lĩnh Số</h3>
        <p style="font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 10px;">${message}</p>
        ${buttonsHTML}
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    if (isConfirm) {
        document.getElementById('popup-yes-btn').addEventListener('click', () => {
            overlay.remove();
            if (callback) callback(true);
        });
        document.getElementById('popup-no-btn').addEventListener('click', () => {
            overlay.remove();
            if (callback) callback(false);
        });
    } else {
        document.getElementById('popup-ok-btn').addEventListener('click', () => {
            overlay.remove();
            if (callback) callback();
        });
    }
}

function handleChoice(points, feedback) {
    score += points;
    showCustomPopup(feedback, () => {
        currentIdx++;
        loadQuestion();
    });
}

const submitCustomBtn = document.getElementById('submit-custom-btn');
if (submitCustomBtn) {
    submitCustomBtn.addEventListener('click', () => {
        const customInput = document.getElementById('custom-input');
        const text = customInput ? customInput.value.trim() : "";
        if (!text) {
            showCustomPopup("Cậu hãy nhập ý kiến của mình trước nhé!");
            return;
        }
        let bonus = text.length > 20 ? 25 : 10;
        score += bonus;
        showCustomPopup(`💡 Đánh giá từ chuyên gia: Câu trả lời rất sắc sảo! (+${bonus} điểm vào BXH).`, () => {
            if (customInput) customInput.value = '';
            currentIdx++;
            loadQuestion();
        });
    });
}

function endGame() {
    if (gameScreen) gameScreen.classList.remove('active');
    if (resultScreen) resultScreen.classList.add('active');

    const finalScoreEl = document.getElementById('final-score');
    if (finalScoreEl) finalScoreEl.textContent = score;

    let rankTitle = calculateRank(score);
    const resultDesc = document.getElementById('result-desc');
    const resultIcon = document.getElementById('result-icon');

    if (resultDesc && resultIcon) {
        resultIcon.textContent = "🏆";
        resultDesc.innerHTML = `Chúc mừng ${playerName} đã hoàn thành hành trình! Mức rank đạt được: <strong style="color: #6366f1;">${rankTitle}</strong> với tổng điểm tích lũy là <strong>${score}</strong> điểm!`;
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
                    <span>#${index + 1} - <strong>${item.name}</strong> (${item.rank || 'Thành viên'})</span>
                    <span><strong>${item.score}</strong> điểm</span>
                </div>
            `;
        });
    }
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        localStorage.removeItem('khongmotminh_save');
        if (resultScreen) resultScreen.classList.remove('active');
        if (welcomeScreen) welcomeScreen.classList.add('active');
    });
}
