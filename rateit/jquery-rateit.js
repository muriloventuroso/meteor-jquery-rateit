(function () {

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                                   //
// packages/dandv:jquery-rateit/rateit/src/jquery.rateit.js                                                          //
//                                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                                     //
﻿/*! RateIt | v1.0.22 / 05/27/2014 | https://rateit.codeplex.com/license                                             // 1
    http://rateit.codeplex.com | Twitter: @gjunge                                                                    // 2
*/                                                                                                                   // 3
(function ($) {                                                                                                      // 4
    $.rateit = {                                                                                                     // 5
        aria: {                                                                                                      // 6
            resetLabel: 'reset rating',                                                                              // 7
            ratingLabel: 'rating'                                                                                    // 8
        }                                                                                                            // 9
    };                                                                                                               // 10
                                                                                                                     // 11
    $.fn.rateit = function (p1, p2) {                                                                                // 12
        //quick way out.                                                                                             // 13
        var index = 1;                                                                                               // 14
        var options = {}; var mode = 'init';                                                                         // 15
        var capitaliseFirstLetter = function (string) {                                                              // 16
            return string.charAt(0).toUpperCase() + string.substr(1);                                                // 17
        };                                                                                                           // 18
                                                                                                                     // 19
        if (this.length === 0) { return this; }                                                                      // 20
                                                                                                                     // 21
                                                                                                                     // 22
        var tp1 = $.type(p1);                                                                                        // 23
        if (tp1 == 'object' || p1 === undefined || p1 === null) {                                                    // 24
            options = $.extend({}, $.fn.rateit.defaults, p1); //wants to init new rateit plugin(s).                  // 25
        }                                                                                                            // 26
        else if (tp1 == 'string' && p1 !== 'reset' && p2 === undefined) {                                            // 27
            return this.data('rateit' + capitaliseFirstLetter(p1)); //wants to get a value.                          // 28
        }                                                                                                            // 29
        else if (tp1 == 'string') {                                                                                  // 30
            mode = 'setvalue';                                                                                       // 31
        }                                                                                                            // 32
                                                                                                                     // 33
        return this.each(function () {                                                                               // 34
            var item = $(this);                                                                                      // 35
                                                                                                                     // 36
                                                                                                                     // 37
            //shorten all the item.data('rateit-XXX'), will save space in closure compiler, will be like item.data('XXX') will become x('XXX')
            var itemdata = function (key, value) {                                                                   // 39
                                                                                                                     // 40
                if (value != null) {                                                                                 // 41
                    //update aria values                                                                             // 42
                    var ariakey = 'aria-value' + ((key == 'value') ? 'now' : key);                                   // 43
                    var range = item.find('.rateit-range');                                                          // 44
                    if (range.attr(ariakey) != undefined) {                                                          // 45
                        range.attr(ariakey, value);                                                                  // 46
                    }                                                                                                // 47
                                                                                                                     // 48
                }                                                                                                    // 49
                                                                                                                     // 50
                arguments[0] = 'rateit' + capitaliseFirstLetter(key);                                                // 51
                return item.data.apply(item, arguments); ////Fix for WI: 523                                         // 52
            };                                                                                                       // 53
                                                                                                                     // 54
            //handle programmatic reset                                                                              // 55
            if (p1 == 'reset') {                                                                                     // 56
                var setup = itemdata('init'); //get initial value                                                    // 57
                for (var prop in setup) {                                                                            // 58
                    item.data(prop, setup[prop]);                                                                    // 59
                }                                                                                                    // 60
                                                                                                                     // 61
                if (itemdata('backingfld')) { //reset also backingfield                                              // 62
                    var fld = $(itemdata('backingfld'));                                                             // 63
                    fld.val(itemdata('value'));                                                                      // 64
                    fld.trigger('change');                                                                           // 65
                    if (fld[0].min) { fld[0].min = itemdata('min'); }                                                // 66
                    if (fld[0].max) { fld[0].max = itemdata('max'); }                                                // 67
                    if (fld[0].step) { fld[0].step = itemdata('step'); }                                             // 68
                }                                                                                                    // 69
                item.trigger('reset');                                                                               // 70
            }                                                                                                        // 71
                                                                                                                     // 72
            //add the rate it class.                                                                                 // 73
            if (!item.hasClass('rateit')) { item.addClass('rateit'); }                                               // 74
                                                                                                                     // 75
            var ltr = item.css('direction') != 'rtl';                                                                // 76
                                                                                                                     // 77
            // set value mode                                                                                        // 78
            if (mode == 'setvalue') {                                                                                // 79
                if (!itemdata('init')) { throw 'Can\'t set value before init'; }                                     // 80
                                                                                                                     // 81
                                                                                                                     // 82
                //if readonly now and it wasn't readonly, remove the eventhandlers.                                  // 83
                if (p1 == 'readonly' && p2 == true && !itemdata('readonly')) {                                       // 84
                    item.find('.rateit-range').unbind();                                                             // 85
                    itemdata('wired', false);                                                                        // 86
                }                                                                                                    // 87
                //when we receive a null value, reset the score to its min value.                                    // 88
                if (p1 == 'value') {                                                                                 // 89
                    p2 = (p2 == null) ? itemdata('min') : Math.max(itemdata('min'), Math.min(itemdata('max'), p2));  // 90
                }                                                                                                    // 91
                if (itemdata('backingfld')) {                                                                        // 92
                    //if we have a backing field, check which fields we should update.                               // 93
                    //In case of input[type=range], although we did read its attributes even in browsers that don't support it (using fld.attr())
                    //we only update it in browser that support it (&& fld[0].min only works in supporting browsers), not only does it save us from checking if it is range input type, it also is unnecessary.
                    var fld = $(itemdata('backingfld'));                                                             // 96
                    if (p1 == 'value') { fld.val(p2); }                                                              // 97
                    if (p1 == 'min' && fld[0].min) { fld[0].min = p2; }                                              // 98
                    if (p1 == 'max' && fld[0].max) { fld[0].max = p2;}                                               // 99
                    if (p1 == 'step' && fld[0].step) { fld[0].step = p2; }                                           // 100
                }                                                                                                    // 101
                                                                                                                     // 102
                itemdata(p1, p2);                                                                                    // 103
            }                                                                                                        // 104
                                                                                                                     // 105
            //init rateit plugin                                                                                     // 106
            if (!itemdata('init')) {                                                                                 // 107
                                                                                                                     // 108
                //get our values, either from the data-* html5 attribute or from the options.                        // 109
                itemdata('min', isNaN(itemdata('min')) ? options.min : itemdata('min'));                             // 110
                itemdata('max', isNaN(itemdata('max')) ? options.max : itemdata('max'));                             // 111
                itemdata('step', itemdata('step') || options.step);                                                  // 112
                itemdata('readonly', itemdata('readonly') !== undefined ? itemdata('readonly') : options.readonly);  // 113
                itemdata('resetable', itemdata('resetable') !== undefined ? itemdata('resetable') : options.resetable);
                itemdata('backingfld', itemdata('backingfld') || options.backingfld);                                // 115
                itemdata('starwidth', itemdata('starwidth') || options.starwidth);                                   // 116
                itemdata('starheight', itemdata('starheight') || options.starheight);                                // 117
                itemdata('value', Math.max(itemdata('min'), Math.min(itemdata('max'), (!isNaN(itemdata('value')) ? itemdata('value') : (!isNaN(options.value) ? options.value : options.min)))));
                itemdata('ispreset', itemdata('ispreset') !== undefined ? itemdata('ispreset') : options.ispreset);  // 119
                //are we LTR or RTL?                                                                                 // 120
                                                                                                                     // 121
                if (itemdata('backingfld')) {                                                                        // 122
                    //if we have a backing field, hide it, override defaults if range or select.                     // 123
                    var fld = $(itemdata('backingfld')).hide();                                                      // 124
                                                                                                                     // 125
                    if (fld.attr('disabled') || fld.attr('readonly')) {                                              // 126
                        itemdata('readonly', true); //http://rateit.codeplex.com/discussions/362055 , if a backing field is disabled or readonly at instantiation, make rateit readonly.
                    }                                                                                                // 128
                                                                                                                     // 129
                    if (fld[0].nodeName == 'INPUT') {                                                                // 130
                        if (fld[0].type == 'range' || fld[0].type == 'text') { //in browsers not support the range type, it defaults to text
                                                                                                                     // 132
                            itemdata('min', parseInt(fld.attr('min')) || itemdata('min')); //if we would have done fld[0].min it wouldn't have worked in browsers not supporting the range type.
                            itemdata('max', parseInt(fld.attr('max')) || itemdata('max'));                           // 134
                            itemdata('step', parseInt(fld.attr('step')) || itemdata('step'));                        // 135
                        }                                                                                            // 136
                    }                                                                                                // 137
                    if (fld[0].nodeName == 'SELECT' && fld[0].options.length > 1) {                                  // 138
                        itemdata('min', (!isNaN(itemdata('min')) ? itemdata('min') : Number(fld[0].options[0].value)));
                        itemdata('max', Number(fld[0].options[fld[0].length - 1].value));                            // 140
                        itemdata('step', Number(fld[0].options[1].value) - Number(fld[0].options[0].value));         // 141
                        //see if we have a option that as explicity been selected                                    // 142
                        var selectedOption = fld.find('option[selected]');                                           // 143
                        if (selectedOption.length == 1) {                                                            // 144
                            itemdata('value', selectedOption.val());                                                 // 145
                        }                                                                                            // 146
                    }                                                                                                // 147
                    else {                                                                                           // 148
                        //if it is not a select box, we can get's it's value using the val function.                 // 149
                        //If it is a selectbox, we always get a value (the first one of the list), even if it was not explicity set.
                        itemdata('value', fld.val());                                                                // 151
                    }                                                                                                // 152
                }                                                                                                    // 153
                                                                                                                     // 154
                //Create the necessary tags. For ARIA purposes we need to give the items an ID. So we use an internal index to create unique ids
                var element = item[0].nodeName == 'DIV' ? 'div' : 'span';                                            // 156
                index++;                                                                                             // 157
                var html = '<button id="rateit-reset-{{index}}" type="button" data-role="none" class="rateit-reset" aria-label="' + $.rateit.aria.resetLabel + '" aria-controls="rateit-range-{{index}}"></button><{{element}} id="rateit-range-{{index}}" class="rateit-range" tabindex="0" role="slider" aria-label="' + $.rateit.aria.ratingLabel + '" aria-owns="rateit-reset-{{index}}" aria-valuemin="' + itemdata('min') + '" aria-valuemax="' + itemdata('max') + '" aria-valuenow="' + itemdata('value') + '"><{{element}} class="rateit-selected" style="height:' + itemdata('starheight') + 'px"></{{element}}><{{element}} class="rateit-hover" style="height:' + itemdata('starheight') + 'px"></{{element}}></{{element}}>';
                item.append(html.replace(/{{index}}/gi, index).replace(/{{element}}/gi, element));                   // 159
                                                                                                                     // 160
                //if we are in RTL mode, we have to change the float of the "reset button"                           // 161
                if (!ltr) {                                                                                          // 162
                    item.find('.rateit-reset').css('float', 'right');                                                // 163
                    item.find('.rateit-selected').addClass('rateit-selected-rtl');                                   // 164
                    item.find('.rateit-hover').addClass('rateit-hover-rtl');                                         // 165
                }                                                                                                    // 166
                                                                                                                     // 167
                itemdata('init', JSON.parse(JSON.stringify(item.data()))); //cheap way to create a clone             // 168
            }                                                                                                        // 169
            //resize the height of all elements,                                                                     // 170
            item.find('.rateit-selected, .rateit-hover').height(itemdata('starheight'));                             // 171
                                                                                                                     // 172
            //set the range element to fit all the stars.                                                            // 173
            var range = item.find('.rateit-range');                                                                  // 174
            range.width(itemdata('starwidth') * (itemdata('max') - itemdata('min'))).height(itemdata('starheight')); // 175
                                                                                                                     // 176
                                                                                                                     // 177
            //add/remove the preset class                                                                            // 178
            var presetclass = 'rateit-preset' + ((ltr) ? '' : '-rtl');                                               // 179
            if (itemdata('ispreset')) {                                                                              // 180
                item.find('.rateit-selected').addClass(presetclass);                                                 // 181
            }                                                                                                        // 182
            else {                                                                                                   // 183
                item.find('.rateit-selected').removeClass(presetclass);                                              // 184
            }                                                                                                        // 185
                                                                                                                     // 186
            //set the value if we have it.                                                                           // 187
            if (itemdata('value') != null) {                                                                         // 188
                var score = (itemdata('value') - itemdata('min')) * itemdata('starwidth');                           // 189
                item.find('.rateit-selected').width(score);                                                          // 190
            }                                                                                                        // 191
                                                                                                                     // 192
            //setup the reset button                                                                                 // 193
            var resetbtn = item.find('.rateit-reset');                                                               // 194
            if (resetbtn.data('wired') !== true) {                                                                   // 195
                resetbtn.bind('click', function (e) {                                                                // 196
                    e.preventDefault();                                                                              // 197
                                                                                                                     // 198
                    resetbtn.blur();                                                                                 // 199
                                                                                                                     // 200
                    var event = $.Event('beforereset');                                                              // 201
                    item.trigger(event);                                                                             // 202
                    if (event.isDefaultPrevented()) {                                                                // 203
                        return false;                                                                                // 204
                    }                                                                                                // 205
                                                                                                                     // 206
                    item.rateit('value', null);                                                                      // 207
                    item.trigger('reset');                                                                           // 208
                }).data('wired', true);                                                                              // 209
                                                                                                                     // 210
            }                                                                                                        // 211
                                                                                                                     // 212
            //this function calculates the score based on the current position of the mouse.                         // 213
            var calcRawScore = function (element, event) {                                                           // 214
                var pageX = (event.changedTouches) ? event.changedTouches[0].pageX : event.pageX;                    // 215
                                                                                                                     // 216
                var offsetx = pageX - $(element).offset().left;                                                      // 217
                if (!ltr) { offsetx = range.width() - offsetx };                                                     // 218
                if (offsetx > range.width()) { offsetx = range.width(); }                                            // 219
                if (offsetx < 0) { offsetx = 0; }                                                                    // 220
                                                                                                                     // 221
                return score = Math.ceil(offsetx / itemdata('starwidth') * (1 / itemdata('step')));                  // 222
            };                                                                                                       // 223
                                                                                                                     // 224
            //sets the hover element based on the score.                                                             // 225
            var setHover = function (score) {                                                                        // 226
                var w = score * itemdata('starwidth') * itemdata('step');                                            // 227
                var h = range.find('.rateit-hover');                                                                 // 228
                if (h.data('width') != w) {                                                                          // 229
                    range.find('.rateit-selected').hide();                                                           // 230
                    h.width(w).show().data('width', w);                                                              // 231
                    var data = [(score * itemdata('step')) + itemdata('min')];                                       // 232
                    item.trigger('hover', data).trigger('over', data);                                               // 233
                }                                                                                                    // 234
            };                                                                                                       // 235
                                                                                                                     // 236
            var setSelection = function (value) {                                                                    // 237
                var event = $.Event('beforerated');                                                                  // 238
                item.trigger(event, [value]);                                                                        // 239
                if (event.isDefaultPrevented()) {                                                                    // 240
                    return false;                                                                                    // 241
                }                                                                                                    // 242
                                                                                                                     // 243
                itemdata('value', value);                                                                            // 244
                if (itemdata('backingfld')) {                                                                        // 245
                    $(itemdata('backingfld')).val(value).trigger('change');                                          // 246
                }                                                                                                    // 247
                if (itemdata('ispreset')) { //if it was a preset value, unset that.                                  // 248
                    range.find('.rateit-selected').removeClass(presetclass);                                         // 249
                    itemdata('ispreset', false);                                                                     // 250
                }                                                                                                    // 251
                range.find('.rateit-hover').hide();                                                                  // 252
                range.find('.rateit-selected').width(value * itemdata('starwidth') - (itemdata('min') * itemdata('starwidth'))).show();
                item.trigger('hover', [null]).trigger('over', [null]).trigger('rated', [value]);                     // 254
                return true;                                                                                         // 255
            };                                                                                                       // 256
                                                                                                                     // 257
            if (!itemdata('readonly')) {                                                                             // 258
                //if we are not read only, add all the events                                                        // 259
                                                                                                                     // 260
                //if we have a reset button, set the event handler.                                                  // 261
                if (!itemdata('resetable')) {                                                                        // 262
                    resetbtn.hide();                                                                                 // 263
                }                                                                                                    // 264
                                                                                                                     // 265
                //when the mouse goes over the range element, we set the "hover" stars.                              // 266
                if (!itemdata('wired')) {                                                                            // 267
                    range.bind('touchmove touchend', touchHandler); //bind touch events                              // 268
                    range.mousemove(function (e) {                                                                   // 269
                        var score = calcRawScore(this, e);                                                           // 270
                        setHover(score);                                                                             // 271
                    });                                                                                              // 272
                    //when the mouse leaves the range, we have to hide the hover stars, and show the current value.  // 273
                    range.mouseleave(function (e) {                                                                  // 274
                        range.find('.rateit-hover').hide().width(0).data('width', '');                               // 275
                        item.trigger('hover', [null]).trigger('over', [null]);                                       // 276
                        range.find('.rateit-selected').show();                                                       // 277
                    });                                                                                              // 278
                    //when we click on the range, we have to set the value, hide the hover.                          // 279
                    range.mouseup(function (e) {                                                                     // 280
                        var score = calcRawScore(this, e);                                                           // 281
                        var value = (score * itemdata('step')) + itemdata('min');                                    // 282
                        setSelection(value);                                                                         // 283
                        range.blur();                                                                                // 284
                    });                                                                                              // 285
                                                                                                                     // 286
                    //support key nav                                                                                // 287
                    range.keyup(function (e) {                                                                       // 288
                        if (e.which == 38 || e.which == (ltr ? 39 : 37)) {                                           // 289
                            setSelection(Math.min(itemdata('value') + itemdata('step'), itemdata('max')));           // 290
                        }                                                                                            // 291
                        if (e.which == 40 || e.which == (ltr ? 37 : 39)) {                                           // 292
                            setSelection(Math.max(itemdata('value') - itemdata('step'), itemdata('min')));           // 293
                        }                                                                                            // 294
                    });                                                                                              // 295
                                                                                                                     // 296
                    itemdata('wired', true);                                                                         // 297
                }                                                                                                    // 298
                if (itemdata('resetable')) {                                                                         // 299
                    resetbtn.show();                                                                                 // 300
                }                                                                                                    // 301
            }                                                                                                        // 302
            else {                                                                                                   // 303
                resetbtn.hide();                                                                                     // 304
            }                                                                                                        // 305
                                                                                                                     // 306
            range.attr('aria-readonly', itemdata('readonly'));                                                       // 307
        });                                                                                                          // 308
    };                                                                                                               // 309
                                                                                                                     // 310
    //touch converter http://ross.posterous.com/2008/08/19/iphone-touch-events-in-javascript/                        // 311
    function touchHandler(event) {                                                                                   // 312
                                                                                                                     // 313
        var touches = event.originalEvent.changedTouches,                                                            // 314
                first = touches[0],                                                                                  // 315
                type = "";                                                                                           // 316
        switch (event.type) {                                                                                        // 317
            case "touchmove": type = "mousemove"; break;                                                             // 318
            case "touchend": type = "mouseup"; break;                                                                // 319
            default: return;                                                                                         // 320
        }                                                                                                            // 321
                                                                                                                     // 322
        var simulatedEvent = document.createEvent("MouseEvent");                                                     // 323
        simulatedEvent.initMouseEvent(type, true, true, window, 1,                                                   // 324
                              first.screenX, first.screenY,                                                          // 325
                              first.clientX, first.clientY, false,                                                   // 326
                              false, false, false, 0/*left*/, null);                                                 // 327
                                                                                                                     // 328
        first.target.dispatchEvent(simulatedEvent);                                                                  // 329
        event.preventDefault();                                                                                      // 330
    };                                                                                                               // 331
                                                                                                                     // 332
    //some default values.                                                                                           // 333
    $.fn.rateit.defaults = { min: 0, max: 5, step: 0.5, starwidth: 16, starheight: 16, readonly: false, resetable: true, ispreset: false };
                                                                                                                     // 335
    //invoke it on all .rateit elements. This could be removed if not wanted.                                        // 336
    $(function () { $('div.rateit, span.rateit').rateit(); });                                                       // 337
                                                                                                                     // 338
})(jQuery);                                                                                                          // 339
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);
