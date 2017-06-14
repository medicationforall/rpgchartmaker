# rpgchartmaker

You can see a working version of the app at [http://rpg.medicationforall.com/rpgchartmaker/](http://rpg.medicationforall.com/rpgchartmaker/)

This is an application for rapidly creating Charts for Role Playing Games.<br />
Can create Lists, Object Lists, and Roll Containers.<br />
For all practical purposes it is a means for modeling string arrays and object arrays in JSON.

## Requirements
An http web server of some sort. Apache, python, or IIS will work just fine.

Optional: I wrote a servlet to enable storing and sharing charts from the server.
The servlet is written in PHP and currently uses MYSQL for the database.

Modify config.json to change the share settings for the client.


## Libraries
This Application uses:
* [jQuery](https://jquery.com/)
* [jQuery-ui](http://jqueryui.com/)
* [jQuery UI Touch Punch](http://touchpunch.furf.com/)
* [FileSaver.js](https://github.com/eligrey/FileSaver.js/)
* [Animate.css](https://daneden.github.io/animate.css/)
* [seedrandom.js](https://github.com/davidbau/seedrandom)

All of which are being called via cdn.<br />
If you want run this application offline you'll need to locally reference those libraries.

## License
This application is Licensed under LGPL see the license directory.
