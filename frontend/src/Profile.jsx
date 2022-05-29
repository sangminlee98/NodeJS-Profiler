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
      let maxArr = [],
        minArr = [],
        avgArr = [],
        stdArr = [];
      console.log(response)
        setToggleTask(id.includes('task') ? true : false);
        
        Object.keys(response).slice(1,6).map((key, index) => {
          // 최대값 배열
          maxArr.push(Math.max(...response[key]))

          // 최솟값 배열
          minArr.push(Math.min(...response[key]))

          // 평균값 배열
          avgArr.push((response[key].reduce((prev, curr) => prev+Number(curr),0)) / 10);

          // 표준편차 배열
          const avg = avgArr[index];
          let sumDeviSqr = 0; // 편차 제곱의 합
          for (const x of response[key]) {
            // 편차 = 자료값 - 평균
            let devi= parseInt(x) - avg;

            sumDeviSqr = sumDeviSqr + Math.pow(devi, 2)
          }
          // 분산 = 편차들의 제곱 / 자료 갯수
          const dispersion = sumDeviSqr / response[key].length
          // 표준편차 = 분산의 제곱근
          const std = Math.sqrt(dispersion).toFixed(1);
          return stdArr.push(std)
        });
        const dataInfo = {
          max: maxArr,
          min: minArr,
          avg: avgArr,
          std: stdArr
        };
        setData(dataInfo);
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
              },
              {
                name: 'std',
                data: data.std
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