import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home/home";
import { News } from "./pages/news/news";

export const Routers = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path="/noticias" element={<News />} />
            </Routes>
        </Router>
    )
}