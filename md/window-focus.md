# window.focus()

Makes a request to bring the window to the front. It may fail due to user
settings and the window isn't guaranteed to be frontmost before this method
returns.

## Syntax

```js
window.focus()
```

### Parameters

None.

#### Return Value

No return value.

## Example

```js
if (clicked) {
  window.focus();
}
```

## Browser support

| Chrome  | Firefox | Internet Explorer | Opera | Safari |
|---------|---------|-------------------|-------|--------|
| Yes     | Yes     | Yes               | Yes   |  Yes   |
