/*
 * Plugin Name: Vanilla-JSU Parallax
 * Version: 0.2.0
 * Plugin URL: https://github.com/JavaScriptUtilities/vanillaJsuParallax
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var vanillaJsuParallax = function(settings) {
    'use strict';

    var self = this,
        winHeight = 0;

    self.items = [];
    self.defaultSettings = {};

    self.init = function(settings) {
        /* Opts */
        self.items = settings.items || [];
        self.itemsLen = self.items.length;
        self.itemCallback = settings.itemCallback || self.itemCallbackDefault;
        self.itemPrepare = settings.itemPrepare || self.itemPrepareDefault;
        self.perspective = settings.perspective || 200;

        /* Prepare items */
        for (var i = 0; i < self.itemsLen; i++) {
            self.items[i] = self.itemPrepareDefault(self.items[i]);
        }

        /* Monitor position on scroll, resize, and initial state */
        window.addEventListener('resize', self.scrollEvent, 1);
        document.addEventListener('scroll', self.scrollEvent, 1);
        self.scrollEvent();
    };

    /* Scroll Event */
    self.scrollEvent = function() {
        winHeight = parseInt(window.innerHeight, 10);
        for (var i = 0; i < self.itemsLen; i++) {
            self.setScrollItem(self.items[i]);
        }
    };

    self.setScrollItem = function(item) {
        var rect = item.getBoundingClientRect(),
            elCenter = (rect.top + rect.bottom) / 2,
            distMiddle = elCenter / winHeight - 1 / 2;
        self.itemCallback(item, distMiddle);
    };

    /* Default callbacks */
    self.itemPrepareDefault = function(item) {
        var opt = {};
        /* Movement direction */
        opt.dir = item.getAttribute('data-jsuplxdir') == 'bottom' ? 'bottom' : 'top';
        /* Movement perspective */
        var itemPerspective = parseInt(item.getAttribute('data-jsuplxperspective'), 10);
        opt.perspective = itemPerspective ? itemPerspective : self.perspective;
        /* Save options */
        item.jsuParallaxOpts = opt;
        /* Initial style */
        item.firstChild.style.willChange = 'transform';
        return item;
    };

    self.itemCallbackDefault = function(item, distMiddle) {
        var dist = distMiddle * item.jsuParallaxOpts.perspective;
        if (item.jsuParallaxOpts.dir == 'bottom') {
            dist = 0 - dist;
        }
        self.setTransform(item.firstChild, 0, dist, 0);
    };

    /* Helper */
    self.setTransform = function(item, x, y, z) {
        item.style.webkitTransform = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
        item.style.mozTransform = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
        item.style.transform = 'translate3d(' + x + 'px,' + y + 'px,' + z + 'px)';
    };

    self.init(settings);
    return self;
};
