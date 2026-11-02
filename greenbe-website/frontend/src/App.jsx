import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/admin/ProtectedRoute'
import AdminLayout from './components/admin/AdminLayout'
import Home from './pages/Home'
import About from './pages/About'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Calculator from './pages/Calculator'
// import AppPage from './pages/AppPage'
import Login from './pages/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminBlogs from './pages/admin/AdminBlogs'
import BlogEditor from './pages/admin/BlogEditor'

function NotFound() {
  return <div className="container-shell min-h-[70vh] pt-32"><h1 className="section-title">Page not found</h1><p className="mt-3 text-slate-500">The page you requested does not exist.</p></div>
}

export default function App() {
  const { pathname } = useLocation()
  const privateShell = pathname === '/login' || pathname.startsWith('/admin')

  return (
    <div className="min-h-screen bg-white text-brand-950">
      <ScrollToTop />
      {!privateShell && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/blogs/:slug" element={<BlogPost />} />
          <Route path="/calculator" element={<Calculator />} />
          {/* <Route path="/greenbe-app" element={<AppPage />} /> */}
          <Route path="/login" element={<Login />} />

          <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<AdminDashboard />} />
            <Route path="blogs" element={<AdminBlogs />} />
          </Route>
          <Route path="/admin/blogs/new" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />
          <Route path="/admin/blogs/:id/edit" element={<ProtectedRoute><BlogEditor /></ProtectedRoute>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {!privateShell && <Footer />}
    </div>
  )
}
