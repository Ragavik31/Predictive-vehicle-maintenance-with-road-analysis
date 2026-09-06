import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import Home from './pages/Home';
import Data from './pages/Data';
import Model from './pages/Model';
import Demo from './pages/Demo';
export default function App() {
    return (<BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />}/>
          <Route path="/data" element={<Data />}/>
          <Route path="/model" element={<Model />}/>
          <Route path="/demo" element={<Demo />}/>
          <Route path="*" element={<Home />}/>
        </Route>
      </Routes>
    </BrowserRouter>);
}
