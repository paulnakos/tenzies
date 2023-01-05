import { Outlet, Link, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{position:'relative',top:'35px'}}>
        <div className="navigation">
            <h1>
                <NavLink to="/" style={({ isActive }) => 
                      (isActive ? {color: 'red'} : {})}
                      >Select Difficulty</NavLink>
            </h1>
            <h1>
                <NavLink to="/game" style={({ isActive }) => 
                      (isActive ? {color: 'red'} : {})}
                      >Play the Game</NavLink>
            </h1>
            <h1>
                <NavLink to="/history" style={({ isActive }) => 
                      (isActive ? {color: 'red'} : {})}
                      >View History</NavLink>
            </h1>
        </div>  
       
      
        <Outlet />
     
      
    </div>
  )
};

export default Layout;