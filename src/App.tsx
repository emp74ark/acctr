import React, {useEffect} from 'react';
import {Home, Records, Statistics} from './pages';
import {BrowserRouter, Outlet, Route, Routes} from 'react-router-dom';
import {Header} from './components';
import {useSelector} from "react-redux";
import {RootState} from "./store/store";

function App() {
    const {records: {records, tags}, groups: {groups}} = useSelector((state: RootState) => state)

    useEffect(() => {
        localStorage.setItem('acctr', JSON.stringify({records, tags, groups}))
    }, [records, groups]);

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/records' element={<Records/>}/>
                <Route path='/statistics' element={<Statistics/>}/>
            </Routes>
            <Outlet/>
        </BrowserRouter>
    );
}

export default App;
