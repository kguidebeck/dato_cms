# Elegant Seagull's Next.js Starter
[![Next.js](https://img.shields.io/badge/Next.js-10.2.3-success)](https://nextjs.org/)
[![Node](https://img.shields.io/badge/Node->=10.15-success)](https://nodejs.org/docs/latest-v10.15/api/index.html)

```bash
# install
yarn install

# run
yarn dev
```

## ENV Variables
Located in `./.env`

- `SITE_URL` - used to transform absolute links when applicable (omit `https://www`. ex: `elegantseagulls.com`)
- `IGNORED_URLS` - used to list URLs that should be ignored from the site map. These URLs should be comma separated. See example:

```
IGNORED_URLS=/posts/single,/case-study/espn/,/contact-us/hidden
```

### Recommended variables
- CMS/API urls
- API Access Tokens
- Anything that shouldn't be stored in github or visible on the front-end. *Remember that variables used on the front-end will be visible in bundled code.*

## Aliased Files/Directories
- **styles** &rarr; src/styles
- **util** &rarr; src/util
- **components** &rarr; src/components
- **hooks** &rarr; src/hooks

**Example aliasing**
```jsx
/* src/components/MyComponent.js */
import React from 'react';

const MyComponent = () => <div>I'm a Component</div>

export default MyComponent;

/* src/pages/MyPage.js */
import React from 'react';
import MyComponent from 'components/MyComponent';

const MyPage = () => (
  <div>
    <p>I'm a Page</p>
    <MyComponent />
  </div>
);

export default MyPage;
```

## 3rd Party Resources
- [Next.js](https://nextjs.org/docs)
- [Styled Components](https://styled-components.com/)
- [Polished](https://polished.js.org/)
- [Superior MQ](https://github.com/jbsmith731/superior-media-query)
- [React Helmet](https://github.com/nfl/react-helmet)

## Components
- [Container](#container)
- [Grid](#grid)
- [Heading](#heading)
- [InlineLink](#inlinelink)
- [Button](#button)
- [RatioImg](#ratioimg)
- [LazyImg](#lazyimg)
- [UnstyledButton](#unstyledbutton)
- [UnstyledList](#unstyledlist)
- [VisuallyHidden](#visuallyhidden)

### Container
CSS custom property `--container-width` set in `./app/styles/global-style.js`
```jsx
<Container />
```

### Grid
**Grid props**

Prop	    | Type                         | Default           |
---	    |---	                           |---	               |
position |`[static, relative, absolute]` |relative           |
cols   	|number   	                     |`12` |

#### Usecase example:
Sometimes `<Grid>` is nested directly inside of `<Container>`. To reduce the number of divs use styled components `as` prop.

**Bad**
```jsx
<Container>
  <Grid>
    ...
  </Grid>
</Container>
```

**Good**
```jsx
<Grid as={Container}>
  /* code goes here */
</Grid>
```

**Grid.Item props**

Prop	| Type  | Default |
---	  |---	  |---	    |
span  |number |1        |

```jsx
<Grid cols={12} />
<Grid.Item span={4} />
```

### Heading
Named exports for all heading levels (h1-h6)
```jsx
import { H1 } from './H';

<H1>I'm a h1</H1>

${/* h1 style but h2 level */}
<H1 as="h2">I look like h1 but I&#39;m really a h2</H1>
```

### InlineLink
Transforms external links to relavtive links for next router. Requires `SITE_URL` defined in `./.env`

**InlineLink props**

|Prop	    | Type          | Default     |
|---	    |---	          |---	        |
|href     |string         |`undefined`  |
|children |string or node |`undefined`  |

```jsx
<InlineLink href="https://elegantseagulls.com">Elegant Seagulls</InlineLink>
```

### Button
Returns the correct tag based on props passed. If `href` is passed an `a` tag will be returned otherwise a `button` tag will be returned.

### RatioImg
Forces aspect ratio based on `width` and `height` props. These properties do not define the literal width and height. `styles` and `as` props will be applied to `<RatioImg>` component. `...rest` will be passed to the `<img>`.

**RatioImg props**

|Prop	        | Type              | Default    | Info                           |
|---	        |---	              |---	       |---                             |
|src          |string             |`undefined` |                                |
|srcSet       |string             |`undefined` |                                |
|picture      |array              |`undefined` |                                |
|width        |number             |`undefined` |                                |
|height       |number             |`undefined` |                                |
|imageStyles  |string             |`undefined` | Styles passed to image element |
|as           |string             |`div`       | Wrapper html element           |
|alt          |string             |`undefined` |                                |

```jsx
<RatioImg
  width={466}
  height={570}
  src={`${block.fields.photo.fields.file.url}?w=466&h=570&fit=thumb&q=80&fm=jpg&fl=progressive`}
  alt={block.fields.photo.fields.description}
  picture={[
    {
      srcSet: `${block.fields.photo.fields.file.url}?w=608&h=450&fit=thumb&q=80&fm=jpg&fl=progressive`,
      media: '(max-width: 580px)',
      width: 608,
      height: 450,
    },
  ]}
/>
```

```jsx
import styled from 'styled-components';

const MyImage = styled(RatioImg)`
  max-width: 500px;
`;

<MyImage
  src="https://source.unsplash.com"
  // ...remaining props...
/>
```

### LazyImg
Prevent images from loading until they're in the viewport. Depends on `react-interesection-observer`.

**LazyImg props**

|Prop	        | Type              | Default    | Info                           |
|---	        |---	              |---	       |---                             |
|src          |string             |`undefined` |                                |
|srcSet       |string             |`undefined` |                                |
|picture      |array              |`undefined` |                                |
|width        |number             |`undefined` |                                |
|height       |number             |`undefined` |                                |
|imageStyles  |string             |`undefined` | Styles passed to image element |
|as           |string             |`div`       | Wrapper html element           |
|alt          |string             |`undefined` |                                |
|bottomOffset |`[string, number]` | 250px      | Distance from viewport when image is loaded |

```jsx
<LazyImg
  width={466}
  height={570}
  src={`${photo.fields.file.url}?w=466&h=570`}
  alt={photo.fields.description}
  picture={[
    {
      srcSet: `${photo.fields.file.url}?w=608&h=450`,
      media: '(max-width: 580px)',
      width: 608,
      height: 450,
    },
  ]}
/>
```

### UnstyledButton
Removes all default styling from the `<button>` element (including iOS & browser specific styles). Use `<UnstyledButton>` instead of adding click events to `<a>` or `<div>`.
```jsx
<UnstyledButton />
```

### UnstyledList
Removes all default styling from the `<ul>` element. `<UnstyledList.Item>` defaults to `inline-block`.

**UnstyledList.Item props**

|Prop	  | Type  | Default   |
|---	  |---	  |---	      |
|display |`[inline, inline-block, block]` |`inline-block` |

```jsx
<UnstyledList />
<UnstyledList.Item />
```

### VisuallyHidden
Visually hide an element while keeping is accessible for screen reader

**VisuallyHidden props**

|Prop	  | Type  | Default   |
|---	  |---	  |---	      |
|as |string |`div` |

```jsx
<VisuallyHidden as="span" />
```
