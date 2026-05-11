import { useState } from "react";
import "./App.css";
import { GoogleGenAI } from "@google/genai";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const [kurum, setKurum] = useState("Erciyes Üniversitesi");
  const [makam, setMakam] = useState("Bilgi İşlem Daire Başkanlığı");
  const [sayi, setSayi] = useState("[Evrak kayıt sistemince verilecektir]");
  const [konu, setKonu] = useState("");
  const [adSoyad, setAdSoyad] = useState("Ayşe Gizem COŞKUN");
  const [unvan, setUnvan] = useState("Bilgisayar Mühendisliği 4. Sınıf Öğrencisi");
  const [telefon, setTelefon] = useState("");
  const [eposta, setEposta] = useState("");

  const [govdeMetni, setGovdeMetni] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewAcik, setPreviewAcik] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2500);
  };

  const temizle = (metin) => {
    return metin
      .replaceAll("**", "")
      .replaceAll("---", "")
      .replaceAll("Elbette,", "")
      .trim();
  };

  const sesliDemo = () => {
    setKonu("Bilgi İşlem Daire Başkanlığında staj yapmak istiyorum");
    showToast("Sesli komut algılandı.");
  };

  const yaziOlustur = async () => {
    if (!konu.trim()) {
      alert("Önce yazının konusunu gir.");
      return;
    }

    try {
      setLoading(true);
      setPreviewAcik(false);
      setGovdeMetni("AI isteği analiz ediyor...\nResmi dil oluşturuluyor...\nBelge gövdesi hazırlanıyor...");

      const ai = new GoogleGenAI({
        apiKey: import.meta.env.VITE_GEMINI_API_KEY,
      });

      const prompt = `
Sen kamu kurumları için resmi yazı gövdesi hazırlayan bir asistansın.

Kullanıcının isteği:
${konu}

Sadece ana yazı gövdesini oluştur.

Kurallar:
- T.C., kurum adı, sayı, konu, makam, tarih, imza, telefon, e-posta yazma.
- Sadece giriş, gelişme ve sonuç paragraflarını yaz.
- Markdown kullanma.
- Resmi ve sade Türkçe kullan.
- Son cümle "Gereğini arz ederim." ile bitsin.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      setGovdeMetni(temizle(response.text));
      showToast("AI resmi yazı gövdesini oluşturdu.");
    } catch (error) {
      console.error(error);
      setGovdeMetni("Hata oluştu. API key veya internet bağlantısını kontrol et.");
    } finally {
      setLoading(false);
    }
  };

  const sayfadaGoruntule = () => {
    if (!govdeMetni.trim()) {
      alert("Önce AI ile yazı oluştur.");
      return;
    }
    setPreviewAcik(true);
    showToast("Belge A4 formatında görüntülendi.");
  };

  const kopyala = async () => {
    const tamMetin = `T.C.
${kurum.toUpperCase()}

Sayı : ${sayi}
Konu : ${konu}

${makam.toUpperCase()} MAKAMINA

${govdeMetni}

Tarih: ${new Date().toLocaleDateString("tr-TR")}

${adSoyad || "Ad Soyad"}
${unvan}
Telefon: ${telefon}
E-posta: ${eposta}`;

    await navigator.clipboard.writeText(tamMetin);
    showToast("Belge metni kopyalandı.");
  };

  if (!isLoggedIn) {
    return (
      <div className="loginPage">
        <div className="loginCard">
          <div className="loginLogo">KY</div>
          <h1>Kamu Yazı Asistanı</h1>
          <p>Yapay zeka destekli kurumsal evrak otomasyon paneli</p>

          <input placeholder="Kullanıcı adı" defaultValue="personel.demo" />
          <input placeholder="Şifre" type="password" defaultValue="123456" />

          <select defaultValue="Personel">
            <option>Personel</option>
            <option>Müdür</option>
            <option>Sekreter</option>
            <option>Admin</option>
          </select>

          <button onClick={() => setIsLoggedIn(true)}>Sisteme Giriş Yap</button>

          <span>Demo giriş ekranı</span>
        </div>
      </div>
    );
  }

  return (
    <div className="appShell">
      {toast && <div className="toast">{toast}</div>}

      <aside className="sidebar">
        <div className="brand">
          <div>KY</div>
          <span>Kamu AI</span>
        </div>

        <button onClick={() => setActivePage("dashboard")} className={activePage === "dashboard" ? "active" : ""}>
          Dashboard
        </button>
        <button onClick={() => setActivePage("belge")} className={activePage === "belge" ? "active" : ""}>
          Belge Oluştur
        </button>
        <button onClick={() => setActivePage("belgelerim")} className={activePage === "belgelerim" ? "active" : ""}>
          Belgelerim
        </button>
        <button onClick={() => setActivePage("sesli")} className={activePage === "sesli" ? "active" : ""}>
          Sesli Asistan
        </button>
        <button onClick={() => setActivePage("ayarlar")} className={activePage === "ayarlar" ? "active" : ""}>
          Ayarlar
        </button>

        <button className="logout" onClick={() => setIsLoggedIn(false)}>
          Çıkış Yap
        </button>
      </aside>

      <main className="mainContent">
        <header className="topbar">
          <div>
            <h1>Kamu Yazı Asistanı</h1>
            <p>AI destekli resmi yazı hazırlama ve belge önizleme sistemi</p>
          </div>
          <div className="userBox">
            <strong>Personel Demo</strong>
            <span>Bilgi İşlem</span>
          </div>
        </header>

        {activePage === "dashboard" && (
          <section className="dashboard">
            <div className="statCard">
              <span>Bugün Oluşturulan Belge</span>
              <strong>24</strong>
              <p>+%18 artış</p>
            </div>
            <div className="statCard">
              <span>AI Kullanım Oranı</span>
              <strong>%86</strong>
              <p>Aktif destek</p>
            </div>
            <div className="statCard">
              <span>Kazanılan Süre</span>
              <strong>4.2 saat</strong>
              <p>Günlük tahmini</p>
            </div>
            <div className="statCard">
              <span>Hazır Şablon</span>
              <strong>12</strong>
              <p>Kurumsal belge</p>
            </div>

            <div className="wideCard">
              <h2>Son Belgeler</h2>
              <div className="fakeList">
                <p>Bilgi İşlem Staj Talebi <span>Bugün</span></p>
                <p>Satın Alma Talebi <span>Dün</span></p>
                <p>Toplantı Tutanağı <span>2 gün önce</span></p>
              </div>
            </div>

            <div className="wideCard">
              <h2>AI Önerileri</h2>
              <p>Resmi yazılarınızda konu alanını kısa, net ve işlem odaklı yazmanız önerilir.</p>
              <p>Belgeyi göndermeden önce sayı ve imza alanlarını kurum sistemine göre kontrol edin.</p>
            </div>
          </section>
        )}

        {activePage === "belge" && (
          <div className="layout">
            <aside className="panel">
              <h2>Belge Bilgileri</h2>

              <label>Kurum Adı</label>
              <input value={kurum} onChange={(e) => setKurum(e.target.value)} />

              <label>Hitap Makamı</label>
              <input value={makam} onChange={(e) => setMakam(e.target.value)} />

              <label>Sayı</label>
              <input value={sayi} onChange={(e) => setSayi(e.target.value)} />

              <label>Konu</label>
              <textarea
                className="smallText"
                value={konu}
                onChange={(e) => setKonu(e.target.value)}
                placeholder="Örn: Bilgi İşlem Daire Başkanlığında staj yapmak istiyorum."
              />

              <label>Ad Soyad</label>
              <input value={adSoyad} onChange={(e) => setAdSoyad(e.target.value)} />

              <label>Unvan / Bilgi</label>
              <input value={unvan} onChange={(e) => setUnvan(e.target.value)} />

              <label>Telefon</label>
              <input value={telefon} onChange={(e) => setTelefon(e.target.value)} />

              <label>E-posta</label>
              <input value={eposta} onChange={(e) => setEposta(e.target.value)} />

              <button className="primaryBtn" onClick={yaziOlustur}>
                {loading ? "Hazırlanıyor..." : "AI ile Yazı Gövdesi Oluştur"}
              </button>

              <button className="previewBtn" onClick={sayfadaGoruntule}>
                Sayfada Görüntüle
              </button>

              <button className="secondaryBtn" onClick={kopyala}>
                Belgeyi Kopyala
              </button>
            </aside>

            <section className="editor">
              <div className="editorTop">
                <div>
                  <h2>AI Yazı Gövdesi</h2>
                  <p>Yapay zeka sadece paragraf içeriğini üretir. Sayfa düzeni sistem tarafından yapılır.</p>
                </div>
              </div>

              <textarea
                className="documentArea"
                value={govdeMetni}
                onChange={(e) => setGovdeMetni(e.target.value)}
                placeholder="Yapay zeka tarafından oluşturulan yazı gövdesi burada görünecek..."
              />
            </section>

            {previewAcik && (
              <section className="previewWrapper">
                <h2>Sayfa Önizleme</h2>

                <div className="a4Page">
                  <div className="centerHeader">
                    <p>T.C.</p>
                    <p>{kurum.toUpperCase()}</p>
                  </div>

                  <div className="meta">
                    <p><strong>Sayı :</strong> {sayi}</p>
                    <p><strong>Konu :</strong> {konu}</p>
                  </div>

                  <div className="makam">{makam.toUpperCase()} MAKAMINA</div>

                  <div className="bodyText">
                    {govdeMetni.split("\n").map((paragraf, index) =>
                      paragraf.trim() ? <p key={index}>{paragraf}</p> : null
                    )}
                  </div>

                  <div className="signature">
                    <p>{new Date().toLocaleDateString("tr-TR")}</p>
                    <p>{adSoyad || "Ad Soyad"}</p>
                    <p>{unvan}</p>
                    <p>Telefon: {telefon}</p>
                    <p>E-posta: {eposta}</p>
                  </div>
                </div>
              </section>
            )}
          </div>
        )}

        {activePage === "belgelerim" && (
          <section className="simplePage">
            <h2>Belgelerim</h2>
            <div className="docTable">
              <p><strong>Staj Başvurusu</strong><span>Resmi Yazı</span><button>Görüntüle</button></p>
              <p><strong>Bilgisayar Talebi</strong><span>Talep Yazısı</span><button>Görüntüle</button></p>
              <p><strong>Toplantı Tutanağı</strong><span>Tutanak</span><button>Görüntüle</button></p>
            </div>
          </section>
        )}

        {activePage === "sesli" && (
          <section className="simplePage voicePage">
            <h2>Sesli Asistan Demo</h2>
            <p>Demo için butona basınca örnek komut otomatik algılanır.</p>
            <div className="micCircle">🎤</div>
            <button className="primaryBtn" onClick={sesliDemo}>
              Sesli Komut Demo Başlat
            </button>
          </section>
        )}

        {activePage === "ayarlar" && (
          <section className="simplePage">
            <h2>Ayarlar</h2>
            <p>Kurum teması, belge şablonları ve kullanıcı tercihleri burada yönetilir.</p>
            <div className="settingsGrid">
              <div>Kurumsal Tema: Mavi / Yeşil</div>
              <div>Varsayılan Belge: Resmi Yazı</div>
              <div>AI Model: Gemini Flash</div>
              <div>Önizleme: A4 Format</div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;