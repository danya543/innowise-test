# [Task](https://docs.google.com/document/d/1zpXXeSae-BlcxPKgw3DhxZA92cspVailrPYoaXSYrW8/edit?tab=t.0#heading=h.5dt3hghpa22f)
[Deploy](https://test-app-calc.netlify.app/)

# How to run the app
Run commands in terminal in root directory
- `npm install`
- `npm run build`
- Open `index.html` from `dist/`
  

# Structure of the project

<pre>
src/
├── features/ # Functional modules of the application
│ ├── history.js# Logic of working with the history of calculations
│ ├── theme.js # Theme Logic (light/dark)
│ ├── handlers.js# Logic of click handlers
│ └── constants.js # Application constants
│
├─── math/ # Mathematical functions
│ └── expressions.js # Expression processing and evaluation
│
├── app.js # Application initialization 
├── index.html # Basic HTML template
├── index.js # Application Entry Point
└── styles.css # Global styles
</pre>