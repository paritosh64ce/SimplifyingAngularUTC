### Simplifying Angular testing with Jasmine using Karma and Grunt

## Background

This example uses Grunt task runner with karma library to test AngularJS code.
The code doesn't have any UI, it has set of AngularJS code files under [scripts/ folder](scripts/) and corresponding test files under [tests/ folder](tests/).


## How to start

Clone this repository (or download as zip and extract it), and open the folder in command prompt.
Execute the following commands

 -  npm install (installs the npm packages specified in package.json)
 -  npm install -g grunt-cli (installs grunt cli; -g for globally)
 -  npm install -g karma-cli (installs karma cli; -g for globally)

The above commands install...

 -  the packages mentioned in [package.json](package.json) file, 
 -  grunt-cli and karma-cli packages (to use the command `grunt` directly from the command prompt)

Once done, execute the below command

 -  grunt (starts karma and run tests)

 Explanation for the same is provided on my blog [Using Grunt and Karma for testing AngularJS application](http://simplifyingtechblog.wordpress.com)

## Happy learning!
