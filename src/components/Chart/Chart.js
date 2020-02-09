import React, { Component } from 'react';
import './Chart.css';

class Chart extends Component {


//==========================================================================
    onChangeBaseSelector = (ev) => {
        this.props.selectBase(ev); //, this.props.updateInfo);
    }

    onChangeRateSelector = (ev) => {
        this.props.selectRate(ev);
    }    

    barHeights = (index) => {
        this.props.barHeights(index);
    }

    removeBar = (index) => {
        this.props.removeBar(index);
    }

    render() {


        return(
            <div className="chart-container">
                <div className="chart-topSection">
                    <h4 className="base-title">Base Currency: {this.props.base}</h4>
                    <h3 className="base-date">Rates for<br /> {this.props.date}</h3>

                    <form className="base-form">
                        <p>Base Currency</p>
                        <select className="currency-selector" value={this.props.baseSelectorValue} onChange={this.onChangeBaseSelector}>
                            {
                                Object.keys(this.props.rates).map((currency) => (
                                    <option value={currency}>{currency}</option>
                                ))
                            }
                        </select>
                    </form>

                    <form className="rate-form">
                        <p>Currency Rate</p>
                        <select className="currency-selector" value={this.props.rateSelectorValue} onChange={this.onChangeRateSelector}>
                            {
                                Object.keys(this.props.rates).map((currency) => (
                                    <option value={currency}>{currency}</option>
                                ))
                            }
                        </select>
                    </form>
                </div>

                <div className="chart-content">
                        {this.props.chosenKeys.map((currency, index) => (
                        <div 
                            className="bar"
                            style={{height: this.props.barHeights[index] + "%"}}>
                            <button 
                                className="bar-info-button"
                                onClick={() => (alert(currency + " rate is equivalent to " + this.props.chosenRates[index] + " " + this.props.base))}>
                            i</button>
                            <h2 className="bar-header">{currency}</h2>
                            <button 
                                className="bar-removal-button"
                                onClick={() => this.removeBar(index)}>
                            x</button>
                        </div>))}

                </div>
                <div className="chart-bottomSection"></div>
            </div>
        );
    }
}

export default Chart;