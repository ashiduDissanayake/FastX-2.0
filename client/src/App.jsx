import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import Home from './pages/Home';
import Carousel from './components/Carousel/Carousel';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout> <Carousel/> </PublicLayout>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
