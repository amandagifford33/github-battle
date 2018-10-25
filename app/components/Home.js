var React = require('react');
var Link = require('react-router-dom').Link;

class Home extends React.Component {
    render () {
        return (
            <div className='home-container'>
            <h1>Github Battle: Battle your enemies...
                and peeps.</h1>
            
            <Link clasName='button' to='/battle'>
                Battle
            </Link>
            </div>
        )
    }
}

module.exports = Home;