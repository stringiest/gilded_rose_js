/*jshint esversion: 6 */

// Removed line below so that code would work in console
// var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  describe("Standard items", function() {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Elixir of the Mongoose", 5, 7)
    ];
    const gildedRose = new Shop(items);

    it("should decrease the quality by 1 per day", function() {
      for (let day = 0; day < 3; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(17);
      expect(items[1].quality).toEqual(4);
    });

    it("should decrease the sellIn by 1 per day", function() {
      for (let day = 0; day < 2; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].sellIn).toEqual(5);
      expect(items[1].sellIn).toEqual(0);
    });

    it("should decrease the quality by 2 per day on sellIn <= 0", function() {
      for (let day = 0; day < 1; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(14);
      expect(items[1].quality).toEqual(0);
    });

    it("should not decrease quality below 0", function() {
      for (let day = 0; day < 1; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(13);
      expect(items[1].quality).toEqual(0);
    });
  });

  describe("Sulfuras", function() {
    const items = [
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80)
    ];
    const gildedRose = new Shop(items);

    it("should not decrease quality over time", function() {
      for (let day = 0; day < 3; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(80);
      expect(items[1].quality).toEqual(80);
    });

    it("should not decrease sellIn over time", function() {
      for (let day = 0; day < 3; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].sellIn).toEqual(0);
      expect(items[1].sellIn).toEqual(-1);
    });
  });
});
