---
pathTitle: 'Components'
title: 'Komponenten in React' 
description: 'In der React-Welt sind Komponenten Blöcke aus denen die Benutzeroberfläche erstellt wird. Sie dienen der Strukturierung der Applikationen und glänzen durch Wiederverwendbarkeit'
logicalOrder: 0
lastUpdate: '13.09.2020' 
onlineIDE: 'stackblitz'
---

## Komponenten

Eine Komponente ist nichts weiter als eine JavaScript-Funktion, die JSX zurückgibt. Syntaktisch eng verwandt, nicht jedoch zu verwechseln mit HTML. Probier doch mal aus folgende Komponente über den Lektions Button unten rechts zu starten.

```jsx
const HelloWorld = () => <h1>hello world</h1> 
```

## Material UI

Bibliotheken wie Material UI liefern Komponenten um moderene Webanwendungen zu entwickeln, die der Designsprache von Google folgen. Verschiedene Varianten der Button-Komponente liefern angepasste Oberflächenelemente. Versuche mehrere Buttons in unterschiedlicher Erscheinung darzustellen 🤓.

```jsx
import { Button } from '@material-ui/core'

const Buttons = () => 
    <>
        <Button variant="contained" color="default">click me</Button>
    </>
```

## Vorteile 

1. weniger Fehler im Code
1. einfacheres Debugging
1. höhere Effizienzdurch Wiederverwendbarkeit 
1. klare Grenzen und somit Verantwortlichkeiten 
1. geringere Lernkurve
1. Verbesserte Skalierbarkeit