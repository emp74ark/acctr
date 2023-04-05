import React, { useEffect } from "react";
import { Home, Records, Statistics } from "./pages";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend"

function App() {
    const { records: { records, tags }, groups: { groups } } = useSelector((state: RootState) => state)

    useEffect(() => {
        localStorage.setItem("acctr", JSON.stringify({ records, tags, groups }))
    }, [records, groups]);

    return (
            <BrowserRouter basename={"/acctr"}>
                <Header/>
                <DndProvider backend={HTML5Backend}>
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/records" element={<Records/>}/>
                        <Route path="/statistics" element={<Statistics/>}/>
                    </Routes>
                </DndProvider>
                <Outlet/>
            </BrowserRouter>
    );
}

export default App;
