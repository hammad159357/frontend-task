import React, { createContext,useState } from 'react'
import LandingPage from './pages/LandingPage'


export const AppContext = createContext({});

const App = () => {
  const [appData, setAppData] = useState({
    pages: {},
    homeworld: {}
  })

  return (
    <>
      <AppContext.Provider value={{ appData, setAppData }}>
        <LandingPage />
      </AppContext.Provider>
    </>
  )
}

export default App