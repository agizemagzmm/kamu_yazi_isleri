# Kamu Yazı Asistanı

Kamu Yazı Asistanı, kamu kurumlarında kullanılan resmi yazışma süreçlerini daha hızlı, düzenli ve standart hale getirmek amacıyla geliştirilmiş web tabanlı bir yazı oluşturma uygulamasıdır. Proje, kullanıcıdan alınan temel bilgiler doğrultusunda resmi yazı taslağı oluşturmayı, oluşturulan metni düzenlenebilir şekilde göstermeyi ve kamu yazışmalarına uygun daha profesyonel bir belge hazırlama süreci sunmayı hedefler.

**Canlı Demo:**  
https://kamu-yazi-isleri.vercel.app

**Projenin Amacı:**  
Kamu kurumlarında resmi yazı hazırlama süreci genellikle belirli kurallara, dile ve belge formatına bağlıdır. Bu proje, bu süreci sadeleştirmek ve kullanıcıların daha kısa sürede düzenli yazılar oluşturmasını sağlamak için geliştirilmiştir. Uygulama; sade arayüzü, belge düzenleme alanı ve dashboard yapısıyla resmi yazı oluşturma sürecini daha erişilebilir hale getirir.

**Temel Özellikler:**  
- Modern ve sade kullanıcı arayüzü
- Resmi yazı oluşturma ekranı
- Dashboard sistemi
- Belge düzenleme alanı
- Responsive tasarım
- React tabanlı component yapısı
- Vite ile hızlı geliştirme ortamı
- Vercel üzerinde canlı yayın
- Ortam değişkenleriyle yapılandırılabilir proje yapısı

**Kullanılan Teknolojiler:**  
Projede React, Vite, JavaScript, HTML, CSS ve Vercel kullanılmıştır. React arayüz geliştirme için, Vite hızlı geliştirme ve build süreci için, Vercel ise projeyi canlı ortamda yayınlamak için tercih edilmiştir.

**Proje Yapısı:**  

```txt
KAMU-YAZI-ASISTANI
├── .vscode
│   └── launch.json
├── node_modules
├── public
│   ├── favicon.svg
│   └── icons.svg
├── src
│   ├── assets
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

**Kurulum ve Çalıştırma:**  
Projeyi kendi bilgisayarınızda çalıştırmak için önce repoyu klonlayın:

```bash
git clone https://github.com/kullanici-adiniz/repo-adiniz.git
```

Proje klasörüne girin:

```bash
cd KAMU-YAZI-ASISTANI
```

Gerekli paketleri yükleyin:

```bash
npm install
```

Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

Proje varsayılan olarak şu adreste çalışır:

```txt
http://localhost:5173
```

**Build Alma:**  
Projeyi production ortamına hazırlamak için aşağıdaki komut kullanılır:

```bash
npm run build
```

Bu işlemden sonra Vite tarafından `dist` klasörü oluşturulur. Production çıktısını yerelde test etmek için şu komut çalıştırılabilir:

```bash
npm run preview
```

**Ortam Değişkenleri:**  
Projede `.env` dosyası kullanılabilir. Güvenlik nedeniyle `.env` dosyası GitHub reposuna yüklenmemelidir. Eğer projede API anahtarı veya özel yapılandırma değişkenleri varsa bunlar Vercel panelinden eklenmelidir.

Vercel üzerinde ortam değişkenleri şu bölümden eklenebilir:

```txt
Project Settings → Environment Variables
```

Örnek `.env` kullanımı:

```env
VITE_API_KEY=your_api_key_here
```

**Yayınlama:**  
Proje Vercel üzerinde yayınlanmıştır. Vercel için temel ayarlar şu şekildedir:

```txt
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

Proje GitHub reposuna bağlıysa, `main` branch üzerine yapılan her push işleminden sonra Vercel otomatik olarak yeni bir deployment oluşturur.

Güncelleme göndermek için:

```bash
git add .
git commit -m "proje guncellendi"
git push origin main
```

**Geliştirme Notları:**  
Bu proje, kamu yazışma süreçlerini dijitalleştirmeye yönelik bir prototip olarak geliştirilmiştir. Mevcut sürümde temel arayüz, dashboard sistemi ve belge düzenleme yapısı bulunmaktadır. İlerleyen sürümlerde PDF/DOCX dışa aktarma, kullanıcı giriş sistemi, belge geçmişi, kurum bazlı yazı şablonları, sesli komut desteği ve yapay zeka destekli metin üretimi gibi özellikler eklenebilir.

**Gelecek Geliştirmeler:**  
- PDF olarak dışa aktarma
- DOCX olarak dışa aktarma
- Kullanıcı giriş sistemi
- Belge geçmişi
- Hazır resmi yazı şablonları
- Kurum bazlı belge formatları
- Yapay zeka destekli metin önerileri
- Sesli komut ile yazı oluşturma
- Daha gelişmiş dashboard yapısı

**Geliştirici:**  
Bu proje, kamu yazışma süreçlerini daha hızlı, düzenli ve erişilebilir hale getirmek amacıyla geliştirilmiştir.

**Lisans:**  
Bu proje eğitim, portfolyo ve geliştirme amacıyla hazırlanmıştır.
