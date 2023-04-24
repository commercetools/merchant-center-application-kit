# Layout Guidelines

Layouts are the foundation for interactive experiences. They affect the way data is structured and displayed. The different layout types set the minimum and maximum width of a container and its position on the page.

### Design

In commercetools, we always try to make better use of the space when building Merchant Center applications. As a result, we provide guidelines and rules that are recommended to be followed when developing applications, both by internal and external engineering teams. You can choose from 5 different layout options to display content in the Merchant Center:

#### Narrow

* Single Column narrow should be used for simple forms.
* The form can be split into multiple sections by collapsible panels, cards, or headlines.

IMAGE

#### Wide (Single Column)
* Single column wide should be used for content where more space is necessary.
* It is a good fit for sections with complex functionality which don't need to be spread across the full width.
* It can also be used for tables with a max of 5-7 columns when the possibility to add additional columns with the column manager is not given.

IMAGE

#### Wide (2/3 + 1/3)
* This layout should be used on a page with a form. The right column can display general information or links about the page (like the meta dates, link to change history, link to product type, etc.).
* The content on the right column is sticky on top. Only the 1st column is scrollable.

IMAGE

#### Wide (1/2 + 1/2)
* This layout can be used for displaying relevant information next to each other to save vertical space.
* It is important to group the content in each column, so it is clear to the user, that each column should be read/scanned vertically.

IMAGE

#### Full width
* Full width should be used when the content has a big Data Table.
* Full width can be also used in cases when it makes sense to group content horizontally.
* Make sure that content in the full width layout is grouped in a way, that the reading flow is clear and the user knows how to scan through the page easily.

IMAGE

<details>
<summary>Here you can see some examples</summary>

![Screenshot 2023-01-16 at 12 25 53](https://user-images.githubusercontent.com/97907068/213112755-f547f4a2-e787-43a7-a6ed-6f09310d2301.png)

</details>

As not all combinations are valid there are also some restrictions on how these layouts can be combined on a single page.

<details>
<summary>Here you can see all valid combinations</summary>

![Screenshot 2023-01-16 at 13 32 10](https://user-images.githubusercontent.com/97907068/213112785-c16eef58-b1e7-4dde-8244-48ff0ffbd7cd.png)

</details>

### Implementation

To help implement these new layout guidelines, we have developed a set of new components:

* `PageContentNarrow`
* `PageContentWide`
* `PageContentFull`

The components above will help build the new content layouts following the guidelines.

`PageContentNarrow` and `PageContentFull` are very basic components that render a centered _single narrow_ or a _full width_ (100% of its container) column.

The `PageContentWide` component can:

* Render a single column
* Render two equally sized columns
* Render two columns where the first one uses 2/3 of the horizontal space and the second one uses 1/3
  * In the latter case, the right column content will be sticky
* In case we want to render two columns, you can choose between two sizes for the gap between the columns

Here are some practical examples:

```jsx
// Single narrow column
<PageContentNarrow>
  <div>contents</div>
</PageContentNarrow>

// Single full-width column
<PageContentFull>
  <div>contents</div>
</PageContentFull>

// Single wide column
<PageContentWide>
  <div>contents</div>
</PageContentWide>

// Two equal columns
<PageContentWide columns="1/1">
  <div>contents</div>
  <div>contents</div>
</PageContentWide>

// Two 2/3 + 1/3 columns
<PageContentWide columns="2/1">
  <div>contents</div>
  <div>contents</div>
</PageContentWide>

// Two 2/3 + 1/3 columns with bigger gap
<PageContentWide columns="2/1" gapSize="20">
  <div>contents</div>
  <div>contents</div>
</PageContentWide>
```

Here is the type for the `PageContentWideProps`:
```ts
export type TPageContentWide = {
  columns: '1' | '1/1' | '2/1';
  gapSize: '10' | '20'; // 10 === 32px | 20 === 64px
  children: ReactNode;
};
```
