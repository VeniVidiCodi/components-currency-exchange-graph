import React, { Component } from 'react';
import './GraphBar.css';
import Button from '../Button/Button.js';


class GraphBar extends Component {

    onClick1 = (ev) => {
        this.props.onClick1(ev);
    }

    onClick2 = (ev) => {
        this.props.onClick2(ev);
    }

    render() {
        return(
            <div 
                className="bar"
                style={this.props.style}>
                <Button
                    className={this.props.className1}
                    onClick={() => this.onClick1()}>
                i</Button>
                <h2 className={this.props.classNameHeader}>
                    {this.props.children}
                </h2>
                <Button 
                    className={this.props.className2}
                    onClick={() => this.onClick2()}>
                x</Button>
            </div>
        );
    }
}

export default GraphBar;