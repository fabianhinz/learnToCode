---
pathTitle: "CSS"
title: "CSS"
description: "Lerne die Grundlagen von CSS, der Gestaltungssprache für Webinhalte. Die Lektion beschäftigt sich mit der Struktur und Syntax von CSS, gängigen Selektoren für Inhalte sowie kleinen Übungen zum Thema."
lastUpdate: "2020-09-09"
logicalOrder: 2
---

### CSS

Nachdem im ersten Teil nun die Grundlagen von HTML bekannt sind, kann im nächsten Schritt der 2. Baustein der Webentwicklung eingeführt werden: CSS (Cascading Style Sheets).
Der Grundgedanke von CSS ist simpel: während HTML dazu gedacht ist, den Inhalt einer Seite zu beschreiben, ist CSS dazu gedacht, den Inhalt einer Seite zu gestalten. In modernen Webseiten und -applikation kümmert sich CSS darum, ein geeignetes Layout für den Inhalt bereitzustellen und dafür zu sorgen, dass Seiteninhalte unabhängig der Bildschirmgröße und Browser ansprechend gestaltet und gut lesbar sind. Die gleich HTML-Seite kann mithilfe von CSS in unendlich vielen Variationen gestaltet werden, sodass CSS letztendlich entscheidender Grundbaustein in der Vielfalt moderner Webseiten ist.

CSS kann entweder innerhalb von HTML zwischen Style-Tags (`<style></style>`) geschrieben werden, oder in einer separaten Datei mit Dateiendung .css. In eine eigene Datei ausgelagertes CSS kann in HTML mittels eines Verweises eingebunden werden:

```html
<p>Absatz</p>
```

Innerhalb einer solchen CSS-Datei gilt folgende Syntax:

```css
selector {
  property: value;
}
```

Nehmen wir ein Beispiel, um diese Syntax zu erklären. Will ich alle Buttons innerhalb eines HTML-Dokumentes einheitlich gestalten, so kann ich obigen Block folgendermaßen formulieren:
Der **Selektor** zeigt an, welche Elemente vom durch die geschweiften Klammern eingerahmten Code verändert werden sollen. Um alle HTML-Elemente vom Typ <button>Ein Button</button> auszuwählen, nimmt man den Selektor `button`.
Als **Property** bezeichnet man das Attribut des selektierten Elementes, das geändert werden soll. Will man z.B. die Hintergrundfarbe der Buttons ändern, so wäre die Property “background-color”.
Als **Value** bezeichnet man den Wert, den die Property annehmen soll, wenn man also den Hintergrund rot gestalten will, nimmt man entweder “red” oder den Hex-Code der Farbe (bei rot wäre dies z.B. #ff0000). Setzt man diese 3 Werte in die oben gezeigte Syntax ein, erhält man folgenden CSS-Code:

```css
button {
  background-color: red;
}
```

## Selektoren

CSS ist noch wesentlich mächtiger, als das obige Beispiel zeigt, die grundlegende Syntax ist jedoch immer die selbe. Will man beispielsweise nicht alle Buttons gleich stylen, sondern einen (oder mehrere) Buttons speziell anpassen, so braucht man spezifischere Selektoren. Um einzelne Elemente im CSS selektieren zu können, müssen diese Elemente im HTML erst besonders markiert werden. Für einzigartige Elemente nimmt man dafür sogenannte IDs, für mehrere gleichartige Elemente sogenannte Klassen.

Im HTML-Code sieht dies folgendermaßen aus:

```html
<button>Button 1</button>
<button id="”einzigartig”">Button2</button>
<button class="”mehrereGleiche”">Button3</button>
<button id="auchEinzigartig" class="”mehrereGleiche”">Button4</button>
```

Um diese Elemente mithilfe von CSS Selektoren zu selektieren, nutzt man folgende Syntax:
für reine HTML-Elemente: `button` -> selektiert Button 1, 2, 3 und 4
für IDs: mit Hashtag, z.B. `#einzigartig` -> selektiert Button 2
für Klassen: mit Punkt, z.B. `.mehrereGleiche` -> selektiert Button 3 und 4

## Modernes CSS

Mit der zunehmender Erweiterung und Standardisierung von CSS wird es immer einfacher, moderne Layouts (responsive, also flexibel auf verschiedene Bildschirmgrößen skalierend) mithilfe von CSS umzusetzen.

In diesem Bereich zu nennen sind so z.B.:

- Media Queries, also Styles, die nur bei bestimmten Bildschirmgrößen greifen ([MDN](https://developer.mozilla.org/de/docs/Web/CSS/Media_Queries/Using_media_queries)),
- Flexbox zur Anordnung von Seitenelement ([Flexbox Froggy](https://flexboxfroggy.com/))
- CSS Grid, das ein zeilen- und spaltenförmiges Layout extrem vereinfacht ([CSS Grid Garden](https://cssgridgarden.com/))

# Gestaltungsbeispiel

Als nachvollziehbares Beispiel von einer blanken HTML-Seite hin zu einem fertig gestalteten Blogpost eignet sich [Web Design in 4 minutes](https://jgthms.com/web-design-in-4-minutes/).
