import React, { Component } from 'react';
import './Selector.css';

class Selector extends Component {


//==========================================================================
    onChange = (ev) => {
        this.props.onChange(ev);
    }

    render() {
        return(
                <form className={this.props.formClassName}>
                    <p>{this.props.formTitle}</p>
                    <select className={this.props.selectClassName} value={this.props.selectorValue} onChange={this.onChange}>
                        {
                            Object.keys(this.props.array).map((arrayValue) => (
                                <option value={arrayValue}>{arrayValue}</option>
                            ))
                        }
                    </select>
                </form>
        );
    }
}

export default Selector;