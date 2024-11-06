import React, { useEffect, useState } from 'react'

import Cards from '../components/home/Cards';
import axios from 'axios';

 const InComplete = () => {
  const [InCompleteData,setInCompletedData] = useState("");
  useEffect(()=>{
    const FetchData = async () =>{
        const response =  await axios.get('http://localhost:5000/task/inCmp-task',{
          headers:{
            Authorization:`Bearer ${localStorage.getItem("token")}`
          }
        });
        // console.log(response);
        setInCompletedData(response.data.data)
    }
    FetchData();
  },[])
  console.log(InCompleteData);
  return (
    <div>
     
      <Cards home={false} data={InCompleteData}/>
    </div>
  )
}



export default InComplete;
