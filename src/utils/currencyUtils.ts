import axios from 'axios';

export async function getExchangeRate(fromCurrency: string, toCurrency: string): Promise<number> {
  try {
    const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    return response.data.rates[toCurrency];
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    return 1; // Default to 1 if unable to fetch
  }
}

export function formatCurrency(amount: number, currency: string): string {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return formatter.format(amount);
}

