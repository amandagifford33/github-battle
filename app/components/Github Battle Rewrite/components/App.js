var React = require('react');
var Popular = require('./Popular');

class App extends React.Component {
    render () {
        return (
            <Popular className= 'container'/>
        )
    }
}

module.exports = App;