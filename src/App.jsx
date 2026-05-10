import { useState } from "react";
import "./App.css";
import { GoogleGenAI } from "@google/genai";

function App() {
  const [kurum, setKurum] = useState("Erciyes Üniversitesi");
  const [makam, setMakam] = useState("Bilgi İşlem Daire Başkanlığı");
  const [sayi, setSayi] = useState("[Evrak kayıt sistemince verilecektir]");
  const [konu, setKonu] = useState("");
  const [adSoyad, setAdSoyad] = useState("");
  const [unvan, setUnvan] = useState("Öğrenci");
  const [telefon, setTelefon] = useState("");
  const [eposta, setEposta] = useState("");

  const [govdeMetni, setGovdeMetni] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewAcik, setPreviewAcik] = useState(false);

  const temizle = (metin) => {
    return metin
      .replaceAll("**", "")
      .replaceAll("---", "")
      .replaceAll("Elbette,", "")
      .trim();
  };

  const yaziOlustur = async () => {
    if (!konu.trim()) {
      alert("Önce yazının konusunu gir.");
      return;
    }

    try {
      setLoading(true);
      setPreviewAcik(false);
      setGovdeMetni("Yapay zeka yazı içeriğini hazırlıyor...");

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
- ** işareti kullanma.
- Gereksiz açıklama yapma.
- Resmi ve sade Türkçe kullan.
- Son cümle "Gereğini arz ederim." veya duruma uygunsa "Bilgilerinize arz ederim." ile bitsin.
`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      setGovdeMetni(temizle(response.text));
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
    alert("Belge metni kopyalandı.");
  };

  return (
    <div className="page">
      <div className="hero">
        <div className="logo">KY</div>
        <div>
          <h1>Kamu Yazı Asistanı</h1>
          <p>Yapay zeka destekli resmi yazı hazırlama ve sayfa önizleme sistemi</p>
        </div>
      </div>

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
          <input
            value={adSoyad}
            onChange={(e) => setAdSoyad(e.target.value)}
            placeholder="Ad Soyad"
          />

          <label>Unvan / Bilgi</label>
          <input
            value={unvan}
            onChange={(e) => setUnvan(e.target.value)}
            placeholder="Örn: Bilgisayar Mühendisliği 4. Sınıf Öğrencisi"
          />

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

        <main className="workspace">
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

                <div className="makam">
                  {makam.toUpperCase()} MAKAMINA
                </div>

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
        </main>
      </div>
    </div>
  );
}

export default App;