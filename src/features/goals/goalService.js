import axios from 'axios';
const API_URL='https://goalsetter-backend.onrender.com/api/goals/'

const createGoal=async(goalData,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.post(API_URL,goalData,config)
    // if(response.data)
    // {
    //     localStorage.setItem('user', JSON.stringify(response.data))
    // }
    console.log(response)
return response.data
}
const getAllGoals=async(token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.get(API_URL,config)
    console.log('hi')
return response.data
}
const  deleteGoal=async(goalId,token)=>{
    const config={
        headers:{
            Authorization:`Bearer ${token}`
        }
    }
    const response=await axios.delete(API_URL+goalId,config)

return response.data
}



const goalService={
    createGoal,
    getAllGoals,
    deleteGoal
}
export default goalService;
