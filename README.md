# RateIt - a jQuery (star) rating plugin

[RateIt](http://rateit.codeplex.com/) v1.0.22, an advanced, modern, clean jQuery plugin for mobile-friendly star rating controls.

## Usage

1. `meteor add muriloventuroso:jquery-rateit`
2. Use the template rateit with variables: starwidth, starheight, step, resetable, backingfld, value,min, max, value, readonly, bigstars. bigstar is for use stars with 32px

```html
<template name="hello">
  {{#if currentUser}}
    Rating: {{> rateit value='5' bigstars='true' readonly='true' resetable='true' starwidth='32' starheight='32'}}
  {{/if}}  
</template>

```

## Demo

* [Official demo](http://www.radioactivethinking.com/rateit/example/example.htm)

## Documentation

http://rateit.codeplex.com/documentation

## Styling

Check out [the examples](http://rateit.codeplex.com) for more styles than stars (antenna bars etc.)

## Comparison with other rating plugins

> Fast, Progressive enhancement, touch support, customizable (just swap out the images, or change some CSS), Unobtrusive JavaScript (using HTML5 data-* attributes), RTL support, supports as many stars as you'd like, and also any step size.

> Minified size: 4.35KB (1.55KB when gzipped).

> Tested on: IE6-10, Chrome 7-22, Firefox 3.6-16, Opera 10.63-12  - using jQuery 1.6.2 - 1.8.2. Touch support test on iPad iOS 4.2.1-5

RateIt can optionally use the [HTML5 range input element](http://www.html5tutorial.info/html5-range.php) - perfect for this purpose. No lame `<li>` elements or radio buttons.

The others were clearly lesser, albeit more popular, solutions:

[Star Rating](http://www.fyneworks.com/jquery/star-rating/)

- [78 open issues](http://code.google.com/p/jquery-star-rating-plugin/issues/list)
- on Google Code, not on GitHub, which means little to no pull requests
- latest update 7 months ago

[Raty](https://github.com/wbotelhos/raty)

- somewhat slow development check the issues tab)
- no mention of browser compatibility or touch support
+ has test suite

[jquery.rating](https://github.com/ripter/jquery.rating)

- only 22 commits
- no touch support, browser compatibility listing or anything
- raty is clearly better

Anyway, none of these mentioned browser compatibility or touch support. RateIt does, and it also explains clearly why it's better and different from the others:

> Why is RateIt different

> Although it does the same job as the rest of the jQuery star rating plugins, the main difference is its simplicity.
Most plugins create an element for each (partial) star, be it a div with a star background, or an img tag.
Each of these tags gets a hover event, and a click event. And on these hover/click events it has to go and talk to the other stars, telling them to change their state.

> So each star plugin does a lot of DOM alterations (adding the number of stars as elements), and adds lots of events (again the number of stars times 2).

> RateIt uses basically three divs.

Oh, and the last RateIt update? **The day before I packaged this.**

## Author, license and copyright

The MIT License (MIT)

Copyright (c) 2013 Gideon Junge

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
