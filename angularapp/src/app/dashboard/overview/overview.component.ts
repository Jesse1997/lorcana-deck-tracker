import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexStroke,
  ApexPlotOptions,
  ApexLegend
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
};

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})

export class OverviewComponent {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

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

  public valueCard1: Card;
  public valueCard2: Card;
  public valueCard3: Card;

  public copyCard1: Card;
  public copyCard2: Card;
  public copyCard3: Card;

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

        var sortedByValue = this.deckCards.sort((a, b) => b.price - a.price);
        if (sortedByValue.length >= 1) this.valueCard1 = sortedByValue[0];
        if (sortedByValue.length >= 2) this.valueCard2 = sortedByValue[1];
        if (sortedByValue.length >= 3) this.valueCard3 = sortedByValue[2];
    
        var sortedByAmount = this.deckCards.sort((a, b) => b.amount - a.amount);
        if (sortedByAmount.length >= 1) this.copyCard1 = sortedByAmount[0];
        if (sortedByAmount.length >= 2) this.copyCard2 = sortedByAmount[1];
        if (sortedByAmount.length >= 3) this.copyCard3 = sortedByAmount[2];
      });}, error => console.error(error));

    http.get<Card[]>('/cards/all').subscribe(result => {
      this.cards = result;
      this.totalEnchantedCards = this.cards.filter(x => x.isBorderless).length;
      this.totalFoilCards = this.cards.filter(x => !x.isBorderless && x.isFoil).length;
      this.totalNormalCards = this.cards.filter(x => !x.isBorderless && !x.isFoil).length;

      this.chartOptions = {
        series: [
          {
            name: "Actual",
            data: [
              {
                x: "Total",
                y: this.deckCards.length,
                goals: [
                  {
                    name: "Max",
                    value: this.cards.length,
                    strokeWidth: 5,
                    strokeColor: "#775DD0"
                  }
                ]
              },
              {
                x: "Enchanted",
                y: this.enchantedCards,
                goals: [
                  {
                    name: "Max",
                    value: this.totalEnchantedCards,
                    strokeWidth: 5,
                    strokeColor: "#775DD0"
                  }
                ]
              },
              {
                x: "Foil",
                y: this.foilCards,
                goals: [
                  {
                    name: "Max",
                    value: this.totalFoilCards,
                    strokeWidth: 5,
                    strokeColor: "#775DD0"
                  }
                ]
              },
              {
                x: "Normal",
                y: this.normalCards,
                goals: [
                  {
                    name: "Max",
                    value: this.totalNormalCards,
                    strokeWidth: 5,
                    strokeColor: "#775DD0"
                  }
                ]
              },
            ]
          }
        ],
        chart: {
          height: 350,
          type: "bar"
        },
        plotOptions: {
          bar: {
            horizontal: true
          }
        },
        colors: ["#00E396"],
        dataLabels: {
          formatter: function (val: string, opts) {
            const goals =
              opts.w.config.series[opts.seriesIndex].data[opts.dataPointIndex]
                .goals;
  
            if (goals && goals.length) {
              return `${val} / ${goals[0].value}`;
            }
            return val;
          }
        },
        legend: {
          show: true,
          showForSingleSeries: true,
          customLegendItems: ["Current", "Max"],
          markers: {
            fillColors: ["#00E396", "#775DD0"]
          }
        }
      };
    }, error => console.error(error));
  }
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
