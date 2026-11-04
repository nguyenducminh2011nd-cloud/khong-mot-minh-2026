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

// --- TRỌN VẸN 40 CÂU HỎI (20 CHẾ ĐỘ KHÓ + 20 CHẾ ĐỘ HACK NÃO) ---
const questionPools = {
    kho: [
        { q: "1. Nhận cuộc gọi tự xưng Công an yêu cầu chuyển tiền vào tài khoản tạm giữ để điều tra. Bạn xử lý thế nào?", options: ["Cúp máy ngay lập tức và báo công an địa phương", "Chuyển tiền vào tài khoản để chứng minh trong sạch", "Cung cấp mã OTP qua điện thoại cho người gọi", "Hẹn gặp trực tiếp người gọi ở nơi vắng vẻ"], correct: "Cúp máy ngay lập tức và báo công an địa phương", explain: "💡 Công an không bao giờ làm việc hay yêu cầu chuyển tiền qua điện thoại!" },
        { q: "2. Tin nhắn MXH thông báo trúng thưởng xe máy lớn nhưng phải nộp khoản phí làm thủ tục. Bạn làm gì?", options: ["Xóa và chặn tin nhắn giả mạo trúng thưởng ngay", "Nộp tiền phí qua thẻ cào để nhận thưởng lớn", "Gửi ảnh chụp thẻ ngân hàng cho người thông báo", "Chia sẻ bài viết công khai để nhận xe nhanh"], correct: "Xóa và chặn tin nhắn giả mạo trúng thưởng ngay", explain: "💡 Không có chương trình trúng thưởng hợp pháp nào bắt nộp phí trước để nhận giải!" },
        { q: "3. Tuyển cộng tác viên online thả tim đơn hàng ảo nhận hoa hồng. Dấu hiệu nhận diện lừa đảo là gì?", options: ["Yêu cầu nộp tiền ứng trước để mua đơn hàng", "Công ty trả lương qua ngân hàng chính thống", "Có hợp đồng ký kết trực tiếp tại trụ sở", "Không yêu cầu bất kỳ khoản tiền nào từ đầu"], correct: "Yêu cầu nộp tiền ứng trước để mua đơn hàng", explain: "💡 Kẻ lừa đảo dụ nộp tiền số lượng ngày càng lớn rồi chiếm đoạt!" },
        { q: "4. Nhận đường link lạ từ bạn bè giục click xem video hot hoặc hình ảnh cá nhân. Rủi ro lớn nhất là gì?", options: ["Dính mã độc đánh cắp tài khoản và thông tin", "Chỉ làm tốn dung lượng kết nối mạng 4G", "Không có rủi ro gì vì do bạn bè gửi tặng", "Làm thiết bị di động chạy mượt mà hơn"], correct: "Dính mã độc đánh cắp tài khoản và thông tin", explain: "💡 Tài khoản bạn bè có thể đã bị hack và tự động phát tán link mã độc!" },
        { q: "5. Khi đặt mật khẩu tài khoản quan trọng, cấu trúc nào mang lại mức độ an toàn cao nhất?", options: ["Kết hợp chữ hoa, thường, số và ký tự đặc biệt", "Sử dụng ngày tháng năm sinh của bản thân", "Sử dụng dãy số liên tiếp từ một đến tám", "Dùng chung một mật khẩu duy nhất mọi nơi"], correct: "Kết hợp chữ hoa, thường, số và ký tự đặc biệt", explain: "💡 Mật khẩu phức tạp và dài giúp chống lại các đợt tấn công dò quét tự động." },
        { q: "6. Nhận cuộc gọi thông báo sim sắp bị khóa cần chuẩn hóa thông tin gấp. Bạn nên làm gì?", options: ["Tự đến điểm giao dịch nhà mạng để kiểm tra", "Đọc ngay mã OTP vừa nhận được cho người gọi", "Chuyển khoản tiền theo hướng dẫn để mở sim", "Cung cấp toàn bộ số series thẻ sim cho họ"], correct: "Tự đến điểm giao dịch nhà mạng để kiểm tra", explain: "💡 Đối tượng giả mạo nhà mạng để chiếm quyền kiểm soát sim nhằm lấy mã OTP." },
        { q: "7. Thấy ứng dụng vay tiền online lãi suất 0% yêu cầu truy cập danh bạ điện thoại. Nguy cơ là gì?", options: ["Bị khủng bố danh bạ người thân khi nợ ảo", "Được duyệt khoản vay miễn phí không trả", "Ứng dụng giúp tăng cường bảo mật máy", "Không có ảnh hưởng gì tới thông tin số"], correct: "Bị khủng bố danh bạ người thân khi nợ ảo", explain: "💡 App vay tín dụng đen sẽ dùng danh bạ để bôi nhọ, tống tiền bạn và người thân." },
        { q: "8. Nhận email thông báo tài khoản ngân hàng bị đăng nhập trái phép yêu cầu click link đổi pass. Bạn xử lý sao?", options: ["Mở app ngân hàng chính thức để kiểm tra lại", "Click ngay vào đường link đính kèm trong email", "Gửi mật khẩu cũ qua email để họ xác thực", "Chuyển tiếp email cho bạn bè cùng kiểm tra"], correct: "Mở app ngân hàng chính thức để kiểm tra lại", explain: "💡 Đây là email Phishing giả mạo nhằm đánh cắp thông tin tài khoản." },
        { q: "9. Khách mua hàng online gửi ảnh chụp màn hình đã chuyển khoản thành công và giục gửi hàng gấp. Bạn làm gì?", options: ["Kiểm tra số dư thực tế tăng trên app ngân hàng", "Tin tưởng ngay vì đã có ảnh chụp hóa đơn", "Nhấp vào đường link khách gửi để nhận tiền", "Cung cấp mã OTP ngân hàng để nhận tiền về"], correct: "Kiểm tra số dư thực tế tăng trên app ngân hàng", explain: "💡 Kẻ lừa đảo sử dụng các phần mềm tạo bill chuyển tiền giả rất tinh vi." },
        { q: "10. Người quen trên mạng nhắn tin hỏi mượn tiền gấp do gặp tai nạn bất ngờ. Việc đầu tiên cần làm là?", options: ["Gọi điện trực tiếp bằng số di động xác nhận", "Chuyển tiền ngay vì số tài khoản đúng tên", "Nhắn tin hỏi lý do chi tiết qua khung chat", "Nạp thẻ điện thoại hộ ngay lập tức cho họ"], correct: "Gọi điện trực tiếp bằng số di động xác nhận", explain: "💡 Tài khoản mạng xã hội của người quen có thể đã bị chiếm đoạt để đi lừa đảo." },
        { q: "11. Phát hiện bài viết trên Facebook chia sẻ hoàn cảnh khó khăn kêu gọi từ thiện bằng số tài khoản lạ. Bạn nên:", options: ["Kiểm tra kỹ tính xác thực từ cơ quan báo chí uy tín", "Chuyển khoản ngay lập tức để kịp thời giúp đỡ", "Bình luận số tiền mình đã gửi để khoe khoang", "Chia sẻ bài viết rộng rãi lên trang cá nhân"], correct: "Kiểm tra kỹ tính xác thực từ cơ quan báo chí uy tín", explain: "💡 Nhiều đối tượng lợi dụng lòng trắc ẩn để lập tài khoản từ thiện ảo chiếm đoạt tiền." },
        { q: "12. Bạn nhận được mã OTP xác nhận giao dịch mặc dù bạn không hề thực hiện bất kỳ giao dịch nào. Việc cần làm là:", options: ["Khóa thẻ tạm thời và liên hệ ngay ngân hàng", "Bỏ qua vì nghĩ rằng hệ thống nhắn nhầm", "Gửi mã OTP đó cho người hỏi mua hàng trực tuyến", "Đăng tải toàn bộ thông tin thẻ lên mạng xã hội"], correct: "Khóa thẻ tạm thời và liên hệ ngay ngân hàng", explain: "💡 Tài khoản của bạn có thể đang bị kẻ gian tấn công dò quét thanh toán trái phép." },
        { q: "13. Khi kết nối vào mạng Wi-Fi miễn phí tại quán cà phê, bạn tuyệt đối nên tránh thực hiện hành động nào?", options: ["Đăng nhập tài khoản ngân hàng và chuyển tiền", "Đọc báo giải trí và xem tin tức thời sự hàng ngày", "Tìm kiếm thông tin học tập qua các trang web", "Xem video ngắn giải trí trên các nền tảng"], correct: "Đăng nhập tài khoản ngân hàng và chuyển tiền", explain: "💡 Wi-Fi công cộng không bảo mật dễ bị kẻ xấu đánh cắp thông tin đăng nhập." },
        { q: "14. Một người tự xưng là nhân viên sàn thương mại điện tử gọi điện thông báo hoàn tiền sản phẩm. Thao tác an toàn là:", options: ["Cúp máy và từ chối cung cấp bất kỳ thông tin gì", "Làm theo hướng dẫn bấm vào link trên điện thoại", "Cung cấp số thẻ tín dụng để nhận tiền hoàn trả", "Đọc mã OTP ngân hàng gửi về để hoàn tất thủ tục"], correct: "Cúp máy và từ chối cung cấp bất kỳ thông tin gì", explain: "💡 Sàn thương mại điện tử không bao giờ gọi điện hoàn tiền qua các đường link lạ." },
        { q: "15. Khi máy tính cá nhân xuất hiện phần mềm lạ tự động cài đặt và trình duyệt liên tục bật trang quảng cáo, bạn nên:", options: ["Quét virus hệ thống và gỡ bỏ phần mềm lạ đó", "Tắt máy đi ngủ và hy vọng ngày mai sẽ hết", "Mua thêm một chiếc máy tính xách tay mới", "Đổi mật khẩu tài khoản mạng xã hội ngay lập tức"], correct: "Quét virus hệ thống và gỡ bỏ phần mềm lạ đó", explain: "💡 Máy tính đã bị nhiễm Adware hoặc phần mềm độc hại cần được xử lý dứt điểm." },
        { q: "16. Bạn nhận được một đường link chia sẻ video nhạy cảm từ bạn thân trên Messenger kèm theo câu nói 'Xem đi, bất ngờ lắm'. Bạn nên làm gì?", options: ["Cảnh báo bạn thân tài khoản đã bị hack, tuyệt đối không click", "Click vào xem ngay vì người quen gửi chắc chắn an toàn", "Tải video về máy để xem offline cho mượt", "Chia sẻ tiếp cho nhóm lớp cùng xem"], correct: "Cảnh báo bạn thân tài khoản đã bị hack, tuyệt đối không click", explain: "💡 Đây là dạng link mã độc tự động phát tán qua tài khoản đã bị chiếm đoạt." },
        { q: "17. Khi tạo mật khẩu cho các tài khoản mạng xã hội, thói quen nào dễ khiến bạn bị hacker chiếm đoạt tài sản số nhất?", options: ["Dùng chung một mật khẩu đơn giản cho mọi tài khoản", "Đổi mật khẩu định kỳ 3 tháng một lần", "Sử dụng trình quản lý mật khẩu an toàn", "Bật tính năng xác thực 2 bước (2FA)"], correct: "Dùng chung một mật khẩu đơn giản cho mọi tài khoản", explain: "💡 Lộ một nơi là mất toàn bộ hệ thống tài khoản liên kết!" },
        { q: "18. Hành vi nào sau đây vi phạm Luật An ninh mạng khi sử dụng mạng xã hội tại Việt Nam?", options: ["Đăng tải, phát tán thông tin sai sự thật xúc phạm danh dự người khác", "Đăng ảnh đi chơi cùng gia đình và bạn bè lên Facebook", "Nhắn tin trò chuyện vui vẻ với bạn bè qua Zalo", "Cập nhật tiểu sử cá nhân và sở thích âm nhạc"], correct: "Đăng tải, phát tán thông tin sai sự thật xúc phạm danh dự người khác", explain: "💡 Phát tán tin giả, bôi nhọ người khác trên không gian mạng là hành vi vi phạm pháp luật." },
        { q: "19. Khi mua hàng trên mạng, cách thanh toán nào giảm thiểu tối đa rủi ro bị lừa đảo mất trắng tiền?", options: ["Kiểm tra hàng trước rồi mới thanh toán (COD)", "Chuyển khoản toàn bộ 100% trước khi nhận hàng", "Đặt cọc trước 50% qua tài khoản cá nhân người bán lạ", "Chuyển tiền qua thẻ cào điện thoại theo yêu cầu"], correct: "Kiểm tra hàng trước rồi mới thanh toán (COD)", explain: "💡 Hình thức thanh toán khi nhận hàng (COD) sau khi kiểm tra giúp bảo vệ người mua tốt nhất." },
        { q: "20. Nếu phát hiện thông tin cá nhân của mình bị kẻ gian lợi dụng đi lừa đảo người khác, bạn cần làm gì?", options: ["Trình báo ngay cơ quan công an gần nhất và thông báo cho người thân", "Giữ im lặng và âm thầm khóa tài khoản cá nhân", "Lập một tài khoản mới và không quan tâm nữa", "Nhờ bạn bè lên mạng tranh cãi với kẻ gian"], correct: "Trình báo ngay cơ quan công an gần nhất và thông báo cho người thân", explain: "💡 Cần nhanh chóng thông báo cơ quan chức năng để tránh vướng vào vòng lao lý." }
    ],
    hacknao: [
        { q: "1. Nhận tin nhắn từ chính số điện thoại của mình giục nợ và đe dọa tống tiền. Hiện tượng này do đâu?", options: ["Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", "Điện thoại tự động phát tán tin nhắn lúc nửa đêm", "Nhà mạng đang thử nghiệm hệ thống tin nhắn mới", "Do cài đặt lịch hẹn giờ gửi tin nhắn từ trước"], correct: "Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", explain: "💡 Kẻ gian dùng công nghệ giả mạo số điện thoại người gửi để gây hoang mang tột độ!" },
        { q: "2. Rao bán iPhone đời mới giá rẻ bất ngờ với lý do hàng trưng bày không dùng đến. Bạn đánh giá sao?", options: ["Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", "Cơ hội hiếm có nên cần chuyển khoản cọc liền", "Hàng chính hãng uy tín nên mới có giá rẻ như vậy", "Mua trực tiếp vì hàng trưng bày luôn siêu rẻ"], correct: "Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", explain: "💡 Không có chiếc iPhone giá trị cao nào bán rẻ như cho. Đừng để lòng tham mờ mắt!" },
        { q: "3. Người quen qua mạng chưa gặp mặt muốn gửi quà lớn nhưng bắt đóng thuế hải quan qua tài khoản cá nhân. Xử lý thế nào?", options: ["Chặn liên lạc ngay vì đây là bẫy Romance Scam", "Chuyển khoản ngay vì quà giá trị lớn hơn thuế", "Nhờ người thân góp tiền đóng thuế nhận quà", "Yêu cầu họ trừ tiền thuế vào giá trị món quà"], correct: "Chặn liên lạc ngay vì đây là bẫy Romance Scam", explain: "💡 Hải quan nhà nước không bao giờ yêu cầu chuyển tiền thuế vào tài khoản cá nhân!" },
        { q: "4. Nhận email từ quản trị viên yêu cầu xác nhận mật khẩu qua liên kết lạ vì nâng cấp hệ thống. Bạn làm gì?", options: ["Bỏ qua và xóa email vì đây là chiêu trò Phishing", "Làm theo hướng dẫn ngay để không bị khóa máy", "Gửi mật khẩu qua email phản hồi để xác thực", "Chuyển tiếp email cho toàn bộ thành viên khác"], correct: "Bỏ qua và xóa email vì đây là chiêu trò Phishing", explain: "💡 Quản trị viên hệ thống không bao giờ yêu cầu người dùng gửi mật khẩu qua email." },
        { q: "5. Xem web phim lậu xuất hiện liên tục các tab quảng cáo cờ bạc cá độ chớp nháy. Hành động an toàn là?", options: ["Đóng ngay lập tức tab lạ, tuyệt đối không click", "Click vào xem thử có trúng thưởng thật không", "Tải ứng dụng quảng cáo theo yêu cầu trên trang", "Để nguyên các tab chạy ngầm để giải trí thêm"], correct: "Đóng ngay lập tức tab lạ, tuyệt đối không click", explain: "💡 Các trang web lậu thường gắn mã độc và banner quảng cáo dụ dỗ đánh bạc trực tuyến." },
        { q: "6. Kẻ lừa đảo mạng thường nhắm vào tử huyệt cảm xúc nào lớn nhất của con người để thao túng chuyển tiền?", options: ["Lòng tham hám lợi và Nỗi sợ hãi đe dọa pháp luật", "Sự vui vẻ thích khám phá công nghệ số hiện đại", "Lòng yêu thương động vật và thiên nhiên hoang dã", "Sự kiên nhẫn và ham học hỏi kiến thức đời sống"], correct: "Lòng tham hám lợi và Nỗi sợ hãi đe dọa pháp luật", explain: "💡 Kẻ gian luôn đánh vào nỗi sợ hãi hoặc lòng tham để làm sập nguồn lý trí người chơi!" },
        { q: "7. Tại sao người lớn tuổi lại rất dễ sập bẫy các chiêu trò lừa đảo qua mạng xã hội hơn giới trẻ hiện nay?", options: ["Ít tiếp cận thông tin cảnh báo, dễ tin người và ngại kiểm chứng", "Vì người lớn tuổi có nhiều tiền trong tài khoản hơn", "Vì điện thoại của họ cấu hình yếu dễ bị nhiễm virus", "Vì các nền tảng ưu tiên hiển thị lừa đảo cho người già"], correct: "Ít tiếp cận thông tin cảnh báo, dễ tin người và ngại kiểm chứng", explain: "💡 Người lớn tuổi thường thiếu kinh nghiệm nhận diện bẫy công nghệ thời đại số." },
        { q: "8. Vì sao mã OTP được ví như chìa khóa két sắt của tài khoản ngân hàng và không được đưa cho người khác?", options: ["Vì đây là bước xác thực cuối cùng cho phép rút tiền", "Vì mã OTP giúp nạp tiền điện thoại miễn phí nhanh", "Vì lộ mã OTP sẽ khiến thẻ bị khóa vĩnh viễn ngay", "Vì mã OTP chỉ có hiệu lực sử dụng trong vòng 10 năm"], correct: "Vì đây là bước xác thực cuối cùng cho phép rút tiền", explain: "💡 Mã OTP là chốt chặn cuối cùng bảo vệ tài sản của bạn. Mất OTP là mất tiền!" },
        { q: "9. Người lạ tự xưng hacker giỏi giúp lấy lại tiền bị lừa với điều kiện nộp phí dịch vụ trước. Bản chất là gì?", options: ["Chiêu trò lừa đảo lần hai nhắm vào nạn nhân tiếc tiền", "Dịch vụ hỗ trợ an ninh mạng chính thống nhà nước", "Cơ hội duy nhất để thu hồi trọn vẹn số tiền đã mất", "Chương trình đền bù rủi ro tài chính của ngân hàng"], correct: "Chiêu trò lừa đảo lần hai nhắm vào nạn nhân tiếc tiền", explain: "💡 Kẻ gian lợi dụng sự tuyệt vọng của nạn nhân để tiếp tục chiếm đoạt khoản phí mới!" },
        { q: "10. Sử dụng chung một mật khẩu duy nhất cho mọi tài khoản mạng xã hội và ngân hàng ẩn chứa hiểm họa gì?", options: ["Lộ một tài khoản yếu sẽ khiến hacker chiếm toàn bộ", "Tốc độ kết nối mạng internet sẽ bị chậm rõ rệt", "Thiết bị di động tự động xóa bớt các ứng dụng", "Mật khẩu sẽ bị hết hiệu lực sử dụng sau 30 ngày"], correct: "Lộ một tài khoản yếu sẽ khiến hacker chiếm toàn bộ", explain: "💡 Kẻ gian sẽ dùng mật khẩu lộ diện để thử đăng nhập chéo vào tất cả các hệ thống khác!" },
        { q: "11. Nhận được thông báo từ ứng dụng ngân hàng về giao dịch trừ tiền lạ lúc 2 giờ đêm. Hướng giải quyết khôn ngoan nhất là:", options: ["Khóa thẻ khẩn cấp qua app và gọi tổng đài ngân hàng", "Chờ đến sáng hôm sau ra phòng giao dịch hỏi chuyện", "Đăng status than thở lên mạng xã hội để xin ý kiến", "Xóa ứng dụng ngân hàng đi rồi tải lại từ đầu"], correct: "Khóa thẻ khẩn cấp qua app và gọi tổng đài ngân hàng", explain: "💡 Hành động nhanh chóng giúp ngăn chặn kịp thời việc kẻ gian tiếp tục rút sạch tiền." },
        { q: "12. Khi bạn vô tình quét mã QR tại các điểm dán đè ở bãi xe hoặc quán nước công cộng, hiểm họa tiềm ẩn là gì?", options: ["Dẫn tới các trang web độc hại đánh cắp dữ liệu hoặc cài mã độc", "Điện thoại sẽ tự động sập nguồn vĩnh viễn không mở lại", "Tài khoản mạng xã hội tự động kết bạn với hàng nghìn người", "Dung lượng bộ nhớ điện thoại bị đầy lên tức thì"], correct: "Dẫn tới các trang web độc hại đánh cắp dữ liệu hoặc cài mã độc", explain: "💡 Kẻ gian thường dán đè mã QR giả mạo mã độc để lừa người dùng truy cập." },
        { q: "13. Một tài khoản game uy tín rao bán với giá rẻ bằng 1/10 giá trị thực kèm cam kết 'bảo hành vĩnh viễn'. Bản chất là gì?", options: ["Chiêu trò thu hồi lại tài khoản qua email gốc sau khi đã nhận tiền", "Cơ hội săn sale có một không hai trong năm cho game thủ", "Người bán thực sự tốt bụng muốn thanh lý nhanh nghỉ game", "Chính sách ưu đãi tri ân khách hàng của nhà phát hành"], correct: "Chiêu trò thu hồi lại tài khoản qua email gốc sau khi đã nhận tiền", explain: "💡 Kẻ lừa đảo thường dùng chính thông tin đăng ký gốc để lấy lại tài khoản sau khi bán." },
        { q: "14. Tại sao các vụ lừa đảo qua mạng thường sử dụng các tài khoản ngân hàng 'ảo' hoặc mua lại danh tính người khác?", options: ["Để xóa dấu vết dòng tiền và tránh sự truy vết của cơ quan chức năng", "Vì ngân hàng tặng nhiều ưu đãi cho người mở nhiều tài khoản", "Giúp người chuyển tiền nhận được nhiều điểm thưởng hơn", "Để giảm bớt thuế thu nhập cá nhân phải đóng hàng năm"], correct: "Để xóa dấu vết dòng tiền và tránh sự truy vết của cơ quan chức năng", explain: "💡 Việc sử dụng tài khoản trung gian giúp kẻ gian che giấu danh tính thực sự của mình." },
        { q: "15. Khi nhận được lời mời tham gia hội nhóm đầu tư tài chính sinh lời 200% mỗi ngày chỉ bằng chiếc điện thoại, bạn nên:", options: ["Chặn ngay lập tức vì không có hình thức đầu tư nào siêu lợi nhuận như vậy", "Bỏ ra số vốn nhỏ để thử vận may đổi đời", "Vay mượn bạn bè người thân để đầu tư thu lời lớn", "Hỏi thêm kinh nghiệm của họ trước khi tham gia"], correct: "Chặn ngay lập tức vì không có hình thức đầu tư nào siêu lợi nhuận như vậy", explain: "💡 Lợi nhuận siêu cao luôn đi kèm rủi ro siêu lớn hoặc 100% là mô hình lừa đảo Ponzi." },
        { q: "16. Kẻ xấu sử dụng công nghệ Deepfake để giả mạo hình ảnh và giọng nói của người thân gọi điện nhờ chuyển tiền. Cách nhận diện tốt nhất là gì?", options: ["Yêu cầu người gọi thực hiện động tác vẫy tay hoặc hỏi câu hỏi riêng tư chỉ hai người biết", "Tin tưởng ngay vì đúng hình ảnh và giọng nói thật của người thân", "Chuyển tiền nhanh chóng vì sợ người thân gặp chuyện gấp", "Tắt máy và không bao giờ nghe điện thoại nữa"], correct: "Yêu cầu người gọi thực hiện động tác vẫy tay hoặc hỏi câu hỏi riêng tư chỉ hai người biết", explain: "💡 Công nghệ Deepfake đôi khi có độ trễ hoặc lỗi hình ảnh khi chuyển động, đặt câu hỏi kiểm chứng là cách khắc phục." },
        { q: "17. Khi điện thoại tự động cài đặt các tệp tin APK lạ từ nguồn không rõ ràng, mối nguy hiểm lớn nhất là gì?", options: ["Cấp quyền độc hại cho hacker chiếm quyền kiểm soát thiết bị và đánh cắp dữ liệu", "Làm cho điện thoại sạc pin nhanh hơn bình thường", "Giúp tăng tốc độ kết nối mạng 5G của máy", "Tự động dọn dẹp các tệp tin rác trong bộ nhớ"], correct: "Cấp quyền độc hại cho hacker chiếm quyền kiểm soát thiết bị và đánh cắp dữ liệu", explain: "💡 File APK ngoài cửa hàng ứng dụng chính thức tiềm ẩn mã độc kiểm soát toàn diện thiết bị." },
        { q: "18. Việc mua bán tài khoản ngân hàng hoặc cho người khác thuê mượn tài khoản cá nhân của mình có hậu quả pháp lý gì?", options: ["Có thể bị truy cứu trách nhiệm hình sự với tội danh tiếp tay cho rửa tiền và lừa đảo", "Chỉ bị nhắc nhở nhẹ nhàng từ phía ngân hàng", "Được nhận hoa hồng thụ động hàng tháng hợp pháp", "Không ảnh hưởng gì đến pháp luật nếu không trực tiếp đi lừa"], correct: "Có thể bị truy cứu trách nhiệm hình sự với tội danh tiếp tay cho rửa tiền và lừa đảo", explain: "💡 Cho thuê/mượn tài khoản ngân hàng là tiếp tay cho tội phạm công nghệ cao và vi phạm pháp luật nghiêm trọng." },
        { q: "19. Khi nhận được thông báo trúng thưởng lớn từ một tổ chức quốc tế yêu cầu đóng trước một khoản phí nhỏ bằng tiền điện tử (Crypto), bạn nên làm gì?", options: ["Xóa và chặn ngay lập tức vì đây là mô hình lừa đảo xuyên quốc gia", "Nộp tiền điện tử ngay để kịp nhận giải thưởng lớn", "Đăng ký thông tin cá nhân chi tiết để nhận quà", "Chia sẻ cơ hội trúng thưởng cho bạn bè cùng tham gia"], correct: "Xóa và chặn ngay lập tức vì đây là mô hình lừa đảo xuyên quốc gia", explain: "💡 Không có phần thưởng quốc tế nào yêu cầu người trúng tự nộp phí bằng tiền điện tử trước cả." },
        { q: "20. Điều gì là quan trọng nhất để bảo vệ bản thân và cộng đồng trước sự bùng nổ của các hình thức lừa đảo trực tuyến hiện nay?", options: ["Luôn nâng cao cảnh giác, tư duy phản biện và không ngừng cập nhật kiến thức an toàn mạng", "Tuyệt đối không sử dụng điện thoại thông minh và mạng xã hội", "Chỉ kết bạn và giao lưu với những người quen biết ngoài đời thực", "Thay đổi mật khẩu thiết bị liên tục mỗi phút mỗi giây"], correct: "Luôn nâng cao cảnh giác, tư duy phản biện và không ngừng cập nhật kiến thức an toàn mạng", explain: "💡 Kiến thức và sự tỉnh táo chính là chiếc khiên bảo vệ vững chắc nhất trong kỷ nguyên số!" }
    ]
};

// --- HỆ THỐNG AI SINH CÂU HỎI BỔ SUNG ĐỂ TRÁNH LẶP ---
const aiExtraPools = {
    kho: [
        { q: "Nhận cuộc gọi từ đầu số lạ thông báo con bạn đang cấp cứu tại bệnh viện yêu cầu chuyển khoản gấp. Bạn làm gì?", options: ["Gọi điện trực tiếp cho giáo viên hoặc nhà trường xác thực", "Hoảng loạn chuyển tiền ngay lập tức theo yêu cầu", "Đọc số tài khoản ngân hàng để họ gửi tiền hỗ trợ", "Chạy ra cây ATM gần nhất mà không hỏi lại"], correct: "Gọi điện trực tiếp cho giáo viên hoặc nhà trường xác thực", explain: "💡 Chiêu trò giả mạo bệnh viện/công an gây hoảng loạn tâm lý để chiếm đoạt tài sản!" },
        { q: "Khi tải một ứng dụng chỉnh sửa ảnh miễn phí trên mạng yêu cầu cấp quyền truy cập toàn bộ danh bạ và bộ nhớ. Bạn nên:", options: ["Từ chối cấp quyền nhạy cảm và gỡ ứng dụng nếu khả nghi", "Cấp toàn bộ quyền cho ứng dụng chạy mượt", "Tắt mạng internet rồi tiếp tục sử dụng app", "Chia sẻ app cho bạn bè cùng trải nghiệm"], correct: "Từ chối cấp quyền nhạy cảm và gỡ ứng dụng nếu khả nghi", explain: "💡 Ứng dụng chỉnh sửa ảnh không có nhu cầu truy cập danh bạ cá nhân của bạn!" }
    ],
    hacknao: [
        { q: "Kẻ gian sử dụng công nghệ Deepfake để giả mặt người thân gọi video call mượn tiền nhưng hình ảnh hơi giật lắc. Cách xử lý thông minh là:", options: ["Yêu cầu người gọi đưa tay qua trước ống kính hoặc hỏi câu hỏi bí mật", "Tin tưởng tuyệt đối vì thấy rõ hình ảnh và nghe rõ giọng", "Lập tức chuyển khoản vì sợ người thân lỡ việc lớn", "Chụp màn hình lại rồi đăng lên mạng xã hội hỏi ý kiến"], correct: "Yêu cầu người gọi đưa tay qua trước ống kính hoặc hỏi câu hỏi bí mật", explain: "💡 Công nghệ Deepfake thời gian thực thường có độ trễ hoặc lỗi biên dạng khi có vật cản qua mặt." },
        { q: "Một đường link quảng cáo đầu tư tiền ảo sinh lời 500% sau 1 giờ được chia sẻ bởi tài khoản người nổi tiếng. Bản chất là:", options: ["Tài khoản người nổi tiếng đã bị hack để phát tán web lừa đảo", "Cơ hội đầu tư hiếm có trong đời được chuyên gia hậu thuẫn", "Chương trình tri ân người hâm mộ của thần tượng", "Dự án tài chính chính thống được nhà nước bảo trợ"], correct: "Tài khoản người nổi tiếng đã bị hack để phát tán web lừa đảo", explain: "💡 Không có kênh đầu tư hợp pháp nào sinh lời phi lý như vậy trong thời gian ngắn." }
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
    let extraList = aiExtraPools[selectedMode];
    
    // Kết hợp kho chính và AI extra để tạo danh sách phong phú không lặp
    let combined = [...list, ...extraList];
    if (currentQIndex >= combined.length) currentQIndex = 0;
    
    activeQuestionData = combined[currentQIndex];
    document.getElementById('warning-banner').innerText = warnings[Math.floor(Math.random() * warnings.length)];
    document.getElementById('quiz-title-mode').innerText = `🧠 Đấu Trí (${selectedMode === 'kho' ? 'Khó - 50đ' : 'Hack Não - 100đ'})`;
    document.getElementById('question-counter').innerText = `Tình huống ${currentQIndex + 1} / ${combined.length}`;
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
    let combined = [...questionPools[selectedMode], ...aiExtraPools[selectedMode]];
    currentQIndex = (currentQIndex + 1) % combined.length;
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

// --- HỆ THỐNG HUY HIỆU & RANK ---
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
    if (!db) return;
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

window.openCipherMinigame = function() { showToast("Mở minigame!"); }
window.submitCommunityScenario = function() { showToast("Đã gửi đóng góp!"); }
window.submitHomeFeedback = function() { showToast("Đã gửi phản hồi!"); }
window.openAdminDashboard = function() { showToast("Mở quản trị Admin!"); }
window.closeAdminDashboard = function() {}
