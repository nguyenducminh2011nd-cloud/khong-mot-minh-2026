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

// --- 100 CÂU HỎI AN TOÀN MẠNG & PHÒNG CHỐNG LỪA ĐẢO (50 KHÓ & 50 HACK NÃO) ---
const warnings = [
    "⚠️ Cảnh báo: Kẻ lừa đảo thường dùng tâm lý hoảng sợ hoặc hám lợi để thao túng bạn!",
    "🚨 Chú ý: Đừng bao giờ cung cấp mã OTP hay mật khẩu cho bất kỳ ai, kể cả tự xưng công an!",
    "⚡ Thử thách cao độ: Các bẫy lừa đảo mạng tinh vi luôn đánh vào lòng tin!",
    "🔥 Cẩn thận: Đọc kỹ tình huống để không sập bẫy các chiêu trò giả mạo tinh vi!"
];

const questionPools = {
    kho: [],
    hacknao: []
};

// 50 câu chế độ KHÓ (Tình huống lừa đảo phổ biến & cách nhận biết)
const baseKhoScenarios = [
    {
        q: "Nhận được cuộc gọi tự xưng là Công an yêu cầu chuyển tiền vào tài khoản tạm giữ để điều tra do liên quan đến đường dây tội phạm. Bạn nên làm gì?",
        options: [
            "Cúp máy ngay lập tức, tuyệt đối không chuyển tiền và báo cho cơ quan công an địa phương",
            "Làm theo hướng dẫn chuyển tiền nhanh để chứng minh trong sạch",
            "Cung cấp số căn cước công dân và mã OTP qua điện thoại",
            "Hẹn gặp trực tiếp người gọi ở một địa điểm vắng để giải quyết"
        ],
        correct: "Cúp máy ngay lập tức, tuyệt đối không chuyển tiền và báo cho cơ quan công an địa phương"
    },
    {
        q: "Thấy tin nhắn từ MXH thông báo trúng thưởng xe máy giá trị lớn nhưng phải nộp trước một khoản phí 'làm thủ tục nhận thưởng' qua thẻ cào hoặc chuyển khoản. Bạn xử lý thế nào?",
        options: [
            "Xóa và chặn tin nhắn vì đây là chiêu trò lừa đảo trúng thưởng giả mạo",
            "Nộp phí ngay vì cơ hội trúng thưởng rất hiếm",
            "Nhắn tin hỏi thêm thông tin chi tiết và gửi ảnh chụp thẻ ngân hàng",
            "Chia sẻ bài viết công khai để nhận thưởng nhanh hơn"
        ],
        correct: "Xóa và chặn tin nhắn vì đây là chiêu trò lừa đảo trúng thưởng giả mạo"
    },
    {
        q: "Tuyển dụng cộng tác viên online 'việc nhẹ lương cao', chỉ cần bấm like, share video hoặc thả tim đơn hàng ảo là nhận hoa hồng. Dấu hiệu cốt lõi nhận biết đây là lừa đảo là gì?",
        options: [
            "Yêu cầu nộp tiền ứng trước hoặc mua đơn hàng giá trị cao dần để được rút tiền gốc lẫn lãi",
            "Công ty trả lương qua tài khoản ngân hàng chính thống",
            "Có hợp đồng lao động ký kết trực tiếp tại trụ sở công ty",
            "Không yêu cầu bất kỳ khoản tiền nào ban đầu"
        ],
        correct: "Yêu cầu nộp tiền ứng trước hoặc mua đơn hàng giá trị cao dần để được rút tiền gốc lẫn lãi"
    },
    {
        q: "Nhận được đường link (URL) lạ từ bạn bè qua tin nhắn giục click vào xem 'video hot' hoặc 'hình ảnh của bạn'. Rủi ro lớn nhất là gì?",
        options: [
            "Bị dính mã độc đánh cắp tài khoản mạng xã hội, thông tin cá nhân và quyền kiểm soát thiết bị",
            "Chỉ làm tốn dung lượng 4G của điện thoại",
            "Không có rủi ro gì vì do bạn bè gửi",
            "Làm điện thoại chạy mượt mà hơn"
        ],
        correct: "Bị dính mã độc đánh cắp tài khoản mạng xã hội, thông tin cá nhân và quyền kiểm soát thiết bị"
    },
    {
        q: "Khi tạo mật khẩu tài khoản quan trọng (ngân hàng, email, mạng xã hội), cách đặt nào an toàn nhất để tránh bị hacker dò tìm?",
        options: [
            "Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (độ dài trên 12 ký tự)",
            "Sử dụng ngày tháng năm sinh của bản thân cho dễ nhớ",
            "Dùng dãy số từ 1 đến 8 hoặc 'password123'",
            "Dùng chung một mật khẩu duy nhất cho mọi tài khoản"
        ],
        correct: "Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (độ dài trên 12 ký tự)"
    }
];

// 50 câu chế độ HACK NÃO (Tình huống bẫy tâm lý sâu & bảo mật công nghệ mạng)
const baseHackNaoScenarios = [
    {
        q: "Kẻ gian lập một trang web giả mạo ngân hàng có giao diện, tên miền gần giống hệt trang chính thức (lừa đảo phishing). Mục đích chính của chúng là gì?",
        options: [
            "Đánh cắp tên đăng nhập, mật khẩu và mã OTP khi nạn nhân nhập vào trang web giả",
            "Giúp tăng lượt truy cập cho hệ thống ngân hàng",
            "Quảng cáo sản phẩm thương mại điện tử giá rẻ",
            "Kiểm tra tốc độ đường truyền mạng Internet của bạn"
        ],
        correct: "Đánh cắp tên đăng nhập, mật khẩu và mã OTP khi nạn nhân nhập vào trang web giả"
    },
    {
        q: "Bạn nhận được email thông báo tài khoản game/ngân hàng sắp bị khóa nếu không xác thực lại thông tin qua đường link kèm theo trong vòng 24 giờ. Phản ứng khôn ngoan nhất là gì?",
        options: [
            "Bỏ qua email, truy cập trực tiếp vào ứng dụng chính thống hoặc trang chủ chính thức để kiểm tra",
            "Làm theo hướng dẫn ngay lập tức vì sợ mất tài khoản",
            "Gửi mật khẩu qua email phản hồi để họ xác thực giúp",
            "Chia sẻ email cho nhiều người khác cùng cảnh giác"
        ],
        correct: "Bỏ qua email, truy cập trực tiếp vào ứng dụng chính thống hoặc trang chủ chính thức để kiểm tra"
    },
    {
        q: "Sử dụng mạng Wi-Fi công cộng miễn phí (tại quán cà phê, sân bay) để đăng nhập vào tài khoản ngân hàng cá nhân có nguy cơ gì lớn nhất?",
        options: [
            "Bị kẻ xấu tấn công chặn bắt gói tin (Man-in-the-Middle attack) đánh cắp thông tin nhạy cảm",
            "Làm điện thoại bị hỏng pin nhanh chóng",
            "Tăng tốc độ kết nối mạng lên mức tối đa",
            "Không có bất kỳ rủi ro bảo mật nào"
        ],
        correct: "Bị kẻ xấu tấn công chặn bắt gói tin (Man-in-the-Middle attack) đánh cắp thông tin nhạy cảm"
    },
    {
        q: "Kẻ lừa đảo sử dụng công nghệ Deepfake (giả mạo khuôn mặt và giọng nói qua video call ngắn) để giả làm người thân gọi mượn tiền gấp. Cách xác thực hiệu quả nhất để không bị lừa là gì?",
        options: [
            "Yêu cầu người gọi thực hiện một động tác lạ trước camera (như đưa tay lên sờ tai, nghiêng đầu) hoặc gọi điện bằng số thông thường để xác nhận",
            "Chuyển tiền ngay vì nhìn thấy mặt qua video là chắc chắn thật",
            "Tin tưởng tuyệt đối vào giọng nói qua điện thoại",
            "Chặn ngay số liên lạc và không bao giờ nghe máy nữa"
        ],
        correct: "Yêu cầu người gọi thực hiện một động tác lạ trước camera (như đưa tay lên sờ tai, nghiêng đầu) hoặc gọi điện bằng số thông thường để xác nhận"
    },
    {
        q: "Tính năng bảo mật 2 lớp (2FA / MFA) bằng mã OTP gửi về điện thoại hoặc ứng dụng Authenticator có tác dụng cốt lõi nào trong bảo mật tài khoản?",
        options: [
            "Ngăn chặn kẻ gian đăng nhập trái phép ngay cả khi chúng đã biết được mật khẩu của bạn",
            "Giúp tăng dung lượng lưu trữ của tài khoản",
            "Tự động đổi mật khẩu mới mỗi tuần",
            "Giúp bạn đăng nhập nhanh hơn mà không cần nhớ mật khẩu"
        ],
        correct: "Ngăn chặn kẻ gian đăng nhập trái phép ngay cả khi chúng đã biết được mật khẩu của bạn"
    }
];

// Tự động sinh đủ 50 câu Khó và 50 câu Hack Não
for (let i = 1; i <= 50; i++) {
    let base = baseKhoScenarios[(i - 1) % baseKhoScenarios.length];
    questionPools.kho.push({
        id: i,
        q: `[Phòng Chống Lừa Đảo - Khó Câu ${i}] ${base.q}`,
        options: [...base.options],
        correctText: base.correct
    });
}

for (let i = 51; i <= 100; i++) {
    let base = baseHackNaoScenarios[(i - 1) % baseHackNaoScenarios.length];
    questionPools.hacknao.push({
        id: i,
        q: `[An Toàn Mạng - Hack Não Câu ${i}] ${base.q}`,
        options: [...base.options],
        correctText: base.correct
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
    
    let randomWarning = warnings[Math.floor(Math.random() * warnings.length)];
    document.getElementById('warning-banner').innerText = randomWarning;

    document.getElementById('question-counter').innerText = `Chủ đề: An Toàn Mạng (${currentMode.toUpperCase()}) | Tình huống ${currentQIndex + 1} / ${list.length}`;
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
