import galery1 from "../assets/galery1.png"
import galery2 from "../assets/galery2.png"
import galery3 from "../assets/galery3.png"
import "../styles/galery.css"

const GaleryComponent = () => {
  return (
    <div className="galery-container">
    <h1>GALERI</h1>
      <div className="galery-content">
        <img src={galery1}></img>
        <img src={galery2}></img>
        <img src={galery3}></img>
      </div>
    </div>
  )
}

export default GaleryComponent
