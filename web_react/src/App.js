import Home from './pages/Home/Home';
import Intro from './pages/Intro';
import {Route, Routes} from 'react-router-dom';
function App() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Intro />}/>
                <Route path='/home' element={<Home />}/>
                
            </Routes>
            
        </div>
    );
}

export default App;
