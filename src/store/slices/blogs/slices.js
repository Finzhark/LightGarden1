import { createAsyncThunk } from "@reduxjs/toolkit"
import api from "../../utils/api.instance";
import Toast from "react-hot-toast";


export const getArticles = createAsyncThunk(
    "blogs/getArticles",
    async (payload, { rejectWithValue }) => {
        try {

            const { id_cat, page, sort} = payload
            
            const id = Number(localStorage.getItem("id"))
            
            const PARAMETER = `id_cat=${id_cat}&sort=${sort}&page=${page}`

            const { data } = await api.get("/blog?" + encodeURI(PARAMETER))
            
            let response =[]
            
            for (let i=1; i <= data.page; i++) {
                let response2 = await api.get(`/blog?page=${i}`)
                let output = response2.data.result
                response = response.concat(output)
            }
            
            let outputFilter = response.filter(function (article) {
                return article.UserId === id
            })

            return {data,response,outputFilter}
            
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)


export const likeArticle = createAsyncThunk(
    "blogs/likeArticle",
    async (payload, { rejectWithValue }) => {
        try {
            await api.post("/blog/like",payload)
            Toast("Thankyou! You're Awesome")
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const postBlog = createAsyncThunk(
    "blogs/postBlog",
    async (payload, { rejectWithValue }) => {
        try {            
            const {data} = await api.post("/blog",payload)
            Toast.success("Success post an Article") 
            return data
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteBlog = createAsyncThunk(
    "blogs/deleteBlog",
    async (payload, { rejectWithValue }) => {
        try {            
            await api.patch("/blog/remove/" + encodeURI(payload))
            Toast.success("Success delete an Article") 
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)

