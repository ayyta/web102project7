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

//.post - create
//.get - read
//.put - update
//.delete - delete

//supabase.from('crewmates').insert({name: 'myname', color: 'red', speed:1234}
//supabase.from('crewmates').select()



function App() {
  useEffect(() => {
    async function getCrewmates () {
      const { data, error } = await supabase.from('crewmates').select();
      if (error) {
        console.warn(error)
      }
      console.log(data);
    }
    getCrewmates();

    
  }, [])
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
            <Route path='/create' element={<Create/>}/>
            <Route path='/gallery' element={<Gallery/>}/>
          </Routes>


        </div>

      </main>
    </BrowserRouter>
  )
}

export default App
