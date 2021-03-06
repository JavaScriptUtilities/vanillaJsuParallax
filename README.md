# Vanilla JSU Parallax

Parallax on elements

## How to install

First, load js/vanilla-jsuparallax.js in your webpage.

Then, when DOM is ready, start the plugin :

```js
new vanillaJsuParallax({
    items: document.querySelectorAll('.item')
});
```

You can also custom the move behavior

```html
<div class="item"><div class="child-to-move"></div></div>
<!-- Movement to bottom -->
<div class="item" data-jsuplxdir="bottom"><div class="child-to-move"></div></div>
<!-- Horizontal movement -->
<div class="item" data-jsuplxmode="horizontal"><div class="child-to-move"></div></div>
<!-- Change perspective (default: 200) -->
<div class="item" data-jsuplxperspective="300"><div class="child-to-move"></div></div>
```

You can disable the parallax effet on mobile or small screens by using one of the minViewport settings :

```js
new vanillaJsuParallax({
    items: document.querySelectorAll('.item'),
    minViewportHeight: 500,
    minViewportWidth: 500
});
