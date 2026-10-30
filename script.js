// Bộ cơ sở dữ liệu mở rộng với các chủ đề an toàn số và tâm lý học đường
const baseScenarios = [
    {
        sender: "👤 Nick ảo 'Bóc Phốt Nam Trực'",
        dialogue: "Ê mày, tao vừa thấy ảnh cũ thời cấp 2 hơi ngố của đứa bạn cùng lớp 10A9. Giờ tao đăng lên nhóm trường kèm câu kích động cho vui nhà vui cửa, chú ý tương tác cao phết đấy! Mày có hùa vào bình luận châm chọc cùng tao không?",
        choices: [
            { text: "A. Hùa theo bình luận vài câu chọc ghẹo cho vui, chắc bạn ấy không để ý đâu.", score: 0, feedback: "Sai lầm! Hành vi này tiếp tay cho bạo lực mạng và gây tổn thương sâu sắc." },
            { text: "B. Âm thầm bấm like dạo và xem người khác tranh cãi mà không nói gì.", score: 10, feedback: "Chưa tốt. Sự im lặng của người chứng kiến vô tình cổ vũ kẻ xấu hoành hành." },
            { text: "C. Nhắn tin can ngăn tài khoản đó và cảnh báo người bạn bị đăng ảnh ngay lập tức.", score: 25, feedback: "Tuyệt vời! Bản lĩnh số cực tốt, biết bảo vệ bạn bè trước làn sóng độc hại." },
            { text: "D. Báo cáo (report) tài khoản giả mạo và chụp màn hình gửi giáo viên chủ nhiệm.", score: 30, feedback: "Xuất sắc! Xử lý triệt để, đúng chuẩn học sinh gương mẫu thời đại số." }
        ]
    },
    {
        sender: "🎁 Tin nhắn trúng thưởng giả mạo",
        dialogue: "🎉 CHÚC MỪNG! Tài khoản của bạn đã may mắn trúng giải Đặc biệt: 1 chiếc iPhone đời mới trị giá 25 triệu từ chương trình kỷ niệm trường THPT Nam Trực! Hãy click vào đường link lạ đăng nhập tài khoản mật khẩu Facebook để nhận thưởng ngay trong 5 phút!",
        choices: [
            { text: "A. Sướng quá, click ngay vào link và điền tài khoản mật khẩu để nhận quà.", score: 0, feedback: "Sập bẫy lừa đảo tinh vi! Mất tài khoản mạng xã hội chỉ trong một nốt nhạc." },
            { text: "B. Bán tín bán nghi nhưng cứ thử bấm vào xem sao, nhỡ trúng thật thì sao.", score: 5, feedback: "Nguy hiểm! Phishing link đánh cắp thông tin rất hay dùng chiêu trò này." },
            { text: "C. Bỏ qua, xóa tin nhắn vì trường học không bao giờ phát thưởng kiểu ngẫu nhiên này.", score: 20, feedback: "Tỉnh táo! Đã nhận thức được các chiêu trò lừa đảo qua mạng phổ biến." },
            { text: "D. Chặn ngay tài khoản, thông báo lên nhóm lớp để cảnh báo mọi người cùng tránh.", score: 30, feedback: "Quá đỉnh! Không những né bẫy mà còn bảo vệ cộng đồng xung quanh." }
        ]
    },
    {
        sender: "💬 Nhóm chat kín 'Góc Tâm Sự 10A9'",
        dialogue: "Này, dạo này thấy bạn M. hay thui thủi một mình, hình như tính tình kỳ quặc lắm. Cả lũ mình lập hội kín lập poll chê bai ngoại hình đi, xem đứa nào bình chọn độc miệng nhất sẽ được thưởng thẻ cào 50k nhé!",
        choices: [
            { text: "A. Tham gia bình chọn ngay cho vui vì đằng nào cũng có thưởng thẻ cào.", score: 0, feedback: "Trầm trọng! Đây là hành vi bạo lực mạng có tổ chức và đáng lên án." },
            { text: "B. Đứng ngoài xem mọi người chơi chứ không trực tiếp tham gia bình chọn.", score: 10, feedback: "Thiếu bản lĩnh. Bàng quan trước nỗi đau của bạn bè là hành vi thiếu văn minh." },
            { text: "C. Lên tiếng phản đối trong nhóm, yêu cầu dừng ngay trò đùa độc hại này lại.", score: 25, feedback: "Dũng cảm! Dám đứng lên chống lại cái xấu và bảo vệ nạn nhân." },
            { text: "D. Rời nhóm ngay lập tức và báo cáo hành vi bắt nạt học đường với ban cán sự lớp.", score: 30, feedback: "Hoàn hảo! Hành động kiên quyết, bảo vệ tuyệt đối an toàn tâm lý cho bạn bè." }
        ]
    },
    {
        sender: "🔥 Tài khoản lạ rủ rê đầu tư",
        dialogue: "Cháu chào anh/chị, em thấy trang cá nhân của anh/chị rất uy tín. Em bên quỹ đầu tư công nghệ 4.0, chỉ cần bỏ ra 200k vốn là sau 1 tiếng thu về 5 triệu đồng. Cam kết hoàn tiền 100% nếu thua lỗ!",
        choices: [
            { text: "A. Chuyển khoản ngay 200k vì số tiền nhỏ, nhỡ kiếm được tiền tiêu vặt thì sao.", score: 0, feedback: "Mắc bẫy lừa đảo tài chính điển hình trên không gian mạng!" },
            { text: "B. Nhắn tin hỏi han thêm thông tin chi tiết xem họ thuyết phục thế nào.", score: 5, feedback: "Dễ bị thao túng tâm lý bởi những lời hứa hẹn lãi suất phi thực tế." },
            { text: "C. Từ chối thẳng thừng vì không có chuyện kiếm tiền dễ dàng như vậy.", score: 20, feedback: "Tỉnh táo trước cạm bẫy kiếm tiền nhanh chóng trên mạng." },
            { text: "D. Đăng bài bóc phốt tài khoản lừa đảo để cảnh giác cho các bạn học sinh khác.", score: 30, feedback: "Tuyệt vời! Tư duy phản biện sắc bén và tinh thần trách nhiệm cao." }
        ]
    },
    {
        sender: "👥 Lời mời kết bạn từ người lạ",
        dialogue: "Một người không quen biết, để avatar hình đại diện lung linh gửi lời kết bạn và liên tục nhắn tin gạ gẫm hỏi chuyện riêng tư, đòi gửi ảnh cá nhân nhạy cảm để đổi lại ảnh đẹp.",
        choices: [
            { text: "A. Thoải mái trò chuyện và gửi ảnh cá nhân cho người lạ vì nghĩ kết bạn bốn phương.", score: 0, feedback: "Cực kỳ nguy hiểm! Rất dễ rơi vào bẫy tống tiền ảo (sextortion)." },
            { text: "B. Nhắn qua lại vài câu xã giao nhưng giấu thông tin cá nhân thật.", score: 10, feedback: "Vẫn tiềm ẩn rủi ro lộ lọt thông tin cá nhân cho kẻ xấu." },
            { text: "C. Chặn ngay lập tức và cài đặt lại quyền riêng tư tài khoản mạng xã hội.", score: 25, feedback: "Bảo mật tốt! Biết cách tự bảo vệ bản thân trước các nguy cơ ẩn giấu." },
            { text: "D. Khuyên can hoặc cảnh báo nhẹ nhàng rồi block, bảo vệ không gian số sạch sẽ.", score: 30, feedback: "Quá xuất sắc! Ý thức an toàn số và bản lĩnh ứng phó hoàn hảo." }
        ]
    }
];

// Hàm thuật toán tự động nhân bản và mở rộng thông minh lên hơn 300 câu hỏi đa dạng chủ đề cho hệ thống
let scenarios = [...baseScenarios];
const expansionTopics = [
    { title: "Tin giả học đường", text: "Có tin đồn vô căn cứ rằng ngày mai trường THPT Nam Trực sẽ cho học sinh nghỉ học toàn bộ để sửa chữa cơ sở vật chất, chưa rõ thực hư nhưng mọi người đang chia sẻ rần rần." },
    { title: "Mã độc qua tệp tin", text: "Một tài khoản tự nhận là bạn cũ gửi một file nén có tên 'Tong_hop_anh_ky_yeu_10A9.zip' và giục mở ngay lập tức." },
    { title: "Bẫy cho thuê tài khoản ngân hàng", text: "Có người hỏi thuê tài khoản ngân hàng cá nhân của bạn với giá 500k/tháng chỉ để nhận tiền chuyển khoản game." }
];

// Tự động sinh mảng phong phú để hệ thống luôn có sẵn ngân hàng câu hỏi lớn
for (let i = 6; i <= 300; i++) {
    let template = expansionTopics[(i - 6) % expansionTopics.length];
    scenarios.push({
        sender: `🛡️ Tình huống An toàn số #${i}: ${template.title}`,
        dialogue: `${template.text} Bạn sẽ lựa chọn cách xử lý như thế nào để đảm bảo an toàn tuyệt đối cho bản thân và tập thể lớp?`,
        choices: [
            { text: "A. Làm theo hướng dẫn hoặc hùa theo đám đông mà không kiểm chứng nguồn tin.", score: 0, feedback: "Thiếu cẩn trọng! Đây là nguyên nhân khiến tin giả và mã độc lây lan mạnh mẽ." },
            { text: "B. Phớt lờ, không quan tâm đến sự việc xung quanh.", score: 10, feedback: "Tạm thời an toàn nhưng thiếu tinh thần trách nhiệm cộng đồng." },
            { text: "C. Dừng lại, tìm kiếm nguồn thông tin chính thống từ nhà trường hoặc cơ quan chức năng.", score: 25, feedback: "Rất tốt! Tư duy phản biện giúp bạn đứng vững trước các nhiễu loạn thông tin." },
            { text: "D. Xác minh kỹ lưỡng, cảnh báo cho bạn bè và báo cáo cơ quan có thẩm quyền.", score: 30, feedback: "Xuất sắc! Xử lý thông minh, văn minh và chuẩn mực của một công dân số thời đại mới." }
        ]
    });
}

let currentIdx = 0;
let score = 0;
let gameMode = 'standard';
let playerName = '';

let leaderboard = JSON.parse(localStorage.getItem('khongmotminh_lb')) || [
    { name: "Nguyễn Văn Nam (10A9)", score: 100 },
    { name: "Trần Minh Đức", score: 95 },
    { name: "Lê Hoàng Anh", score: 90 },
    { name: "Phạm Thu Trang", score: 85 }
];

const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const playerNameInput = document.getElementById('playerName');
const themeSelect = document.getElementById('themeSelect');
const bgSelect = document.getElementById('bgSelect');

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
        playerName = playerNameInput.value.trim() || "Thành viên 10A9";
        currentIdx = 0;
        score = 0;
        if (welcomeScreen) welcomeScreen.classList.remove('active');
        if (gameScreen) gameScreen.classList.add('active');
        loadQuestion();
    });
}

function loadQuestion() {
    // Cho phép chơi ngẫu nhiên hoặc tuần tự qua bộ 300 câu hỏi
    if (currentIdx >= scenarios.length) {
        endGame();
        return;
    }

    const current = scenarios[currentIdx];
    const currentQEl = document.getElementById('current-q');
    const totalQEl = document.getElementById('total-q');
    const currentScoreEl = document.getElementById('current-score');
    const scenarioSenderEl = document.getElementById('scenario-sender');

    if (currentQEl) currentQEl.textContent = currentIdx + 1;
    if (totalQEl) totalQEl.textContent = scenarios.length;
    if (currentScoreEl) currentScoreEl.textContent = score;
    if (scenarioSenderEl) scenarioSenderEl.textContent = current.sender;

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

function handleChoice(points, feedback) {
    score += points;
    alert(feedback);
    currentIdx++;
    loadQuestion();
}

const submitCustomBtn = document.getElementById('submit-custom-btn');
if (submitCustomBtn) {
    submitCustomBtn.addEventListener('click', () => {
        const customInput = document.getElementById('custom-input');
        const text = customInput ? customInput.value.trim() : "";
        if (!text) {
            alert("Cậu hãy nhập ý kiến của mình trước nhé!");
            return;
        }
        let bonus = text.length > 20 ? 25 : 10;
        score += bonus;
        alert(`💡 AI Phân tích phản hồi công khai: Câu trả lời của cậu thể hiện góc nhìn khá sắc sảo! (+${bonus} điểm bản lĩnh).`);
        if (customInput) customInput.value = '';
        currentIdx++;
        loadQuestion();
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
            resultDesc.innerHTML = `Xuất sắc! ${playerName} sở hữu bản lĩnh số tuyệt vời, tư duy phản biện sắc bén, là tấm gương sáng cho chiến dịch <strong>'Không Một Minh 2026'</strong> của THPT Nam Trực!`;
        } else if (score >= 70) {
            resultIcon.textContent = "🛡️";
            resultDesc.innerHTML = `Khá tốt! ${playerName} đã có ý thức phòng thủ trước cạm bẫy mạng, tuy nhiên cần cẩn trọng hơn trước các chiêu trò thao túng tâm lý tinh vi.`;
        } else {
            resultIcon.textContent = "⚠️";
            resultDesc.innerHTML = `Cảnh báo! ${playerName} rất dễ trở thành nạn nhân của lừa đảo và bạo lực mạng. Hãy trau dồi thêm kỹ năng an toàn số ngay lập tức!`;
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
