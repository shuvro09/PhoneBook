import React, { useEffect, useState } from 'react';
import ContactForm from './components/ContactForm.js'
function App() {
  const [fdata, setData] = useState([])
  useEffect(() => {
    const options = {
      method: "GET",
    }
    function checkError(response) {
      if (response.status >= 200 && response.status <= 299)
        return response.json()
      else {
        throw Error(response.statusText)
      }
    }
    fetch("http://192.168.1.5:3001", options)
      .then(checkError)
      .then((data) => { setData(data); console.log(data) })
      .catch((err) => { console.log(err) })

  }, [])
  return (
    <div>
      <ContactForm data={fdata} />
    </div>
  )
}

export default App;
