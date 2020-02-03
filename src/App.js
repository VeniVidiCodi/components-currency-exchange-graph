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
        chosenRates: [] // ['1.7468', '98969']
    };
// ==========================================================================
    // Define methods. Must have for forms.
    selectBase = (ev) => {
        // console.log('1');
        // console.log('EV.TARGET.VALUE', ev.target.value);
        this.setState({ base: ev.target.value }, this.updateInfo);

        // console.log("Selecting New Base Currency...");
        // console.log('base at select', this.state.base);
    }

    updateInfo = () => {
        // console.log('BASE', this.state.base);
        this.onRefresh();
        // console.log(this.state.rates);
    }

    selectRate = (ev) => {
        let choice = ev.target.value;
        let chosenKeysUpdate = this.state.chosenKeys.concat(choice);
        this.setState({ chosenKeys: chosenKeysUpdate });

        let chosenRate = this.state.rates[choice];
        let chosenRatesUpdate = this.state.chosenRates.concat(chosenRate);
        this.setState({ chosenRates: chosenRatesUpdate });
            
        // console.log("FilterCHECK", chosenKeys.filter(key => (key of this.state.rates) ?)
        // let values = Object.values(rates);
        // let chosenValues = this.state.chosenRates.concat(values);
        // this.setState({ chosenRates: chosenValues });

        // {
        //     (key === (rate in rates)) ? (
        //         chosenRates().concat(rate.values)
        //         ): null; 
        // }
        // this.checkRateList();
        // this.makeBar();
        // this.rateBar();
    }

    // rateBar = () => {
    //     const rates = this.state.rates;
    //     const chosenRates = this.state.chosenRates;
    //     const chosenKeys = this.state.chosenKeys;
        
    //     rates.includes(rateList) ? (
    //     this.state.rates.map((currency) => (
    //         <div className="bar" style={{height: currency + "%"}}>
    //         {currency}
    //          </div>
    //     ))): null
        

    
        // Object.keys(this.state.chosenRates).map(rate,  => ( 
        //     <div className="bar" style={{height: currency.percentage + "%"}}>
        //     {}
        //     </div>
    //     // ))
    // }



    // makeBar = () => {
        // console.log("Cont...", this.state.rates);
        // const rateKeys = Object.keys(this.state.rates);
        // console.log('rateKeys:::', rateKeys);
        // const rateListKeys = chosenRates.map((rateKeys) =>(
            
        // ));
        // console.log('rateListKeys:::', rateListKeys);


        // (rates.filter(key => this.state.rates[key].main == true)) ? {

        
        // rates.map((code, rate) => (
        //     (rate in this.state.chosenRates) ? (
        //         <div>
        //             {rate}
        //         </div>
        //     ): (
        //         null
        //     )
        // ))
    // }

    // checkRateList = () => {
    //     // if new value in chosen keys is in rates array {
    //     //     then push key value pair to chosenRates
    //     // }
    //     console.log("checkRateList", this.state.rates);
    //     console.log("checkChosenKeys", this.state.chosenKeys);
    //     console.log("checkChosenRates", this.state.chosenRates);
    // }



    // recordItem = () => {
    //     console.log('-------- recordItem');

    //     // Fetch the inputs from the page (and console.log for debugging)
    //     let currencyItem = this.state.rates(item, value);
    //     let currencyCode = currencyItem[item];
    //     let currencyValue = currencyItem[value];
    //     console.log('Currency Inputs:', currencyCode, currencyValue);

    //     // Get the value of the inputs (and console.log for debugging)
    //     let name = nameInput.value;
    //     let powerLevel = powerInput.value;
    //     console.log('Values:', name, powerLevel);

    //     // Challenge 4:
    //     if (name === '') {
    //         return; // End the function, prevent an empty input
    //     }

    //     // Push the new info onto the array & rerender
    //     let pair = [powerLevel, name];
    //     powerLevels.push(pair);
    //     render();

    //     // Challenge 4:
    //     powerInput.value = '';
    //     nameInput.value = '';
    // }


    // Renders bars in chart
    addRateBar = (ev) => {
        // this.setState.chosenRates().push()
        console.log('2');
        const value = ev.target.value;
        this.setState.ratesList({
            rate: value,
        });
    }

    // removeRateBar = (ev) => {
    //     console.log('3');
    //     console.log("Testing RemoveBar");
    //     // return chosenRates List without selcted value (bar clicked)
    //     this.setState({})
    // }
    removeRate = (array, rate) => {
    // if the rate is in the array, slice it 
        const chosenRates = array.slice(); // duplicating array
        const newChosenRates = chosenRates.filter((rate) => rate !== array);
        return newChosenRates;
    }

    removeBar = (ev) => {
        // when displayed bar is clicked, 
        // remove that bar from ratesList
        // refresh the page 
    }

//    barHeight = () => {
//     //    TODO here
//     }




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

                // Do state set for real data
                this.setState({
                    base: data.base,
                    date: data.date,
                    rates: data.rates,
                });              
            });
    }

// ==========================================================================
// ==========================================================================

    render() {
        // console.log('6');
        console.log("rendering page...");
        console.log("chosen keys: ", this.state.chosenKeys);
        // console.log(this.state.rates["HKD"]);
        console.log("rates: ", this.state.rates);
        console.log("base: ", this.state.base);
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
                                    {/* {rateList} */}

                                    <div className="BarChart">
                                        {this.rateBar}
                                    </div>

                                    {/* {
                                        this.state.chatLog.map(text => (
                                            <p>Message: {text}</p>
                                        ))
                                    }
                                    <input onChange={this.onMessageChange}
                                        value={this.state.message} />
                                    <button onClick={() => alert("Hi")}>
                                        <img src={sendIcon} />
                                        Send message
                                    </button> */}

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
