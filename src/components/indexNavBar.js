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
            Gallery
          </NavLink>
          <NavLink exact to='/addimage' activeStyle>
            Ajouter une image
          </NavLink>
          <NavLink exact to='/account' activeStyle>
            Mon compte
          </NavLink>
          <NavLink exact to='/myimage' activeStyle>
            Mes images
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