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
    "⚡ Thử thách nhanh: 15 tình huống chớp nhoáng, đọc kỹ từng từ để không sập bẫy!",
    "🔥 Cẩn thận: Các đáp án đều được cân bằng độ dài, hãy tư duy logic để vượt ải!"
];

// --- KHO 15 CÂU KHÓ CHUẨN XÁC ---
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
        { q: "15. Khi máy tính cá nhân xuất hiện phần mềm lạ tự động cài đặt và trình duyệt liên tục bật trang quảng cáo, bạn nên:", options: ["Quét virus hệ thống và gỡ bỏ phần mềm lạ đó", "Tắt máy đi ngủ và hy vọng ngày mai sẽ hết", "Mua thêm một chiếc máy tính xách tay mới", "Đổi mật khẩu tài khoản mạng xã hội ngay lập tức"], correct: "Quét virus hệ thống và gỡ bỏ phần mềm lạ đó", explain: "💡 Máy tính đã bị nhiễm Adware hoặc phần mềm độc hại cần được xử lý dứt điểm." }
    ],
    // --- KHO 15 CÂU HACK NÃO CHUẨN XÁC ---
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
        { q: "10. Sử dụng chung một mật khẩu duy nhất cho mọi tài khoản mạng xã hội và ngân hàng ẩn chứa hiểm họa gì?", options: ["Lộ một tài khoản yếu sẽ khiến hacker chiếm toàn bộ", "Tốc độ kết nối mạng internet sẽ bị chậm rõ rệt", "Thiết bị di động tự động xóa bớt các ứng dụng", "Mật khẩu sẽ bị hết hiệu lực sử dụng sau 30 ngày"], correct: "Lộ một tài khoản yếu sẽ khiến hacker chiếm toàn bộ", explain: "💡 Kẻ gian sẽ dùng mật khẩu lộ diện để thử đăng nhập chéo vào tất cả các hệ thống khác!" },
        { q: "11. Nhận được thông báo từ ứng dụng ngân hàng về giao dịch trừ tiền lạ lúc 2 giờ đêm. Hướng giải quyết khôn ngoan nhất là:", options: ["Khóa thẻ khẩn cấp qua app và gọi tổng đài ngân hàng", "Chờ đến sáng hôm sau ra phòng giao dịch hỏi chuyện", "Đăng status than thở lên mạng xã hội để xin ý kiến", "Xóa ứng dụng ngân hàng đi rồi tải lại từ đầu"], correct: "Khóa thẻ khẩn cấp qua app và gọi tổng đài ngân hàng", explain: "💡 Hành động nhanh chóng giúp ngăn chặn kịp thời việc kẻ gian tiếp tục rút sạch tiền." },
        { q: "12. Khi bạn vô tình quét mã QR tại các điểm dán đè ở bãi xe hoặc quán nước công cộng, hiểm họa tiềm ẩn là gì?", options: ["Dẫn tới các trang web độc hại đánh cắp dữ liệu hoặc cài mã độc", "Điện thoại sẽ tự động sập nguồn vĩnh viễn không mở lại", "Tài khoản mạng xã hội tự động kết bạn với hàng nghìn người", "Dung lượng bộ nhớ điện thoại bị đầy lên tức thì"], correct: "Dẫn tới các trang web độc hại đánh cắp dữ liệu hoặc cài mã độc", explain: "💡 Kẻ gian thường dán đè mã QR giả mạo mã độc để lừa người dùng truy cập." },
        { q: "13. Một tài khoản game uy tín rao bán với giá rẻ bằng 1/10 giá trị thực kèm cam kết 'bảo hành vĩnh viễn'. Bản chất là gì?", options: ["Chiêu trò thu hồi lại tài khoản qua email gốc sau khi đã nhận tiền", "Cơ hội săn sale có một không hai trong năm cho game thủ", "Người bán thực sự tốt bụng muốn thanh lý nhanh nghỉ game", "Chính sách ưu đãi tri ân khách hàng của nhà phát hành"], correct: "Chiêu trò thu hồi lại tài khoản qua email gốc sau khi đã nhận tiền", explain: "💡 Kẻ lừa đảo thường dùng chính thông tin đăng ký gốc để lấy lại tài khoản sau khi bán." },
        { q: "14. Tại sao các vụ lừa đảo qua mạng thường sử dụng các tài khoản ngân hàng 'ảo' hoặc mua lại danh tính người khác?", options: ["Để xóa dấu vết dòng tiền và tránh sự truy vết của cơ quan chức năng", "Vì ngân hàng tặng nhiều ưu đãi cho người mở nhiều tài khoản", "Giúp người chuyển tiền nhận được nhiều điểm thưởng hơn", "Để giảm bớt thuế thu nhập cá nhân phải đóng hàng năm"], correct: "Để xóa dấu vết dòng tiền và tránh sự truy vết của cơ quan chức năng", explain: "💡 Việc sử dụng tài khoản trung gian giúp kẻ gian che giấu danh tính thực sự của mình." },
        { q: "15. Khi nhận được lời mời tham gia hội nhóm đầu tư tài chính sinh lời 200% mỗi ngày chỉ bằng chiếc điện thoại, bạn nên:", options: ["Chặn ngay lập tức vì không có hình thức đầu tư nào siêu lợi nhuận như vậy", "Bỏ ra số vốn nhỏ để thử vận may đổi đời", "Vay mượn bạn bè người thân để đầu tư thu lời lớn", "Hỏi thêm kinh nghiệm của họ trước khi tham gia"], correct: "Chặn ngay lập tức vì không có hình thức đầu tư nào siêu lợi nhuận như vậy", explain: "💡 Lợi nhuận siêu cao luôn đi kèm rủi ro siêu lớn hoặc 100% là mô hình lừa đảo Ponzi." }
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
