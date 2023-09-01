import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit'
import news from './features/news'

export const store = configureStore({
    reducer: {
        news: news
    }
})
