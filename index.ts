// @ts-ignore
import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

interface FinancialData {
  date: string;
  value: number;
}

class Repository {

    static apiToken = "b0f21c0ee9ebf00cac5f4d5015e8fd9d0a6b01c8"
    static cpiUsUrl = "https://www.econdb.com/api/series/CPIus/?API_TOKEN=" + this.apiToken + "&format=json"
    static cpiFrUrl = "https://www.econdb.com/api/series/CPIfr/?API_TOKEN=" + this.apiToken + "&format=json"
    static gdpUsUrl = "https://www.econdb.com/api/series/GDPus/?API_TOKEN=" + this.apiToken + "&format=json"
    static gdpFrUrl = "https://www.econdb.com/api/series/GDPfr/?API_TOKEN=" + this.apiToken + "&format=json"

  constructor() {}

  static async getCPIus(): Promise<FinancialData> {
    try {
      const response: AxiosResponse<FinancialData> = await axios.get(this.cpiUsUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      throw error;
    }
  }

  static async getCPIfr(): Promise<FinancialData> {
    try {
      const response: AxiosResponse<FinancialData> = await axios.get(this.cpiFrUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      throw error;
    }
  }

  static async getGDPfr(): Promise<FinancialData> {
    try {
      const response: AxiosResponse<FinancialData> = await axios.get(this.gdpUsUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      throw error;
    }
  }

  static async getGDPus(): Promise<FinancialData> {
    try {
      const response: AxiosResponse<FinancialData> = await axios.get(this.gdpFrUrl);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
      throw error;
    }
  }
}

const app = express();

app.get('/financial/cpi/us', (req: Request, res: Response) => {
  try {
    Repository.getCPIus().then(response => res.json(response));
  } catch (error) {
    res.status(401).json({ error: 'An error occurred while fetching CPI data for the US.' });
  }
});

app.get('/financial/gdp/us', (req: Request, res: Response) => {
  try {
    Repository.getGDPus().then(response => res.json(response));
  } catch (error) {
    res.status(401).json({ error: 'An error occurred while fetching GDP data for the US.' });
  }
});

app.get('/financial/gdp/fr', (req: Request, res: Response) => {
  try {
    Repository.getGDPfr().then(response => res.json(response));;
  } catch (error) {
    res.status(401).json({ error: 'An error occurred while fetching GDP data for France.' });
  }
});

app.get('/financial/cpi/fr', (req: Request, res: Response) => {
  try {
    Repository.getCPIfr().then(response => res.json(response));
  } catch (error) {
    res.status(401).json({ error: 'An error occurred while fetching CPI data for France.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
