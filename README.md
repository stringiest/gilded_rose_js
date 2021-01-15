# Gilded rose tech test

This is a well known kata developed by [Terry Hughes](http://iamnotmyself.com/2011/02/13/refactor-this-the-gilded-rose-kata/). This is commonly used as a tech test to assess a candidate's ability to read, refactor and extend legacy code.  The text of the kata is [here](/kata_text.md).

## The brief:

Choose [legacy code](https://github.com/emilybache/GildedRose-Refactoring-Kata) (translated by Emily Bache) in the language of your choice. The aim is to practice good design in the language of your choice. Refactor the code in such a way that adding the new "conjured" functionality is easy.

## Planning notes

Working with legacy code will require a different approach to starting from scratch.   Broadly-speaking, my plan is to:
1. Review the legacy code & spec to understand the rules for how the items change in quality. ✅
2. Create a flow chart, describing the logic for this.
3. Create a table describing how each item changes in quality ✅
4. Use `texttest_fixture.js` and the console to check that understanding of legacy code is correct.  ✅
  a. amended some of the code to make testing work in the console - removing reference to 'export' in `gilded_rose.js`, and reference to 'process' in `texttest_fixture.js`.  This allowed me to confirm that the legacy code was behaving as I had expected.  I then removed `texttest_fixture.js` from `SpecRunner.html`, as it will not now be needed for testing.
5. Add some tests `gilded_rose_spec.js` to check that the legacy code is performing correctly. ✅
6. Make any necessary changes to existing code so that the tests pass. ✅ (n/a)
7. Refactor the code where possible.
8. Use TDD to add the new item
9. Create documentation for the code, so that other newcomers are able to understand how it works, what changes have been made, and why.

### Flow Chart
*to follow*

### Table of goods & properties

| Category  | Aged Brie | Sulfuras  | Backstage passes  | Conjured  | Standard  |
| --- | --- | --- | --- | --- | --- |
| Quality change  | +1/day | n/a | +1/day | -2/day default | -1/day default |
|   |  +2/day, sellIn < 0 | n/a  | +2/day, sellIn <= 10 | -4/day, sellIn < 0  | -2/day, sellIn < 0  |
|   |   |   | +3/day, sellIn <= 5 |   |   |
|   |   |   |  Drop to 0, sellIn < 0 |   |   |
| Quality minimum | 0 | 0 | 0 | 0 | 0 |
| Quality maximum | 50  | n/a  | 50  | 50  | 50  |
| SellIn changes| -1/day | n/a  | -1/day  | -1/day  | -1/day  |

### Inferred from legacy code rather than from spec
1. Items are not removed from inventory once quality reaches zero.
2. Backstage passes quality increases by 1 per day for sellIn > 10, 2 per day for sellIn 6-10 and 3 per day for sellIn < 6.
3. Brie quality appears to increase by 2 per day from sellIn < 0.

## Refactoring
1. Moved
```js
if(this.items[i].name != 'Sulfuras, Hand of Ragnaros'){foo()}
```
to be first argument.  This avoids repetition throughout the code, as Sulfuras never changes quality or sellIn.
