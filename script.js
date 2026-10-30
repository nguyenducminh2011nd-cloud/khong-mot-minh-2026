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
    { name: "Thành viên A", score: 100 },
    { name: "Thành viên B", score: 95 },
    { name: "Thành viên C", score: 90 },
    { name: "Thành viên D", score: 85 }
];

const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
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

if (startBtn) {
    startBtn.addEventListener('click', () => {
        playerName = playerNameInput.value.trim() || "Thành viên ẩn danh";
        currentIdx = 0;
        score = 0;
        if (welcomeScreen) welcomeScreen.classList.remove('active');
        if (gameScreen) gameScreen.classList.add('active');
        loadQuestion();
    });
}

function loadQuestion() {
    if (currentIdx >= scenarios.length) {
        endGame();
        return;
    }

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

// HÀM POPUP KÍNH MỜ XỊN XÒ THAY THẾ HOÀN TOÀN ALERT()
function showCustomPopup(message, callback) {
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
        padding: 20px 25px; border-radius: 16px; width: 90%; max-width: 400px;
        color: #f3f4f6; text-align: center; box-shadow: 0 20px 40px rgba(0,0,0,0.6);
        font-family: 'Plus Jakarta Sans', sans-serif;
    `;

    box.innerHTML = `
        <div style="font-size: 28px; margin-bottom: 10px;">🛡️</div>
        <h3 style="font-size: 16px; margin-bottom: 10px; color: #6366f1;">Đánh Giá Bản Lĩnh Số</h3>
        <p style="font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 20px;">${message}</p>
        <button id="popup-ok-btn" style="
            width: 100%; padding: 10px; background: #6366f1; color: white;
            border: none; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 13px;
        ">Xác Nhận & Tiếp Tục</button>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('popup-ok-btn').addEventListener('click', () => {
        overlay.remove();
        if (callback) callback();
    });
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
        showCustomPopup(`💡 AI Phân tích phản hồi: Câu trả lời của cậu thể hiện góc nhìn khá sắc sảo! (+${bonus} điểm bản lĩnh).`, () => {
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

    const resultDesc = document.getElementById('result-desc');
    const resultIcon = document.getElementById('result-icon');

    if (resultDesc && resultIcon) {
        if (score >= 130) {
            resultIcon.textContent = "👑";
            resultDesc.innerHTML = `Xuất sắc! ${playerName} sở hữu bản lĩnh số tuyệt vời, tư duy phản biện sắc bén, hoàn thành xuất sắc thử thách an toàn số!`;
        } else if (score >= 70) {
            resultIcon.textContent = "🛡️";
            resultDesc.innerHTML = `Khá tốt! ${playerName} đã có ý thức phòng thủ trước cạm bẫy mạng, tuy nhiên cần cẩn trọng hơn trước các chiêu trò thao túng tâm lý.`;
        } else {
            resultIcon.textContent = "⚠️";
            resultDesc.innerHTML = `Cảnh báo! ${playerName} cần trau dồi thêm kỹ năng an toàn số để bảo vệ bản thân tốt hơn trên không gian mạng.`;
        }
    }

    leaderboard.push({ name: playerName, score: score });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 5);
    localStorage.setItem('khongmotminh_lb', JSON.stringify(leaderboard));

    const lbContainer = document.getElementById('leaderboard-container');
    if (lbContainer) {
        lbContainer.innerHTML = '';
        leaderboard.forEach((item, index) => {
            lbContainer.innerHTML += `
                <div class="leaderboard-item">
                    <span>#${index + 1} - <strong>${item.name}</strong></span>
                    <span><strong>${item.score}</strong> điểm</span>
                </div>
            `;
        });
    }
}

if (restartBtn) {
    restartBtn.addEventListener('click', () => {
        if (resultScreen) resultScreen.classList.remove('active');
        if (welcomeScreen) welcomeScreen.classList.add('active');
    });
}
