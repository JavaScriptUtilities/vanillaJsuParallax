# vanillaInfiniteScroll

Parallax on elements

## How to install

First, load js/vanilla-jsuparallax.js in your webpage.

Then, when DOM is ready, start the plugin :

```js
new vanillaJsuParallax({
    items: document.querySelectorAll('.circle'),
    itemCallback: function(item, distMiddle) {
        item.style.webkitTransform = 'translateY(' + distMiddle * 200 + 'px)';
        item.style.mozTransform = 'translateY(' + distMiddle * 200 + 'px)';
        item.style.transform = 'translateY(' + distMiddle * 200 + 'px)';
    }
});
```
