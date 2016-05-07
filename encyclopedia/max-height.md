# Max-height 

*CSS property used to set the maximum height of an element*

The `max-height` property sets the **maximum height** of the *content area* of an element, and is used to constrain the box's height within a certain range. In a nutshell, it prevents the intended element from becoming larger than a specified *length value* (i.e. it overrides the `height` property of the object itself).

The chain of overlappings works in the following way:


```                               
                                  BUT     if ( min-height > max-height )

             overrides             |               overrides
max-height  ---------->>  height   |  min-height  ---------->>  max-height
                                   |

```

## Syntax

The CSS syntax of the `max-height` property is below:

```
        max-height: <length | percentage | inherit | none>;
```

### Values

As reported in the syntax, the `max-height` property comes with the ability to use some specific values. Each one is described below in detail.

#### length

Specifies a fixed computed height (*length values* are numbers followed by a *unit identifier* like *px*, *cm*, *em*, etc.). Negative values are not allowed.

#### percentage

Defines the maximum height of the element in percent respect to its containing block. If the parent block does not have the height explicitly set then the `max-height` will be automatically set as `none`. Negative values are not allowed.

#### inherit

Specifies that the value for this property should be taken from the computed value of its parent element. 

#### none

This is the *default* value for this property. It clears the `max-height` value of the element. Then, the `height` property of the object can assume any value.

## Example 1

The following example shows how to set the maximum height for an element with the ID of '*box*'.

```
        #box {
          max-height: 100px;
        } 
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


### Browser Support

| Android |  iOS | Chrome | Firefox | Internet Explorer | Opera | Safari |
|:-------:|:----:|:------:|:-------:|:-----------------:|:-----:|:------:|
|   2.1+  | 3.2+ |  1.0+  |   1.0+  |        7.0+       |  7.0+ |  2.0.2+  |


## Special Notes

The `max-height` property does not apply on **non-replaced inline elements** (e.g. `img`, `textarea`, `input`, etc.) and **table columns**, **column groups**.

The `max-height` applies only to the *content area* but it **does not** include the *height* of the *padding*, *border*, or *margin areas*.

If the contents of a block require more vertical space than is provided by the range that have been set with the `max-height` property, their behavior is controlled by the `overflow` property.

*IE7* does not support *inherit* as a value for `max-height`.

*IE8* has some bugs with `max-height` combined with `overflow: auto | scroll`.
