import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import './App.css'
import Manage from "./pages/Manage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ItemsProvider } from "./context/Item/ItemsContextProvider";
import { AuthProvider } from "./context/Auth/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoutes";



function App() {

  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Login />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/manage" element={
          <ItemsProvider> 
            <Manage />
          </ItemsProvider>
        } />
        </Route>
      </Routes>
    </Router>
  </AuthProvider>
  );
}

export default App
