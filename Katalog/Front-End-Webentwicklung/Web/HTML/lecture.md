---
pathTitle: "HTML"
title: "HTML"
description: "Lerne die Grundlagen von HTML, der Beschreibungssprache für Webinhalte. Die Lektion beschäftigt sich mit der Struktur von HTML-Dokumenten, gängigen HTML-Tags sowie kleinen Übungen zum Thema."
lastUpdate: "2020-09-09"
logicalOrder: 1
---

### HTML

HTML steht für Hypertext Markup Language und stellt eine Beschreibungssprache für Webinhalte dar. Man kann sich HTML als semantische Umschreibung der eigentlichen Webinhalte vorstellen, bei der sogenannte HTML-Tags bestimmte Seiteninhalte umklammern. Derartig umklammerte Inhalte sind dadurch als besondere Elemente markiert, die vom Browser besonders dargestellt werden sollen (z.B. **fett** oder _kursiv_). Ein **P**aragraph (Absatz) in einem Artikel würde so z.B. vom HTML-Tag `<p>` folgendermaßen eingerahmt werden:

```html
<p>Absatz</p>
```

Das zweite (=schließende) Tag hat dabei einen Slash an zweiter Stelle im Tag, wie oben bei `</p>`.

Es gibt ein standardisiertes Set von solchen Tags, die von allen gängigen Browsern verstanden wird und das über die Jahre hinweg kontinuierlich erweitert wurde, um neu entstandene Anforderungen an Webseiten und Webapplikationen zu berücksichtigen. Die aktuellste etablierte Spezifikation dieser Art ist der HTML5-Standard, der eine Vielzahl neuer semantischer Elemente einführte und standardisierte.

Im folgenden Codeabschnitt finden sich einige Beispiel-Tags mit kurzer Erklärung.

```html
<!-- Ein Kommentar in HTML -->
<b>Fetter Text</b>
<i>Kursiver Text</i>

<!-- An Überschriften gibt es h1, h2,..., h6 -> je größer die Nummer, desto kleiner die Überschrift  -->
<h1>Überschrift</h1>
<p>Ein Absatz mit Text</p>

<!-- Tags wie das Anchor-Tag (für Links) können sogenannte Attribute wie hier das href-Attribut haben. Über href wird spezifiziert, auf welche Adresse der Link verweisen soll -->
<a href="https://www.google.com">Ein Link</a>
```

Nicht alle Tags müssen mit einem schließenden Tag versehen werden, so gibt es z.B. `<hr/>` (eine horizontale Trennlinie), `<br/>` (ein Zeilenumbruch) oder `<input/>` (ein Input-Textfeld), die kein schließendes Tag besitzen, sondern durch den Slash vor dem > (`<br/>`>) schon in sich vollständig sind.

```html
<hr />
<!-- eine horizontale Trennlinie -->
<br /><!-- ein Zeilenumbruch -->

<input type="text" value="Type here" />
<!-- ein Textfeld mit vorbefülltem Inhalt -->
<img src="mdn-logo-sm.png" alt="MDN" />
<!-- ein Bild, das src-Attribut enthält die Quelldatei des Bilds, das alt-Attribut den Alternativtext -->
```

# Struktur von Inhalten durch HTML

HTML bietet außerdem Strukturhilfen für Seiteninhalte wie Listen oder Tabellen:

```html
<!-- eine geordnete Liste (ol) der Form 1. 2. 3. -->
<ol>
  <li>Erster Eintrag</li>
  <li>Zweiter Eintrag</li>
  <li>Dritter Eintrag</li>
</ol>

<!-- eine ungeordnete Liste (ul) in Form von Stichpunkten -->
<ul>
  <li>Erster Eintrag</li>
  <li>Zweiter Eintrag</li>
  <li>Dritter Eintrag</li>
</ul>

<!-- eine Tabelle mit Zeilen (table rows, tr) und Kopfzeile (table header, th) -->
<table>
  <tr>
    <th>Monat</th>
    <th>Nutzer</th>
  </tr>
  <tr>
    <td>Januar</td>
    <td>80</td>
  </tr>
  <tr>
    <td>Februar</td>
    <td>120</td>
  </tr>
</table>
```

Eine weitere Besonderheit von HTML ist es, dass dem Browser unbekannte Tags (z.B. `<fail>Abc123</fail>`) ignoriert werden, es würde einfach der umklammerte Text Abc123 dargestellt werden. Auf diese Weise können in Zukunft noch zusätzliche HTML-Tags eingeführt werden und der Standard bleibt erweiterbar. Eine vollständige Übersicht der HTML-Tags findet sich [hier](https://hostingcanada.org/html-cheat-sheet/).

## Struktur von HTML-Seiten

Das Grundgerüst einer HTML-Seite sieht folgendermaßen aus:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Mein Seitentitel</title>
    ...
  </head>
  <body>
    ...
  </body>
</html>
```

Die erste Zeile ist obligatorisch, um dem Browser anzuzeigen, dass hier ein HTML-Dokument beginnt. HTML-Tags können beliebig geschachtelt werden, wobei die Auswirkung der Tags immer vom öffnenden (z.B. `<html>`) bis zum schließenden (z.B. `</html>`) Tag reicht. `<html>` stellt immer die äußerste Umklammerung dar, innerhalb finden sich üblicherweise ein `<head>`-Tag, das Metainformationen zur HTML-Seite enthält z.B. den Titel der Seite (`<title>Mein Seitentitel</title>`), und ein `<body>`-Tag, das den eigentlichen Seiteninhalt enthält.

Um die Inhalte dieser Lektion zu vertiefen, empfehlen sich die von Mozilla über MDN bereitgestellten [Anleitungen und Aufgabenstellungen](https://developer.mozilla.org/de/docs/Learn/HTML/Einf%C3%BChrung_in_HTML).
