import React from "react";
import { addUser, getUserByEmailAndPassword } from "../API/API_Access";
import { Link } from "react-router-dom";
import { TextField, Typography, Button } from "@material-ui/core";
import "../styles/index.scss";


class Signup extends React.Component {
  //initialize variables
  constructor(props) {
    super(props);
    this.state = { dataSource: [], email: "", passwd: "", checkPasswd: "", name: "", surname: "", identifier: "" };
  }

  //Update variables when changed
  updateName = (event) => {
    this.setState({ name: event.target.value });
  };

  updateSurname = (event) => {
    this.setState({ surname: event.target.value });
  };

  updateEmail = (event) => {
    this.setState({ email: event.target.value });
  };

  updatePasswd = (event) => {
    this.setState({ passwd: event.target.value });
  };

  updatecheckPasswd = (event) => {
    this.setState({ checkPasswd: event.target.value });
  };

  updateidentifier = (event) => {
    this.setState({ identifier: event.target.value });
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
  signUp = () => {
    try {
        //Checking the accuracy of the information
        const name = this.state.name;
        const surname = this.state.surname;
        const identifier = this.state.identifier;
        const email = this.state.email;
        const passwd = this.state.passwd;
        const checkPasswd = this.state.checkPasswd;
        if (passwd == checkPasswd && passwd != "" && checkPasswd != "" && identifier && name && surname && email) {
            //Call the API with parameters to add a new user
            addUser(name, surname, identifier, passwd, email)
                .then(
                    //Call the UserSession function
                    //Go to the Home page
                    this.props.history.push("/")
                )
                .catch(() =>
                    alert("Une erreur est survenu, veuillez attendre quelque instant et recommencer")
                );
        }
        else if (passwd != checkPasswd && identifier && name && surname && email) {
            alert("Les mots de passe ne sont pas identiques.");
        }
        else {
            alert("Veuillez renseigner toutes les informations.");
        }
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    return (
      <div className="form_signup">
        <div className="input_signup">
          <TextField
            label="Nom"
            variant="outlined"
            value={this.state.name}
            onChange={this.updateName}
          />
        </div>
        <div className="input_signup">
          <TextField
            label="Prénom"
            variant="outlined"
            value={this.state.surname}
            onChange={this.updateSurname}
          />
        </div>
        <div className="input_signup">
          <TextField
            label="identifiant"
            variant="outlined"
            value={this.state.identifier}
            onChange={this.updateidentifier}
          />
        </div>
        <div className="input_signup">
          <TextField
            label="Mail"
            variant="outlined"
            value={this.state.email}
            onChange={this.updateEmail}
          />
        </div>
        <div className="input_signup">
          <TextField
            label="Mot de passe"
            variant="outlined"
            type="password"
            value={this.state.passwd}
            onChange={this.updatePasswd}
          />
        </div>
        <div className="input_signup">
          <TextField
            label="Vérification Mot de passe"
            variant="outlined"
            type="password"
            value={this.state.checkPasswd}
            onChange={this.updatecheckPasswd}
          />
        </div>
        <div className="button_signup">
          <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => this.signUp()}
          >
            S'inscrire
          </Button>
        </div>
        <div className="redirection_signup">
          <Link to="/SignIn">
            Se connecter
          </Link>
        </div>
      </div>
    );
  }
}

export default Signup;