import * as React from "react";
import * as ReactDom from "react-dom";
import "moment/locale/zh-cn";

import RouterConfig from "./router";
// import './index.html';
import './index.css';

ReactDom.render(RouterConfig(), document.getElementById('root'));
