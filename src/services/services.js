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
    },
    registerNews: async(object) => {
        const news = {
            "titulo": object.titulo,
            "sub_conteudo": object.sub_conteudo,
            "id_categoria_fk": object.id_categoria_fk,
            "conteudo": object.conteudo,
        }

        try {
            const response = await api.post('/news/registerNews', news)
            const formData = new FormData()
            formData.append('file', object.file)

            const responsePhoto = await api.post('/photo/registerUpload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(responsePhoto)
            const responseRelation = await api.post('/relation/registerRelation', {id_news_fk: response.data.id, id_foto_fk: responsePhoto.data.foto.id})
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