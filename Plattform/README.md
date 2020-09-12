# <center /> learn2Code@HSKA - gatsby

## 🚀 Quick start

### Umgebung

> erforderliche Werkzeuge bevor die Entwicklung starten kann

1. [Node.js (LTS)](https://nodejs.org/en/)
1. [VSCode](https://code.visualstudio.com/)
1. [ESLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

> herunterladen der Abhängigkeiten (aka node-modules)

1. In das Verzeichnis der Plattform navigieren: `cd Plattform`
1. `npm install` ausführen

### Start der Entwicklung

1. `npm start` 
1. Zugriff auf die Seite über `http://localhost:8000`
1. Zugriff auf [GraphiQL](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql), einer GraphQL IDE über `http://localhost:8000/___graphql`

### Debugging 

> Einsatz von VSCode erforderlich

1. Die Datei `dev.code-workspace` in einem Texteditor öffnen
1. `"debug.node.autoAttach": "off"` auf `"on"` ändern
1. `npm run gatsbyDebug`
1. ... Debug 🤓

### 🧐 Ordnerstruktur?

    .
    ├── doc
    ├── functions
    ├── node-apis
    ├── src
        ├── @types
        ├── components
        ├── gatsby-theme-material-ui-top-layout
        ├── hooks
        ├── model
        ├── pages
        ├── util
    ├── static
    ├── firestore.rules
    ├── gatsby-browser.js
    ├── gatsby-config.js
    ├── gatsby-node.js
    ├── gatsby-ssr.js
    ├── package.json

1. **doc**: Markdown Dateien unterhalb von doc informieren Anwender der Plattform über häufig gestellte Fragen und generelle Informationen zur Anwendung. 

1. **functions**: Beinhalten [Cloud Functions](https://www.youtube.com/watch?v=vr0Gfvp5v1A&feature=emb_title) für Firebase.

1. **node-apis**: Module die zur Erstellung von pages und deren Validierung geschrieben worden sind.

1. **src**: Quellcode der Webanwendung

    1. **@types**: Typdefinitionen für module, die keine von der Community verwalteten Definitionen beinhalten
    1. **components**: React Komponenten [gruppiert nach Features](https://reactjs.org/docs/faq-structure.html#grouping-by-features-or-routes)
    1. **gatsby-theme-material-ui-top-layout**: [Anpassungen zu Material-ui](https://material-ui.com/customization/theming/) 
    1. **hooks**: Für die Anwendung entwickelte [hooks](https://reactjs.org/docs/hooks-custom.html)
    1. **model**: Typdefinitionen für das Model der Applikation
    1. **pages**: Als Default-Export deklarierte Komponenten werden von Gatsby als pages behandelt
    1. **util**: Funktionen die ohne Bezug zu Komponenten stehen

1. **static**: Webseiteninhalte statischer Natur

1. **firestore.rules**: [Firestore Security Rules](https://firebase.google.com/docs/firestore/security/get-started)

1. **gatsby-*browser.js**: [API Dateien](https://www.gatsbyjs.com/docs/api-files/) um das Verhalten der Seite zu konfigurieren

1. **package.json**: Skripte und Abhängigkeiten werden in der package.json Datei verwaltet. Referenz auf [npmjs.com](https://docs.npmjs.com/files/package.json)

### 🎓 Technische Unterstützung?

- [Gatsby](https://www.gatsbyjs.org/)
- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [JavaScript-Referenz](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference) der MDN web docs
- React component library: [Material-UI](https://material-ui.com/)

### 💫 Deploy

1. `npm run build`
1. `npm run deploy`
