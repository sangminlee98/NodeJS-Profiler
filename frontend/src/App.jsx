import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './App.module.css';

function App() {
  const [file, setFile] = useState(null);
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
    <div className={styles.contents}>
      <div className={styles.container}>
        <input type="file" accept='.txt' onChange={onChange}/>
        { file ? (
          <button onClick={onSubmit}>
            <Link to={'/profile'}>제출하기</Link>
          </button>
          ) : <div/>
        } 
      </div>
    </div>
  );
}

export default App;
