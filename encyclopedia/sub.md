# Sub

*Sub defines a portion of writing that appears slightly below, and smaller in size, compared with the original writing.*

The *sub* is an HTML element used to mark up *typographical conventions* with specific meanings. This item represents a *subscript* and it can be used within the document where a *phrasing content* is expected. 

> A subscript is a number, figure, symbol, or indicator that is smaller than their normal line of type and is set slightly below it.<sup>1</sup>

As a fundamental rule, you should use this element only to mark up typographical conventions with specific meanings, as for mathematical expressions.


## Syntax

```
        <sub [<attributes>…​] > Subscripted Text </sub>
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


### Content model

**Phrasing content**

Represents a description of the kind of content you must include as children and descendants of the `<sub>` element. *Phrasing content* is a naming used to denote the text of the document, as well as other elements that mark up that text at the intra-paragraph level.

## Example 1

Write a introduction to the example, sufficient to explain what the example is showing.

```
        background: green;
```

## Example 2

Write a introduction to the example, sufficient to explain what the example is showing.

```
        background: url('path_to_image.png');
```

## Example 3 - Complex

Write a introduction to the example, sufficient to explain what the example is showing.

```
        background: none 50% 25% auto contain fixed;
```

## Special Notes

Add information that you found that seemed lesser known. Common bugs, obscure bugs, important distinctions, all belong in this section.
