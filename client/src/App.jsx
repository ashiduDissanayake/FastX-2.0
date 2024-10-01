import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout> <Home/> </PublicLayout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
