import React, { useEffect, useState } from "react";

import "./App.scss";
import CurrensyRow from "./CurrensyRow";

const BASE_URL = "https://api.exchangeratesapi.io/latest";

function App() {
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [exchangeRate, setExchangeRate] = useState();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  let toAmount, fromAmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    toAmount = amount;
    fromAmount = amount / exchangeRate;
  }
  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        const firstCurrency = Object.keys(data.rates)[0];
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  useEffect(() => {
    if (fromCurrency != null && toCurrency != null) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(response => response.json())
        .then(data => setExchangeRate(data.rates[toCurrency]));
    }
  }, [fromCurrency, toCurrency]);

  function handleFromAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(true);
  }
  function handleToAmountChange(event) {
    setAmount(event.target.value);
    setAmountInFromCurrency(false);
  }

  return (
    <div className="App">
      <h1>Converter</h1>
      <CurrensyRow
        selectedCurrency={fromCurrency}
        currencyOptions={currencyOptions}
        onChangeCurrency={e => setFromCurrency(e.target.value)}
        amount={Math.round(fromAmount * 100) / 100}
        onChangeAmount={handleFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrensyRow
        selectedCurrency={toCurrency}
        currencyOptions={currencyOptions}
        onChangeCurrency={e => setToCurrency(e.target.value)}
        amount={Math.round(toAmount * 100) / 100}
        onChangeAmount={handleToAmountChange}
      />
    </div>
  );
}

export default App;
