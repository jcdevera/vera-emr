import React from 'react';
import { Nav, NavLink, Bars, NavMenu, NavBtn, NavBtnLink, NavHome } from './NavbarElements';  

function Navigation() {
  return(
   <>
    <Nav>
      <Bars />
      <NavMenu>
        <NavHome to='/'>
          Home
        </NavHome>
        <NavLink to='/createpatients'>
          Create Patients
        </NavLink>
        <NavLink to='/viewpatients'>
          View Patients
        </NavLink>
        <NavLink to='/search'>
          Search
        </NavLink>
        
      </NavMenu>
      {/* <NavBtn>
        <NavBtnLink to='/signin'>Sign In</NavBtnLink>
      </NavBtn> */}
    </Nav>
   </>
  )
}

export default Navigation;