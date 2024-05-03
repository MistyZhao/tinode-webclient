import { useEffect } from 'react'

import { useRoutes } from "react-router-dom"
import AppRouter from "./router"



function App() {
  
  return useRoutes(AppRouter)
}

export default App;
