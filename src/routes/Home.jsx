import { Link } from "react-router-dom";

const Home = () => {
  return (
  <>
    <div className="home-container">
      <p className="home-text">Welcome to the Crewmate Lab</p>
      <p className="home-text">Here is YOUR opporutnity to make you're own custom Among Us crewmate!</p>
      <img className="home-image" src='https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png'></img>
      <img className="home-image" src='https://shimmering-stardust-c75334.netlify.app/assets/spaceship.3d8f767c.png'></img>
    </div>
  </>
  )
}


export default Home;