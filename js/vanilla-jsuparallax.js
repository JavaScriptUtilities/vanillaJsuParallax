/*
 * Plugin Name: Vanilla-JSU Parallax
 * Version: 0.4.4
 * Plugin URL: https://github.com/JavaScriptUtilities/vanillaJsuParallax
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var vanillaJsuParallax = function(settings) {
    'use strict';

    var self = this,
        itemCallback,
        itemPrepare,
        itemPerspective = 200,
        distMiddleAdjust = 2,
        minViewportHeight = 0,
        minViewportWidth = 0,
        activeParallax = 0,
        winHeight = 0,
        winWidth = 0,
        items = [],
        itemsOpts = [],
        itemsLen = 0;

    var initFun = function(settings) {
        /* Opts */
        items = settings.items || [];
        /* Fix if only one item is loaded */
        if (typeof items[0] == 'undefined' && typeof items.tagName == 'string') {
            items = [items];
        }
        itemsLen = items.length;
        distMiddleAdjust = settings.distMiddleAdjust || distMiddleAdjust;
        itemCallback = settings.itemCallback || itemCallbackDefault;
        itemPrepare = settings.itemPrepare || itemPrepareDefault;
        itemPerspective = settings.perspective || itemPerspective;
        minViewportHeight = settings.minViewportHeight || minViewportHeight;
        minViewportWidth = settings.minViewportWidth || minViewportWidth;

        /* Prepare items */
        for (var i = 0; i < itemsLen; i++) {
            itemPrepare(i, items[i]);
        }

        /* Monitor position on scroll, resize, and initial state */
        window.addEventListener('resize', scrollEvent, 1);
        document.addEventListener('scroll', scrollEvent, 1);
        scrollEvent();
    };

    this.deleteEvents = function(){
        window.removeEventListener('resize', scrollEvent, 1);
        document.removeEventListener('scroll', scrollEvent, 1);
    };

    /* Scroll Event */
    var scrollEvent = function() {
        var i;
        winHeight = parseInt(window.innerHeight, 10);
        winWidth = parseInt(window.innerWidth, 10);
        if (winWidth >= minViewportWidth && winHeight >= minViewportHeight) {
            for (i = 0; i < itemsLen; i++) {
                setScrollItem(i, items[i]);
            }
        }
        else {
            if (activeParallax) {
                activeParallax = 0;
                for (i = 0; i < itemsLen; i++) {
                    setTransformTranslate3d(items[i].firstElementChild, 0, 0, 0);
                }
            }
        }
    };

    var setScrollItem = function(i, item) {
        var rect = item.getBoundingClientRect(),
            elCenter = (rect.top + rect.bottom) / 2,
            distMiddle = elCenter / winHeight - 1 / distMiddleAdjust;
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
        if (!item) {
            return;
        }
        itemStyleSetTransform(item, 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)');
        if (x != 0 || y != 0 || z != 0) {
            activeParallax = 1;
        }
    };

    var itemStyleSetTransform = function(item, transformString) {
        item.style.webkitTransform = transformString;
        item.style.mozTransform = transformString;
        item.style.transform = transformString;
    };

    initFun(settings);
    return self;
};
