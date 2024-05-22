// misc
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom"

// pages
import Transliterator from "./pages/Transliterator.jsx"
import Knowledge from "./pages/Knowledge.jsx"
import Contacts from './pages/Contacts.jsx'
import NotFound from './pages/NotFound.jsx'
import KnowledgeExperiment from './pages/KnowledgeExperiment.jsx'

// components
import Layout from "./components/Layout/Layout.jsx"


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Transliterator />} />
          <Route path="knowledge" element={<Knowledge />} />
          <Route path="contacts" element={<Contacts/>} />
          <Route path="*" element={<NotFound/>} />
          <Route path="knowledge-experiment" element={<KnowledgeExperiment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}