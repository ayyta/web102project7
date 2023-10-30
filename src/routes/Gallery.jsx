import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'
import Create from './Create'
const Gallery = (props) => {
  return (
  <>
    <div>
      <p className="gallery-title">Crewmate Gallery</p>
      <div className="gallery-crewmate-card-container">
          {props.data.map((crewmate) => (
            <div className="crewmate-card" 
              style={{boxShadow: `5px -5px 5px ${crewmate.color}`}}>
              <img className="card-img" src="https://shimmering-stardust-c75334.netlify.app/assets/crewmate.ce385016.png"></img>
              <p>Name: {crewmate.name}</p>
              <p>Speed: {crewmate.speed} mph</p>
              <p>Color: {crewmate.color}</p>
              <Link to={`/${crewmate.id}`}>
                <button>Edit Crewmate</button>
              </Link>            
              </div>
          ))}
      </div>
    </div>
  </>
  )
}


export default Gallery;