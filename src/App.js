 import React, { Component } from "react";
import './App.css';

class App extends Component {
  // Define starting state
    state = {
        isLoading: false,
        date: "",
        base: "USD",
        rates: [],
        chosenKeys: [], //['HKD', 'USD'']
        chosenRates: [], // ['1.7468', '98969']
        barHeights: [], 
    };
// ==========================================================================

    selectBase = (ev) => {
        this.setState({ base: ev.target.value }, this.updateInfo);
    }

    updateInfo = () => {
        this.onRefresh();
    }

    selectRate = (ev) => {
        let choice = ev.target.value;
        let chosenKeysUpdate = this.state.chosenKeys.concat(choice);
        this.setState({ chosenKeys: chosenKeysUpdate });

        let chosenRate = this.state.rates[choice];
        let chosenRatesUpdate = this.state.chosenRates.concat(chosenRate);
        let heightUpdate = this.calculateBarHeight(chosenRatesUpdate);

        this.setState({ chosenRates: chosenRatesUpdate, 
                        barHeights: heightUpdate,
                      });
    }

    calculateBarHeight(chosenRates) {
        let highest = Math.max(...chosenRates);
        console.log("highest...", highest);
        let heightUpdate = [];
        for (let rate of chosenRates) {
            console.log("RATE", rate);
            let heightEntry = rate / highest * 80;
            heightUpdate.push(heightEntry);
            };
        return heightUpdate;
        }

    removeBar = (index) => {
        let indexKey = this.state.chosenKeys[index]
        console.log("I want to remove index: ", indexKey);
        let chosenRatesUpdate = this.state.chosenRates.splice(index, 1);
        let chosenKeyUpdate = this.state.chosenKeys.splice(index, 1);
        this.setState({
            chosenRates: this.state.chosenRates,
            chosenKeys: this.state.chosenKeys,
            })
    }

// ==========================================================================

  // Page loading methods
    componentDidMount = () => {
        this.onRefresh();     // Automatically load in page with a fetch
    }

    onRefresh = () => {
        const base = this.state.base
        const url = "https://api.exchangeratesapi.io/latest?base=" + base
        this.setState({
            isLoading: true,
        });
        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log('receiving data', data);
                // Transfer/Update of Keys
                let newChosenRates = [];
                for ( const item of this.state.chosenKeys ){
                    console.log('item:', item, 'value', data.rates[item]);
                    newChosenRates.push(data.rates[item])
                }
                let newBarHeights = this.calculateBarHeight(newChosenRates);

                // Do state set for real data
                this.setState({
                    date: data.date,
                    rates: data.rates,
                    chosenRates: newChosenRates,
                    barHeights: newBarHeights,
                });              
            });
    }

// ==========================================================================
// ==========================================================================

    render() {
        console.log("rendering page...");
        console.log("chosen keys: ", this.state.chosenKeys);
        console.log("chosenRates: ", this.state.chosenRates);
        console.log("barHeights: ", this.state.barHeights);

        return (
            <div className="container">
                        <div className="navBar">
                            <h1>International Currency Rates</h1>
                        </div>
                        <div className="margin-left"></div>

                        <div className="chart-container">
                            <div className="chart-topSection">
                                {/* <h4 className="base-title">Base Currency: {this.state.base}</h4> */}
                                <h3 className="base-date">Rates for<br /> {this.state.date}</h3>

                                <form className="base-form">
                                    <p>Base Currency</p>
                                    <select className="currency-selector" value={this.state.base} onChange={this.selectBase}>
                                        {
                                            Object.keys(this.state.rates).map((currency) => (
                                                <option value={currency}>{currency}</option>
                                            ))
                                        }
                                    </select>
                                </form>

                                <form className="rate-form">
                                    <p>Currency Rate</p>
                                    <select className="currency-selector" value={this.state.rate} onChange={this.selectRate}>
                                        {
                                            Object.keys(this.state.rates).map((currency) => (
                                                <option value={currency}>{currency}</option>
                                            ))
                                        }
                                    </select>
                                </form>
                            </div>
                            
                            <div className="chart-content">
                                    { this.state.chosenKeys.map((currency, index) => (
                                    <div 
                                        className="bar"
                                        style={{height: this.state.barHeights[index] + "%"}}>
                                        <button 
                                            className="bar-info-button"
                                            onClick={() => (alert(currency + " rate is equivalent to " + this.state.chosenRates[index] + " " + this.state.base))}>
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
            
                <div className="margin-right"></div>          
            </div>
        
        );
        }
}
export default App;
