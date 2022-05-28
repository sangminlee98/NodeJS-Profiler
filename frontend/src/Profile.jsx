import React, { useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css';
import ApexChart from 'react-apexcharts';

const Profile = () => {
  const [data, setData] = useState();
  const [dataName, setDataName] = useState('');
  const [toggleTask, setToggleTask] = useState(true);
  const getData = async(id) => {
    const response = await axios.get(`/file/${id}`);
    return response.data[0];
  }
  const onClick = async(e) => {
    if(e.target.tagName === 'DIV') return;
    const id = e.target.innerText;
    setDataName(id);
    try {
      const response = await getData(id);
      let maxArr = [];
      let minArr = [];
      let avgArr = [];
      if(id.includes('task')) {
        setToggleTask(true);
        Object.keys(response).slice(1,6).map(key => {
          return maxArr.push(Math.max(...response[key]))
        });
        Object.keys(response).slice(1,6).map(key => {
          return minArr.push(Math.min(...response[key]))
        });
        Object.keys(response).slice(1,6).map(key => {
          return avgArr.push((response[key].reduce((prev, curr) => prev+Number(curr),0)) / 10);
        });
        const dataInfo = {
          max: maxArr,
          min: minArr,
          avg: avgArr
        };
        setData(dataInfo);
      }
      if(id.includes('core')) {
        setToggleTask(false);
        Object.keys(response).slice(1,6).map(key => {
          return maxArr.push(Math.max(...response[key]))
        });
        Object.keys(response).slice(1,6).map(key => {
          return minArr.push(Math.min(...response[key]))
        });
        Object.keys(response).slice(1,6).map(key => {
          return avgArr.push((response[key].reduce((prev, curr) => prev+Number(curr),0)) / 10);
        });
        const dataInfo = {
          max: maxArr,
          min: minArr,
          avg: avgArr
        };
        setData(dataInfo);
      }
    } catch(e) {
      throw new Error(e);
    }
    
  }
  return (
    <div className={styles.container}>
      <div className={styles.btnContainer} onClick={onClick}>
        <div>
          <button>task1</button>
          <button>task2</button>
          <button>task3</button>
          <button>task4</button>
          <button>task5</button>
        </div>
        <div style={{marginTop:'10px'}}>
          <button>core1</button>
          <button>core2</button>
          <button>core3</button>
          <button>core4</button>
          <button>core5</button>
        </div>
      </div>
      {data ?
        <div style={{width: '50vw'}}>
          <h1 style={{textAlign: 'center'}}>{dataName}의 {dataName.includes('task') ? 'Core' : 'Task'}별 성능</h1>
          <ApexChart
            series={[
              {
                name: "max",
                data: data.max
              },
              {
                name: 'min',
                data: data.min
              },
              {
                name: 'avg',
                data: data.avg
              }
            ]}
            options= {{
              chart: {
                width: 300,
                height: 300,
                type: 'line',
                zoom: {
                  enabled: false
                }
              },
              dataLabels: {
                enabled: false
              },
              stroke: {
                curve: 'straight'
              },
              grid: {
                row: {
                  colors: ['#f3f3f3', 'transparent'],
                  opacity: 0.5
                },
              },
              xaxis: {
                categories: toggleTask ? ['core1', 'core2', 'core3', 'core4', 'core5'] : ['task1', 'task2', 'task3', 'task4', 'task5'],
              }
            }}
          />
        </div> 
        : null
      }    
    </div>
  )
};

export default Profile;