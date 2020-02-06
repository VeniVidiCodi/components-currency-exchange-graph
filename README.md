
# Currency Exchange Rate Bar Chart
---

A data visualization project that uses React to represent actual currency exchange rates using an API.

The data from the API is represented through a bar graph which allows the user to select a "base" currency and to select the "rates" of other currencies, displaying their rate value by the height. The highest exchange rate value is the tallest bar and other rates chosen are displayed in proportion that highest rate.

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