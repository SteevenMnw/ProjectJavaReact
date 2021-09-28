import React from "react";
import { getUserByEmailAndPassword } from "../API/API_Access";
import { Link } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import "../styles/index.scss";


class Signin extends React.Component {
  //initialize variables
  constructor(props) {
    super(props);
    this.state = { dataSource: [], email: "", passwd: "" };
  }

  //Update variables when changed
  updateEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  updatePasswd = (event) => {
    this.setState({ passwd: event.target.value });
  };

/*
  //Set the User data from API to Session to use it in another page
  setUserSession = async (value, pswd) => {
    try {
      AsyncStorage.clear();
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("user", jsonValue);
      const jsonValuePswd = JSON.stringify(pswd);
      await AsyncStorage.setItem("pswd", jsonValuePswd);
    } catch (e) {
      console.log(e);
    }
  };
*/
  //Function to connect the User
  getUser = () => {
    try {
      //Checking the accuracy of the information
      const email = this.state.email;
      const passwd = this.state.passwd;
      if (email && passwd) {
        //Crypt password
          //Call the API with parameters to check if the information are correct
          getUserByEmailAndPassword(email, passwd)
            .then((data) => {
              this.setState({ dataSource: data });
              if (this.state.dataSource) {
                //Call the UserSession function
                //Go to the Home page
                this.props.history.push("/");
              }
            })
            .catch(() =>
              alert("Votre mail ou mot de passe est invalide")
            );
      } else if (passwd === "" && email) {
        alert("Veuillez insérer votre mot de passe.");
      } else if (email === "" && passwd) {
        alert("Veuillez insérer votre mail.");
      } else {
        alert("Veuillez renseigner toutes les informations.");
      }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="form_signin">
        <div className="input_signin">
          <TextField
            label="Mail"
            variant="outlined"
            value={this.state.email}
            onChange={this.updateEmail}
          />
        </div>
        <div className="input_signin">
          <TextField
            label="Mot de passe"
            variant="outlined"
            type="password"
            value={this.state.passwd}
            onChange={this.updatePasswd}
          />
        </div>
        <div className="button_signin">
          <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => this.getUser()}
          >
            Connexion
          </Button>
        </div>
        <div className="redirection_signin">
          <Link to="/SignUp">
            S'inscrire
          </Link>
        </div>
      </div>
    );
  }
}

export default Signin;