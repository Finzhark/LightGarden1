import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { getLikedArticles } from "./slices"

const INITIAL_STATE = {
    likedArticles :[],
    currentPage : 1,
    isLoading : false,  
}

const likedSlice = createSlice({
    name : "liked",
    initialState : INITIAL_STATE,
    extraReducers : {
        [getLikedArticles.pending] : (state, action) => {
            state.isLoading = true
        },
        [getLikedArticles.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                likedArticles : action.payload?.result,
                currentPage : action.payload?.blogPage,
            })
        },
        [getLikedArticles.rejected] : (state, action) => {
            state.isLoading = false
        }
    }
})

export default likedSlice.reducer