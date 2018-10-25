var React = require('react');
var NavLink = require('react-router-dom').NavLink;/*used 
to change  style based on the route you are at. Composes
in .Link and adds a few props to it.*/

function Nav () {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/battle'>
                    Battle
                </NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/popular'>
                    Popular
                </NavLink>
            </li>
        </ul>
    )
}

module.exports = Nav;