import React, {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
import '@arco-design/web-react/es/Input/style/index.css'
import '@arco-design/web-react/es/Button/style/index.css'
import '@arco-design/web-react/es/Tag/style/index.css'
import '@arco-design/web-react/es/style/index.css'
import '@arco-design/web-react/es/Select/style/index.css'
import '@arco-design/web-react/es/AutoComplete/style/index.css'


const root = createRoot(document.getElementById("root"))

root.render(
    <StrictMode>
        <App/>
    </StrictMode>
)