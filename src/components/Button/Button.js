import React, { Component } from 'react';
import './Button.css';

class Button extends Component {
    onClick = (ev) => {
        this.props.onClick(ev);
    }

    render() {
        return(
                <button 
                    className={this.props.className}
                    onClick={() => this.onClick()}>
                {this.props.children}
                </button>
        );
    }
}

export default Button;