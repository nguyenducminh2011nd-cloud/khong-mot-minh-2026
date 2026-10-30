const coreScenarios = [
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

const expansionBank = [
    {
        sender: "💻 Tuyển dụng việc làm online",
        dialogue: "Tin tuyển dụng: 'Cần tuyển cộng tác viên gõ văn bản, like video TikTok kiếm 300k - 500k mỗi ngày. Không cần kinh nghiệm, nhận lương ngay qua tài khoản. Phí đăng ký hồ sơ ban đầu chỉ 50k'. Bạn sẽ phản ứng thế nào?",
        choices: [
            { text: "A. Đóng ngay 50k phí để thử việc vì số tiền quá nhỏ.", score: 0, feedback: "Sập bẫy lừa đảo việc làm online! Bạn đã mất tiền oan." },
            { text: "B. Nhắn tin hỏi xem có thể trừ tiền phí vào lương đầu tiên không.", score: 10, feedback: "Chưa sắc sảo. Các công ty uy tín tuyệt đối không thu phí tuyển dụng." },
            { text: "C. Lờ đi vì biết chắc đây là chiêu trò lừa đảo chiếm đoạt tài sản.", score: 25, feedback: "Rất tỉnh táo! Tránh xa các cạm bẫy việc nhẹ lương cao." },
            { text: "D. Báo cáo bài viết lừa đảo để bảo vệ cộng đồng mạng.", score: 30, feedback: "Xuất sắc! Hành động văn minh của một công dân số." }
        ]
    },
    {
        sender: "🤖 Cuộc gọi Video từ 'Người thân'",
        dialogue: "Bạn nhận được cuộc gọi video call từ tài khoản của một người bạn thân. Hình ảnh hơi mờ, giật cục và thông báo đang bị kẹt ở đồn công an nước ngoài, cần bạn chuyển gấp 2 triệu để giải cứu.",
        choices: [
            { text: "A. Vội vàng chuyển khoản ngay vì thấy đúng mặt và nghe giọng bạn mình.", score: 0, feedback: "Mắc bẫy công nghệ Deepfake AI giả mạo hình ảnh và giọng nói cực kỳ tinh vi!" },
            { text: "B. Bán tín bán nghi, hỏi thêm vài câu thử thách xem có đúng là bạn mình không.", score: 10, feedback: "Nguy hiểm! Kẻ gian dùng AI có thể lừa được các câu trả lời xã giao." },
            { text: "C. Cúp máy ngay lập tức và gọi điện thoại trực tiếp bằng số di động thông thường để xác thực.", score: 25, feedback: "Quá thông minh! Luôn có kênh xác thực độc lập cho các tình huống khẩn cấp." },
            { text: "D. Cảnh báo cho nhóm chung của lớp về thủ đoạn giả mạo công nghệ cao này.", score: 30, feedback: "Tuyệt đối xuất sắc! Bản lĩnh phòng thủ không gian mạng tuyệt vời." }
        ]
    },
    {
        sender: "📰 Hội nhóm 'Hóng Biến Học Đường'",
        dialogue: "Một trang mạng xã hội đăng tải bức ảnh chụp lén một học sinh trong trường kèm theo những lời châm chọc cay nghiệt về hoàn cảnh gia đình em ấy, thu hút hàng nghìn lượt tương tác.",
        choices: [
            { text: "A. Thả biểu tượng cảm xúc haha và vào bình luận hùa theo cho vui.", score: 0, feedback: "Trầm trọng! Bạn đang tiếp tay cho hành vi bạo lực mạng và xúc phạm nhân phẩm." },
            { text: "B. Lướt qua xem như không có chuyện gì xảy ra vì không phải chuyện của mình.", score: 10, feedback: "Thiếu trách nhiệm. Sự im lặng vô tình dung túng cho kẻ bắt nạt hoành hành." },
            { text: "C. Từ chối tương tác, đồng thời nhắn tin động viên và chia sẻ với nạn nhân.", score: 25, feedback: "Rất nhân văn! Biết quan tâm và bảo vệ tâm lý cho bạn bè." },
            { text: "D. Gửi khiếu nại báo cáo vi phạm tới quản trị viên nền tảng để xóa bài viết độc hại.", score: 30, feedback: "Tuyệt đỉnh! Hành động quyết liệt bảo vệ sự trong sạch của không gian mạng." }
        ]
    },
    {
        sender: "📞 Giả mạo cơ quan Công an",
        dialogue: "Điện thoại reo lên, giọng một người tự xưng là cán bộ công an thông báo mã định danh của bạn liên quan đến một đường dây rửa tiền xuyên quốc gia, yêu cầu gửi ngay mã OTP ngân hàng để kiểm tra.",
        choices: [
            { text: "A. Hoảng sợ và đọc ngay mã OTP vì sợ bị vướng vào vòng lao lý.", score: 0, feedback: "Sập bẫy lừa đảo mạo danh cơ quan pháp luật! Mất sạch tiền trong tài khoản." },
            { text: "B. Run rẩy làm theo một nửa vì không biết phải làm sao.", score: 5, feedback: "Dễ bị thao túng tâm lý bởi chiêu trò đe dọa quyền lực ảo." },
            { text: "C. Lập tức cúp máy vì biết cơ quan công an không bao giờ làm việc qua điện thoại hay đòi mã OTP.", score: 25, feedback: "Kiến thức pháp luật và an toàn số cực kỳ vững vàng!" },
            { text: "D. Ghi lại số điện thoại và báo cáo sự việc cho cơ quan chức năng địa phương.", score: 30, feedback: "Quá xuất sắc! Xử lý tình huống vô cùng chuẩn mực và thông minh." }
        ]
    },
    {
        sender: "🎁 Link khảo sát nhận quà khủng",
        dialogue: "Bạn nhận được tin nhắn từ một nhãn hàng lớn qua mạng xã hội: 'Tham gia khảo sát nhanh 3 câu hỏi để nhận ngay voucher mua sắm trị giá 2 triệu đồng và điện thoại đời mới'. Kèm theo đó là một đường link lạ.",
        choices: [
            { text: "A. Click ngay vào link và điền đầy đủ thông tin cá nhân, số điện thoại để nhận quà.", score: 0, feedback: "Mắc bẫy Phishing (đánh cắp dữ liệu cá nhân) rất hay gặp!" },
            { text: "B. Bán tín bán nghi nhưng cứ nhập thử thông tin xem có thật không.", score: 5, feedback: "Nguy hiểm! Dữ liệu cá nhân của bạn đã bị thu thập trái phép." },
            { text: "C. Bỏ qua và chặn ngay tài khoản gửi link rác.", score: 20, feedback: "Tỉnh táo! Nhận thức rõ các chiêu trò câu view, thu thập thông tin." },
            { text: "D. Cảnh báo cho bạn bè không bấm vào đường link giả mạo này.", score: 30, feedback: "Tuyệt vời! Tư duy phản biện và bảo vệ cộng đồng rất tốt." }
        ]
    }
];

let scenarios = [...coreScenarios];

for (let i = 6; i <= 300; i++) {
    let template = expansionBank[(i - 6) % expansionBank.length];
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

// Khởi tạo danh sách bảng xếp hạng lưu trong localStorage
let leaderboard = JSON.parse(localStorage.getItem('khongmotminh_lb')) || [
    { name: "Thành viên A", score: 1200, rank: "Kim Cương 💎" },
    { name: "Thành viên B", score: 950, rank: "Bạch Kim 🏆" },
    { name: "Thành viên C", score: 800, rank: "Vàng ⭐" },
    { name: "Thành viên D", score: 500, rank: "Bạc 🛡️" }
];

const welcomeScreen = document.getElementById('welcome-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const leaderboardScreen = document.getElementById('leaderboard-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const pauseBtn = document.getElementById('pause-btn');
const quickLbBtn = document.getElementById('quick-lb-btn');
const backToHomeBtn = document.getElementById('back-to-home-btn');

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

function calculateRank(currentScore) {
    if (currentScore >= 2000) return "Thách Đấu 👑";
    if (currentScore >= 1500) return "Kim Cương 💎";
    if (currentScore >= 1000) return "Bạch Kim 🏆";
    if (currentScore >= 500) return "Vàng ⭐";
    if (currentScore >= 200) return "Bạc 🛡️";
    return "Đồng 🥉";
}

// Cập nhật và hiển thị bảng xếp hạng chuẩn xác kèm tên người chơi thực tế
function renderGlobalLeaderboard() {
    const globalContainer = document.getElementById('global-leaderboard-container');
    if (globalContainer) {
        // Lấy tên hiện tại từ ô input nếu người chơi vừa gõ tên mà chưa bấm bắt đầu
        let currentTypedName = playerNameInput ? playerNameInput.value.trim() : "";
        if (currentTypedName && score > 0) {
            let currentRank = calculateRank(score);
            // Kiểm tra xem tên đã có trong bảng chưa, nếu có thì cập nhật, chưa thì chèn vào
            let existingIndex = leaderboard.findIndex(item => item.name === currentTypedName);
            if (existingIndex !== -1) {
                leaderboard[existingIndex].score = score;
                leaderboard[existingIndex].rank = currentRank;
            } else {
                leaderboard.push({ name: currentTypedName, score: score, rank: currentRank });
            }
            leaderboard.sort((a, b) => b.score - a.score);
            leaderboard = leaderboard.slice(0, 5);
            localStorage.setItem('khongmotminh_lb', JSON.stringify(leaderboard));
        }

        globalContainer.innerHTML = '';
        leaderboard.forEach((item, index) => {
            globalContainer.innerHTML += `
                <div class="leaderboard-item" style="display: flex; justify-content: space-between; padding: 6px 0; border-bottom: 1px solid rgba(255,255,255,0.1); font-size: 12px;">
                    <span>#${index + 1} - <strong>${item.name}</strong> (${item.rank || 'Thành viên'})</span>
                    <span><strong>${item.score}</strong> điểm</span>
                </div>
            `;
        });
    }
}

if (quickLbBtn) {
    quickLbBtn.addEventListener('click', () => {
        if (welcomeScreen) welcomeScreen.classList.remove('active');
        if (leaderboardScreen) leaderboardScreen.classList.add('active');
        renderGlobalLeaderboard();
    });
}

if (backToHomeBtn) {
    backToHomeBtn.addEventListener('click', () => {
        if (leaderboardScreen) leaderboardScreen.classList.remove('active');
        if (welcomeScreen) welcomeScreen.classList.add('active');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedGame = localStorage.getItem('khongmotminh_save');
    if (savedGame) {
        const data = JSON.parse(savedGame);
        if (data && data.currentIdx > 0 && data.currentIdx < scenarios.length) {
            let savedRank = calculateRank(data.score);
            showCustomPopup(`Chào mừng ${data.playerName} trở lại!\n\n📊 Tiến độ hiện tại:\n- Đang ở câu hỏi số: ${data.currentIdx + 1}/300\n- Tổng điểm tích lũy: ${data.score}\n- Mức Rank hiện tại: ${savedRank}\n\nCậu có muốn tiếp tục chinh phục không?`, (isYes) => {
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

if (pauseBtn) {
    pauseBtn.addEventListener('click', () => {
        const saveData = { playerName, currentIdx, score, gameMode };
        localStorage.setItem('khongmotminh_save', JSON.stringify(saveData));
        
        // Cập nhật thẳng vào bảng xếp hạng khi bấm lưu tiến độ
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
            if (gameScreen) gameScreen.classList.remove('active');
            if (welcomeScreen) welcomeScreen.classList.add('active');
        });
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
        <p style="font-size: 13px; color: #9ca3af; line-height: 1.5; margin-bottom: 10px; text-align: left; padding: 0 10px;">${message}</p>
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
