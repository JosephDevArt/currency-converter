import React from "react";

function CurrensyRow(props) {
  const {
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount
  } = props;
  //   Initially amount equals to NaN, wait untill it's assigned to number
  if (amount || amount == 0) {
    return (
      <>
        <input
          className="input"
          type="number"
          value={amount}
          onChange={onChangeAmount}
        />
        <select value={selectedCurrency} onChange={onChangeCurrency}>
          {currencyOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default CurrensyRow;
