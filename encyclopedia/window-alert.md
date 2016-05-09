# Window.alert

*Throws an alert box within the browser window.*

The `window.alert` is a *Javascript* functionality used to bring the focus away from the underlying web page and constrains the users to watch a message you want to transmit to them.  In a nutshell, it is a mean to communicate with users and bring them to the attention of some *particular event* or *message*.

This mechanism belongs to the `window` object which represents a window containing the entire DOM document.

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

The `window.alert`'s syntax is pretty straightforward:

```js
        window.alert(message);
```

### Parameter Values

As you can see from syntax above, `window.alert` takes an optional parameter which is described below.

#### message

Specifies an *optional* text message to display in the alert box.

### Return Value

None

## Example

The following example shows you how to use the `window.alert` functionality.

```js
        <script type="text/javascript">
          // The result of this example is showed on top of this page
          window.alert(Hello world!);
        </script>

```

## Special Notes

Due to its intrinsic nature, the alert box should be used only for communication purposes or, anyway, for messages which do not require any response on the part of the user.

Starting with Chrome 46.0 this method is blocked inside an `<iframe>` unless its sandbox attribute has the value `allow-modal`.
