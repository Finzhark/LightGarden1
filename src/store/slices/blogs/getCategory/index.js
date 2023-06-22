import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getCategories } from "./slices"

const INITIAL_STATE = {
    categories :[],
    isLoading : false
}

const categorySlice = createSlice({
    name : "category",
    initialState : INITIAL_STATE,
    extraReducers : {
        
        [getCategories.pending] : (state, action) => {
            state.isLoading = true
        },
        [getCategories.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                categories : action.payload
            })
        },
        [getCategories.rejected] : (state, action) => {
            state.isLoading = false
        }
    }
})


export default categorySlice.reducer