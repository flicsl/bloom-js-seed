# Bloom Angular Seed
### Getting started
1) Clone this repo.
2) Edit ```outline.json``` with your project stuff.
3) In the project root folder, execute ```gulp```.
4) Happy coding!
### Gulp tasks
- gulp style: Generates your project main style file by concatenating and applying ```less``` to all files defined in your outline.
- gulp script: Generates your project main script file by concatenating all files defined in your outline.
- gulp index: Generates index.html files, loading your project name and dependencies from ```bower.json```.
- gulp build [-p]: Setups the whole project structure by executing ```style```, ```script``` and ```index```, using data from your ```outline.json```. Use with -p to minify and uglify all assets, leaving them in a production-ready state.
- gulp run-tests: Executes all tests present in the directory given in the outline.
- gulp (default task): Starts a live reload server, which will watch for changes on project files, rebuild your project and reload all connected browsers.