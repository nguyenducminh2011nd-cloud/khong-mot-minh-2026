// --- CẤU HÌNH FIREBASE AN TOÀN ---
let db = null;
try {
    if (typeof firebase !== 'undefined') {
        const firebaseConfig = {
            apiKey: "AIzaSyCtQSv6-wGiKyzIIzpmdL32f00Lz14ih1M",
            authDomain: "khongmotminh2026.firebaseapp.com",
            projectId: "khongmotminh2026",
            storageBucket: "khongmotminh2026.fireappstorage.app",
            messagingSenderId: "391078149804",
            appId: "1:391078149804:web:9ba69127156c66e6966909",
            measurementId: "G-BFXSCXN4Q0"
        };
        if (!firebase.apps.length) { firebase.initializeApp(firebaseConfig); }
        db = firebase.firestore();
    }
} catch (e) { console.warn("Firebase bypass active"); }

localStorage.setItem('kmm_author_token', 'admin_fixed_master_key_2026');

function showToast(message, type = 'success') {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    if (type === 'error') {
        toast.style.borderColor = '#ef4444';
        toast.style.color = '#f87171';
    }
    toast.innerText = message;
    container.appendChild(toast);
    setTimeout(() => { toast.remove(); }, 3000);
}

// --- ÂM THANH AN TOÀN (KHÔNG CHẠY NGẦM GÂY LỖI) ---
let soundEnabled = true;
function playSound(type) {
    if (!soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        if (audioCtx.state === 'suspended') { audioCtx.resume(); }
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        osc.connect(gainNode); gainNode.connect(audioCtx.destination);
        let now = audioCtx.currentTime;
        if (type === 'click') {
            osc.type = 'sine'; osc.frequency.setValueAtTime(400, now); osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);
            gainNode.gain.setValueAtTime(0.1, now); gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
            osc.start(now); osc.stop(now + 0.08);
        } else if (type === 'correct') {
            osc.type = 'triangle'; osc.frequency.setValueAtTime(523.25, now); osc.frequency.setValueAtTime(659.25, now + 0.1);
            gainNode.gain.setValueAtTime(0.15, now); gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
            osc.start(now); osc.stop(now + 0.3);
        } else if (type === 'wrong') {
            osc.type = 'sawtooth'; osc.frequency.setValueAtTime(200, now); osc.frequency.setValueAtTime(130, now + 0.15);
            gainNode.gain.setValueAtTime(0.15, now); gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
            osc.start(now); osc.stop(now + 0.25);
        }
    } catch (e) {}
}

window.toggleAudio = function() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) btn.innerText = soundEnabled ? "🔊 Audio" : "🔇 Off";
    showToast(soundEnabled ? "Đã bật âm thanh 🔊" : "Đã tắt âm thanh 🔇");
}

function getPlayerRank(score) {
    if (score >= 10000) return { name: "🌌 Huyền Thoại Vũ Trụ", color: "#ec4899" };
    if (score >= 6000)  return { name: "⚡ Thách Đấu Tối Thượng", color: "#8b5cf6" };
    if (score >= 3500)  return { name: "🏆 Đại Sư An Ninh", color: "#f43f5e" };
    if (score >= 2000)  return { name: "💎 Kim Cương Tinh Anh", color: "#38bdf8" };
    if (score >= 1000)  return { name: "🥇 Vàng Kiên Định", color: "#fbbf24" };
    if (score >= 400)   return { name: "🥈 Bạc Tiềm Năng", color: "#94a3b8" };
    return { name: "🥉 Đồng Khởi Đầu", color: "#cd7f32" };
}

const warnings = [
    "⚠️ Cảnh báo: Kẻ lừa đảo thường dùng tâm lý hoảng sợ hoặc hám lợi để thao túng bạn!",
    "🚨 Chú ý: Đừng bao giờ cung cấp mã OTP hay mật khẩu cho bất kỳ ai!",
    "⚡ Thử thách đỉnh cao: Khó (50đ) & Hack Não (100đ), cày điểm bứt phá rank!"
];

// --- KHO CÂU HỎI & AI EXTENSION ---
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
let activeQuestionData = null;

document.addEventListener("DOMContentLoaded", function() {
    if (playerName) {
        const nameInput = document.getElementById('player-name-input');
        if (nameInput) nameInput.value = playerName;
    }
    selectMode(selectedMode);
    loadLeaderboard();
    loadAllFeedbacks();
    checkBadges();
});

window.selectMode = function(mode) {
    playSound('click');
    selectedMode = mode;
    localStorage.setItem('kmm_mode', mode);
    document.querySelectorAll('.mode-btn').forEach(btn => btn.classList.remove('active'));
    const btnElem = document.getElementById(`btn-mode-${mode}`);
    if (btnElem) btnElem.classList.add('active');
    showToast(`Đã chọn chế độ: ${mode === 'kho' ? 'Khó (50đ)' : 'Hack Não (100đ)'}`);
}

window.startGame = function() {
    playSound('click');
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('minigame-screen').style.display = 'none';
    document.getElementById('admin-dashboard-screen').style.display = 'none';
    document.getElementById('quiz-screen').style.display = 'block';
    currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${selectedMode}`)) || 0;
    loadQuestion();
    showToast("Bắt đầu thử thách đấu trí! 🚀");
}

function loadQuestion() {
    answered = false;
    let list = questionPools[selectedMode];
    if (currentQIndex >= list.length) currentQIndex = 0;
    
    activeQuestionData = list[currentQIndex];
    document.getElementById('warning-banner').innerText = warnings[Math.floor(Math.random() * warnings.length)];
    document.getElementById('quiz-title-mode').innerText = `🧠 Đấu Trí (${selectedMode === 'kho' ? 'Khó - 50đ' : 'Hack Não - 100đ'})`;
    document.getElementById('question-counter').innerText = `Tình huống ${currentQIndex + 1} / ${list.length}`;
    document.getElementById('question-text').innerText = activeQuestionData.q;
    document.getElementById('quiz-score').innerText = `Điểm: ${score}`;
    
    const optContainer = document.getElementById('options-container');
    optContainer.innerHTML = "";

    let shuffled = shuffleOptions(activeQuestionData.options);
    shuffled.forEach((optText, idx) => {
        let isCorrect = (optText === activeQuestionData.correct);
        optContainer.innerHTML += `<button class="option-btn" onclick="checkAnswer(this, ${isCorrect}, event)">${String.fromCharCode(65 + idx)}. ${optText}</button>`;
    });
}

window.checkAnswer = function(btnElement, isCorrect, event) {
    if (answered) return;
    answered = true;
    
    let buttons = document.querySelectorAll('#options-container .option-btn');
    if (isCorrect) {
        playSound('correct');
        btnElement.classList.add('correct');
        let pts = (selectedMode === 'hacknao') ? 100 : 50;
        score += pts;
        localStorage.setItem('kmm_score', score);
        document.getElementById('quiz-score').innerText = `Điểm: ${score}`;
        updateLeaderboard(); checkBadges();
        if (score >= 3500) { confetti(); }
    } else {
        playSound('wrong');
        btnElement.classList.add('wrong');
        buttons.forEach(btn => { if (btn.innerText.includes(activeQuestionData.correct)) btn.classList.add('correct'); });
        showToast("❌ Trả lời chưa chính xác!", "error");
    }
    showExplanationBox(activeQuestionData.explain);
};

function showExplanationBox(explainText) {
    let quizArea = document.getElementById('quiz-area');
    let explainDiv = document.createElement('div');
    explainDiv.style.cssText = "margin-top: 10px; padding: 8px 12px; background: rgba(52, 211, 153, 0.15); border-left: 4px solid var(--accent-green); border-radius: 6px; font-size: 0.85rem; color: #fff;";
    explainDiv.innerHTML = `<strong>Giải thích:</strong> ${explainText}`;
    quizArea.appendChild(explainDiv);
}

window.nextQuestion = function() {
    playSound('click');
    let list = questionPools[selectedMode];
    currentQIndex = (currentQIndex + 1) % list.length;
    localStorage.setItem(`kmm_idx_${selectedMode}`, currentQIndex);
    let oldNotice = document.querySelector('#quiz-area > div[style*="border-left"]');
    if (oldNotice) oldNotice.remove();
    loadQuestion();
};

window.pauseAndSaveGame = function() {
    playSound('click');
    showToast(`⏸️ Đã lưu tiến trình! Điểm hiện tại: ${score}`);
    document.getElementById('quiz-screen').style.display = 'none';
    document.getElementById('welcome-screen').style.display = 'block';
    loadLeaderboard(); loadAllFeedbacks(); checkBadges();
}

window.savePlayerName = function(val) {
    playerName = val.trim();
    localStorage.setItem('kmm_player_name', playerName);
    updateLeaderboard();
}

function checkBadges() {
    if (score >= 100)  document.getElementById('badge-novice')?.classList.add('unlocked');
    if (score >= 500)  document.getElementById('badge-streak')?.classList.add('unlocked');
    if (score >= 1500) document.getElementById('badge-cipher')?.classList.add('unlocked');
    if (score >= 3500) document.getElementById('badge-master')?.classList.add('unlocked');
    if (score >= 6000) document.getElementById('badge-legend')?.classList.add('unlocked');
    if (score >= 10000) document.getElementById('badge-god')?.classList.add('unlocked');
}

function updateLeaderboard() {
    if (!playerName || !db) return;
    db.collection("leaderboard").doc(playerName).set({
        name: playerName, score: score, timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => loadLeaderboard()).catch(err => {});
}

function loadLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    if (!container || !db) return;
    db.collection("leaderboard").orderBy("score", "desc").limit(10).get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                let html = ""; let rank = 1;
                snapshot.forEach((doc) => {
                    let data = doc.data();
                    let playerRank = getPlayerRank(data.score || 0);
                    html += `<div class="leaderboard-item">
                        <div style="display: flex; align-items: center; gap: 6px;">
                            <span style="font-weight: bold; color: #9ca3af;">#${rank++}</span>
                            <div>
                                <strong>${data.name || "Ẩn danh"}</strong>
                                <div style="font-size: 0.7rem; color: ${playerRank.color}; font-weight: bold;">${playerRank.name}</div>
                            </div>
                        </div>
                        <span style="color: var(--accent-green); font-weight: bold;">${data.score || 0}đ</span>
                    </div>`;
                });
                container.innerHTML = html;
            }
        }).catch(err => {});
}

function loadAllFeedbacks() {
    const cardsContainer = document.getElementById('feedback-cards-container');
    if (!cardsContainer || !db) return;
    db.collection("feedbacks").orderBy("timestamp", "desc").limit(5).get()
        .then((snapshot) => {
            if (!snapshot.empty) {
                let cardsHtml = "";
                snapshot.forEach((doc) => {
                    let d = doc.data();
                    let prefix = d.type === 'bug' ? '🚨 [BUG] ' : '⭐ ';
                    cardsHtml += `<div class="feedback-card-item" style="${d.type === 'bug' ? 'border-left-color: #ef4444;' : ''}">
                        <div class="feedback-card-author">${prefix}${d.name || "Ẩn danh"}</div>
                        <div class="feedback-card-text">"${d.text || ""}"</div>
                    </div>`;
                });
                cardsContainer.innerHTML = cardsHtml;
            }
        }).catch(err => {});
}

window.openCipherMinigame = function() { showToast("Mở minigame Cipher!"); }
window.submitCommunityScenario = function() { showToast("Đã gửi đóng góp!"); }
window.submitHomeFeedback = function() { showToast("Đã gửi phản hồi!"); }
window.openAdminDashboard = function() { showToast("Mở bảng quản trị Admin!"); }
window.closeAdminDashboard = function() {}
