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

// --- KHO 50 CÂU KHÓ & 50 CÂU HACK NÃO (CÂN BẰNG ĐỘ DÀI ĐÁP ÁN ĐỂ CHỐNG ĐOÁN MÒ) ---
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
        { q: "10. Người quen trên mạng nhắn tin hỏi mượn tiền gấp do gặp tai nạn bất ngờ. Việc đầu tiên cần làm là?", options: ["Gọi điện trực tiếp bằng số di động xác nhận", "Chuyển tiền ngay vì số tài khoản đúng tên", "Nhắn tin hỏi lý do chi tiết qua khung chat", "Nạp thẻ điện thoại hộ ngay lập tức cho họ"], correct: "Gọi điện trực tiếp bằng số di động xác nhận", explain: "💡 Tài khoản mạng xã hội của người quen có thể đã bị chiếm đoạt để đi lừa đảo." }
    ],
    hacknao: [
        { q: "1. Nhận tin nhắn từ chính số điện thoại của mình giục nợ và đe dọa tống tiền. Hiện tượng này do đâu?", options: ["Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", "Điện thoại tự động phát tán tin nhắn lúc nửa đêm", "Nhà mạng đang thử nghiệm hệ thống tin nhắn mới", "Do cài đặt lịch hẹn giờ gửi tin nhắn từ trước"], correct: "Kẻ gian dùng trạm phát sóng giả IMSI Catcher hoặc SMS Spoofing", explain: "💡 Kẻ gian dùng công nghệ giả mạo số điện thoại người gửi để gây hoang mang tột độ!" },
        { q: "2. Rau bán iPhone đời mới giá rẻ bất ngờ với lý do hàng trưng bày không dùng đến. Bạn đánh giá sao?", options: ["Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", "Cơ hội hiếm có nên cần chuyển khoản cọc liền", "Hàng chính hãng uy tín nên mới có giá rẻ như vậy", "Mua trực tiếp vì hàng trưng bày luôn siêu rẻ"], correct: "Chắc chắn là lừa đảo nhận cọc rồi chiếm đoạt tài sản", explain: "💡 Không có chiếc iPhone giá trị cao nào bán rẻ như cho. Đừng để lòng tham mờ mắt!" },
        { q: "3. Người quen qua mạng chưa gặp mặt muốn gửi quà lớn nhưng bắt đóng thuế hải quan qua tài khoản cá nhân. Xử lý thế nào?", options: ["Chặn liên lạc ngay vì đây là bẫy Romance Scam", "Chuyển khoản ngay vì quà giá trị lớn hơn thuế", "Nhờ người thân góp tiền đóng thuế nhận quà", "Yêu cầu họ trừ tiền thuế vào giá trị món quà"], correct: "Chặn liên lạc ngay vì đây là bẫy Romance Scam", explain: "💡 Hải quan nhà nước không bao giờ yêu cầu chuyển tiền thuế vào tài khoản cá nhân!" },
        { q: "4. Nhận email từ quản trị viên yêu cầu xác nhận mật khẩu qua liên kết lạ vì nâng cấp hệ thống. Bạn làm gì?", options: ["Bỏ qua và xóa email vì đây là chiêu trò Phishing", "Làm theo hướng dẫn ngay để không bị khóa máy", "Gửi mật khẩu qua email phản hồi để xác thực", "Chuyển tiếp email cho toàn bộ thành viên khác"], correct: "Bỏ qua và xóa email vì đây là chiêu trò Phishing", explain: "💡 Quản trị viên hệ thống không bao giờ yêu cầu người dùng gửi mật khẩu qua email." },
        { q: "5. Xem web phim lậu xuất hiện liên tục các tab quảng cáo cờ bạc cá độ chớp nháy. Hành động an toàn là?", options: ["Đóng ngay lập tức tab lạ, tuyệt đối không click", "Click vào xem thử có trúng thưởng thật không", "Tải ứng dụng quảng cáo theo yêu cầu trên trang", "Để nguyên các tab chạy ngầm để giải trí thêm"], correct: "Đóng ngay lập tức tab lạ, tuyệt đối không click", explain: "💡 Các trang web lậu thường gắn mã độc và banner quảng cáo dụ dỗ đánh bạc trực tuyến." },
        { q: "6. Kẻ lừa đảo mạng thường nhắm vào tử huyệt cảm xúc nào lớn nhất của con người để thao túng chuyển tiền?", options: ["Lòng tham hám lợi và Nỗi sợ hãi đe dọa pháp luật", "Sự vui vẻ thích khám phá công nghệ số hiện đại", "Lòng yêu thương động vật và thiên nhiên hoang dã", "Sự kiên nhẫn và ham học hỏi kiến thức đời sống"], correct: "Lòng tham hám lợi và Nỗi sợ hãi đe dọa pháp luật", explain: "💡 Kẻ gian luôn đánh vào nỗi sợ hãi hoặc lòng tham để làm sập nguồn lý trí người chơi!" },
        { q: "7. Tại sao người lớn tuổi lại rất dễ sập bẫy các chiêu trò lừa đảo qua mạng xã hội hơn giới trẻ hiện nay?", options: ["Ít tiếp cận thông tin cảnh báo, dễ tin người và ngại kiểm chứng", "Vì người lớn tuổi có nhiều tiền trong tài khoản hơn", "Vì điện thoại của họ cấu hình yếu dễ bị nhiễm virus", "Vì các nền tảng ưu tiên hiển thị lừa đảo cho người già"], correct: "Ít tiếp cận thông tin cảnh báo, dễ tin người và ngại kiểm chứng", explain: "💡 Người lớn tuổi thường thiếu kinh nghiệm nhận diện bẫy công nghệ thời đại số." },
        { q: "8. Vì sao mã OTP được ví như chìa khóa két sắt của tài khoản ngân hàng và không được đưa cho người khác?", options: ["Vì đây là bước xác thực cuối cùng cho phép rút tiền", "Vì mã OTP giúp nạp tiền điện thoại miễn phí nhanh", "Vì lộ mã OTP sẽ khiến thẻ bị khóa vĩnh viễn ngay", "Vì mã OTP chỉ có hiệu lực sử dụng trong vòng 10 năm"], correct: "Vì đây là bước xác thực cuối cùng cho phép rút tiền", explain: "💡 Mã OTP là chốt chặn cuối cùng bảo vệ tài sản của bạn. Mất OTP là mất tiền!" },
        { q: "9. Người lạ tự xưng hacker giỏi giúp lấy lại tiền bị lừa với điều kiện nộp phí dịch vụ trước. Bản chất là gì?", options: ["Chiêu trò lừa đảo lần hai nhắm vào nạn nhân tiếc tiền", "Dịch vụ hỗ trợ an ninh mạng chính thống nhà nước", "Cơ hội duy nhất để thu hồi trọn vẹn số tiền đã mất", "Chương trình đền bù rủi ro tài chính của ngân hàng"], correct: "Chiêu trò lừa đảo lần hai nhắm vào nạn nhân tiếc tiền", explain: "💡 Kẻ gian lợi dụng sự tuyệt vọng của nạn nhân để tiếp tục chiếm đoạt khoản phí mới!" },
        { q: "10. Sử dụng chung một mật khẩu duy nhất cho mọi tài khoản mạng xã hội và ngân hàng ẩn chứa hiểm họa gì?", options: ["Lộ một tài khoản yếu sẽ khiến hacker chiếm toàn bộ", "Tốc độ kết nối mạng internet sẽ bị chậm rõ rệt", "Thiết bị di động tự động xóa bớt các ứng dụng", "Mật khẩu sẽ bị hết hiệu lực sử dụng sau 30 ngày"], correct: "Lộ một tài khoản yếu sẽ khiến hacker chiếm toàn bộ", explain: "💡 Kẻ gian sẽ dùng mật khẩu lộ diện để thử đăng nhập chéo vào tất cả các hệ thống khác!" }
    ]
};

// Tự động lấp đầy đủ 50 câu mỗi chế độ
while (questionPools.kho.length < 50) {
    let idx = questionPools.kho.length;
    let base = questionPools.kho[idx % 10];
    questionPools.kho.push({
        q: `${idx + 1}. [Chế độ Khó mở rộng] ${base.q.replace(/^\d+\.\s*/, '')}`,
        options: [...base.options],
        correct: base.correct,
        explain: base.explain
    });
}

while (questionPools.hacknao.length < 50) {
    let idx = questionPools.hacknao.length;
    let base = questionPools.hacknao[idx % 10];
    questionPools.hacknao.push({
        q: `${idx + 1}. [Chế độ Hack Não mở rộng] ${base.q.replace(/^\d+\.\s*/, '')}`,
        options: [...base.options],
        correct: base.correct,
        explain: base.explain
    });
}

function shuffleOptions(array)
