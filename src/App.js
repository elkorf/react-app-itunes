import React, {useEffect, useState} from 'react'
import './index.css'

export default function App() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const [err, setErr] = useState(false)
  async function fetchData(Search) {
    try{
      const data = await fetch(`https://itunes.apple.com/search?term=${Search}`)
      const temp = await data.json();
      setResults(temp.results);
      setErr(false)
    }
    catch(err){
      setErr(true)
    }
  }

  useEffect(() => {
    fetchData("Honey Singh")
  }, [])
  const handleClick = e => {
    if (e.key === 'Enter') {
      fetchData(search)
    }
  }
  return (
    <div className="App">
      <div className="container">
        <nav>
          <a href="" className="logo">itunes</a>
          <input value={search} onChange={e => setSearch(e.target.value)} onKeyUp={handleClick} type="search" placeholder="Search here"/>
        </nav>
        {err ? 'Error in API or Network Connection' : (
                  <main>
                  {
                    results.map(result => (
                      <div className="result">
                        <p>{result.trackName}</p>
                        <div>
                        <audio controls><source src={result.previewUrl}></source></audio>
                        </div>
                      </div>
                    ))
                  }
                </main>
        )}
      </div>      
    </div>
  )
}
