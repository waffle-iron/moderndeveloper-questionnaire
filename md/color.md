# color

The color property sets the foreground `color` of an element's text content, and
its `decorations`. It doesn't affect any other characteristic of the element; it
should really be called text-color and would have been named so, save for
historical reasons and its appearance in CSS Level 1.

Note that the color value must be a uniform color, which may include
a transparency value from CSS3 onwards. It can't be a `<gradient>` which is an
`<image>` in CSS.

## Syntax

```css
/* A CSS Level 1 color */
color: red;

/* The only color added in CSS Level 2 (Revision 1) */
color: orange;

/* CSS Level 3 color, sometimes called a SVG or X11 color */
color: antiquewhite;

/* The color 'lime' with the 3-character dash notation */
color: #0f0;

/* The color 'lime' with the 6-character dash notation */
color: #00ff00;

/* A color using the available functional notations */
color: rgba( 34, 12, 64, 0.3);

/* Use the color of this element's direct ancestor */
color: currentcolor;

/* Global values */
color: inherit;
color: initial;
color: unset;
```

**Initial value**  
Varies from one browser to another

**Applies to**  
all elements. It also applies to ::first-letter and ::first-line.

**Inherited**  
yes

**Media**  
visual

**Computed value**  
If the value is translucent, the computed value will be the rgba() corresponding
one. If it isn't, it will be the rgb() corresponding one. The transparent
keyword maps to rgba(0,0,0,0).

**Animatable**  
yes, as a color

**Canonical order**  
the unique non-ambiguous order defined by the formal grammar

## Example

The following are all ways to make the element's text red:

```css
element { color: red; }
element { color: #f00; }
element { color: #ff0000; }
element { color: rgb(255,0,0); }
element { color: rgb(100%, 0%, 0%); }
element { color: hsl(0, 100%, 50%); }

/* 50% translucent */
element { color: rgba(255, 0, 0, 0.5); } 
element { color: hsla(0, 100%, 50%, 0.5); }
```

## Browser compatibility

** Desktop **

| Chrome  | Firefox (Gecko)      | Internet Explorer | Opera | Safari |
|---------|----------------------|-------------------|-------|--------|
| 1.0     | 1.0 (1.7 or earlier) | 3.0               | 3.5   |  1.0   |

** Mobile **

| Android | Firefox Mobile (Gecko) | IE Phone | Opera Mobile | Safari Mobile |
|---------|------------------------|----------|--------------|---------------|
| 1.0     | 1.0 (1)                | 6.0      | 6.0          |  1.0          |
