export type CompanyInfo = {
  description: string,
  displaySymbol: string,
  symbol: string,
  type: string
}

export type QuoteInfo =  {
    "c": number,
    "d": number,
    "dp": number,
    "h": number,
    "l": number,
    "o": number,
    "pc": number,
    "t": number,
}

export type StockQuote = {
  company: CompanyInfo,
  quote: QuoteInfo
}
