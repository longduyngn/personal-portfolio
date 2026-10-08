# Portfolio cá nhân — bản mẫu

Website tiếng Việt dùng HTML/CSS/JavaScript, chạy trực tiếp và tương thích GitHub Pages. Không cần npm hay bước build.

Tên Nguyễn Minh, nghề nghiệp, kỹ năng, email và dự án là **nội dung minh họa**, chưa phải thông tin thật của chủ sở hữu.

## Xem thử

Mở `index.html` bằng trình duyệt, hoặc chạy:

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Sau đó mở http://127.0.0.1:4173. Chạy lệnh trong thư mục chứa README này.

## Cá nhân hóa

- Sửa `profile.js`: tên, chữ viết tắt, giới thiệu, email, liên kết cá nhân, kỹ năng và dự án.
- `social` để trống cho đến khi có liên kết thật. Thêm đối tượng `{ label: "GitHub", url: "https://github.com/TEN_TAI_KHOAN" }`.
- Điền `url` của mỗi dự án để hiện nút xem mã nguồn trong cửa sổ chi tiết.
- Sửa các tiêu đề cố định trong `index.html`, màu và bố cục trong `styles.css`.
- Thay nội dung mô tả trong thẻ `meta name="description"` theo thông tin thật. Khi hoàn tất nội dung, bỏ dòng `.demo-note` trong `index.html`.
- Thẻ chữ NM được dùng thay ảnh chân dung trong bản mẫu.

## Host trên GitHub Pages

1. Tạo repository public, ví dụ `personal-portfolio` (hoặc dùng `TEN_TAI_KHOAN.github.io` nếu muốn địa chỉ gốc).
2. Đẩy **nội dung thư mục này** lên nhánh `main` của repo, không đẩy cả workspace.
3. Vào **Settings → Pages → Build and deployment → Source → GitHub Actions**.
4. Workflow `.github/workflows/pages.yml` sẽ xuất bản khi có push vào `main`; có thể chạy thủ công từ tab Actions sau khi bật Pages.
5. Mở URL hiển thị ở **Settings → Pages** hoặc môi trường `github-pages` sau khi workflow thành công.

Với project repo, địa chỉ có dạng `https://TEN_TAI_KHOAN.github.io/personal-portfolio/`. Website không có backend; nút email mở ứng dụng email của khách, không gửi thư tự động.

Hướng dẫn chính thức: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Tệp công khai

Workflow chỉ xuất bản `index.html`, `styles.css`, `profile.js`, `app.js` và `.nojekyll`. Không đưa credentials, file riêng tư hay toàn bộ Desktop vào repository.
