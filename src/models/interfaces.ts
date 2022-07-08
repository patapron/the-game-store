export interface Game {
  info: Info;
  cheapestPriceEver: Price;
  deals: SimpleDeal[];
}

export interface SimpleDeal {
  storeID: Number;
  dealID: String;
  price: Number;
  retailPrice: Number;
  savings: Number;
}

export interface Price {
  price: Number;
  date: Date;
}

export interface Info {
  title: String;
  steamAppID: Number;
  thumb: String;
}

export interface Deal {
  internalName: String;
  title: String;
  metacriticLink: String;
  dealID: String;
  storeID: Number;
  gameID: Number;
  salePrice: Number;
  normalPrice: Number;
  isOnSale: Number;
  savings: Number;
  metacriticScore: Number;
  steamRatingText: String;
  steamRatingPercent: Number;
  steamRatingCount: Number;
  steamAppID: Number;
  releaseDate: Date;
  lastChange: Date;
  dealRating: Number;
  thumb: String;
}

export interface GameStore {
  storeID: Number;
  storeName: String;
  isActive: Boolean;
  images: Image;
}

export interface Image{
    banner: String;
    logo: String;
    icon: String;
}
