
import React, {useState} from 'react';

import Search from "./Search";
import {EngineEnum} from "./enum";
import BG from "./bg.jpg"
import './index.css'
import Title from "./Title";
const App = () => {
    const [engine,setEngine]=useState(EngineEnum.Baidu)
    return <div className={"app-root"}>
        <img className={"app-bg"} src={BG} alt={""}/>
        <div className={"app-bg2"}></div>
        <Title/>
        <Search engine={engine} setEngine={setEngine}/>
    </div>
};

export default App;