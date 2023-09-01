import api from "./api";

export const NewsService = {
    getNews: async() => {
        let response;

        try {
            response = await api.get('/news/getNews')
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    getANews: async (id) => {
        try {
            const response = await api.get(`/news/getANews/${id}`)
            return response.data.news
        } catch (error) {
            console.error(error)
        }
    }
}

export const RelationPhotoService = {
    getRelation: async (id) => {
        try {
            const response = await api.get(`/relation/getRelation/${id}`)
            return response.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export const PhotoService = {
    getPhoto: async (id) => {
        try {
            const response = await api.get(`/photo/getPhoto/${id}`)

            return response.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export const CategoriesService = {
    getCategories: async () => {
        try {
            const response = await api.get('/categories/getCategories')

            return response.data.categories
        } catch (error) {
            
        }
    }
}

export const EventService = {
    getEvents: async () => {
        try {
            const response = await api.get('/event/getEvents')
            console.log(response)
            return response.data.events
        } catch (error) {
            console.error(error)
        }
    }
}

export const ChampionshipService = { 
    getChampionships: async () => {
        try {
            const response = await api.get('/championship/getChampionships')

            return response.data.championships
        } catch (error) {
            
        }
    }
}

export const RoundsService = {
    getRounds: async () => {
        try {
            const response = await api.get('/rounds/getRounds');

            return response.data.rounds
        } catch (error) {
            console.error(error)
        }
    },

    getRoundByChampionshipId: async (id) => {
        try {
            const response = await api.get(`/rounds/getRoundByChampionshipId/${id}`)

            return response.data;
        } catch (error) {
            console.error(error)
        }
    }
}

export const GamesService = {
    getGames: async () => {
        try {
            const response = await api.get('/games/getGames')

            return response.data.games
        } catch (error) {
            
        }
    },

    getGameByRoundId: async (id) => {
        try {
            const response = await api.get(`/games/getGameByRoundId/${id}`)

            return response.data
        } catch (error) {
            console.error(error)
        }
    }
}

export const AuthenticateService = {
    login: async (user) => {
        try {
            console.log(user)
            const response = await api.post('/admin/login', {user: user.user, senha: user.senha})
            console.log(response.user)
            return response.data.user
        } catch (error) {
            console.error(error)
        }
    }
}