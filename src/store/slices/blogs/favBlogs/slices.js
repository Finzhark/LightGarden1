import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api.instance";
import Toast from "react-hot-toast";

export const getFavBlogs = createAsyncThunk(
    "blogs/getFavBlogs",
    async (payload, { rejectWithValue }) => {
        try {
            const { data } = await api.get("/blog/pagFav")
            const { category } = payload      
            
            let responseFavBlogs =[]
                      
            for (let i=1; i <= data.page; i++) {
                let response2FavBlogs = await api.get(`/blog/pagFav?page=${i}`)
                let outputFavBlogs = response2FavBlogs.data.result
                responseFavBlogs = responseFavBlogs.concat(outputFavBlogs)
            }

            let outputFilterFavBlogs = responseFavBlogs.filter(function (article) {
                if(category === undefined){
                    
                }else{
                    return article?.Category?.name === category
                }
            })

            return { responseFavBlogs, outputFilterFavBlogs }
        } catch (error) {
            console.error(error)
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)