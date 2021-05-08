import Home from "./pages/Home";
import { BrowserRouter as Router, Link, Route } from "react-router-dom"
import Account from "./pages/Account";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Gallery from "./pages/Gallery";
import AddImage from "./pages/AddImage";
import myimage from "./pages/Myimage";

function App() {
  return (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route path="/account" component={Account} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/addimage" component={AddImage} />
        <Route path="/myimage" component={myimage} />
    </Router>
  );
}

export default App;
