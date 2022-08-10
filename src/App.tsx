import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { PriceDisplay } from "./Price"
import { Home } from './Home';
import { NotFound } from './NotFound';
import { NavigationBar } from './NavigationBar';
import { Blog } from './blog/blog';
import { BlogEditor } from './blog/BlogEditor';
import { BlogPost } from './blog/SingleBlogPost';
import { ClassChecker } from './school/get_class';
import { Parent } from './school/parent';


const App: React.FC = () => {
  return (
  <Router>
    <div>
      <NavigationBar />
      <Routes>
        <Route path='/' element={
          <Home />
        }/> 
        <Route path='pool/:id' element={
          <PriceDisplay PoolContract='0x83abecf7204d5afc1bea5df734f085f2535a9976'/>
        } />
        <Route path='blog/start=:index/end=:count' element={
          <Blog />
        } />
        <Route path='blog/editor' element={
          <BlogEditor />
        } />
        <Route path='blog/post=:blogid' element={
          <BlogPost  />
        } />
        <Route path='class_checker' element={
          <Parent />
        } />
        <Route path=':route' element={
          <NotFound />
        } />
      </Routes>
    </div>
  </Router>
  )}

export default App;
