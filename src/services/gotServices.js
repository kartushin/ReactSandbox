export default class GotService {
  constructor() {
    this._apiBase = "https://www.anapioficeandfire.com/api";
  }

  async getResource(url) {
    const res = await fetch(`${this._apiBase}${url}`);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, Status: ${res.status}`);
    }

    return await res.json();
  }
  async getAllCharacters() {
    const charAll = await this.getResource("/characters?page=5&pageSize=10");
    return charAll.map(this._transformCharacter);
  }
  async getCharacter(id) {
    const char = await this.getResource(`/characters/${id}`);
    return this._transformCharacter(char);
  }
  async getAllHouses() {
    const houses = await this.getResource(`/houses/`);
    return houses.map(this._transformHouses);
  }
  async getHouse(id) {
    const house = await this.getResource(`/houses/${id}/`);
    return this._transformHouses(house);
  }
  async getAllBook() {
    const books = await this.getResource(`/books/`);
    return books.map(this._transformBook);
  }
  async getBook(id) {
    const book = await this.getResource(`/books/${id}/`);
    return this._transformBook(book);
  }

  isSet = (data) => {
    if (data) {
      return data;
    } else {
      return "unknown";
    }
  };

  _transformCharacter(char) {
    return {
      name: char.name,
      gender: char.gender,
      born: char.born,
      died: char.died,
      culture: char.culture
    };
  }
  _transformHouses(house) {
    return {
      name: house.name,
      region: house.region,
      words: house.words,
      titles: house.titles,
      overlord: house.overlord,
      ancestralWeapons: house.ancestralWeapons
    };
  }
  _transformBook(book) {
    return {
      name: book.name,
      numberOfPages: book.numberOfPages,
      publiser: book.publiser,
      released: book.released
    };
  }
}
