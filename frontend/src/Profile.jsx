import React, { useState } from 'react';
import axios from 'axios';
import ApexChart from 'react-apexcharts';

const Profile = () => {
  const [data, setData] = useState();
  const getData = async(id) => {
    setData(null);
    const response = await axios.get(`/file/${id}`);
    return response.data[0];
  }
  const onClick = async(e) => {
    const id = e.target.innerText;
    try {
      const response = await getData(id);
      let maxArr = [];
      let minArr = [];
      let avgArr = [];
      if(id.includes('task')) {
        Object.keys(response).slice(1,6).map(key => {
          maxArr.push(Math.max(...response[key]))
        });
        Object.keys(response).slice(1,6).map(key => {
          minArr.push(Math.min(...response[key]))
        });
        Object.keys(response).slice(1,6).map(key => {
          avgArr.push((response[key].reduce((prev, curr) => prev+Number(curr),0)) / 10);
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
  return data ? (
    <>
      <div style={{width: '50vw'}}>
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
            title: {
              text: 'Product Trends by Month',
              align: 'left'
            },
            grid: {
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            xaxis: {
              categories: ['core1', 'core2', 'core3', 'core4', 'core5'],
            }
          }}
        />
      </div>
      
      <div onClick={onClick}>
        <button>task1</button>
        <button>task2</button>
        <button>task3</button>
        <button>task4</button>
        <button>task5</button>
        <button>core1</button>
        <button>core2</button>
        <button>core3</button>
        <button>core4</button>
        <button>core5</button>
      </div>
    </>
  ) : (
    <div onClick={onClick}>
        <button>task1</button>
        <button>task2</button>
        <button>task3</button>
        <button>task4</button>
        <button>task5</button>
        <button>core1</button>
        <button>core2</button>
        <button>core3</button>
        <button>core4</button>
        <button>core5</button>
      </div>
  );
};

export default Profile;