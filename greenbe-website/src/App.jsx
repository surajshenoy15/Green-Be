import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Calculator from './pages/Calculator'
import AppPage from './pages/AppPage'
import Facts from './pages/Facts'

export default function App() {
  return (
    <div className="min-h-screen bg-white text-forest-950">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/facts" element={<Facts />} />
  <Route path="/blogs" element={<Blog />} />
  <Route path="/blogs/:slug" element={<BlogPost />} />
  <Route path="/calculator" element={<Calculator />} />
  <Route path="/greenbe-app" element={<AppPage />} />
</Routes>
      </main>
      <Footer />
    </div>
  )
}
