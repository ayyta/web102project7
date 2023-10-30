import { Link } from "react-router-dom";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'


const supabaseURL = 'https://caxhazffyqmcdnsqyoez.supabase.co'
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNheGhhemZmeXFtY2Ruc3F5b2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2MzU1MDQsImV4cCI6MjAxNDIxMTUwNH0.tIQBRIof1wmOfzzgn46bwWR7jtLtqRF1lF9CzJaCSYE'

const supabase = createClient(supabaseURL, supabaseAPIKey)

const Edit = (props) => {
  const items = ['red', 'green', 'blue', 'purple', 'yellow', 'orange', 'pink'];
  const [color, setColor] = useState('');
  const [color2, setColor2] = useState(props.data[props.id].color);
  const [name, setName] = useState(props.data[props.id].name);
  const [speed, setSpeed] = useState(props.data[props.id].speed);

  const changeColor = (item) => {
    setColor(item);
  }
  const editCrewmate = () => {
    let nameInput = document.getElementById('crewmateInputName').value;
    let speedInput = document.getElementById('crewmateInputSpeed').value;



    nameInput = nameInput ? nameInput : props.data[props.id].name;
    speedInput = speedInput ? speedInput : props.data[props.id].speed;
    let colorInput = color ? color : props.data[props.id].color;
    console.log(nameInput, speedInput, colorInput);

    async function editCrew () {
      const { data, error } = await supabase.from('crewmates').update({name: nameInput, speed: speedInput, color: colorInput}).eq('id', props.id);
      if (error) {
        console.warn(error)
      }
      alert('Edited Crewmate!');
      setName(nameInput);
      setSpeed(speedInput);
      setColor2(colorInput);
    }
    editCrew();
    document.getElementById('crewmateInputName').value = '';
    document.getElementById('crewmateInputSpeed').value = '';
    setColor('');
    props.updateC(props.c + 1)
  }

  const deleteCrewmate = () => {
    async function deleteCrew () {
      const { data, error } = await supabase.from('crewmates').delete().eq('id', props.id);
      if (error) {
        console.warn(error)
      }
      alert('Deleted Crewmate!');
    }
    deleteCrew();
    document.getElementById('crewmateInputName').value = '';
    document.getElementById('crewmateInputSpeed').value = '';
    setColor('');
    props.updateC(props.c + 1)
  }

  return (
  <>
    <div className="create-container">
      <p>Edit Your Crewmate</p>
      <img className="create-img" src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png"></img>
      <div>
        <p>Crewmate Info</p>
        <p>Name: {name}</p>
        <p>Speed: {speed}</p>
        <p>Color: {color2}</p>
      </div>
      <div className="create-input-container">
        <div>
          <p>New Name:</p>
          <input id="crewmateInputName" placeholder="Enter crewmates name"></input>
        </div>
        <div>
          <p>New Speed (mph):</p>
          <input id="crewmateInputSpeed" placeholder="Enter speed in mph"></input>
        </div>
        <div>
          <p>New Color:</p>
          <div>
            <ul>
              {items.map((item) => (
              <li
                key={item}
                onClick={() => changeColor(item)}
                className={item === color ? 'selected' : ''}
                style={
                  item === color
                    ? { backgroundColor: item }
                    : {}
                }

              >
                {item}
              </li>
              ))}

            </ul>
          </div>
        </div>
      </div>
      <div className="create-button-container">
        <button className="create-button" onClick={editCrewmate}>Edit Crewmate</button>
        <button className="create-button" onClick={deleteCrewmate}>Delete Crewmate</button>
      </div>
    </div>
  </>
  )
}

export default Edit;