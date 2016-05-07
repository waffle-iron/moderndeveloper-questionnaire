# Max-height 

*CSS property used to set the maximum height of an element*

The `max-height` property sets the **maximum height** of the *content area* of an element, and is used to constrain the box's height within a certain range. In a nutshell, it prevents the intended element from becoming larger than a specified *length value* (i.e. it overrides the `height` property of the object itself).

The chain of overlappings works in the following way:


```                               
                                  BUT
             overrides             |               overrides
max-height  ---------->>  height   |  min-height  ---------->>  max-height
                                   |

```

## Syntax

The CSS syntax of the `max-height` property is below:

```
        max-height: <length | percentage | initial | inherit | none>;
```

### Values

As reported in the syntax, the max-height property comes with some values. Each one is described below in detail.

#### length

Specifies a fixed computed height (*length values* are numbers followed by a *unit identifier* like *px*, *cm*, *em*, etc.). Negative values are not allowed.

#### percentage

An explanation of using `url(path)` as a value to link to an image belongs here.

#### initial

An explanation of using `url(path)` as a value to link to an image belongs here.

#### inherit

An explanation of using `url(path)` as a value to link to an image belongs here.

#### none

An explanation of using `url(path)` as a value to link to an image belongs here.

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

The `max-height` property does not apply on **non-replaced inline elements** and **table columns**, **column groups**.
