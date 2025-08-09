const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amount = document.getElementById("amount");
const result = document.getElementById("result");
const convertBtn = document.getElementById("convertBtn");

const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

// Fetch currency list and populate dropdowns
async function loadCurrencies() {
    try {
        const res = await fetch(apiURL);
        const data = await res.json();

        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            let option1 = document.createElement("option");
            let option2 = document.createElement("option");

            option1.value = currency;
            option1.textContent = currency;
            option2.value = currency;
            option2.textContent = currency;

            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });

        fromCurrency.value = "USD";
        toCurrency.value = "INR";
    } catch (error) {
        result.textContent = "Error loading currencies.";
    }
}

// Convert currency
async function convertCurrency() {
    let from = fromCurrency.value;
    let to = toCurrency.value;
    let amt = parseFloat(amount.value);

    if (isNaN(amt) || amt <= 0) {
        result.textContent = "Please enter a valid amount.";
        return;
    }

    try {
        const res = await fetch(`https://api.exchangerate-api.com/v4/latest/${from}`);
        const data = await res.json();

        let rate = data.rates[to];
        let converted = (amt * rate).toFixed(2);

        result.textContent = `${amt} ${from} = ${converted} ${to}`;
    } catch (error) {
        result.textContent = "Error fetching exchange rate.";
    }
}

convertBtn.addEventListener("click", convertCurrency);

loadCurrencies();
