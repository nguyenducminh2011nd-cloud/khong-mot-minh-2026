// --- CẤU HÌNH FIREBASE ---
const firebaseConfig = {
    apiKey: "AIzaSyCtQSv6-wGiKyzIIzpmdL32f00Lz14ih1M",
    authDomain: "khongmotminh2026.firebaseapp.com",
    projectId: "khongmotminh2026",
    storageBucket: "khongmotminh2026.fireappstorage.app",
    messagingSenderId: "391078149804",
    appId: "1:391078149804:web:9ba69127156c66e6966909",
    measurementId: "G-BFXSCXN4Q0"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

const warnings = [
    "⚠️ Cảnh báo: Kẻ lừa đảo thường dùng tâm lý hoảng sợ hoặc hám lợi để thao túng bạn!",
    "🚨 Chú ý: Đừng bao giờ cung cấp mã OTP hay mật khẩu cho bất kỳ ai!",
    "⚡ Thử thách cao độ: Các đáp án có độ dài tương đương nhau, đừng cố đoán mò!",
    "🔥 Cẩn thận: Đọc kỹ từng từ để không sập bẫy các chiêu trò giả mạo tinh vi!"
];

// --- KHO CÂU HỎI TRẮC NGHIỆM AN TOÀN MẠNG ---
const questionPools = {
    kho: [
        { q: "1. Nhận cuộc gọi tự xưng Công an yêu cầu chuyển tiền vào tài khoản tạm giữ để điều tra. Bạn xử lý thế nào?", options: ["Cúp máy ngay lập tức và báo công an địa phương", "Chuyển tiền vào tài khoản để chứng minh trong sạch", "Cung cấp mã OTP qua điện thoại cho người gọi", "Hẹn gặp trực tiếp người gọi ở nơi vắng vẻ"], correct: "Cúp máy ngay lập tức và báo công an địa phương", explain: "💡 Công an không bao giờ làm việc hay yêu cầu chuyển tiền qua điện thoại!" },
        { q: "2. Tin nhắn MXH thông báo trúng thưởng xe máy lớn nhưng phải nộp khoản phí làm thủ tục. Bạn làm gì?", options: ["Xóa và chặn tin nhắn giả mạo trúng thưởng ngay", "Nộp tiền phí qua thẻ cào để nhận thưởng lớn", "Gửi ảnh chụp thẻ ngân hàng cho người thông báo", "Chia sẻ bài viết công khai để nhận xe nhanh"], correct: "Xóa và chặn tin nhắn giả mạo trúng thưởng ngay", explain: "💡 Không có chương trình trúng thưởng hợp pháp nào bắt nộp phí trước để nhận giải!" },
        { q: "3. Tuyển cộng tác viên online thả tim đơn hàng ảo nhận hoa hồng. Dấu hiệu nhận diện lừa đảo là gì?", options: ["Yêu cầu nộp tiền ứng trước để mua đơn hàng", "Công ty trả lương qua ngân hàng chính thống", "Có hợp đồng ký kết trực tiếp tại trụ sở", "Không yêu cầu bất kỳ khoản tiền nào từ đầu"], correct: "Yêu cầu nộp tiền ứng trước để mua đơn hàng", explain: "💡 Kẻ lừa đảo dụ nộp tiền số lượng ngày càng lớn rồi chiếm đoạt!" },
        { q: "4. Nhận đường link lạ từ bạn bè giục click xem video hot hoặc hình ảnh cá nhân. Rủi ro lớn nhất là gì?", options: ["Dính mã độc đánh cắp tài khoản và thông tin", "Chỉ làm tốn dung lượng kết nối mạng 4G", "Không có rủi ro gì vì do bạn bè gửi tặng", "Làm thiết bị di động chạy mượt mà hơn"], correct: "Dính mã độc đánh cắp tài khoản và thông tin", explain: "💡 Tài khoản bạn bè có thể đã bị hack và tự động phát tán link mã độc!" },
        { q: "5. Khi đặt mật khẩu tài khoản quan trọng, cấu trúc nào mang lại mức độ an toàn cao nhất?", options: ["Kết hợp chữ hoa, thường, số và ký tự đặc biệt", "Sử dụng ngày tháng năm sinh của bản thân", "Sử dụng dãy số liên tiếp từ một đến tám", "Dùng chung một mật khẩu duy nhất mọi nơi"], correct: "Kết hợp chữ hoa, thường, số và ký tự đặc biệt", explain: "💡 Mật khẩu phức tạp và dài giúp chống lại các đợt tấn công dò quét tự động." }
    ],
    hacknao: [
        { q: "1. Nhận tin nhắn từ chính số điện thoại của mình giục nợ và đe dọa tống tiền. Hiện tượng này do đâu?", options: ["Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", "Điện thoại tự động phát tán tin nhắn lúc nửa đêm", "Nhà mạng đang thử nghiệm hệ thống tin nhắn mới", "Do cài đặt lịch hẹn giờ gửi tin nhắn từ trước"], correct: "Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", explain: "💡 Kẻ gian dùng công nghệ giả mạo số điện thoại người gửi để gây hoang mang tột độ!" },
        { q: "2. Rao bán iPhone đời mới giá rẻ bất ngờ với lý do hàng trưng bày không dùng đến. Bạn đánh giá sao?", options: ["Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", "Cơ hội hiếm có nên cần chuyển khoản cọc liền", "Hàng chính hãng uy tín nên mới có giá rẻ như vậy", "Mua trực tiếp vì hàng trưng bày luôn siêu rẻ"], correct: "Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", explain: "💡 Không có chiếc iPhone giá trị cao nào bán rẻ như cho. Đừng để lòng tham mờ mắt!" },
        { q: "3. Người quen qua mạng chưa gặp mặt muốn gửi quà lớn nhưng bắt đóng thuế hải quan qua tài khoản cá nhân. Xử lý thế nào?", options: ["Chặn liên lạc ngay vì đây là bẫy Romance Scam", "Chuyển khoản ngay vì quà giá trị lớn hơn thuế", "Nhờ người thân góp tiền đóng thuế nhận quà", "Yêu cầu họ trừ tiền thuế vào giá trị món quà"], correct: "Chặn liên lạc ngay vì đây là bẫy Romance Scam", explain: "💡 Hải quan nhà nước không bao giờ yêu cầu chuyển tiền thuế vào tài khoản cá nhân!" },
        { q: "4. Nhận email từ quản trị viên yêu cầu xác nhận mật khẩu qua liên kết lạ vì nâng cấp hệ thống. Bạn làm gì?", options: ["Bỏ qua và xóa email vì đây là chiêu trò Phishing", "Làm theo hướng dẫn ngay để không bị khóa máy", "Gửi mật khẩu qua email phản hồi để xác thực", "Chuyển tiếp email cho toàn bộ thành viên khác"], correct: "Bỏ qua và xóa email vì đây là chiêu trò Phishing", explain: "💡 Quản trị viên hệ thống không bao giờ yêu cầu người dùng gửi mật khẩu qua email." },
        { q: "5. Xem web phim lậu xuất hiện liên tục các tab quảng cáo cờ bạc cá độ chớp nháy. Hành động an toàn là?", options: ["Đóng ngay lập tức tab lạ, tuyệt đối không click", "Click vào xem thử có trúng thưởng thật không", "Tải ứng dụng quảng cáo theo yêu cầu trên trang", "Để nguyên các tab chạy ngầm để giải trí thêm"], correct: "Đóng ngay lập tức tab lạ, tuyệt đối không click", explain: "💡 Các trang web lậu thường gắn mã độc và banner quảng cáo dụ dỗ đánh bạc trực tuyến." }
    ]
};

// Tự động lấp đầy đủ 50 câu mỗi chế độ
while (questionPools.kho.length < 50) {
    let idx = questionPools.kho.length;
    let base = questionPools.kho[idx % 5];
    questionPools.kho.push({
        q: `${idx + 1}. [Chế độ Khó mở rộng] ${base.q.replace(/^\d+\.\s*/, '')}`,
        options: [...base.options],
        correct: base.correct,
        explain: base.explain
    });
}

while (questionPools.hacknao.length < 50) {
    let idx = questionPools.hacknao.length;
    let base = questionPools.hacknao[idx % 5];
    questionPools.hacknao.push({
        q: `${idx + 1}. [Chế độ Hack Não mở rộng] ${base.q.replace(/^\d+\.\s*/, '')}`,
        options: [...base.options],
        correct: base.correct,
        explain: base.explain
    });
}

function shuffleOptions(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

let selectedMode = localStorage.getItem('kmm_mode') || 'kho';
let currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${selectedMode}`)) || 0;
let score = parseInt(localStorage.getItem('kmm_score')) || 0;
let playerName = localStorage.getItem('kmm_player_name') || "";
let answered = false;
let autoNextTimeout = null;

document.addEventListener("DOMContentLoaded", function() {
    if (playerName) {
        const nameInput = document.getElementById('player-name-input');
        if (nameInput) nameInput.value = playerName;
    }
    selectMode(selectedMode);
    loadLeaderboard();
    loadTopFeedbacks();
});

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('kmm_theme', newTheme);
}
document.documentElement.setAttribute('data-theme', localStorage.getItem('kmm_theme') || 'dark');

window.selectMode = function(mode) {
    selectedMode = mode;
    localStorage.setItem('kmm_mode', mode);
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    const btnElem = document.getElementById(`btn-mode-${mode}`);
    if (btnElem) btnElem.classList.add('active');
}

window.startGame = function() {
    const welcome = document.getElementById('welcome-screen');
    const quiz = document.getElementById('quiz-screen');
    if (welcome) welcome.style.display = 'none';
    if (quiz) quiz.style.display = 'block';
    
    currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${selectedMode}`)) || 0;
    loadQuestion();
}

window.pauseAndSaveGame = function() {
    if (autoNextTimeout) clearTimeout(autoNextTimeout);
    alert(`⏸️ Đã lưu tiến trình!\n- Chế độ: ${selectedMode.toUpperCase()}\n- Câu hiện tại: ${currentQIndex + 1}\n- Điểm số: ${score}`);
    
    const welcome = document.getElementById('welcome-screen');
    const quiz = document.getElementById('quiz-screen');
    if (quiz) quiz.style.display = 'none';
    if (welcome) welcome.style.display = 'block';
    loadLeaderboard();
}

window.savePlayerName = function(val) {
    playerName = val.trim();
    localStorage.setItem('kmm_player_name', playerName);
    updateLeaderboard();
}

function loadQuestion() {
    answered = false;
    let list = questionPools[selectedMode];
    if (currentQIndex >= list.length) currentQIndex = 0;
    
    let qData = list[currentQIndex];
    
    let randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
    const warnElem = document.getElementById('warning-banner');
    if (warnElem) warnElem.innerText = randomWarning;

    const titleElem = document.getElementById('quiz-title-mode');
    if (titleElem) titleElem.innerText = `🧠 Đấu Trí (${selectedMode === 'kho' ? 'Chế độ Khó' : 'Chế độ Hack Não'})`;
    
    const counterElem = document.getElementById('question-counter');
    if (counterElem) counterElem.innerText = `Tình huống ${currentQIndex + 1} / ${list.length}`;
    
    const textElem = document.getElementById('question-text');
    if (textElem) textElem.innerText = qData.q;
    
    const scoreElem = document.getElementById('quiz-score');
    if (scoreElem) scoreElem.innerText = `Điểm: ${score}`;
    
    const optContainer = document.getElementById('options-container');
    if (!optContainer) return;
    optContainer.innerHTML = "";

    let shuffled = shuffleOptions(qData.options);
    let optHtml = "";
    shuffled.forEach((optText, idx) => {
        let isCorrect = (optText === qData.correct);
        optHtml += `<button class="option-btn" onclick="checkAnswer(this, ${isCorrect})">${String.fromCharCode(65 + idx)}. ${optText}</button>`;
    });
    optContainer.innerHTML = optHtml;
}

window.checkAnswer = function(btnElement, isCorrect) {
    if (answered) return;
    answered = true;
    
    let list = questionPools[selectedMode];
    let qData = list[currentQIndex];
    let buttons = document.querySelectorAll('#options-container .option-btn');
    
    if (isCorrect) {
        btnElement.classList.add('correct');
        score += 10;
        localStorage.setItem('kmm_score', score);
        const scoreElem = document.getElementById('quiz-score');
        if (scoreElem) scoreElem.innerText = `Điểm: ${score}`;
        updateLeaderboard();
    } else {
        btnElement.classList.add('wrong');
        buttons.forEach(btn => {
            if (btn.innerText.includes(qData.correct)) {
                btn.classList.add('correct');
            }
        });
    }

    showExplanationBox(qData.explain);
};

function showExplanationBox(explainText) {
    let quizArea = document.getElementById('quiz-area');
    if (quizArea) {
        let explainDiv = document.createElement('div');
        explainDiv.style.cssText = "margin-top: 12px; padding: 10px; background: rgba(52, 211, 153, 0.15); border-left: 4px solid var(--accent-green); border-radius: 6px; font-size: 0.88rem; color: #fff;";
        explainDiv.innerHTML = `<strong>Giải thích an toàn:</strong> ${explainText}`;
        quizArea.appendChild(explainDiv);
    }
}

window.nextQuestion = function() {
    if (autoNextTimeout) clearTimeout(autoNextTimeout);
    let list = questionPools[selectedMode];
    currentQIndex = (currentQIndex + 1) % list.length;
    localStorage.setItem(`kmm_idx_${selectedMode}`, currentQIndex);
    
    let oldNotice = document.querySelector('#quiz-area > div[style*="border-left"]');
    if (oldNotice) oldNotice.remove();

    loadQuestion();
};

function updateLeaderboard() {
    if (!playerName) return;
    db.collection("leaderboard").doc(playerName).set({
        name: playerName,
        score: score,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => {
        loadLeaderboard();
    });
}

function loadLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    if (!container) return;
    db.collection("leaderboard").orderBy("score", "desc").limit(5).get()
        .then((snapshot) => {
            let html = "";
            let rank = 1;
            snapshot.forEach((doc) => {
                let data = doc.data();
                html += `<div class="leaderboard-item">
                    <span>#${rank++} <strong>${data.name}</strong></span>
                    <span style="color: var(--accent-green); font-weight: bold;">${data.score} đ</span>
                </div>`;
            });
            container.innerHTML = html || "<div style='color:#888; font-size:0.85rem;'>Chưa có cao thủ nào.</div>";
        });
}

window.submitHomeFeedback = function() {
    const textInput = document.getElementById('home-feedback-input');
    const author = playerName || "Khách ẩn danh";
    const text = textInput ? textInput.value.trim() : "";
    
    if (!text) { alert("Cậu vui lòng viết nhận xét trước nhé!"); return; }

    db.collection("feedbacks").add({
        name: author,
        text: text,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(() => {
        if (textInput) textInput.value = "";
        alert("❤️ Đã gửi đánh giá thành công lên mây!");
        loadTopFeedbacks();
    });
};

function loadTopFeedbacks() {
    const banner = document.getElementById('top-feedback-ticker');
    if (!banner) return;
    db.collection("feedbacks").orderBy("timestamp", "desc").limit(1).get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                let doc = snapshot.docs[0].data();
                banner.innerHTML = `"${doc.text}" — <strong>${doc.name}</strong>`;
            } else {
                banner.innerHTML = "Chưa có đánh giá nào từ cộng đồng.";
            }
        });
}
