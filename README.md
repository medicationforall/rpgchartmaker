# rpgchartmaker

Created By James Adams 
You can see a working version of the app at [http://rpg.medicationforall.com/rpgchartmaker/](http://rpg.medicationforall.com/rpgchartmaker/)

This is an application for rapidly creating Charts for Role Playing Games. 
It has support for making basic Lists and Object Lists. 
For all practical purposes it is a means for modeling basic string arrays and object arrays in JSON. 

## Requirements
An http web server of some sort. I use Apache, but IIS would work just fine. 
It should be relatively trivial to get this working with node or python as well.

There is no server side language being used.
There is no database.


## Libraries
This Application uses [jQuery](https://jquery.com/), [jQuery-ui](http://jqueryui.com/), [FileSaver.js](https://github.com/eligrey/FileSaver.js/), and [Animate.css](https://daneden.github.io/animate.css/) all of which are being called via cdn. 
If you want run this application offline you'll need to locally reference those libraries.

##License
This application is Licensed under LGPL see the license directory. 
