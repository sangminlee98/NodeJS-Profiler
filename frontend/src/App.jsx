import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const [file, setFile] = useState();
  const onChange = (e) => {
    setFile(e.target.files[0]);
  }
  const onSubmit = async() => {
    let formData = new FormData();
    const config = {
      header: {'content-type': 'multipart/form-data'}
    }
    formData.append("file", file);
    try {
      const response = await axios.post('/file', formData, config);
      console.log(response);
    } catch(e) {
      console.log(e);
    }
    
  }
  
  return (
    <div>
      <input type="file" onChange={onChange}/>
      <button onClick={onSubmit}>
        <Link to={'/profile'}>Submit</Link>
      </button>
    </div>
  );
}

export default App;
