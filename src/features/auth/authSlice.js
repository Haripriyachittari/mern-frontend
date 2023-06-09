import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import authService from './authService' 
const user= JSON.parse(localStorage.getItem('user'))


const initialState={
  user:user ? user:null,
  isLoading:false,
  isError:false,
  isSuccess:false,
  message:''
}
//Register user
 export const register=createAsyncThunk('auth/register' ,async(user,thunkAPI)=>{
    try{
      return await authService.register(user)
    }
    catch(err)
    {
       const message= (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
       return thunkAPI.rejectWithValue(message)
    }
})
export const googleRegister=createAsyncThunk('auth/googleregister' ,async(accessToken,thunkAPI)=>{
    try{
      return await authService.googleRegister(accessToken)
    }
    catch(err)
    {
       const message= (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

export const googleLogin=createAsyncThunk('auth/googlelogin' ,async(accessToken,thunkAPI)=>{
    try{
      return await authService.googleLogin(accessToken)
    }
    catch(err)
    {
       const message= (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

//Login user
export const login=createAsyncThunk('auth/login' ,async(user,thunkAPI)=>{
    try{
      return await authService.login(user)
    }
    catch(err)
    {
       const message= (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
       return thunkAPI.rejectWithValue(message)
    }
})
export const logout=createAsyncThunk('auth/logout' ,async()=>{
   await authService.logout()
})

const authSlice=createSlice({
    name:"auth",
    initialState,
    reducers:{
     reset:(state)=>initialState
    },
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload;

        })
        builder.addCase(register.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.user=null
        
        })
        builder.addCase(googleRegister.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(googleRegister.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload;

        })
        builder.addCase(googleRegister.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.user=null
        
        })
        builder.addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload;

        })
        builder.addCase(login.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.user=null
        
        })
        builder.addCase(logout.fulfilled,(state)=>{
          
            state.user=null
        
        })
        builder.addCase(googleLogin.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(googleLogin.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload;

        })
        builder.addCase(googleLogin.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.user=null
        
        })


    }

})
export const { reset } = authSlice.actions

export default authSlice.reducer
