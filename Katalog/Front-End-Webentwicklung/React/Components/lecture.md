---
pathTitle: "Components"
title: "React Komponenten"
description: "Laborum sint occaecat consequat officia ad anim ad ea ipsum cillum tempor."
lastUpdate: "2019-05-29"
logicalOrder: 1
---

![Alt text here](../../react.png)

## Funktionen

```jsx
const Header = () => <h1>hello header</h1>
const FancyButton = () => <button>hello component</button>
```

## die ineinander verschachtelt werden

```jsx
const App = () => (
    <div>
        <Header />
        <FancyButton >
    </div>
)
```
