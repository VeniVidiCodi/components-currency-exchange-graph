
# Currency Exchange Rate Bar Chart
---

A data visualization [chart](https://components-currency-exchange.herokuapp.com/) that uses React to represent actual currency exchange rates using an API published by the European Central Bank.

The code for this repository is a refactoring and reorganization of a previous [React project](https://github.com/VeniVidiCodi/react-chart.git) into components.

Users can select a "base" currency and the "rates" of other currencies to display their value visually by their height. The currency with the highest exchange rate will be the tallest bar and all other chosen rates are displayed in proportion to the highest.

- Add a currency to the graph by the selection dropdown.
- Remove a currency from the graph by clicking the "x" at the top of the bar.
- View the exchange rate value by clicking the "i" at the top of the bar.


This graph displays currencies in country code format:
    
| Code | Name   Country/State     |  
| ------ | ----------------------- |  
| USD | (United States - Dollar)   | 
| GBP | (Great Britain - Pound)    | 
| AUD | (Australia - Dollar)       |
| EUR | (European Union - Euro)    | 
| RUB | (Russia - Ruble)           |

### API Source: Exchange Rates API

[API (JSON format)](https://exchangeratesapi.io/)  
[API Documentation](https://api.exchangeratesapi.io/latest)