/*
 * Plugin Name: Vanilla-JSU Parallax
 * Version: 0.1.0
 * Plugin URL: https://github.com/JavaScriptUtilities/vanillaJsuParallax
 * JavaScriptUtilities Vanilla-JS may be freely distributed under the MIT license.
 */

var vanillaJsuParallax = function(settings) {
    'use strict';
    var self = this,
        doc = document.documentElement,
        winHeight = 0;

    self.items = [];
    self.defaultSettings = {};

    self.init = function(settings) {
        self.items = settings.items || [];
        self.itemsLen = self.items.length;
        self.itemCallback = settings.itemCallback || function(item, distMiddle) {}
        self.setEvents();
    };

    self.setEvents = function() {
        // Trigger on scroll
        window.addEventListener('resize', self.scrollEvent, 1);
        document.addEventListener('scroll', self.scrollEvent, 1);
        self.scrollEvent();
    };

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

    self.init(settings);
    return self;
};

