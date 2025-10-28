import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Blog from './Pages/Blog'
import Layout from './Pages/Admin/Layout'
import Dashboard from './Pages/Admin/Dashboard'
import AddBlog from './Pages/Admin/AddBlog'
import ListBlog from './Pages/Admin/ListBlog'
import Comments from './Pages/Admin/Comments'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/blog/:blogId" element={<Blog/>}/>

        <Route path='/admin'element={<Layout/>}>
<Route index element={<Dashboard/>}/>
<Route path="addblog" element={<AddBlog/>}/>
<Route path="listblog" element={<ListBlog/>}/>
<Route path="comments" element={<Comments/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App