import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './navbar';

const Navbar = () => {
  return (
    <>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink exact to='/' activeStyle>
            Accueil
          </NavLink>
          <NavLink to='/account' activeStyle>
            Mon compte
          </NavLink>
          <NavLink to='/gallery' activeStyle>
            Galerie
          </NavLink>
          <NavLink to='/addimage' activeStyle>
            Ajouter une image
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/signin'>Se connecter</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;