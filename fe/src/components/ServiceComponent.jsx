import Ligital from "../assets/ligital.png";
import Commerce from "../assets/commercial.png";
import "../styles/service.css";

const ServiceComponent = () => {
  return (
    <div className="service-container">
    <h1>LAYANAN</h1>
      <div className="service-content">
        <div className="service-card">
          <div className="logo-service">
            <img src={Ligital}></img>
            <h1>Litigasi & Non Litigasi</h1>
          </div>
          <p>
            Fiable Law Office memiliki tim pengacara yang berpengalaman dalam
            memberikan jasa hukum berupa konsultasi hukum, bantuan hukum, dan
            pendampingan hukum yang menyangkut perkara Perdata (PMH &
            Wanprestasi), Pidana, Tata Usaha Negara, Hukum Keluarga, termasuk
            sengketa tanah ulayat dan lain sebagainya.
          </p>
          <a href="#">SELENGKAPNYA</a>
        </div>
        <div className="service-card">
          <div className="logo-service">
            <img src={Commerce}></img>
            <h1>General Corporate, Commercial, & Compliance</h1>
          </div>
          <p>
            Fiable Law Office memiliki legal consultant berlisensi pengacara
            yang memiliki pengalaman dalam memberikan jasa berupa, Perancangan
            Kontrak Bisnis, Uji Tuntas dan Penerbitan Opini Hukum, Perizinan
            usaha berbasis OSS-RBA dan manintenance kewajiban pelaporan intansi,
            Penunjukan sebagai Konsultan Hukum Tetap, Corporate Restructuring
            dan lain sebagainya.
          </p>
          <a href="#">SELENGKAPNYA</a>
        </div>
      </div>
    </div>
  );
};

export default ServiceComponent;
