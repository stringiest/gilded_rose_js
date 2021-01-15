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

    it("should decrease the quality by 1 per day ", function() {
      for (let day = 0; day < 3; day++) {
        gildedRose.updateQuality();
      }
      expect(items[0].quality).toEqual(17);
      expect(items[1].quality).toEqual(4);
    });
  });
});