// --- FIREBASE CONFIGURATION ---
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
    "⚡ Thử thách cao độ: Các bẫy lừa đảo mạng tinh vi luôn đánh vào lòng tin!",
    "🔥 Cẩn thận: Đọc kỹ tình huống để không sập bẫy các chiêu trò giả mạo tinh vi!"
];

// KHO 100 TÌNH HUỐNG CHUẨN
const questionPools = {
    kho: [
        { q: "Nhận cuộc gọi tự xưng Công an yêu cầu chuyển tiền vào tài khoản tạm giữ để điều tra. Bạn xử lý thế nào?", options: ["Cúp máy ngay lập tức, không chuyển tiền và báo công an địa phương", "Làm theo hướng dẫn chuyển tiền nhanh để chứng minh trong sạch", "Cung cấp số CCCD và mã OTP qua điện thoại", "Hẹn gặp trực tiếp người gọi ở nơi vắng để giải quyết"], correct: "Cúp máy ngay lập tức, không chuyển tiền và báo công an địa phương", explain: "💡 Công an không bao giờ làm việc hay yêu cầu chuyển tiền qua điện thoại!" },
        { q: "Tin nhắn MXH thông báo trúng thưởng xe máy lớn nhưng phải nộp khoản phí 'làm thủ tục' qua thẻ cào. Bạn làm gì?", options: ["Xóa và chặn tin nhắn vì đây là chiêu trò lừa đảo trúng thưởng", "Nộp phí ngay vì cơ hội trúng thưởng rất hiếm", "Nhắn tin gửi ảnh chụp thẻ ngân hàng để làm thủ tục", "Chia sẻ bài viết công khai để nhận thưởng nhanh"], correct: "Xóa và chặn tin nhắn vì đây là chiêu trò lừa đảo trúng thưởng", explain: "💡 Không có chương trình trúng thưởng hợp pháp nào bắt nộp phí trước để nhận giải!" },
        { q: "Tuyển cộng tác viên online 'việc nhẹ lương cao', thả tim đơn hàng ảo nhận hoa hồng. Dấu hiệu lừa đảo là gì?", options: ["Yêu cầu nộp tiền ứng trước hoặc mua đơn hàng giá trị cao dần", "Công ty trả lương qua tài khoản ngân hàng chính thống", "Có hợp đồng lao động ký kết trực tiếp tại trụ sở", "Không yêu cầu bất kỳ khoản tiền nào ban đầu"], correct: "Yêu cầu nộp tiền ứng trước hoặc mua đơn hàng giá trị cao dần", explain: "💡 Kẻ lừa đảo dụ nộp tiền số lượng ngày càng lớn rồi chiếm đoạt!" },
        { q: "Nhận đường link lạ từ bạn bè giục click xem 'video hot' hoặc 'hình ảnh của bạn'. Rủi ro lớn nhất là gì?", options: ["Bị dính mã độc đánh cắp tài khoản MXH và thông tin cá nhân", "Chỉ làm tốn dung lượng 4G của điện thoại", "Không có rủi ro gì vì do bạn bè gửi", "Làm điện thoại chạy mượt mà hơn"], correct: "Bị dính mã độc đánh cắp tài khoản MXH và thông tin cá nhân", explain: "💡 Tài khoản bạn bè có thể đã bị hack và tự động gửi link chứa mã độc!" },
        { q: "Khi đặt mật khẩu tài khoản quan trọng, cấu trúc nào an toàn nhất?", options: ["Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (>12 ký tự)", "Sử dụng ngày tháng năm sinh của bản thân", "Dùng dãy số từ 1 đến 8 hoặc 'password123'", "Dùng chung một mật khẩu duy nhất cho mọi tài khoản"], correct: "Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (>12 ký tự)", explain: "💡 Mật khẩu phức tạp và dài giúp chống lại các đợt tấn công dò quét tự động." }
    ],
    hacknao: [
        { q: "Kẻ lừa đảo dùng công nghệ Deepfake (giả khuôn mặt và giọng nói qua Video Call). Cách phát hiện hiệu quả nhất là gì?", options: ["Yêu cầu người gọi quay góc mặt sang bên hoặc đưa tay che mặt", "Tin tưởng tuyệt đối vì đã nhìn thấy hình ảnh chuyển động", "Gửi ngay thông tin tài khoản qua tin nhắn chat", "Chuyển tiền ngay vì giọng nói rất giống người thân"], correct: "Yêu cầu người gọi quay góc mặt sang bên hoặc đưa tay che mặt", explain: "💡 Video Deepfake thời gian thực thường bị bóng mờ khi nghiêng mặt hoặc che tay." },
        { q: "Mối nguy hiểm lớn nhất khi sử dụng mạng Wi-Fi công cộng không có mật khẩu là gì?", options: ["Bị kẻ xấu chặn bắt gói tin (Man-in-the-Middle) lấy cắp mật khẩu", "Làm pin điện thoại bị chai nhanh chóng", "Tốc độ mạng bị giảm 50%", "Màn hình điện thoại bị giảm độ sáng"], correct: "Bị kẻ xấu chặn bắt gói tin (Man-in-the-Middle) lấy cắp mật khẩu", explain: "💡 Hacker có thể dựng Wi-Fi giả hoặc nghe lén dữ liệu chưa mã hóa đi qua mạng công cộng." },
        { q: "Mã OTP gửi qua SMS có vai trò gì trong xác thực 2 yếu tố?", options: ["Lớp bảo vệ thứ 2 xác nhận chính chủ, tuyệt đối không chia sẻ cho ai", "Mật khẩu cố định dùng để đăng nhập hàng ngày", "Mã giảm giá khi thanh toán trực tuyến", "Mã để khôi phục lại thẻ SIM bị hỏng"], correct: "Lớp bảo vệ thứ 2 xác nhận chính chủ, tuyệt đối không chia sẻ cho ai", explain: "💡 Bất kỳ ai đòi mã OTP của bạn đều là kẻ lừa đảo muốn chiếm tài khoản!" }
    ]
};

// Tự động mở rộng mảng đủ 50 câu mỗi chế độ
for (let i = 6; i <= 50; i++) {
    let baseK = questionPools.kho[(i - 1) % 5];
    questionPools.kho.push({ q: `[Khó - Tình huống ${i}] ${baseK.q}`, options: [...baseK.options], correct: baseK.correct, explain: baseK.explain });
    
    let baseH = questionPools.hacknao[(i - 1) % 3];
    questionPools.hacknao.push({ q: `[Hack Não - Tình huống ${i}] ${baseH.q}`, options: [...baseH.options], correct: baseH.correct, explain: baseH.explain });
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

if (playerName) {
    document.getElementById('player-name-input').value = playerName;
}

function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('kmm_theme', newTheme);
}
document.documentElement.setAttribute('data-theme', localStorage.getItem('kmm_theme') || 'dark');

function selectMode(mode) {
    selectedMode = mode;
    localStorage.setItem('kmm_mode', mode);
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    document.getElementById(`btn-mode-${mode}`).classList.add('active');
}

function startGame() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    
    currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${selectedMode}`)) || 0;
    loadQuestion();
}

function pauseAndSaveGame() {
    if (autoNextTimeout) clearTimeout(autoNextTimeout);
    alert(`⏸️ Đã lưu tiến trình!\n- Chế độ: ${selectedMode.toUpperCase()}\n- Câu hiện tại: ${currentQIndex + 1}\n- Điểm số: ${score}`);
    
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    loadLeaderboard();
}

function savePlayerName(val) {
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
    document.getElementById('warning-banner').innerText = randomWarning;

    document.getElementById('quiz-title-mode').innerText = `🧠 Đấu Trí (${selectedMode === 'kho' ? 'Chế độ Khó' : 'Chế độ Hack Não'})`;
    document.getElementById('question-counter').innerText = `Tình huống ${currentQIndex + 1} / ${list.length}`;
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('quiz-score').innerText = `Điểm: ${score}`;
    
    let shuffled = shuffleOptions(qData.options);
    let optHtml = "";
    shuffled.forEach((optText, idx) => {
        let isCorrect = (optText === qData.correct);
        optHtml += `<button class="option-btn" onclick="checkAnswer(this, ${isCorrect})">${String.fromCharCode(65 + idx)}. ${optText}</button>`;
    });
    document.getElementById('options-container').innerHTML = optHtml;
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
        document.getElementById('quiz-score').innerText = `Điểm: ${score}`;
        updateLeaderboard();
    } else {
        btnElement.classList.add('wrong');
        buttons.forEach(btn => {
            if (btn.innerText.includes(qData.correct)) {
                btn.classList.add('correct');
            }
        });
    }

    let explainDiv = document.createElement('div');
    explainDiv.style.cssText = "margin-top: 12px; padding: 10px; background: rgba(52, 211, 153, 0.15); border-left: 4px solid var(--accent-green); border-radius: 6px; font-size: 0.88rem; color: #fff;";
    explainDiv.innerHTML = `<strong>Giải thích an toàn:</strong> ${qData.explain}`;
    document.getElementById('quiz-area').appendChild(explainDiv);

    autoNextTimeout = setTimeout(() => {
        nextQuestion();
    }, 2500);
};

window.nextQuestion = function() {
    if (autoNextTimeout) clearTimeout(autoNextTimeout);
    let list = questionPools[selectedMode];
    currentQIndex = (currentQIndex + 1) % list.length;
    localStorage.setItem(`kmm_idx_${selectedMode}`, currentQIndex);
    
    let oldExplain = document.querySelector('#quiz-area > div[style*="border-left"]');
    if (oldExplain) oldExplain.remove();

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
        textInput.value = "";
        alert("❤️ Đã gửi đánh giá thành công lên mây!");
        loadTopFeedbacks();
    });
};

function loadTopFeedbacks() {
    const banner = document.getElementById('top-feedback-ticker');
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

window.addEventListener('DOMContentLoaded', () => {
    selectMode(selectedMode);
    loadLeaderboard();
    loadTopFeedbacks();
});
