import Home from "./pages/Home";
import { BrowserRouter as Router, Link, Route } from "react-router-dom"
import Account from "./pages/Account";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Gallery from "./pages/Gallery";
import AddImage from "./pages/AddImage";

function App() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/account" component={Account} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/addimage" component={AddImage} />
    </Router>
  );
}

export default App;
