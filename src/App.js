import "./App.css";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import { HashRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Provider store={appStore}>
        <Body />
      </Provider>
    </Router>
  );
}

export default App;
