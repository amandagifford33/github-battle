var React = require('react');
var PropTypes = require('prop-types');
var Link = require('react-router-dom').Link;

function PlayerPreview (props) {
    return (
        <div>
            <div className='column'>
                <img
                    className='avatar'
                    src={props.avatar}
                    alt={'Avatar for ' + props.username}
                />
                <h2 className='username'>@{props.username}</h2>
            </div>
            <button
                className='reset'
                onClick={props.onReset.bind(null, 'playerTwo')}>
                    Reset
            </button>
        </div>
    )
}

PlayerPreview.propTypes = {
    avatar: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    onReset: PropTypes.func.isRequired

}

class PlayerInput extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            username:''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
     var value = event.target.value;

        this.setState(function () {
         return {
              username: value
           }
         });
     }
    handleSubmit(event) {
        event.preventDefault();

        this.props.onSubmit(
            this.props.id,
            this.state.username
        );
    }
    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                {this.props.label}
                </label>
                <input 
                id='username'
                placeholder='github username'
                type='text'
                autoComplete='off'
                value={this.state.username} 
                onChange={this.handleChange} />
            <button
                className='button'
                type='submit'
                disabled={!this.state.username}>
                    submit
                </button>
            </form>
        )
    }
}

PlayerInput.PropTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
    label: 'Username',
}

class Battle extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            plauerTwoImage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this);/* the this keyword in handleSubmit
        is always going to be referring to our instance which is our component. No matter wher
        handleSubmit is called, the this keyword will always be correct*/
        this.handleReset = this.handleReset.bind(this);
    }
    handleSubmit(id, username) {
        this.setState(function () {
            var newState = {};
            newState[id + 'Name'] = username;
            newState[id + 'Image'] = 'https://github.com/' + username + 'png?size=200'
            return newState;
        });
    }
    handleReset(id) {
        this.setState(function () {
            var newState = {};
            newState[id + 'Name'] = '';
            newState[id + 'Image'] = null;
            return newState;
        })
    }
    render() { /*showing two different UI depending on whether username has been entered yet*/
        var match = this.props.match;
        var playerOneName = this.state.playerOneName;
        var playerTwoName = this.state.playerTwoName;
        var playerOneImage = this.state.playerOneImage;
        var playerTwoImage = this.state.playerTwoImage;

        return (
            <div>
                <div className='row'>
                    {!playerOneName && /*then*/
                    <PlayerInput 
                    id='playerOne' 
                    label='Player One' 
                    onSubmit={this.handleSubmit}
                    />}

                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}
                            onReset={this.handleReset}
                        />}

                    {!playerTwoName &&
                    <PlayerInput 
                    id='playerTwo'
                    label='Player Two'
                    onSubmit={this.handleSubmit}
                    />}

                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName}
                            onReset={this.handleReset}
                        />}
                </div>

                {playerOneImage && playerTwoImage && 
                    <Link
                        className='button'
                    to={{
                        pathname: match.url + '/results',
                        search: '?playerOneName=' + playerOneName + '&playerTwoName=' +
                            playerTwoName
                    }}>
                        Battle
                    </Link>}
            </div>
        )
    }
}

module.exports = Battle;