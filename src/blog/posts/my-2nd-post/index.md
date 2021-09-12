---
layout: layouts/post.njk
htmlTitle: Second post
title: Second post
description: The second post on the blog
date: 2020-09-01
tags: ['posts', 'tech']
---

## 2nd level heading

Hello, here is the body of the post.
Section below shows a code snippet in JSON:

```json
{
    "element": "value",
    "one": 1
}
```

### 3rd level heading

A Java example:

```java
class Foo {
    public static int add(int one, int two) {
        return one + two;
    }
}
```

## Other markdown formatting

**This is bold text**

__This is bold text__

*This is italic text*

_This is italic text_

~~Strikethrough~~

A [link](https://www.yle.fi) to somewhere (TM).

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

Lists/Unordered

+ Create a list by starting a line with `+`, `-`, or `*`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    * Ac tristique libero volutpat at
    + Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
+ Very easy!

Lists/Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa
