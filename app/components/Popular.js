var React = require('react');
var PropTypes = require('prop-types');

function SelectLanguage (props) {
    var languages = ['All', 'Javascript', 'Ruby', 'CSS', 'Java', 'Python'];
        return (
            <ul className='languages'>
            {languages.map(function (lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b' }: null}
                        onClick={props.onSelect.bind(null, lang)/*returns us a new function, onClick
                        that new function is invoked, and passed specific lang that was clicked on */}
                        key={lang}>
                        {lang}
                    </li>
                )
            })}
        </ul> 
        )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,

}
class Popular extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            /* new property */selectedLanguage: 'All'/* default state */
        };

        this.updateLanguage = this.updateLanguage.bind(this);/*use .bind property to take in a context
        and return a brand new function with the this keyword inside of that function bound to whatever 
        you pass in */ /* The whole point of this line right here is to make it so that the this keyword inside
        updateLanguage is always the component instance itself which will have a setState property */
    }
    /* new method */updateLanguage(lang/* passed a new language */) {
        /* dont know what the 'this' is bound to 
        until you invoke update language */ /* problem is that
        if updateLanguage is invoked in the wrong context, 'this' is going
        to be different, and as a result this.setState will
        be undefined */ /* pass it a function */(function () {
            return {
                selectedLanguage: lang
            }
        });
    }
    render() {
        
        return (
           <div>
               <SelectLanguage
                selectedLanguage={this.state.selectedLanguage}
                onSelect={this.updateLanguage}
               />
           </div>
        )
    }
}

module.exports = Popular;



/* Whenever we create a new function that creates a new context */
