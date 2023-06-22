import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../../utils/api.instance";
import Toast from "react-hot-toast";

export const getLikedArticles = createAsyncThunk(
    "blogs/getLikedArticles",
    async (payload, { rejectWithValue }) => {
        try {
            const { page } = payload

            const PARAMETER = `?page=${page}`

            const { data } = await api.get("/blog/pagLike" + encodeURI(PARAMETER))

            return data
            
        } catch (error) {
            Toast.error(error.response.data)
            return rejectWithValue(error.response.data)
        }
    }
)