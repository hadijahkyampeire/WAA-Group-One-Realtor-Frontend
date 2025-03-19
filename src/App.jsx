import AppRoutes from './routes'
import './App.sass'
import { AuthProvider } from './context/AuthContext'
import { PropertiesProvider } from './context/Properties'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <PropertiesProvider>
          <AppRoutes />
        </PropertiesProvider>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
