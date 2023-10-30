import { useState, useEffect } from 'react'
import { Link, BrowserRouter, Route, Routes } from 'react-router-dom'
import { createClient } from '@supabase/supabase-js'
import './App.css'

const supabaseURL = 'https://caxhazffyqmcdnsqyoez.supabase.co'
const supabaseAPIKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNheGhhemZmeXFtY2Ruc3F5b2V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg2MzU1MDQsImV4cCI6MjAxNDIxMTUwNH0.tIQBRIof1wmOfzzgn46bwWR7jtLtqRF1lF9CzJaCSYE'

const supabase = createClient(supabaseURL, supabaseAPIKey)

import Create from './routes/Create'
import Gallery from './routes/Gallery'
import Home from './routes/Home'
import Edit from './routes/Edit'


//.post - create
//.get - read
//.put - update
//.delete - delete

//supabase.from('crewmates').insert({name: 'myname', color: 'red', speed:1234}
//supabase.from('crewmates').select()



function App() {
  const [crewmateData, setCrewmateData] = useState(null)
  const [updateCrewmates, setUpdateCrewmates] = useState(0)
  function LoadingSpinner() {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    async function getCrewmates () {
      const { data, error } = await supabase.from('crewmates').select();
      if (error) {
        console.warn(error)
      }
      setCrewmateData(data);
      console.log(data);
    }
    getCrewmates();
  }, [updateCrewmates])
  return (
    <BrowserRouter> 
      <main>
        <div className='left-container'>
          <Link to="/"><p className='left-item'>Home</p></Link>
          <Link to="/create"><p className='left-item'>Create a Crewmate</p></Link>
          <Link to="/gallery"><p className='left-item'>Crewmate Gallery</p></Link>  

        </div>


        <div className='right-container'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/create' element={<Create updateC={setUpdateCrewmates} c={updateCrewmates}/>}/>
            <Route path='/gallery' element={crewmateData ? <Gallery data={crewmateData} updateCrew={setUpdateCrewmates} crew={updateCrewmates}/> : <LoadingSpinner /> }/>
            {crewmateData && crewmateData.map((crewmate) => (
            <Route path={`/${crewmate.id}`} element={<Edit data={crewmateData} updateC={setUpdateCrewmates} c={updateCrewmates} id={crewmate.id}/>}></Route>
            ))}
          </Routes>


        </div>

      </main>
    </BrowserRouter>
  )
}

export default App
