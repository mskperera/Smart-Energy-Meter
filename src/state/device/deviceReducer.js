import { createSlice } from "@reduxjs/toolkit"


const initialState={
    
    dropDeviceList:[],
    selectedDevice:null,
}

const popupSlice=createSlice({
    name:"device",
    initialState,
    reducers:{
        setDropDevices:(state,action)=>{
            state.dropDeviceList=action.payload.dropDeviceList 
        },
        setSelectedDevie:(state,action)=>{
            state.selectedDevice=action.payload.device;
        }
        
    }
})

export const {setDropDevices,setSelectedDevie}=popupSlice.actions;

export default popupSlice.reducer;