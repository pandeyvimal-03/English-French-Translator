import React, { useState } from 'react'
import  ReactDOM  from 'react-dom/client'
import './app.css'

function App() {

    const [data , setData] = useState("")
    const [providedText , setProvideText] = useState('')

    const handleTranslate = async ()=>{
    
        try {

            console.log("we are making request")
            const res = await fetch('http://localhost:8080' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body : JSON.stringify({text : providedText})
                
            })
            
            const responseData = await res.json()
            setData(responseData.text)

        } catch (error) {
            console.log(error)
        }
       
    }

    const handleChange = (e)=>{
        setProvideText(e.target.value)
    }

  return (
    <div className='app'>
      <div className="textContainers">
            <div className="english">
                <h2>English</h2>
                <textarea type="text" name="text" id="text" onChange={handleChange} value={providedText}/>
            </div>
            
            <div className="french">
                <h2>French</h2>
                <textarea type="text" value={data} />
            </div>
        </div>
      
      <div className="buttonContainer">
        <button onClick={handleTranslate}>Translate</button>
      </div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(<App/>)


