# Content Layouts

Layouts are the foundation for interactive experiences. They affect the way data is structured and displayed. The different layout types set the minimum and maximum width of a container and its position on the page.

### Layout Types

In commercetools, we always try to make better use of the space when building Merchant Center applications. As a result, we provide guidelines and rules that are recommended to be followed when developing applications, both by internal and external engineering teams. You can choose from 5 different layout options to display content in the Merchant Center:

#### Narrow

* Single Column narrow should be used for simple forms.
* The form can be split into multiple sections by collapsible panels, cards, or headlines.

To help implement this new layout, we have developed a new component `PageContentNarrow`. Here is how it can be used:

```jsx
// Single narrow column
<PageContentNarrow>
  <div>contents</div>
</PageContentNarrow>
```

IMAGE

#### Wide (Single Column)
* Single column wide should be used for content where more space is necessary.
* It is a good fit for sections with complex functionality which don't need to be spread across the full width.
* It can also be used for tables with a max of 5-7 columns when the possibility to add additional columns with the column manager is not given.

To help implement this new layout, we have developed a new component `PageContentWide`. Here is how it can be used:

```jsx
// Single wide column
<PageContentWide>
  <div>contents</div>
</PageContentWide>
```

IMAGE

#### Wide (2/3 + 1/3)
* This layout should be used on a page with a form. The right column can display general information or links about the page (like the meta dates, link to change history, link to product type, etc.).
* The content on the right column is sticky on top. Only the 1st column is scrollable.

Here is how the `PageContentWide` component can be used for covering the use case with 2/3 + 1/3 columns:

```jsx
// 2/3 + 1/3 columns
<PageContentWide columns="2/1">
  <div>contents</div>
  <div>contents</div>
</PageContentWide>
```

IMAGE

#### Wide (1/2 + 1/2)
* This layout can be used for displaying relevant information next to each other to save vertical space.
* It is important to group the content in each column, so it is clear to the user, that each column should be read/scanned vertically.

Here is how the `PageContentWide` component can be used for covering the use case with two equal columns:

```jsx
// Two equal columns
<PageContentWide columns="1/1">
  <div>contents</div>
  <div>contents</div>
</PageContentWide>
```

IMAGE

#### Full width
* Full width should be used when the content has a big Data Table.
* Full width can be also used in cases when it makes sense to group content horizontally.
* Make sure that content in the full width layout is grouped in a way, that the reading flow is clear and the user knows how to scan through the page easily.

```jsx
// Single full-width column
<PageContentFull>
  <div>contents</div>
</PageContentFull>
```

IMAGE

### Layout Combinations

As not all combinations are valid there are also some restrictions on how these layouts can be combined on a single page.


![Screenshot 2023-01-16 at 13 32 10](https://user-images.githubusercontent.com/97907068/213112785-c16eef58-b1e7-4dde-8244-48ff0ffbd7cd.png)

