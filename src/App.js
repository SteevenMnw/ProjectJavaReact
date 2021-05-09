import { BrowserRouter as Router, Route } from "react-router-dom"
import Account from "./pages/Account";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Gallery from "./pages/Gallery";
import AddImage from "./pages/AddImage";
import myimage from "./pages/Myimage";
import GalleryImage from "./pages/GalleryImage";

function App() {
  return (
    <Router>
        <Route path="/" exact component={Gallery} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/account" exact component={Account} />
        <Route path="/addimage" exact component={AddImage} />
        <Route path="/myimage" exact component={myimage} />
        <Route path="/image" exact component={GalleryImage} />
    </Router>
  );
}

export default App;
