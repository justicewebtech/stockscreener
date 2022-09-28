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

export type MonthlySentiment = {
    "symbol": string,
    "year": number,
    "month": number,
    "change": number,
    "mspr": number
}

export type Sentiment = {
  symbol: string,
  data: MonthlySentiment[]
}

export type CompanySentiment = {
  company: CompanyInfo,
  sentiment: Sentiment
}
