document.addEventListener("DOMContentLoaded", function() {
    const currencyFrom = document.querySelector(".currency-from");
    const currencyTo = document.querySelector(".currency-to");
    const inputCurrency = document.querySelector(".input-currency");
    const convertButton = document.querySelector(".convert-button");
    const resultDisplay = document.querySelector(".result");

    async function convertCurrency() {
        const fromCurrency = currencyFrom.value.toUpperCase();
        const toCurrency = currencyTo.value.toUpperCase();
        const amount = parseFloat(inputCurrency.value);

        if (isNaN(amount) || amount <= 0) {
            alert("Por favor ingresa un valor numérico válido.");
            return;
        }

        try {
           // const cors = require('cors');
           //app.use(cors());
            const response = await fetch('/convert?from=USD&to=BRL&amount=100');
            const data = await response.json();

            if (data && data.conversion_rates) {
                const exchangeRate = data.conversion_rates[toCurrency];
                if (exchangeRate) {
                    const convertedAmount = (amount * exchangeRate).toFixed(2);
                    resultDisplay.textContent = `${getCurrencySymbol(toCurrency)} ${convertedAmount}`;
                } else {
                    alert("No se encontró el tipo de cambio para las monedas seleccionadas.");
                }
            } else {
                alert("Hubo un problema al obtener los datos de la API.");
            }
        } catch (error) {
            console.error("Hubo un error al obtener los datos:", error);
            alert("Hubo un error al obtener los datos. Por favor, inténtalo de nuevo más tarde.");
        }
    }

    function getCurrencySymbol(currency) {
        switch (currency) {
            case "BRL":
                return "R$";
            case "USD":
                return "US$";
            case "EUR":
                return "€";
            case "BTC":
                return "₿";
            default:
                return "";
        }
    }

    convertButton.addEventListener("click", convertCurrency);
});
