import "../styles/konsultasi.css";

const KonsultasiComponent = () => {
  return (
    <div className="konsultasi-container">
        <h1>KONSULTASI GRATIS</h1>
        <div className="konsultasi-form">
            <form>
                {/* Input Nama, Email, dan No Telepon dalam satu baris */}
                <div className="input-group">
                    <input type="text" placeholder="Nama"></input>
                    <input type="email" placeholder="Email"></input>
                    <input type="text" placeholder="No Telepon"></input>
                </div>
                
                {/* Input Kronologi/Posisi Kasus di bawahnya */}
                <input type="text" className="full-width" placeholder="Kronologi/Posisi Kasus"></input>
            </form>
        </div>
    </div>
  )
}

export default KonsultasiComponent;
