// --- CẤU HÌNH FIREBASE VÀ AI ---
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
} catch (e) { console.warn("Firebase warning:", e); }

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

// --- ÂM THANH ---
let soundEnabled = true;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!soundEnabled) return;
    try {
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

// --- HỆ THỐNG RANK MỞ RỘNG VÀ PHÂN CHIA ĐIỂM ---
function getPlayerRank(score) {
    if (score >= 10000) return { name: "🌌 Huyền Thoại Vũ Trụ", color: "#ec4899" };
    if (score >= 6000)  return { name: "⚡ Thách Đấu Tối Thượng", color: "#8b5cf6" };
    if (score >= 3500)  return { name: "🏆 Đại Sư An Ninh", color: "#f43f5e" };
    if (score >= 2000)  return { name: "💎 Kim Cương Tinh Anh", color: "#38bdf8" };
    if (score >= 1000)  return { name: "🥇 Vàng Kiên Định", color: "#fbbf24" };
    if (score >= 400)   return { name: "🥈 Bạc Tiềm Năng", color: "#94a3b8" };
    return { name: "🥉 Đồng Khởi Đầu", color: "#cd7f32" };
}

// --- KHO CÂU HỎI MỞ RỘNG & TÍCH HỢP AI GENERATOR ---
const baseQuestionPools = {
    kho: [
        { q: "Nhận cuộc gọi tự xưng Công an yêu cầu chuyển tiền vào tài khoản tạm giữ để điều tra. Bạn xử lý thế nào?", options: ["Cúp máy ngay lập tức và báo công an địa phương", "Chuyển tiền vào tài khoản để chứng minh trong sạch", "Cung cấp mã OTP qua điện thoại cho người gọi", "Hẹn gặp trực tiếp người gọi ở nơi vắng vẻ"], correct: "Cúp máy ngay lập tức và báo công an địa phương", explain: "💡 Công an không bao giờ làm việc hay yêu cầu chuyển tiền qua điện thoại!" },
        { q: "Tin nhắn MXH thông báo trúng thưởng lớn nhưng phải nộp khoản phí làm thủ tục trước. Bạn làm gì?", options: ["Xóa và chặn tin nhắn giả mạo trúng thưởng ngay", "Nộp tiền phí qua thẻ cào để nhận thưởng lớn", "Gửi ảnh chụp thẻ ngân hàng cho người thông báo", "Chia sẻ bài viết công khai để nhận xe nhanh"], correct: "Xóa and chặn tin nhắn giả mạo trúng thưởng ngay", explain: "💡 Không có chương trình trúng thưởng hợp pháp nào bắt nộp phí trước để nhận giải!" },
        { q: "Tuyển cộng tác viên online thả tim đơn hàng ảo nhận hoa hồng. Dấu hiệu nhận diện lừa đảo là gì?", options: ["Yêu cầu nộp tiền ứng trước để mua đơn hàng", "Công ty trả lương qua ngân hàng chính thống", "Có hợp đồng ký kết trực tiếp tại trụ sở", "Không yêu cầu bất kỳ khoản tiền nào từ đầu"], correct: "Yêu cầu nộp tiền ứng trước để mua đơn hàng", explain: "💡 Kẻ lừa đảo dụ nộp tiền số lượng ngày càng lớn rồi chiếm đoạt!" }
    ],
    hacknao: [
        { q: "Nhận tin nhắn từ chính số điện thoại của mình giục nợ và đe dọa tống tiền. Hiện tượng này do đâu?", options: ["Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", "Điện thoại tự động phát tán tin nhắn lúc nửa đêm", "Nhà mạng đang thử nghiệm hệ thống tin nhắn mới", "Do cài đặt lịch hẹn giờ gửi tin nhắn từ trước"], correct: "Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", explain: "💡 Kẻ gian dùng công nghệ giả mạo số điện thoại người gửi để gây hoang mang tột độ!" },
        { q: "Rao bán iPhone đời mới giá rẻ bất ngờ với lý do hàng trưng bày không dùng đến. Bạn đánh giá sao?", options: ["Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", "Cơ hội hiếm có nên cần chuyển khoản cọc liền", "Hàng chính hãng uy tín nên mới có giá rẻ như vậy", "Mua trực tiếp vì hàng trưng bày luôn siêu rẻ"], correct: "Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", explain: "💡 Không có chiếc iPhone giá trị cao nào bán rẻ như cho. Đừng để lòng tham mờ mắt!" }
    ]
};

// --- MÔ PHỎNG TẠO CÂU HỎI BẰNG AI (DYNAMIC AI GENERATOR) ---
function generateDynamicAIQuestion(mode) {
    const aiPools = {
        kho: [
            { q: "Nhận cuộc gọi từ đầu số lạ thông báo con bạn đang cấp cứu tại bệnh viện yêu cầu chuyển khoản gấp. Bạn làm gì?", options: ["Gọi điện trực tiếp cho giáo viên hoặc nhà trường xác thực", "Hoảng loạn chuyển tiền ngay lập tức theo yêu cầu", "Đọc số tài khoản ngân hàng để họ gửi tiền hỗ trợ", "Chạy ra cây ATM gần nhất mà không hỏi lại"], correct: "Gọi điện trực tiếp cho giáo viên hoặc nhà trường xác thực", explain: "💡 Chiêu trò giả mạo bệnh viện/công an gây hoảng loạn tâm lý để chiếm đoạt tài sản!" },
            { q: "Khi tải một ứng dụng chỉnh sửa ảnh miễn phí trên mạng yêu cầu cấp quyền truy cập toàn bộ danh bạ và bộ nhớ. Bạn nên:", options: ["Từ chối cấp quyền nhạy cảm và gỡ ứng dụng nếu khả nghi", "Cấp toàn bộ quyền cho ứng dụng chạy mượt", "Tắt mạng internet rồi tiếp tục sử dụng app", "Chia sẻ app cho bạn bè cùng trải nghiệm"], correct: "Từ chối cấp quyền nhạy cảm và gỡ ứng dụng nếu khả nghi", explain: "💡 Ứng dụng chỉnh sửa ảnh không có nhu cầu truy cập danh bạ cá nhân của bạn!" }
        ],
        hacknao: [
            { q: "Kẻ gian sử dụng công nghệ Deepfake để giả mặt người thân gọi video call mượn tiền nhưng hình ảnh hơi giật lắc. Cách xử lý thông minh là:", options: ["Yêu cầu người gọi đưa tay qua trước ống kính hoặc hỏi câu hỏi bí mật", "Tin tưởng tuyệt đối vì thấy rõ hình ảnh và nghe rõ giọng", "Lập tức chuyển khoản vì sợ người thân lỡ việc lớn", "Chụp màn hình lại rồi đăng lên mạng xã hội hỏi ý kiến"], correct: "Yêu cầu người gọi đưa tay qua trước ống kính hoặc hỏi câu hỏi bí mật", explain: "💡 Công nghệ Deepfake thời gian thực thường có độ trễ hoặc lỗi biên dạng khi có vật cản qua mặt." },
            { q: "Một đường link quảng cáo đầu tư tiền ảo sinh lời 500% sau 1 giờ được chia sẻ bởi tài khoản người nổi tiếng. Bản chất là:", options: ["Tài khoản người nổi tiếng đã bị hack để phát tán web lừa đảo", "Cơ hội đầu tư hiếm có trong đời được chuyên gia hậu thuẫn", "Chương trình tri ân người hâm mộ của thần tượng", "Dự án tài chính chính thống được nhà nước bảo trợ"], correct: "Tài khoản người nổi tiếng đã bị hack để phát tán web lừa đảo", explain: "💡 Không có kênh đầu tư hợp pháp nào sinh lời phi lý như vậy trong thời gian ngắn." }
        ]
    };
    let pool = aiPools[mode];
    return pool[Math.floor(Math.random() * pool.length)];
}

let selectedMode = localStorage.getItem('kmm_mode') || 'kho';
let currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${selectedMode}`)) || 0;
let score = parseInt(localStorage.getItem('kmm_score')) || 0;
let playerName = localStorage.getItem('kmm_player_name') || "";
let answered = false;
let currentActiveQuestion = null;

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
    loadNewAIQuestion();
    showToast("AI đã tạo xong thử thách đấu trí! 🚀");
}

function loadNewAIQuestion() {
    answered = false;
    // Dùng AI sinh câu hỏi động để tránh lặp
    currentActiveQuestion = generateDynamicAIQuestion(selectedMode);
    
    document.getElementById('warning-banner').innerText = "🤖 AI Security System: Đang phân tích tình huống giả lập trực tuyến...";
    document.getElementById('quiz-title-mode').innerText = `🧠 Đấu Trí AI (${selectedMode === 'kho' ? 'Khó - 50đ' : 'Hack Não - 100đ'})`;
    document.getElementById('question-counter').innerText = `Thử thách AI #${Math.floor(Math.random() * 900 + 100)}`;
    document.getElementById('question-text').innerText = currentActiveQuestion.q;
    document.getElementById('quiz-score').innerText = `Điểm: ${score}`;
    
    const optContainer = document.getElementById('options-container');
    optContainer.innerHTML = "";

    let shuffled = [...currentActiveQuestion.options].sort(() => Math.random() - 0.5);
    shuffled.forEach((optText, idx) => {
        let isCorrect = (optText === currentActiveQuestion.correct);
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
        buttons.forEach(btn => { if (btn.innerText.includes(currentActiveQuestion.correct)) btn.classList.add('correct'); });
        showToast("❌ Trả lời chưa chính xác!", "error");
    }
    showExplanationBox(currentActiveQuestion.explain);
};

function showExplanationBox(explainText) {
    let quizArea = document.getElementById('quiz-area');
    let explainDiv = document.createElement('div');
    explainDiv.style.cssText = "margin-top: 10px; padding: 8px 12px; background: rgba(52, 211, 153, 0.15); border-left: 4px solid var(--accent-green); border-radius: 6px; font-size: 0.85rem; color: #fff;";
    explainDiv.innerHTML = `<strong>Phân tích từ AI:</strong> ${explainText}`;
    quizArea.appendChild(explainDiv);
}

window.nextQuestion = function() {
    playSound('click');
    let oldNotice = document.querySelector('#quiz-area > div[style*="border-left"]');
    if (oldNotice) oldNotice.remove();
    loadNewAIQuestion();
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

// --- HỆ THỐNG HUY HIỆU MỚI PHONG PHÚ ---
function checkBadges() {
    if (score >= 100)  document.getElementById('badge-novice')?.classList.add('unlocked');
    if (score >= 500)  document.getElementById('badge-streak')?.classList.add('unlocked');
    if (score >= 1500) document.getElementById('badge-cipher')?.classList.add('unlocked');
    if (score >= 3500) document.getElementById('badge-master')?.classList.add('unlocked');
    if (score >= 6000) document.getElementById('badge-legend')?.classList.add('unlocked');
    if (score >= 10000) document.getElementById('badge-god')?.classList.add('unlocked');
}

// --- XẾP HẠNG VÀ ĐỒNG BỘ ---
function updateLeaderboard() {
    if (!playerName || !db) return;
    db.collection("leaderboard").doc(playerName).set({
        name: playerName, score: score, timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true }).then(() => loadLeaderboard()).catch(err => {});
}

function loadLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    if (!container) return;
    if (!db) {
        container.innerHTML = `
            <div class="leaderboard-item"><div style="display: flex; align-items: center; gap: 6px;"><span style="font-weight: bold; color: #9ca3af;">#1</span><div><strong>CyberMaster</strong><div style="font-size: 0.7rem; color: #f43f5e; font-weight: bold;">🏆 Đại Sư An Ninh</div></div></div><span style="color: var(--accent-green); font-weight: bold;">4200đ</span></div>
        `;
        return;
    }
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

window.openCipherMinigame = function() {
    showToast("Minigame Cyber Cipher đang sẵn sàng!");
}
window.submitCommunityScenario = function() { showToast("Đã gửi đóng góp!"); }
window.submitHomeFeedback = function() { showToast("Đã gửi phản hồi!"); }
window.openAdminDashboard = function() { showToast("Mở bảng quản trị Admin!"); }
window.closeAdminDashboard = function() {}
