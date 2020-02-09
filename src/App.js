import React, { Component } from 'react';
import './App.css';
import Nav from './components/Nav/Nav.js';
import Chart from './components/Chart/Chart.js';

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

    // selectRate = (ev) => {
    //     let choice = ev.target.value;
    //     let chosenKeysUpdate = this.state.chosenKeys.concat(choice);
    //     this.setState({ chosenKeys: chosenKeysUpdate });

    //     let chosenRate = this.state.rates[choice];
    //     let chosenRatesUpdate = this.state.chosenRates.concat(chosenRate);
    //     let heightUpdate = this.calculateBarHeight(chosenRatesUpdate);

    //     this.setState({ chosenRates: chosenRatesUpdate, 
    //                     barHeights: heightUpdate,
    //                   });
    // }

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
                // let newBarHeights = this.calculateBarHeight(newChosenRates);

                // Do state set for real data
                this.setState({
                    date: data.date,
                    rates: data.rates,
                    chosenRates: newChosenRates,
                    // barHeights: newBarHeights,
                });              
            });
    }

// ==========================================================================
// ==========================================================================

    render() {
        // console.log("rendering page...");
        // console.log("chosen keys: ", this.state.chosenKeys);
        // console.log("chosenRates: ", this.state.chosenRates);
        // console.log("barHeights: ", this.state.barHeights);

        return (

            <div className="container">
                    <Nav />
                <div className="margin-left"></div>
                    <Chart 
                        data={this.state.data}
                        date={this.state.date}
                        base={this.state.base}
                        baseSelectorValue={this.state.base}
                        baseSelectorRates={this.state.ChosenRates}
                        selectBase={this.selectBase}
                        rates={this.state.rates}
                        rateSelectorValue={this.state.rates}
                        selectRate={this.selectRate}
                        barHeights={this.state.barHeights}
                        removeBar={this.removeBar}
                        chosenRates={this.state.chosenRates}
                        chosenKeys={this.state.chosenKeys}/>
                <div className="margin-right"></div>
            </div>
        );
        }
}
export default App;
