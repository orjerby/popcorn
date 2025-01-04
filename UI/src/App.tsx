import './App.css'
import Header from './components/Header'
import { AppProvider } from './context/AppContext'
import Home from './pages/Home'

function App() {
  return (
    <AppProvider>
      <div className="bg-[#f6f3e2]">
        <Header></Header>
        <Home></Home>
      </div>
    </AppProvider>
  )
}

export default App
