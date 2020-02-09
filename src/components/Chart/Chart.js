import React, { Component } from 'react';
import './Chart.css';
import Selector from '../Selector/Selector.js';
import GraphBar from '../GraphBar/GraphBar.js'

class Chart extends Component {

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
                    <h3 className="base-date"> Today Rates <br /> {this.props.date}</h3>
                    <Selector
                        formClassName="base-form"
                        formTitle="Base Currency"
                        selectClassName="currency-selector"
                        selectorValue={this.props.baseSelectorValue}
                        onChange={this.onChangeBaseSelector}
                        array={this.props.rates}
                        arrayValue={this.props.currency}
                        />
                    <Selector
                        formClassName="rate-form"
                        formTitle="Currency Rate"
                        selectClassName="currency-selector"
                        selectorValue={this.props.rateSelectorValue}
                        onChange={this.onChangeRateSelector}
                        array={this.props.rates}
                        arrayValue={this.props.currency}
                        />
                </div>

                <div className="chart-content">
                    {this.props.chosenKeys.map((currency, index) => (
                        <GraphBar
                            classNameHeader={"bar-header"}                            
                            style={{height: this.props.barHeights[index] + "%"}}

                            className1={"bar-info-button"}
                            onClick1={() => (alert(this.props.chosenRates[index] + " " + currency + " is equivalent to one " + this.props.base))}
                            
                            className2={"bar-removal-button"}
                            onClick2={() => this.removeBar(index)}>
                            {currency}
                        </GraphBar>
                    ))}

                </div>
                <div className="chart-bottomSection"></div>
            </div>
        );
    }
}

export default Chart;