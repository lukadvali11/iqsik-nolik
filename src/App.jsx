import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Game from './components/Game'
import WaitingRoom from "./components/WaitingRoom.jsx";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/game/:id" element={<Game/>}/>
                <Route path="/game/:id/waiting" element={<WaitingRoom/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;