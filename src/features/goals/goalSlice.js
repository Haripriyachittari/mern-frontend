import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import goalService from '../goals/goalService'


 const initialState={
    isLoading:false,
    isError:false,
    isSuccess:false,
    message:"",
    goals:[]


 }
//create goals
export const createGoal=createAsyncThunk('goals/creategoal' ,async(goalData,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
        console.log(token)
      return await goalService.createGoal(goalData,token)
    }
    catch(err)
    {
       const message= (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

export const getAllGoals=createAsyncThunk('goals/getallgoals' ,async(_,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
        console.log(token)
        return await goalService.getAllGoals(token)
    }
    catch(err)
    {
       const message= (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

export const deleteGoal=createAsyncThunk('goals/deletegoal' ,async(id,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
        console.log(token)
      return await goalService.deleteGoal(id,token)
    }
    catch(err)
    {
       const message= (err.response && err.response.data && err.response.data.message)|| err.message || err.toString()
       return thunkAPI.rejectWithValue(message)
    }
})

const goalSlice=createSlice({
    name:"goals",
    initialState,
    reducers:{
       reset:(state)=> initialState
    },
    extraReducers:builder=>{
        builder.addCase(createGoal.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(createGoal.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.goals.push(action.payload)
        })
        builder.addCase(createGoal.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
            
        })
        builder.addCase(getAllGoals.pending,(state)=>{
            state.isLoading=true;
        })
        builder.addCase(getAllGoals.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.goals=action.payload

        })
        builder.addCase(getAllGoals.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload
    
            
        })
        .addCase(deleteGoal.pending, (state) => {
            state.isLoading = true
          })
          .addCase(deleteGoal.fulfilled, (state, action) => {
            state.isLoading = false
            state.isSuccess = true
            state.goals = state.goals.filter(
              (goal) => goal._id !== action.payload.id
            )
          })
          .addCase(deleteGoal.rejected, (state, action) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
          })

    }
})
export const {reset}=goalSlice.actions
export default goalSlice.reducer