# Wage-Watch

Wage-Watch is a Node.js application that enables you to visualize your earnings in real-time based on your salary or hourly wage.

## Features

- Real-time visualization of earnings based on salary or hourly wage.
- 'Lap' feature that logs your earnings at specific points in time.
- Pause and reset functionalities.

## File and Directory Structure
```
/.
|   .gitattributes
|   .gitignore
|   notes.txt
|   package-lock.json
|   package.json
|   README.md
|   server.js
|   
|           
+---public
|   +---dist
|   |       style.css
|   |       style.css.map
|   |       
|   +---html
|   |       hourlytimer.html
|   |       index.html
|   |       salarytimer.html
|   |       
|   \---js
|           home.js
|           hourlytimer.js
|           inputfilter.js
|           salarytimer.js
|           
\---scss
        style.scss
        _buttons.scss
        _globals.scss
        _home.scss
        _mixins.scss
        _variables.scss
```


## Description of Major Files and Directories

- `server.js` : This is the main Node.js server file that serves the application.
- `public/dist` : This directory contains the compiled CSS file for styling the application.
- `public/html` : This directory contains the HTML files of the application. It has separate HTML files for the homepage, the salary timer and the hourly wage timer.
- `public/js` : This directory contains JavaScript files that handle user interactions for different pages.
- `scss` : This directory contains all the SCSS (Sassy CSS) files used for styling the application.

## Usage

1. Clone the repository to your local machine.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the project dependencies.
4. Start the server by running `node server.js`.
5. Open a web browser and go to `http://localhost:3000` (or the port you've configured) to access the application.

Please ensure Node.js is installed on your local machine before following these steps.


## License

This project is licensed under the MIT License.

