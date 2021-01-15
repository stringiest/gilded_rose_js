/*jshint esversion: 6 */

// Removed line below so that code would work in console
// var {Shop, Item} = require('../src/gilded_rose.js');
describe("Gilded Rose", function() {

  describe("Standard items", function() {
    var items;
    var gildedRose;

    beforeEach(function() {
      items = [
        new Item("+5 Dexterity Vest", 10, 20),
        new Item("Elixir of the Mongoose", 5, 7)
      ];
      gildedRose = new Shop(items);
    });

    it("should decrease the quality by 1 per day", function() {
      for (let day = 0; day < 3; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(17);
      expect(items[1].quality).toEqual(4);
    });

    it("should decrease the sellIn by 1 per day", function() {
      for (let day = 0; day < 5; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].sellIn).toEqual(5);
      expect(items[1].sellIn).toEqual(0);
    });

    it("should decrease the quality by 2 per day on sellIn <= 0", function() {
      for (let day = 0; day < 6; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(14);
      expect(items[1].quality).toEqual(0);
    });

    it("should not decrease quality below 0", function() {
      for (let day = 0; day < 7; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(13);
      expect(items[1].quality).toEqual(0);
    });
  });

  describe("Sulfuras", function() {
    var items;
    var gildedRose;

    beforeEach(function() {
      items = [
        new Item("Sulfuras, Hand of Ragnaros", 0, 80),
        new Item("Sulfuras, Hand of Ragnaros", -1, 80)
      ];
      gildedRose = new Shop(items);
    });

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

  describe("Aged Brie", function() {
    var items;
    var gildedRose;

    beforeEach(function() {
      items = [
        new Item("Aged Brie", 4, 0),
        new Item("Aged Brie", 6, 42)
      ];
      gildedRose = new Shop(items);
    });
    it("should decrease the sellIn by 1 per day", function() {
      for (let day = 0; day < 2; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].sellIn).toEqual(2);
      expect(items[1].sellIn).toEqual(4);
    });

    it("should increase the quality by 1 per day", function() {
      for (let day = 0; day < 2; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(2);
      expect(items[1].quality).toEqual(44);
    });

    it("should increase the quality by 2 per day where sellIn <= 0", function() {
      for (let day = 0; day < 5; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(6);
      expect(items[1].quality).toEqual(47);
    });

    it("should not increase the quality above 50", function() {
      for (let day = 0; day < 9; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(14);
      expect(items[1].quality).toEqual(50);
    });
  });

  describe("Backstage passes", function() {
    var items;
    var gildedRose;

    beforeEach(function() {
      items = [
        new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
        new Item("Backstage passes to a TAFKAL80ETC concert", 10, 46),
        new Item("Backstage passes to a TAFKAL80ETC concert", 5, 46)
      ];
      gildedRose = new Shop(items);
    });

    it("should increase the quality by 1 per day where sellIn > 10", function() {
      for (let day = 0; day < 1; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(21);
    });

    it("should increase the quality by 2 per day where (5 < sellIn <=10)", function() {
      for (let day = 0; day < 1; day++) {
        gildedRose.updateQuality();
      }
      expect(items[1].quality).toEqual(48);
    });

    it("should increase the quality by 3 per day where sellIn <= 5)", function() {
      for (let day = 0; day < 1; day++) {
        gildedRose.updateQuality();
      }
      expect(items[2].quality).toEqual(49);
    });
  });
});
