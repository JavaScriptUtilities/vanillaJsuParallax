/*
 * Plugin Name: Vanilla-JSU Parallax
 * Version: 0.3.0
 * Plugin URL: https://github.com/JavaScriptUtilities/vanillaJsuParallax
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var vanillaJsuParallax = function(settings) {
    'use strict';

    var self = this,
        itemCallback,
        itemPrepare,
        itemPerspective = 0,
        winHeight = 0,
        items = [],
        itemsOpts = [],
        itemsLen = 0;

    var initFun = function(settings) {
        /* Opts */
        items = settings.items || [];
        itemsLen = items.length;
        itemCallback = settings.itemCallback || itemCallbackDefault;
        itemPrepare = settings.itemPrepare || itemPrepareDefault;
        itemPerspective = settings.perspective || 200;

        /* Prepare items */
        for (var i = 0; i < itemsLen; i++) {
            itemPrepare(i, items[i]);
        }

        /* Monitor position on scroll, resize, and initial state */
        window.addEventListener('resize', scrollEvent, 1);
        document.addEventListener('scroll', scrollEvent, 1);
        scrollEvent();
    };

    /* Scroll Event */
    var scrollEvent = function() {
        winHeight = parseInt(window.innerHeight, 10);
        for (var i = 0; i < itemsLen; i++) {
            setScrollItem(i, items[i]);
        }
    };

    var setScrollItem = function(i, item) {
        var rect = item.getBoundingClientRect(),
            elCenter = (rect.top + rect.bottom) / 2,
            distMiddle = elCenter / winHeight - 1 / 2;
        itemCallback(i, item, distMiddle);
    };

    /* Default callbacks */
    var itemPrepareDefault = function(i, item) {
        var opt = {};
        /* Movement direction */
        opt.dir = item.getAttribute('data-jsuplxdir') == 'bottom' ? 'bottom' : 'top';
        /* Movement perspective */
        var elPerspective = parseInt(item.getAttribute('data-jsuplxperspective'), 10);
        opt.perspective = elPerspective ? elPerspective : itemPerspective;
        /* Save options */
        itemsOpts[i] = opt;
        /* Initial style */
        if (item.firstElementChild) {
            item.firstElementChild.style.willChange = 'transform';
        }
        return true;
    };

    var itemCallbackDefault = function(i, item, distMiddle) {
        var dist = distMiddle * itemsOpts[i].perspective;
        if (itemsOpts[i].dir == 'bottom') {
            dist = 0 - dist;
        }
        setTransformTranslate3d(item.firstElementChild, 0, dist, 0);
    };

    /* Helper */
    var setTransformTranslate3d = function(item, x, y, z) {
        itemStyleSetTransform(item, 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)');
    };

    var itemStyleSetTransform = function(item, transformString) {
        item.style.webkitTransform = transformString;
        item.style.mozTransform = transformString;
        item.style.transform = transformString;
    };

    initFun(settings);
    return self;
};
