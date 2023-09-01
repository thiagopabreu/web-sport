import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { News } from "./pages/news/news";
import { Events } from "./pages/events/events";
import { NewsPage } from "./pages/newsPage/newsPage";
import { AuthComponent } from "./components/Auth/auth";
import { RegisterNews } from "./pages/adminPainel/adminPainelComponents/news/newNews";
import { Championship } from "./pages/championship/championship";
import { AdminPainel } from "./pages/adminPainel/adminPainel";

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path="/noticias" element={<News />} />
                <Route path="/eventos" element={<Events />} />
                <Route path="/noticia/:id" element={<NewsPage />}/>
                <Route path="/admin" element={<AuthComponent />} />
                <Route path="/admin/noticia/add" element={<RegisterNews />} />
                <Route path="/campeonatos" element={<Championship />} />
                <Route path="/admin/painel" element={<AdminPainel />}  />
            </Routes>
        </Router>
    )
}