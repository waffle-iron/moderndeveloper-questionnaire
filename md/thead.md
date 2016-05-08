# thead

*The thead element represents the block of rows that consist of the column labels
(headers) for the parent table element, if the thead element has a parent and it
is a table.*

The `<thead>` tag is used to group header content in an HTML table.

The `<thead>` element is used in conjunction with the `<tbody>` and `<tfoot>`
elements to specify each part of a table (header, body, footer).

Browsers can use these elements to enable scrolling of the table body
independently of the header and footer. Also, when printing a large table that
spans multiple pages, these elements can enable the table header and footer to
be printed at the top and bottom of each page.

The `<thead>` tag must be used in the following context: As a child of
a `<table>` element, after any `<caption>`, and `<colgroup>` elements, and
before any `<tbody>`, `<tfoot>`, and `<tr>` elements.

## Syntax

```html
<table>
  <thead>
    <tr>
      <th>
        …
      </th>
      …
    </tr>
    <tr>
      <td>
        …
      </td>
      …
    </tr>
  </thead>
  …
</table>
```

**Categories:**  
  None.

**Contexts in which this element can be used:**  
  As a child of a `table` element, after any `caption`, and `colgroup` elements
  and before any `tbody`, `tfoot`, and `tr` elements, but only if there are no
  other `thead` elements that are children of the table element.

**Content model:**  
  Zero or more tr and script-supporting elements.

**Tag omission in text/html:**  
  A `thead` element’s end tag may be omitted if the `thead` element is
  immediately followed by a `tbody` or `tfoot` element.  

**Content attributes:**  
  Global attributes

**Allowed ARIA role attribute values:**  
  Any role value.

**Allowed ARIA state and property attributes:**  
  Global aria-\* attributes  
  Any aria-\* attributes applicable to the allowed roles.

**DOM interface:**  
  `HTMLTableSectionElement`, as defined for `tbody` elements.

## Example

```html
<table>
  <caption>
    School auction sign-up sheet
  </caption>
  <thead>
    <tr>
      <th>
        Your name here
      </th>
      <th>
        What are you selling?
      </th>
      <th>
        Link to a picture
      </th>
      <th>
        Your reserve price
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        Ms Danus
      </td>
      <td>
        Doughnuts
      </td>
      <td>
        <img src="http://example.com/mydoughnuts.png"
             title="Doughnuts from Ms Danus">
      </td>
      <td>
        $45
      </td>
  </tbody>
</table>
```
