import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NewsService } from "../../services/services";


export const fetchNews = createAsyncThunk(
    'news/fetchNews',
    async () => {
        try {
            const response = await NewsService.getNews();
            console.log(response)
            return response.news
        } catch (error) {
            console.log(error)
        }
    }
)

const news = createSlice({
    name: 'news',
    initialState: {
        news: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchNews.fulfilled, (state, action) => {
                state.loading = false;
                state.news = action.payload;
            })
            .addCase(fetchNews.rejected, (state, action) => {
                state = false;
                state.error = action.error.message;
            })
    }
})

export const selectNews = (state) => state.news.news;
export const selectNewsLoading = (state) => state.news.loading;
export const selectNewsError = (state) => state.news.error;

export default news.reducer;