var React = require('react');

class Popular extends ReactComponent {
    render () {
        var Languages = ['React', 'Sass']
        return (
            <ul className='languages'>
                {
                    languages.map(function (lang) {
                        return (
                            <li>
                                {lang}
                            </li>
                        )
                    })}
                }
            </ul>
        )
    }
}

module.exports = Popular;