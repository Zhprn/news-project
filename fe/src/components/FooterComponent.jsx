

const FooterComponent = () => {
  return (
    <footer>
    <div className="footer">
      <div className="footer-logo">
        <img src="/logo.png" alt="Fiable Law Office" />
        <div>
          <img src="/instagram.png" alt="Instagram" width="20" />
          <img src="/linkedin.png" alt="LinkedIn" width="20" />
          <img src="/peradi.png" alt="Peradi" width="60" />
        </div>
      </div>
      <div className="footer-section">
        <h3>HALAMAN</h3>
        <a href="#">Beranda</a>
        <a href="#">Tentang Kami</a>
        <a href="#">Layanan</a>
        <a href="#">Tim Kami</a>
        <a href="#">Kontak</a>
      </div>
      <div className="footer-section">
        <h3>INFO KANTOR</h3>
        <p>Jalan Padang Pasir IX No. 55, Kel. Padang Pasir, Kec. Padang Barat, Kota Padang, Provinsi Sumatera Barat</p>
        <p>info@fiablelawyers.com</p>
        <p>085375917227</p>
      </div>
    </div>
    <div className="footer-bottom">
      &copy; 2024 Fiable Law Office | Powered by <a href="#">PT Metro Indonesian Software</a>
    </div>
  </footer>
  )
}

export default FooterComponent
