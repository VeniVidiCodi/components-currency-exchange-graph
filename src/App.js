import React, { Component } from "react";
import './App.css';

class App extends Component {
  // Define starting state
    state = {
        rates: [],
        date: "",
        base: "",
    };
// ==========================================================================

  // Define methods. Must have for forms.
    onBaseChange = (ev) => {
        console.log("Base Currency Changed");
        const value = ev.target.value;
        this.setState({ // Modify state
            base: value,
            rates: value,
        });
    }

  // Special method called when page loads
  // useful for fetching initial data
    componentDidMount = () => {
        console.log('Component is mounting');
        this.onRefresh();     // Automatically load in page with a fetch
    }

    onRefresh = () => {
        fetch("https://api.exchangeratesapi.io/latest")
            .then(response => response.json())
            .then(data => {
                console.log("Data received:", data);
                this.setState({
                    base: data.base,
                    date: data.date,
                    rates: data.rates,
                });   
                console.log("checking Base: ", this.state.base);
                const baseList = Object.keys(this.state.rates);
                const ratesList = Object.entries(this.state.rates);
                console.log("Base List...", baseList);
                console.log("Rates List...", ratesList);
            });
    }
    
    

    setBaseCurrency = (ev) => {
        this.setState({base: ev.target.value});
    }

    // makeBar = (ev) => {
    // }
// ==========================================================================

    render() {
        console.log("rendering page...");

        return (
            <div className="container">
                        <div className="navBar">
                            <h1>International Currency Rates</h1>
                        </div>
                        <div className="margin-left"></div>

                        <div className="chart-container">
                            <div className="chart-topSection">
                                <form>
                                    <p>Choose a Base Currency</p>
                                    <select name="base-currency-selector">
                                        {
                                            Object.keys(this.state.rates).map((currency) => (
                                                <option 
                                                    // value={}
                                                    // onClick={}
                                                >{currency}</option>
                                            ))
                                        }
                                    </select>
                                </form>
                                <h2 className="base-title">Base Currency: {this.state.base}</h2>
                                <h2 className="base-date">{this.state.date}</h2>
                            </div>
                            <div className="chart-content">
                                    {
                                        Object.keys(this.state.rates).map((currency) => (
                                            <div 
                                                className="bar" 
                                                style={{height: this.state.rates[currency]}}
                                            >{currency}</div>
                                        ))
                                    }

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
