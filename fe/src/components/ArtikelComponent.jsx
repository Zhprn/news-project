import Artikel1 from "../assets/artikel1.png";
import Artikel2 from "../assets/artikel2.png";
import Artikel3 from "../assets/artikel3.png";
import "../styles/artikel.css";

const ArtikelComponent = () => {
  return (
    <div className="artikel-container">
      <h1>ARTIKEL</h1>
      <div className="artikel-content">
        <div className="artikel-card">
          <img src={Artikel1}></img>
          <h1>Menavigasi Proses Hukum Bisnis untuk Pemula</h1>
          <p>
            Bagi pengusaha pemula, panduan lengkap ini akan membimbing Anda
            melalui kompleksitas ...
          </p>
        </div>
        <div className="artikel-card">
          <img src={Artikel2}></img>
          <h1>Aspek Hukum dalam Transaksi Properti</h1>
          <p>
            Dalam dunia transaksi properti yang dinamis, ahli hukum kami berbagi
            tips dan trik untuk membantu ...
          </p>
        </div>
        <div className="artikel-card">
          <img src={Artikel3}></img>
          <h1>Strategi Efektif Menghadapi Sengketa Bisnis</h1>
          <p>
            Sengketa bisnis bisa menjadi ujian, tetapi dengan solusi terpercaya
            dari Fiable Law Office ...
          </p>
        </div>
      </div>
      <button>SELENGKAPNYA</button>
    </div>
  );
};

export default ArtikelComponent;
