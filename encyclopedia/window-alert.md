# Window.alert

*Throws an alert box within the browser window.*

The `alert()` is a *Javascript* method used to bring the focus away from the underlying web page and constrains the users to watch a message you want to transmit to them.  In a nutshell, it is a mean to communicate with users and bring them to the attention of some *particular event* or *message*.

This method belongs to the `window` object which represents the entire *browser window area* including the buttons, title bar, status bar, etc.

The new box that shows up is known as a  "*modal window*" because it prevents the user from accessing the rest of the interface until the dialog box won't be *intentionally closed* through the acknowledgment of the message.


```
┌───────────────────────────────────────────────────────┐
│[Javascript Application]                             X |
│───────────────────────────────────────────────────────|
|    .                                                  |
|   /|\                                                 |
|  / ║ \    Hello world!                                |
| /__°__\                                               |
|                                                       |
╞═══════════════════════════════════════════════════════╡
│                                                       |
|                   ╔═══════════════╗                   |
|                   ║      OK       ║                   |
|                   ╚═══════════════╝                   │       
└───────────────────────────────────────────────────────┘

```

## Syntax

The syntax of this method is pretty straightforward:

```js
        window.alert(message);
```

### Parameter Values

As you can see from syntax above, `window.alert` takes an optional parameter which is described below.

#### message

Specifies an *optional* text message to display in the alert box.

### Return Value

None

## Example 1

The following example shows you how to use the `window.alert` functionality.

```js
        <script type="text/javascript">
          // The result of this example is shown at the beginning this page
          window.alert(Hello world!);
        </script>

```

## How to write text on multiple lines

Since the `window.alert` functionality belongs to the `window` object, to write some text on a new line we need to use the **new line escape** character.

An escape character consists of a backslash (`\`) symbol followed by an alphabet.

The most common used escape characters are:

* \n: Decomposes the message and places the remaining text it on a new line
* \r: Carriage return
* \t: Inserts a tab
* \': Single quote
* \": Double quote
* \/\: Backslash

## Example 2

```js
        <script type="text/javascript">
          window.alert('Hi!\nI\'m on a new line!');
        </script>

```

### Browser Support

| Chrome | Firefox | Internet Explorer | Opera | Safari |
|:------:|:-------:|:-----------------:|:-----:|:------:|
|  Yes   |   Yes   |        Yes        |  Yes  |  Yes   |


## Special Notes

Due to its intrinsic nature, the alert box should be used only for communication purposes or, anyway, for messages which do not require any response on the part of the user.

Starting with Chrome 46.0 this method is blocked inside an `<iframe>` unless its sandbox attribute has the value `allow-modal.
