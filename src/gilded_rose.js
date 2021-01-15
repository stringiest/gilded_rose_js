/*jshint esversion: 6 */

class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].quality > 0) {
            if (this.items[i].name.startsWith('Conjured')) {
              //reduces quality of normal goods by 1 every day
              this.items[i].quality = this.items[i].quality - 2;
            } else {
              this.items[i].quality = this.items[i].quality - 1;
            }
          }
        } else {
          if (this.items[i].quality < 50) {
            // normal quality increase of 1 for aged brie and backstage passes
            this.items[i].quality = this.items[i].quality + 1;
            if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
              // quality increase bonus for sellIn < 11 for backstage passes
              if (this.items[i].sellIn < 11) {
                if (this.items[i].quality < 50) {
                  this.items[i].quality = this.items[i].quality + 1;
                }
              }
              // quality increase bonus for sellIn < 6 for backstage passes
              if (this.items[i].sellIn < 6) {
                if (this.items[i].quality < 50) {
                  this.items[i].quality = this.items[i].quality + 1;
                }
              }
            }
          }
        }
        // reduces SellIn by 1 for all products except Sulfaras
        this.items[i].sellIn = this.items[i].sellIn - 1;

        // reduces quality of normal goods by an additional 1 if sellIn < 0
        if (this.items[i].sellIn < 0) {
          if (this.items[i].name != 'Aged Brie') {
            if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
              if (this.items[i].quality > 0) {
                if (this.items[i].name.startsWith('Conjured')) {
                  this.items[i].quality = this.items[i].quality - 2;
                } else {
                  this.items[i].quality = this.items[i].quality - 1;
                }
              }
            } else {
              // reduces quality to zero for backstage passes
              this.items[i].quality = this.items[i].quality - this.items[i].quality;
            }
          } else {
            // increases quality of aged brie by an additional 1 per day up to quality = 50
            if (this.items[i].quality < 50) {
              this.items[i].quality = this.items[i].quality + 1;
            }
          }
        }
      }
    }

    return this.items;
  }
}
// module.exports = {
//   Item,
//   Shop
// };
