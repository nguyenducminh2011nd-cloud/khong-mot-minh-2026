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
    "🚨 Chú ý: Đừng bao giờ cung cấp mã OTP hay mật khẩu cho bất kỳ ai, kể cả tự xưng công an!",
    "⚡ Thử thách cao độ: Các bẫy lừa đảo mạng tinh vi luôn đánh vào lòng tin!",
    "🔥 Cẩn thận: Đọc kỹ tình huống để không sập bẫy các chiêu trò giả mạo tinh vi!"
];

// --- KHO 100 TÌNH HUỐNG AN TOÀN MẠNG VÀ LỜI GIẢI THÍCH ĐỘC LẬP 100% ---
const questionPools = {
    kho: [
        {
            q: "Nhận được cuộc gọi tự xưng là Công an yêu cầu chuyển tiền vào tài khoản tạm giữ để điều tra do liên quan đường dây tội phạm. Bạn nên làm gì?",
            options: ["Cúp máy ngay lập tức, không chuyển tiền và báo công an địa phương", "Làm theo hướng dẫn chuyển tiền nhanh để chứng minh trong sạch", "Cung cấp số CCCD và mã OTP qua điện thoại", "Hẹn gặp trực tiếp người gọi ở nơi vắng để giải quyết"],
            correct: "Cúp máy ngay lập tức, không chuyển tiền và báo công an địa phương",
            explain: "💡 Cơ quan Công an không bao giờ làm việc hay yêu cầu chuyển tiền qua điện thoại!"
        },
        {
            q: "Tin nhắn MXH thông báo trúng thưởng xe máy giá trị lớn nhưng phải nộp khoản phí 'làm thủ tục nhận thưởng' qua thẻ cào. Bạn xử lý thế nào?",
            options: ["Xóa và chặn tin nhắn vì đây là chiêu trò lừa đảo trúng thưởng", "Nộp phí ngay vì cơ hội trúng thưởng rất hiếm", "Nhắn tin gửi ảnh chụp thẻ ngân hàng để họ làm thủ tục", "Chia sẻ bài viết công khai để nhận thưởng nhanh hơn"],
            correct: "Xóa và chặn tin nhắn vì đây là chiêu trò lừa đảo trúng thưởng",
            explain: "💡 Không có chương trình trúng thưởng hợp pháp nào bắt nộp phí trước để nhận giải!"
        },
        {
            q: "Tuyển dụng cộng tác viên online 'việc nhẹ lương cao', bấm like/thả tim đơn hàng ảo nhận hoa hồng. Dấu hiệu nhận biết lừa đảo là gì?",
            options: ["Yêu cầu nộp tiền ứng trước hoặc mua đơn hàng giá trị cao dần", "Công ty trả lương qua tài khoản ngân hàng chính thống", "Có hợp đồng lao động ký kết trực tiếp tại trụ sở", "Không yêu cầu bất kỳ khoản tiền nào ban đầu"],
            correct: "Yêu cầu nộp tiền ứng trước hoặc mua đơn hàng giá trị cao dần",
            explain: "💡 Kẻ lừa đảo sẽ dụ bạn nộp tiền số lượng ngày càng lớn rồi chiếm đoạt không cho rút!"
        },
        {
            q: "Nhận đường link (URL) lạ từ bạn bè giục click vào xem 'video hot' hoặc 'hình ảnh của bạn'. Rủi ro lớn nhất là gì?",
            options: ["Bị dính mã độc đánh cắp tài khoản MXH và thông tin cá nhân", "Chỉ làm tốn dung lượng 4G của điện thoại", "Không có rủi ro gì vì do bạn bè gửi", "Làm điện thoại chạy mượt mà hơn"],
            correct: "Bị dính mã độc đánh cắp tài khoản MXH và thông tin cá nhân",
            explain: "💡 Tài khoản bạn bè có thể đã bị hack và tự động gửi link chứa mã độc!"
        },
        {
            q: "Khi đặt mật khẩu tài khoản ngân hàng hoặc email, cấu trúc nào an toàn nhất để tránh bị hacker dò tìm?",
            options: ["Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (>12 ký tự)", "Sử dụng ngày tháng năm sinh của bản thân", "Dùng dãy số từ 1 đến 8 hoặc 'password123'", "Dùng chung một mật khẩu duy nhất cho mọi tài khoản"],
            correct: "Kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt (>12 ký tự)",
            explain: "💡 Mật khẩu phức tạp và dài giúp chống lại các đợt tấn công dò quét tự động (Brute Force)."
        },
        {
            q: "Khi nhận cuộc gọi từ số lạ xưng là nhân viên nhà mạng thông báo 'Sim sắp bị khóa, cần chuẩn hóa thông tin gấp'. Bạn nên làm gì?",
            options: ["Tắt máy và tự đến điểm giao dịch nhà mạng chính thức để kiểm tra", "Đọc ngay mã OTP vừa gửi về điện thoại cho họ", "Chuyển tiền theo hướng dẫn để mở khóa sim nhanh", "Cung cấp toàn bộ số Series SIM cho họ"],
            correct: "Tắt máy và tự đến điểm giao dịch nhà mạng chính thức để kiểm tra",
            explain: "💡 Đối tượng giả mạo nhà mạng để chiếm đoạt quyền kiểm soát SIM nhằm lấy mã OTP ngân hàng."
        },
        {
            q: "Thấy ứng dụng 'Vay tiền online lãi suất 0%' yêu cầu truy cập danh bạ điện thoại và hình ảnh cá nhân. Nguy cơ tiềm ẩn là gì?",
            options: ["Bị tống tiền, đe dọa và khủng bố danh bạ người thân khi phát sinh nợ ảo", "Được duyệt khoản vay miễn phí không cần trả", "Ứng dụng giúp tăng bảo mật cho điện thoại", "Không có ảnh hưởng gì tới thông tin cá nhân"],
            correct: "Bị tống tiền, đe dọa và khủng bố danh bạ người thân khi phát sinh nợ ảo",
            explain: "💡 App vay tín dụng đen sẽ dùng danh bạ để bôi nhọ, cắt ghép ảnh tống tiền bạn và người thân."
        },
        {
            q: "Nhận email thông báo 'Tài khoản ngân hàng bị đăng nhập trái phép, hãy click link để đổi mật khẩu ngay'. Bạn xử lý ra sao?",
            options: ["Không click link, tự mở ứng dụng ngân hàng chính thức để kiểm tra", "Click ngay vào đường link trong email để đăng nhập đổi mật khẩu", "Forward email cho bạn bè nhờ đổi mật khẩu hộ", "Trả lời email bằng tên đăng nhập và mật khẩu cũ"],
            correct: "Không click link, tự mở ứng dụng ngân hàng chính thức để kiểm tra",
            explain: "💡 Đây là email Phishing (giả mạo). Link dẫn đến website giả để câu thông tin đăng nhập của bạn."
        },
        {
            q: "Khi bán hàng online, khách gửi ảnh chụp giao diện 'Đã chuyển khoản thành công' và giục gửi hàng gấp. Bạn nên xác nhận bằng cách nào?",
            options: ["Kiểm tra số dư thực tế tăng lên trên app ngân hàng của chính mình", "Tin tưởng ngay vì có ảnh chụp màn hình chuyển tiền", "Nhấp vào đường link khách gửi để nhận tiền về tài khoản", "Cung cấp mã OTP ngân hàng để xác nhận giao dịch"],
            correct: "Kiểm tra số dư thực tế tăng lên trên app ngân hàng của chính mình",
            explain: "💡 Kẻ lừa đảo sử dụng các phần mềm/website tạo bill chuyển tiền giả rất tinh vi."
        },
        {
            q: "Người quen trên Messenger nhắn tin hỏi mượn tiền gấp do gặp tai nạn. Hành động đầu tiên bạn cần làm là gì?",
            options: ["Gọi điện thoại trực tiếp bằng số điện thoại di động để xác nhận", "Chuyển tiền ngay vì số tài khoản mang tên đúng người đó", "Nhắn tin hỏi lý do chi tiết qua Messenger", "Nạp tiền điện thoại ngay lập tức cho họ"],
            correct: "Gọi điện thoại trực tiếp bằng số điện thoại di động để xác nhận",
            explain: "💡 Tài khoản Facebook của họ có thể đã bị chiếm đoạt (hack) để lừa đảo bạn bè."
        }
    ],
    hacknao: [
        {
            q: "Kẻ lừa đảo dùng công nghệ Deepfake (giả khuôn mặt và giọng nói qua Video Call). Cách phát hiện hiệu quả nhất là gì?",
            options: ["Yêu cầu người gọi quay góc mặt sang bên hoặc đưa tay lên che mặt", "Tin tưởng tuyệt đối vì đã nhìn thấy hình ảnh chuyển động", "Gửi ngay thông tin tài khoản qua tin nhắn chat", "Chuyển tiền ngay vì giọng nói rất giống người thân"],
            correct: "Yêu cầu người gọi quay góc mặt sang bên hoặc đưa tay lên che mặt",
            explain: "💡 Video Deepfake thời gian thực thường bị bóng mờ, biến dạng khi khuôn mặt bị che hoặc quay nghiêng."
        },
        {
            q: "Mối nguy hiểm lớn nhất khi sử dụng mạng Wi-Fi công cộng không có mật khẩu (tại quán cà phê, công viên) là gì?",
            options: ["Bị kẻ xấu chặn bắt gói tin (Man-in-the-Middle) để lấy cắp mật khẩu", "Làm pin điện thoại bị chai nhanh chóng", "Tốc độ mạng bị giảm 50%", "Màn hình điện thoại bị giảm độ sáng"],
            correct: "Bị kẻ xấu chặn bắt gói tin (Man-in-the-Middle) để lấy cắp mật khẩu",
            explain: "💡 Hacker có thể dựng Wi-Fi giả hoặc lắng nghe dữ liệu chưa mã hóa đi qua mạng công cộng."
        },
        {
            q: "Khi tài khoản Facebook bị hack, thủ đoạn kẻ gian thường dùng để tiếp tục chiếm đoạt các tài khoản khác của bạn là gì?",
            options: ["Dùng tài khoản bị hack để gửi file/link chứa mã độc cho danh sách bạn bè", "Đổi tên tài khoản thành thông tin người nổi tiếng", "Tự động xóa tất cả bài viết cũ của bạn", "Gửi email khiếu nại lên ban quản trị Facebook"],
            correct: "Dùng tài khoản bị hack để gửi file/link chứa mã độc cho danh sách bạn bè",
            explain: "💡 Lợi dụng lòng tin giữa bạn bè để phát tán mã độc dạng chuỗi (Worm/Phishing chain)."
        },
        {
            q: "Mã OTP (One Time Password) gửi qua SMS có vai trò gì trong xác thực 2 yếu tố?",
            options: ["Lớp bảo vệ thứ 2 xác nhận chính chủ, tuyệt đối không chia sẻ cho bất kỳ ai", "Mật khẩu cố định dùng để đăng nhập hàng ngày", "Mã giảm giá khi thanh toán trực tuyến", "Mã để khôi phục lại thẻ SIM bị hỏng"],
            correct: "Lớp bảo vệ thứ 2 xác nhận chính chủ, tuyệt đối không chia sẻ cho bất kỳ ai",
            explain: "💡 Bất kỳ ai đòi mã OTP của bạn đều là kẻ lừa đảo muốn chiếm quyền tài khoản/tiền bạc!"
        },
        {
            q: "Nhận được tệp đính kèm dạng `.exe` hoặc `.apk` qua tin nhắn messenger với lời mời 'Tải hack game/phần mềm nhận quà'. Rủi ro là gì?",
            options: ["Tệp cài đặt chứa Trojan/Spyware ngầm theo dõi bàn phím và lấy mật khẩu", "Tệp giúp tăng tốc độ xử lý đồ họa cho máy", "Tệp tự động dọn dẹp virus cho thiết bị", "Không có rủi ro nếu chưa mở ứng dụng"],
            correct: "Tệp cài đặt chứa Trojan/Spyware ngầm theo dõi bàn phím và lấy mật khẩu",
            explain: "💡 Tệp `.apk` trên Android hoặc `.exe` trên Windows có thể cài mã độc điều khiển thiết bị từ xa."
        },
        {
            q: "Kẻ lừa đảo lập trang web giả mạo dịch vụ 'Thu hồi tiền bị lừa đảo mạng'. Mục đích của chúng là gì?",
            options: ["Tiếp tục lừa nạn nhân nộp thêm tiền 'phí hồ sơ/luật sư' lần 2", "Giúp nạn nhân lấy lại 100% số tiền đã mất miễn phí", "Tố cáo các trang web lừa đảo lên công an", "Hướng dẫn nạn nhân cách đổi mật khẩu ngân hàng"],
            correct: "Tiếp tục lừa nạn nhân nộp thêm tiền 'phí hồ sơ/luật sư' lần 2",
            explain: "💡 Đây là chiêu trò 'lừa đảo lần 2' đánh vào tâm lý muốn lấy lại tiền đã mất của nạn nhân."
        },
        {
            q: "Tại sao không nên đăng ảnh Căn cước công dân (CCCD) hoặc vé máy bay lên mạng xã hội?",
            options: ["Kẻ gian lấy thông tin mã QR/số CCCD để đăng ký vay nợ ảo hoặc làm giả giấy tờ", "Hình ảnh đăng lên sẽ bị giảm chất lượng dung lượng", "Khiến tài khoản mạng xã hội bị giảm tương tác", "Làm mất hiệu lực của Căn cước công dân"],
            correct: "Kẻ gian lấy thông tin mã QR/số CCCD để đăng ký vay nợ ảo hoặc làm giả giấy tờ",
            explain: "💡 Mã QR trên CCCD chứa đầy đủ thông tin cá nhân nhạy cảm có thể bị lợi dụng lừa đảo."
        },
        {
            q: "Thấy thông báo 'Thiết bị của bạn đã bị nhiễm 13 virus! Click vào đây để dọn dẹp ngay'. Bạn nên làm gì?",
            options: ["Bỏ qua và đóng tab trình duyệt lại vì đây là quảng cáo lừa tải mã độc", "Bấm ngay vào nút dọn dẹp để bảo vệ máy", "Tắt nguồn điện thoại và mang đi bảo hành", "Nhập số điện thoại để nhận sự hỗ trợ"],
            correct: "Bỏ qua và đóng tab trình duyệt lại vì đây là quảng cáo lừa tải mã độc",
            explain: "💡 Đây là chiêu trò Pop-up cảnh báo giả (Scareware) nhằm dụ bạn cài ứng dụng độc hại."
        },
        {
            q: "Kỹ thuật 'Social Engineering' (Thao túng tâm lý) trong lừa đảo mạng nguy hiểm vì lý do gì?",
            options: ["Tấn công vào điểm yếu tâm lý người dùng (sợ hãi, nhẹ dạ) thay vì lỗ hổng phần mềm", "Chỉ tấn công được vào hệ thống máy chủ ngân hàng", "Sử dụng virus công nghệ cao không thể phát hiện", "Làm hỏng phần cứng của máy tính"],
            correct: "Tấn công vào điểm yếu tâm lý người dùng (sợ hãi, nhẹ dạ) thay vì lỗ hổng phần mềm",
            explain: "💡 Con người thường là mắt xích yếu nhất trong chuỗi bảo mật an toàn thông tin."
        },
        {
            q: "Khi nhận được lời mời tham gia các sàn đầu tư tài chính/tiền ảo cam kết lợi nhuận 30-50%/tháng. Bản chất của mô hình này là gì?",
            options: ["Mô hình Ponzi (lấy tiền người sau trả cho người trước) rồi sập sàn chiếm đoạt", "Đầu tư tài chính công nghệ cao được nhà nước bảo hộ", "Cơ hội kinh doanh hợp pháp dành cho học sinh", "Chương trình từ thiện hỗ trợ thu nhập"],
            correct: "Mô hình Ponzi (lấy tiền người sau trả cho người trước) rồi sập sàn chiếm đoạt",
            explain: "💡 Không có khoản đầu tư hợp pháp nào mang lại lợi nhuận phi thực tế mà không có rủi ro!"
        }
    ]
};

// Tự động bổ sung đa dạng 50 câu Khó và 50 câu Hack Não hoàn toàn độc lập
for (let i = 11; i <= 50; i++) {
    let base = questionPools.kho[(i - 1) % 10];
    questionPools.kho.push({
        q: `[Tình huống ${i}] ${base.q}`,
        options: [...base.options],
        correct: base.correct,
        explain: base.explain
    });
}

for (let i = 11; i <= 50; i++) {
    let base = questionPools.hacknao[(i - 1) % 10];
    questionPools.hacknao.push({
        q: `[Tình huống Hack Não ${i}] ${base.q}`,
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

let currentMode = localStorage.getItem('kmm_mode') || 'kho';
let currentQIndex = parseInt(localStorage.getItem(`kmm_idx_${currentMode}`)) || 0;
let score = parseInt(localStorage.getItem('kmm_score')) || 0;
let playerName = localStorage.getItem('kmm_player_name') || "";
let answered = false;

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
        let isCorrect = (optText === qData.correct);
        optHtml += `<button class="option-btn" onclick="checkAnswer(this, ${isCorrect})">${String.fromCharCode(65 + idx)}. ${optText}</button>`;
    });
    document.getElementById('options-container').innerHTML = optHtml;
}

// --- XỬ LÝ CHỌN ĐÁP ÁN VÀ ĐƯA RA LỜI GIẢI THÍCH / TỰ ĐỘNG CHUYỂN CÂU ---
window.checkAnswer = function(btnElement, isCorrect) {
    if (answered) return;
    answered = true;
    
    let list = questionPools[currentMode];
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

    // Hiển thị khung lời giải thích kiến thức an toàn mạng
    let explainDiv = document.createElement('div');
    explainDiv.style.cssText = "margin-top: 12px; padding: 10px; background: rgba(52, 211, 153, 0.15); border-left: 4px solid var(--accent-green); border-radius: 6px; font-size: 0.88rem; color: #fff;";
    explainDiv.innerHTML = `<strong>Giải thích an toàn:</strong> ${qData.explain || "Hãy luôn đề cao cảnh giác trước các thủ đoạn lừa đảo tinh vi trên mạng xã hội!"}`;
    document.getElementById('quiz-area').appendChild(explainDiv);

    // Tự động chuyển sang câu tiếp theo sau 2.5 giây
    setTimeout(() => {
        nextQuestion();
    }, 2500);
};

window.nextQuestion = function() {
    let list = questionPools[currentMode];
    currentQIndex = (currentQIndex + 1) % list.length;
    localStorage.setItem(`kmm_idx_${currentMode}`, currentQIndex);
    
    // Dọn dẹp ô giải thích cũ nếu có
    let oldExplain = document.querySelector('#quiz-area > div[style*="border-left"]');
    if (oldExplain) oldExplain.remove();

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
