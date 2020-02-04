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
        height: 1
    };
// ==========================================================================

    // Define methods. Must have for forms.
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
        this.setState({ chosenRates: chosenRatesUpdate });
    }

    fetchUpdateChosenRates = () => {
        
    }

// ==========================================================================

  // Special method called when page loads
  // useful for fetching initial data
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
                    console.log('item:', item, 'value', this.state.rates[item]);
                    newChosenRates.push(this.state.rates[item])
                }


                // Do state set for real data
                this.setState({
                    // base: data.base,
                    date: data.date,
                    rates: data.rates,
                    chosenRates: newChosenRates,
                });              
            });
    }

// ==========================================================================
// ==========================================================================

    render() {
        // console.log('6');
        const chosenRates = this.state.chosenRates;
        console.log("rendering page...");
        // console.log(this.state.rates["HKD"]);
        console.log("rates: ", this.state.rates);
        console.log("base: ", this.state.base);
        console.log("chosen keys: ", this.state.chosenKeys);
        console.log("chosenRates: ", this.state.chosenRates);


        return (
            <div className="container">
                        <div className="navBar">
                            <h1>International Currency Rates</h1>
                        </div>
                        <div className="margin-left"></div>

                        <div className="chart-container">
                            <div className="chart-topSection">
                                <h2 className="base-title">Base Currency: {this.state.base}</h2>
                                <h2 className="base-date">{this.state.date}</h2>

                                <form className="base-form">
                                    <p>Choose a Base Currency</p>
                                    <select className="currency-selector" value={this.state.base} onChange={this.selectBase}>
                                        {
                                            Object.keys(this.state.rates).map((currency) => (
                                                <option value={currency}>{currency}</option>
                                            ))
                                        }
                                    </select>
                                </form>
                                <form className="rate-form">
                                    <p>Choose a Currency Rate</p>
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
                                    {/* <div className="BarChart"> */}
                                        { this.state.chosenKeys.map((currency, index) => (
                                        <div className="bar" style={{height: this.state.chosenRates[index] + "%"}}>
                                        {currency}
                                        </div>))}

                                        {/* {Object.keys(this.state.chosenKeys).map(currency => (
                                        <div className="bar" style={{height: currency + "%"}}>
                                            {currency}
                                                </div>
                                            ))
                                            } */}
                                    {/* </div> */}

                                    {/* <div 
                                        onclick="alert('EUR costs 0.88 pounds')"
                                        className="bar" 
                                        style="height: 75%"> EUR <br/> € </div>*/}
                            </div>
                            <div className="chart-bottomSection"></div>
                        </div>
            
                <div className="margin-right"></div>          
            </div>
        
        );
        }
}
export default App;
