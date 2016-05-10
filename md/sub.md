# Sub

*Sub defines a portion of writing that appears slightly below, and usually smaller in size, compared with the surrounding text.*

The *sub* is an HTML element used to mark up *typographical conventions* with specific meanings. This item represents a *subscript* and it can be used within the document where a *phrasing content* is expected. 

From [Wikipedia](https://en.wikipedia.org/wiki/Subscript_and_superscript):

> A subscript is a number, figure, symbol, or indicator that is smaller than their normal line of type and is set slightly below it.

As a fundamental rule, you should use this element only to mark up typographical conventions with specific meanings, as for chemical formulas and mathematical indices.


## Syntax

```
        <sub [<attributes>…]> Subscripted Text </sub>
```

The *sub* element has the following properties:

### Categories

* Flow content

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elements belonging to this category typically contain text or embedded content within them. (e.g. `div`, `article`, `label`, etc.)
 
* Phrasing content

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Elements belonging to this category define the text and the markup they include. (e.g. `a`, `input`, `span`, etc.)

* Palpable content

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Content is defined this way if it is neither empty nor hidden (It does not have the `hidden` attribute specified).

### Attributes

Every HTML tag can have one or more *attributes* in the form of list. They are optional and are commonly known as *content attributes*. 

Their main aim is to provide the browser with more information about how the element should appear (during the rendering) or behave (at runtime) in the web page.

The traditional syntax of an attribute is:

```
        name = "value"
```

where: `name` is the actual attribute's name, the equal sign is a `delimiter` and `value` is the current value which the attribute represents.

In particular, the *sub* element provides you with the *Global attributes* which so called because they are common to and may be specified on all HTML elements. 

They can be summarized as:

* accesskey

* class

* contenteditable

* contextmenu

* dir

* draggable

* dropzone

* hidden

* id

* lang

* spellcheck

* style

* tabindex

* title

* translate


### Accessible Rich Internet Applications (WAI-ARIA)

This element may have any valid [ARIA](https://www.w3.org/TR/html51/dom.html#aria-role-attribute) `role`. 


### Content model

**Phrasing content**

Represents a description of the kind of content you must include as children and descendants of the `<sub>` element. *Phrasing content* is a naming used to denote the text of the document, as well as other elements that mark up that text at the intra-paragraph level. 

<table>
<tbody>
        <tr>
                <td><strong>Contents</strong></td>
                <td>Inline elements</td>
                <td></td>
        </tr>
        <tr>
                <td><strong>Contained in</strong></td>
                <td>Inline elements</td>
                <td>Block-level elements</td>
        </tr>
</tbody>
</table>


## Example 1

The following snippet of code shows a very basic usage of an `sub` element.

```html
        <p>This is how is represented a <sub>subscript</sub></p>
```

## Example 2

You may use the `sub` element to represent the base of a logarithm visually as in the following example.

```html
        log<sub>2</sub> 8 = 3
```

or to describe a chemical formula instead.

```html
        <p>
                Chemical Formula for Caffeine: C<sub>8</sub>H<sub>10</sub>N<sub>4</sub>O<sub>2</sub>
        </p>
```

## Example 3 - Complex

You may also use the `sub` element together with a `var` item.

```html
        <p>
                The Fibonacci sequence is defined by setting F<sub>0</sub> = 0, F<sub>1</sub> = 1 
                and the rest through the following recursive equation:
                F<sub><var>n</var></sub> = F<sub><var>n</var>-1</sub> + F<sub><var>n</var>-2</sub>
        </p>
        
```

alternatively, also for representing variables that have subscripts.

```html
        <p>
                <var>a<sub>1</sub></var> + <var>a<sub>2</sub></var> = <var>a<sub>3</sub></var>
        </p>
        
```

### Browser Support

| Android |  iOS | Chrome | Firefox | Internet Explorer | Opera | Safari |
|:-------:|:----:|:------:|:-------:|:-----------------:|:-----:|:------:|
|   1.0+  | 1.0+ |  1.0+  |   1.0+  |        2.0+       |  2.0+ |  1.0+  |


## Special Notes

Differences between HTML 4.01 and HTML5: **None**

Most browsers will render the `<sub>` element through the following CSS ruleset:

```css

sub { 
    vertical-align: sub;
    font-size: smaller;
}

```

