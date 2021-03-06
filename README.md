# README
## Calulator
**Calculator** is a simple JavaScript calculator. It is written in vanilla JavaScript.

![](img/readme.png)

### Author / Contact
* ![](https://dl.dropboxusercontent.com/u/633848/Images/github_24_black.png) [github](http://www.github.com/argoncode)
* ![](https://dl.dropboxusercontent.com/u/633848/Images/twitter.png) [twitter](http://twitter.com/argoncode)
* [personal website](http://argoncode.com/contact)

### Used tech and libraries
1. HTML
2. CSS - flexbox layout, no frameworks.
3. JavaScript. Vanilla, no frameworks. Procedural approach.
4. Getting keyboard codes: [www.asquare.net/javascript/tests/KeyCode.html](http://www.asquare.net/javascript/tests/KeyCode.html).

## Takes into account:
1. Floating points are ignored after one is already present.
2. Pressing operator more than once:
  * if the operator is the same, nothing happens,
  * if the operator is different than before, it gets updated.
3. When the operation is calculated, it is displayed, and the number can be treated as if it was entered manually.
4. It can be operated by clicking on the calculator or using keyboard keys. Numeric keypad should work on any layout. Keyboard `*`, `+`, `-`, `=`, `/` are set-up using generic US and Polish programmer layouts. It should work in most keyboards. No promises made though :)
  * Use `escape` to clear all.
  * Use `delete` to delete last.

## Does not take into account:
1. Order of operation is not taken into account. E.g.: inputing `3 + 2 * 2` will result in `10` not in `7`.

## Copying / License
1. MIT
2. LINKWARE for favicons: [pelfusion.com](http://www.pelfusion.com).

## Bugs
1. Report via pull request and/or comments.
2. Current bugs are on [github issus](https://github.com/ArgonCode/calculator/issues) and [waffle](https://waffle.io/ArgonCode/calculator).
