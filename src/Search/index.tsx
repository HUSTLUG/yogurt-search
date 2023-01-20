import React, {Dispatch, useEffect, useState} from 'react';
import fetchJsonp from "fetch-jsonp";
import {AutoComplete, Button, Input, Select} from "@arco-design/web-react";
import {EngineEnum} from "../enum";
import {IconSearch} from "@arco-design/web-react/icon";

type suggestionType={
    p?:boolean,
    q?:string,
    s?:Array<string>
}
type propType={
    engine:number,
    setEngine: Dispatch<(prevState: undefined) => undefined>
}


const Search = ({engine,setEngine}:propType) => {
    const [input,setInput]=useState<string>("")
    const [suggestion,setSuggestion]=useState<suggestionType>({s:[]})
    const [site,setSite]=useState<number>(EngineEnum.Baidu)
    const keypress=(e)=>{
        if (e.which===13){
            search()
        }
    }
    const search=()=>{
        switch (site){
            case EngineEnum.Baidu:
                window.open("https://www.baidu.com/s?wd="+input)
                break
            case EngineEnum.Google:
                window.open("https://www.google.com.hk/search?q="+input)
                break
            case EngineEnum.Bing:
                window.open("https://cn.bing.com/search?q="+input)
                break
            case EngineEnum.Sougou:
                window.open("https://www.sogou.com/web?query="+input)
                break
            case EngineEnum.DuckDuckGo:
                window.open("https://duckduckgo.com/?q="+input)
                break
            case EngineEnum.GoogleScholar:
                window.open("https://scholar.google.com/scholar?q="+input)
                break
            case EngineEnum.Github:
                window.open("https://github.com/search?q="+input)
                break
        }
    }
    useEffect(()=>{
        if (input===""||null||undefined){
            setSuggestion({s:[]})
        }else {
            fetchJsonp(`https://suggestion.baidu.com/su?wd=${input}&p=3`,{
                jsonpCallback:"cb"
            }).then(res=>res.json()).then(data=>{
                setSuggestion(data)
            })
        }
    },[input])
    return (
        <div>
            <AutoComplete
                style={{ width: 650 ,height:50}}
                onSearch={(value)=>setInput(value)}
                defaultActiveFirstOption={false}
                value={input}
                onSelect={(value)=>setInput(value)}
                allowClear
                triggerElement={<Input onKeyPress={keypress} addAfter={
                    <Select onChange={(value)=>setSite(value)} defaultValue={EngineEnum.Baidu} style={{display:"flex",alignItems:"center",justifyContent:"center",width: 150 }}>
                        <Select.Option value={EngineEnum.Google} >谷歌搜索</Select.Option>
                        <Select.Option value={EngineEnum.Bing} >必应搜索</Select.Option>
                        <Select.Option value={EngineEnum.GoogleScholar} >谷歌学术</Select.Option>
                        <Select.Option value={EngineEnum.Github} >Github</Select.Option>
                        <Select.Option value={EngineEnum.Baidu} >百度搜索</Select.Option>
                        <Select.Option value={EngineEnum.Sougou} >搜狗搜索</Select.Option>
                        <Select.Option value={EngineEnum.DuckDuckGo} >DuckDuckGo</Select.Option>
                    </Select>
                }  placeholder={"请输入搜索内容"} onChange={(value,e)=>setInput(e.target.value)} value={input}/>}>
                {suggestion.s.map(item=>{
                    return <AutoComplete.Option key={item} value={item}>{item}</AutoComplete.Option>
                })
                }
            </AutoComplete>
            <Button type='outline' onClick={search} style={{backgroundColor:"white",height:50,marginLeft:50,fontSize:20}}><IconSearch/></Button>
        </div>
    );
};
export default Search;