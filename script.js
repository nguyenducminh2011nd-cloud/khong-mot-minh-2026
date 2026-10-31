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

// --- 100 CÂU HỎI CHIA ĐỀU 2 CHẾ ĐỘ: 50 KHÓ & 50 HACK NÃO ---
const warnings = [
    "⚠️ Cảnh báo: Đáp án có vẻ đúng nhưng thực ra là bẫy tinh vi!",
    "🚨 Chú ý: Đừng vội chọn A hay B, hãy đọc kỹ tình huống!",
    "⚡ Thử thách cao độ: 90% người chơi thường sập bẫy câu này!",
    "🔥 Cẩn thận: Câu hỏi đánh lừa tư duy logic thông thường!"
];

const questionPools = {
    kho: [],
    hacknao: []
};

// Tạo tự động 50 câu chế độ KHÓ
for (let i = 1; i <= 50; i++) {
    questionPools.kho.push({
        id: i,
        q: `[Chế Độ Khó - Tình huống ${i}] Khi xử lý lỗi kết nối cơ sở dữ liệu Firestore trong dự án Không Một Minh, thông báo trả về mã lỗi quyền truy cập. Phương án nào giải quyết chính xác nhất mà không làm lộ bảo mật?`,
        options: [
            "Kiểm tra lại bộ Rules trên Firebase Console và cấu hình đúng quyền đọc ghi công khai phù hợp",
            "Xóa hoàn toàn project và tạo lại từ đầu",
            "Tắt toàn bộ tính năng bảo mật của Firestore",
            "Sử dụng tài khoản quản trị tối cao mã nguồn cứng trên client"
        ],
        correctText: "Kiểm tra lại bộ Rules trên Firebase Console và cấu hình đúng quyền đọc ghi công khai phù hợp"
    });
}

// Tạo tự động 50 câu chế độ HACK NÃO
for (let i = 51; i <= 100; i++) {
    questionPools.hacknao.push({
        id: i,
        q: `[Chế Độ Hack Não - Tình huống ${i}] Một đoạn mã JavaScript chạy bất đồng bộ trả về kết quả Promise bị từ chối (Rejected) nhưng không có hàm catch xử lý. Trạng thái và hậu quả trên trình duyệt sẽ thế nào?`,
        options: [
            "Báo lỗi UnhandledPromiseRejection trên Console, tiềm ẩn lỗi ngầm logic ứng dụng",
            "Trình duyệt tự động sửa lỗi và tiếp tục chạy mượt mà",
            "Ứng dụng tự động reset lại toàn bộ mã nguồn HTML",
            "Làm tăng tốc độ xử lý mạng của GitHub Pages"
        ],
        correctText: "Báo lỗi UnhandledPromiseRejection trên Console, tiềm ẩn lỗi ngầm logic ứng dụng"
    });
}

// Xáo trộn mảng đáp án
function shuffleOptions(array) {
    let arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

// Quản lý trạng thái lưu tiến trình
let currentMode = localStorage.getItem('kmm_mode') || 'kho';
let currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${currentMode}`)) || 0;
let score = parseInt(localStorage.getItem('kmm_score')) || 0;
let playerName = localStorage.getItem('kmm_player_name') || "";
let answered = false;

if (playerName) {
    document.getElementById('player-name-input').value = playerName;
}

// Chuyển đổi Sáng / Tối
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('kmm_theme', newTheme);
}

// Khôi phục theme đã lưu
const savedTheme = localStorage.getItem('kmm_theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

window.switchMode = function(mode) {
    currentMode = mode;
    localStorage.setItem('kmm_mode', mode);
    currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${mode}`)) || 0;
    
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    loadQuestion();
}

function savePlayerName(val) {
    playerName = val.trim();
    localStorage.setItem('kmm_player_name', playerName);
    updateLeaderboard();
}

function loadQuestion() {
    answered = false;
    let list = questionPools[currentMode];
    if (currentQIndex >= list.length) currentQIndex = 0;
    
    let qData = list[currentQIndex];
    
    // Hiển thị cảnh báo ngẫu nhiên cho thêm hứng thú
    let randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
    document.getElementById('warning-banner').innerText = randomWarning;

    document.getElementById('question-counter').innerText = `Chế độ: ${currentMode.toUpperCase()} | Câu ${currentQIndex + 1} / ${list.length}`;
    document.getElementById('question-text').innerText = qData.q;
    document.getElementById('quiz-score').innerText = `Điểm: ${score}`;
    
    let shuffled = shuffleOptions(qData.options);
    let optHtml = "";
    shuffled.forEach((optText, idx) => {
        let isCorrect = (optText === qData.correctText);
        optHtml += `<button class="option-btn" onclick="checkAnswer(this, ${isCorrect})">${String.fromCharCode(65 + idx)}. ${optText}</button>`;
    });
    document.getElementById('options-container').innerHTML = optHtml;
}

window.checkAnswer = function(btnElement, isCorrect) {
    if (answered) return;
    answered = true;
    
    let list = questionPools[currentMode];
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
            if (btn.innerText.includes(list[currentQIndex].correctText)) {
                btn.classList.add('correct');
            }
        });
    }
};

window.nextQuestion = function() {
    let list = questionPools[currentMode];
    currentQIndex = (currentQIndex + 1) % list.length;
    localStorage.setItem(`kmm_idx_${currentMode}`, currentQIndex);
    loadQuestion();
};

// --- BẢNG XẾP HẠNG & ĐÁNH GIÁ ---
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
    // Đánh dấu đúng nút mode active
    document.querySelectorAll('.mode-btn').forEach(btn => {
        if(btn.getAttribute('onclick').includes(currentMode)) {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        }
    });
    loadQuestion();
    loadLeaderboard();
    loadTopFeedbacks();
});
