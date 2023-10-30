import { Link } from "react-router-dom";
import { useState } from 'react';
import { createClient } from '@supabase/supabase-js'


const supabaseURL = 'https://caxhazffyqmcdnsqyoez.supabase.co'
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNheGhhemZmeXFtY2Ruc3F5b2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2MzU1MDQsImV4cCI6MjAxNDIxMTUwNH0.tIQBRIof1wmOfzzgn46bwWR7jtLtqRF1lF9CzJaCSYE'

const supabase = createClient(supabaseURL, supabaseAPIKey)

const Create = () => {
  const items = ['red', 'green', 'blue', 'purple', 'yellow', 'orange', 'pink'];
  const [color, setColor] = useState('');

  const changeColor = (item) => {
    setColor(item);
  }

  const createCrewmate = () => {
    const nameInput = document.getElementById('crewmateInputName').value;
    const speedInput = document.getElementById('crewmateInputSpeed').value;
    console.log(nameInput, speedInput);
    async function createCrewmate () {
      const { data, error } = await supabase.from('crewmates').insert({name: nameInput, color: color, speed: speedInput});
      if (error) {
        console.warn(error)
      }
      alert('Crewmate Created!');
      console.log(data);
    }
    createCrewmate();
    document.getElementById('crewmateInputName').value = '';
    document.getElementById('crewmateInputSpeed').value = '';
    setColor('');
  }
  return (
  <>
    <div className="create-container">
      <p>Create Your Crewmate</p>
      <img className="create-img" src="https://shimmering-stardust-c75334.netlify.app/assets/crewmates.43d07b24.png"></img>

      <div className="create-input-container">
        <div>
          <p>Name:</p>
          <input id="crewmateInputName" placeholder="Enter crewmates name"></input>
        </div>
        <div>
          <p>Speed (mph):</p>
          <input id="crewmateInputSpeed" placeholder="Enter speed in mph"></input>
        </div>
        <div>
          <p>Color:</p>
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
        <button className="create-button" onClick={createCrewmate}>Create</button>
      </div>
    </div>
  </>
  )
}
/*function BulletPointList() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleAddItem = () => {
    if (inputValue.trim() !== '') {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new item"
      />
      <button onClick={handleAddItem}>Add</button>
    </div>
  );
}

export default BulletPointList;*/

export default Create;