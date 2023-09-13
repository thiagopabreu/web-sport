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
            "conteudo": object.conteudo        }
        try {
            const response = await api.post('/news/registerNews', news)
            
            return response.data
        } catch (error) {
            console.error(error)
            alert('Erro ao cadastrar noticia')
        }
    },
    updateNews: async(object, id) => {
        console.log(object, id)
        try {
            const updateNews = await api.put(`/news/updateNews/${id.id}`, object)
            console.log(updateNews)

            // const updatePhoto = await api.put(`/photo/updatePhoto/${id.id_foto_fk}`, {file: object.file}, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'
            //     }
            // })
            // console.log(updatePhoto)
        } catch (error) {
            console.error(error)
        }
    },
    deleteNews: async(id) => {
        try {
            const deleteNews = await api.delete(`/news/deleteNews/${id}`)
            console.log(deleteNews)
        } catch (error) {
            console.log(error)
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
    },

    registerRelation: async (id_news, id_foto) => {
        try {
            const response = await api.post('/relation/registerRelation', { id_news_fk: id_news, id_foto_fk: id_foto })
            
            return response.data
        } catch (error) {
            console.error(error)
            alert('Erro ao fazer relação')
        }
    },

    deleteRelation: async (id) => {
        try {
            const response = await api.delete(`/relation/deleteRelation/${id}`)

            return response.data;
        } catch (error) {
            console.error(error)
        }
    }

}

export const RelationPhotoEventService = {
    getRelation: async (id) => {
        try {
            const response = await api.get(`/eventRelation/getRelation/${id}`)
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    registerRelation: async(body) => {
        try {
            const response = await api.post(`/eventRelation/registerRelation`, body)
            console.log(response)
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    updateRelation: async(body) => {
        try {
            const response = await api.put(`/eventRelation/updateRelation`, body)

            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    deleteRelation: async (id) => {
        try {
            const response = await api.delete(`/eventRelation/deleteRelation/${id}`)

            console.log(response)

            return response.data
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
    },
    registerPhoto: async (file) => {
        try {
            const responseFoto = await api.post('/photo/registerUpload', {file: file}, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            console.log(responseFoto)

            return responseFoto.data
        } catch (error) {
            console.error(error)
        }
    },
    updatePhoto: async(id, file) => {
        console.log(file)
        try {
            const response = await api.put(`/photo/updatePhoto/${id}`, {"file": file}, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })

                console.log(response)
        } catch (error) {
            console.log(error)
        }
    },
    deletePhoto: async(id) => {
        try {
            const response = await api.delete(`/photo/deletePhoto/${id}`)

            return response
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
    },
    registerEvent: async (body) => {
        try {
            const response = await api.post('/event/registerEvent', body)

            console.log(response)

            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    updateEvent: async (id, body) => {
        try {
            const response = await api.put(`/event/updateEvent/${id}`, body)
            console.log(response)
            return response.data
        } catch (error) {
            console.error(error)
        }
    },
    deleteEvent: async(id) => {
        try {
            const response = await api.delete(`/event/deleteEvent/${id}`)

            console.log(response)

            return response.data
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
            console.log(error)
            
        }
    },
    registerChampionship: async (body) => {
        try {
            const response = await api.post('/championship/registerChampionship', body)
            
            console.log(response)

            return response.data
        } catch (error) {
            console.error(error)
            alert('Erro ao criar um campeonato')
        }
    },
    deleteChampionship: async (id) => {
        try {
            const response = await api.delete(`/championship/deleteChampionship/${id}`)
            console.log(response)
            return response.data
        } catch (error) {
            console.log(error)
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
    },

    registerRound: async(body) => {
        try {
            const response = await api.post(`/rounds/registerRound`, body)
            console.log(response)

            return response.data
        } catch (error) {
            console.error(error)
            alert('ERROR: Rodada não criada')
        }
    },

    deleteRound: async(id) => {
        try {
            const response = await api.delete(`/rounds/deleteRound/${id}`)

            return response.data
        } catch (error) {
            console.error(error)
            alert('Não foi possivel deletar o round de id ' + id)
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
    },
    registerGame: async(body) => {
        try {
            const response = await api.post('/games/registerGame', body)

            return response.data
        } catch (error) {
            console.error(error)
            alert('Erro ao criar novo jogo!')            
        }
    },
    updateGame: async(id, body) => {
        try {
            const response = await api.put(`/games/updateGame/${id}`, body)
            console.log(response)
            return response.data
        } catch (error) {
            console.error(error)
            alert('Erro ao modificar o jogo selecionado')
        }
    },
    deleteGame: async(id) => {
        try {
            const response = await api.delete(`/games/deleteGame/${id}`)

            return response.data
        } catch (error) {
            console.error(error)
            alert("Erro ao deletar jogo selecionado")
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
            alert('Credencias Invalidas')
        }
    }
}