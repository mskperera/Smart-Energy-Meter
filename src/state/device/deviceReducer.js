import { createSlice } from "@reduxjs/toolkit"


const initialState={
    
    dropDeviceList:[],
}

const popupSlice=createSlice({
    name:"device",
    initialState,
    reducers:{
        setDropDevices:(state,action)=>{
            state.dropDeviceList=action.payload.dropDeviceList 
        },
        
    }
})

export const {setDropDevices}=popupSlice.actions;

export default popupSlice.reducer;