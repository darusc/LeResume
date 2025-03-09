import { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'

import { Analytics } from '@vercel/analytics/react'

import { enableMapSet } from 'immer'

import { ProviderContext } from '@context/ProviderContext'

import Menu from '@components/Menu.tsx'

import ChooseTemplate from '@pages/ChooseTemplate'
import Home from '@pages/Home'
import Build from '@pages/Build'
import Me from '@pages/Me'
import Signin from '@pages/Signin'
import Shared from '@pages/Shared'

import './App.scss'

function App() {
  enableMapSet();

  const [darkmode, setDarkmode] = useState(false);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkmode(true);
    }
  }, [])

  useEffect(() => {
    if (darkmode) {
      document.querySelector("body")?.classList.add("dark");
    }
    else {
      document.querySelector("body")?.classList.remove("dark");
    }
  }, [darkmode]);

  return (
    <ProviderContext>
      <Menu darkmode={darkmode} setDarkmode={setDarkmode}/>
      <Routes>
        <Route path='/' element={<Home darkmode={darkmode} />} />
        <Route path='/build' element={<Build />} />
        <Route path='/templates' element={<ChooseTemplate darkmode={darkmode} />} />
        <Route path='/me' element={<Me darkmode={darkmode}/>}/>
        <Route path='/signin' element={<Signin darkmode={darkmode}/>} />
        <Route path='/shared/:user/:rid' element={<Shared/>}/>
        <Route path='*' element={<h1>404 Page not found!</h1>} />
      </Routes>
      <Analytics/>
    </ProviderContext>
  )
}

export default App