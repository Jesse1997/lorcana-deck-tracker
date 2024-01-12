import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { faAdd, faFilter, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent {
  public deckCards?: Card[];
  public filteredDeckCards?: Card[];

  public viewCards = false;
  public viewNames = false;
  public viewSubnames = false;

  public addedCard?: Card = null;
  public removedCard?: Card = null;
  public http: HttpClient;

  public totalCards: number = 0;
  public enchantedCards: number = 0;
  public totalEnchantedCards: number = 0;
  public foilCards: number = 0;
  public totalFoilCards: number = 0;
  public normalCards: number = 0;
  public totalNormalCards: number = 0;

  public totalValue: number = 0;
  public enchantedValue: number = 0;
  public foilValue: number = 0;
  public normalValue: number = 0;


  faAdd = faAdd;
  faMin = faMinus;
  faFilter = faFilter;

  public cards: Card[];

  constructor(http: HttpClient) {
    http.get<Card[]>('/cards').subscribe(result => {
      this.deckCards = result;
      this.deckCards.forEach(element => {
        this.totalCards += element.amount;
        this.totalValue += element.price * element.amount;

        if(element.isBorderless){
          this.enchantedCards += 1;
          this.enchantedValue += element.amount * element.price;
        }

        if(!element.isBorderless && element.isFoil){
          this.foilCards += 1;
          this.foilValue += element.amount * element.price;
        }

        if(!element.isBorderless && !element.isFoil){
          this.normalCards += 1;
          this.normalValue += element.amount * element.price;
        }

        this.filteredDeckCards = this.deckCards;
      });
    this.http = http;
    }, error => console.error(error));

    http.get<Card[]>('/cards/all').subscribe(result => {
      this.cards = result;
      this.totalEnchantedCards = this.cards.filter(x => x.isBorderless).length;
      this.totalFoilCards = this.cards.filter(x => !x.isBorderless && x.isFoil).length;
      this.totalNormalCards = this.cards.filter(x => !x.isBorderless && !x.isFoil).length;
    this.http = http;
    }, error => console.error(error));
  }

  public showCards() {
    this.viewCards = true;
  }

  public hideCards() {
    this.viewCards = false;
  }

  public async addCard(card: Card){
    (document.getElementById('searchFilter') as HTMLInputElement).value = '';
    this.http.post<Card[]>('/cards', card).subscribe(async result => {
      this.deckCards = result;
      this.filteredDeckCards = result;

      this.cards.find(x => x.name == card.name && x.subname == card.subname && x.isFoil == card.isFoil && x.isBorderless == card.isBorderless).amount += 1;
      this.addedCard = this.deckCards.find(x => x.name == card.name && x.subname == card.subname && x.isFoil == card.isFoil && x.isBorderless == card.isBorderless);
      this.totalCards += 1;
      this.totalValue += card.price;

      if(card.isBorderless){
        if (card.amount == 1) this.enchantedCards += 1;
        this.enchantedValue += card.price;
      }

      if(!card.isBorderless && card.isFoil){
        if (card.amount == 1) this.foilCards += 1;
        this.foilValue += card.price;
      }

      if(!card.isBorderless && !card.isFoil){
        if (card.amount == 1) this.normalCards += 1;
        this.normalValue += card.price;
      }

      await this.sleep(5000);
      this.addedCard = null;
    }, error => console.error(error));
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  public async deleteCard(card: Card){
    this.http.post<Card[]>('/cards/delete', card).subscribe(async result => {
      this.deckCards = result;
      this.filteredDeckCards = result;

      this.cards.find(x => x.name == card.name && x.subname == card.subname && x.isFoil == card.isFoil && x.isBorderless == card.isBorderless).amount -= 1;
      this.removedCard = card;
      this.totalCards -= 1;
      this.totalValue -= card.price;

      if(card.isBorderless){
        if (card.amount == 1) this.enchantedCards -= 1;
        this.enchantedValue -= card.price;
      }

      if(!card.isBorderless && card.isFoil){
        if (card.amount == 1) this.foilCards -= 1;
        this.foilValue -= card.price;
      }

      if(!card.isBorderless && !card.isFoil){
        if (card.amount == 1) this.normalCards -= 1;
        this.normalValue -= card.price;
      }
      await this.sleep(5000);
      this.removedCard = null;
    }, error => console.error(error));
  }

  getFilteredCards() :Card[]{
    let searchFilter = (document.getElementById('searchFilter') as HTMLInputElement).value;

    return this.cards.filter(x => x.name.toLowerCase().includes(searchFilter.toLowerCase()) || x.subname.toLowerCase().includes(searchFilter.toLowerCase())).slice(0, 15)
  } 

  getFilteredNames() :string[]{
    let filterName = (document.getElementById('nameFilter') as HTMLInputElement).value;

    var names = this.deckCards.map(x => x.name).filter(x => x.toLowerCase().includes(filterName.toLowerCase())).slice(0, 15)

    return [... new Set(names)]
  }

  addName(value: string) {
    (document.getElementById('nameFilter') as HTMLInputElement).value = value;
  }

  public showNames() {
    this.viewNames = true;
    this.setFilteredDeckCards();
  }

  public hideNames() {
    this.viewNames = false;
  }

  getFilteredSubnames() :string[]{
    let filterSubname = (document.getElementById('subnameFilter') as HTMLInputElement).value;

    var subnames = this.deckCards.map(x => x.subname).filter(x => x.toLowerCase().includes(filterSubname.toLowerCase())).slice(0, 15)

    return [... new Set(subnames)]
  }

  addSubname(value: string) {
    (document.getElementById('subnameFilter') as HTMLInputElement).value = value;
  }

  public showSubnames() {
    this.viewSubnames = true;
    this.setFilteredDeckCards();
  }

  public hideSubnames() {
    this.viewSubnames = false;
  }

  public filter() {
    this.setFilteredDeckCards();
  }

  setFilteredDeckCards(){
    this.filteredDeckCards = this.deckCards.filter(
      x => x.subname.toLowerCase().includes((document.getElementById('subnameFilter') as HTMLInputElement).value.toLowerCase()) && 
      x.name.toLowerCase().includes((document.getElementById('nameFilter') as HTMLInputElement).value.toLowerCase()) && 
      x.type.includes((document.getElementById('cardType') as HTMLInputElement).value) &&
      ((((document.getElementById('isBorderless') as HTMLInputElement).checked) && x.isBorderless) || !((document.getElementById('isBorderless') as HTMLInputElement).checked)) &&
      ((((document.getElementById('isFoil') as HTMLInputElement).checked) && x.isFoil) || !((document.getElementById('isFoil') as HTMLInputElement).checked)) &&
      (x.amount >= (((document.getElementById('min-amount') as HTMLInputElement).value) as unknown as number) || ((document.getElementById('min-amount') as HTMLInputElement).value) == "") &&
      (x.amount <= (((document.getElementById('max-amount') as HTMLInputElement).value) as unknown as number) || ((document.getElementById('max-amount') as HTMLInputElement).value) == "" || (((document.getElementById('max-amount') as HTMLInputElement).value) as unknown as number) == 0) &&
      (x.price * x.amount >= (((document.getElementById('min-value') as HTMLInputElement).value) as unknown as number) || ((document.getElementById('min-value') as HTMLInputElement).value) === "") &&
      (x.price * x.amount <= (((document.getElementById('max-value') as HTMLInputElement).value) as unknown as number) || ((document.getElementById('max-value') as HTMLInputElement).value) === "" || (((document.getElementById('max-value') as HTMLInputElement).value) as unknown as number) == 0))
  }

  clearFilters() {
    this.filteredDeckCards = this.deckCards;
    (document.getElementById('subnameFilter') as HTMLInputElement).value = '';
    (document.getElementById('nameFilter') as HTMLInputElement).value = '';
    (document.getElementById('cardType') as HTMLInputElement).value = '';
    (document.getElementById('isBorderless') as HTMLInputElement).checked = false;
    (document.getElementById('isFoil') as HTMLInputElement).checked = false;
    (document.getElementById('min-amount') as HTMLInputElement).value = '';
    (document.getElementById('max-amount') as HTMLInputElement).value = '';
    (document.getElementById('min-value') as HTMLInputElement).value = '';
    (document.getElementById('max-value') as HTMLInputElement).value = '';
  }

  title = 'My Deck';
}

interface Card {
  name: string;
  subname: string;
  type: string;
  price: number;
  isFoil: boolean;
  isBorderless: boolean;
  amount: number;
}
