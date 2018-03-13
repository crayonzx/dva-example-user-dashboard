import dva from 'dva';
import createHistory from "history/createBrowserHistory";
import createLoading from 'dva-loading';
import "moment/locale/zh-cn";

// import './index.html';
import './index.css';

// 1. Initialize
const app = dva({
  history: createHistory()
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require("./models/users").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start('#root');

export default app._store;  // eslint-disable-line
