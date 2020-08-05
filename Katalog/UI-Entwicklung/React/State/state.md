---
title: "React State"
description: "Laborum sint occaecat consequat officia ad anim ad ea ipsum cillum tempor."
lastUpdate: "2019-05-29"
---

## State

```jsx
const Counter = () => {
    const [counter, setCounter] = useState(0)

    return (
        <>
            <h1>{counter}</h1>
            <button onClick={() => setCounter(++counter)}>+</button>
            <button onClick={() => setCounter(--counter)}>-</button>
        </>
    )
}
```
