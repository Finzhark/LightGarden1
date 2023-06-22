import { createSlice } from "@reduxjs/toolkit";

// @import async thunk
import { deleteBlog, getArticles, likeArticle, postBlog } from "./slices"

const INITIAL_STATE = {
    articles : [],
    allArticles:[],
    filteredArticles:[],
    totalPage : 1,
    currentPage : 1,
    isLoading : false,  
    isChangePage :false,
    isUploaded :false,
    isDeleted : false
}

const blogsSlice = createSlice({
    name : "blogs",
    initialState : INITIAL_STATE,
    extraReducers : {
        [getArticles.pending] : (state, action) => {
            state.isLoading = true
        },
        [getArticles.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                articles : action.payload?.data.result,
                totalPage : action.payload?.data.page,
                currentPage : action.payload?.data.blogPage,
                allArticles : action.payload?.response,
                filteredArticles : action.payload?.outputFilter
            })
        },
        [getArticles.rejected] : (state, action) => {
            state.isLoading = false
        },
        [likeArticle.pending] : (state, action) => {
            state.isLoading = true
        },
        [likeArticle.fulfilled] : (state, action) => {
            state.isLoading = false
        },
        [likeArticle.rejected] : (state, action) => {
            state.isLoading = false
        },
        [postBlog.pending] : (state, action) => {
            state.isLoading = true
        },
        [postBlog.fulfilled] : (state, action) => {
            state = Object.assign(state, {
                isLoading : false,
                isUploaded : true
            })
        },
        [postBlog.rejected] : (state, action) => {
            state.isLoading = false
        },
        [deleteBlog.pending] : (state, action) => {
            state.isDeleted = true
        },
        [deleteBlog.fulfilled] : (state, action) => {
            state.isDeleted = true
        },
        [deleteBlog.rejected] : (state, action) => {
            state.isDeleted = false
        }
    }
})

export default blogsSlice.reducer