import AppRoutes from './routes'
import './App.sass'
import { AuthProvider } from './context/AuthContext'

function App() {

  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
