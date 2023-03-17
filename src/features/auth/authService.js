import axios from 'axios';
const API_URL='/api/users/'

const register=async(user)=>{
    const response=await axios.post(API_URL,user)
    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response)
return response.data
}
const googleRegister=async(accessToken)=>{
    let url ="https://www.googleapis.com/oauth2/v3/userinfo"
    const result= await axios.get(url,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
    console.log(result.data)
    const user={
        name:result.data.given_name,
        email:result.data.email
    }
    const response=await axios.post(API_URL+ 'socialregister',user)
    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response)
return response.data
}

const googleLogin=async(accessToken)=>{
    let url ="https://www.googleapis.com/oauth2/v3/userinfo"
    const result= await axios.get(url,{
        headers:{
            Authorization:`Bearer ${accessToken}`
        }
    })
    console.log(result.data)
    const user={
        
        email:result.data.email
    }
    const response=await axios.post(API_URL+ 'sociallogin',user)
    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response)
return response.data
}

const login=async(user)=>{
    const response=await axios.post(API_URL+'login',user)
    if(response.data)
    {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    console.log(response)
return response.data
}



const logout=async()=>{
    localStorage.removeItem('user')
}

const authService={
    register,
    logout,
    login,
    googleRegister,
    googleLogin
}
export default authService;