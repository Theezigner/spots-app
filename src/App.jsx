import React from 'react';
import './App.css';
import { Header, Footer } from './components/header-footer';
import { SpotsBody } from './components/spotsBody';
import { CardsGrid } from './components/cards';


export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <SpotsBody />
        
        
      </main>
      <Footer />
    </div>
  );
}
