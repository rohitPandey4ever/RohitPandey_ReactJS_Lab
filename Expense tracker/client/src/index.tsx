import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ExpenseTrackerForm from './components/ExpenseTrackerForm';
import ShowList from './components/ShowList';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<ShowList />}></Route>
      <Route path='/home' element={<ExpenseTrackerForm  onClose={()=>{}} onTrue={()=>{}}/>}></Route>
    </Routes>
  </BrowserRouter>
);
 
