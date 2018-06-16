README
======


TL;DR
-----

A web app to control devices over HDMI-cec, turning tvs on and off, switching inputs adjusting volume.

Tested to work on Raspbian and OMSC, but should work on any other linux distribution.


Dependencies
------------

*PLEASE NOTE:* This project requires cec-client and lircd binaries to be installed.

If they are not installed, the project will not start.

Normally, this project is installed on a Raspberry Pi, where the cec-client and lircd apps are available.


Run Application
---------------

To run stupid-remote as a local user for development and testing please see:

[README Demo.md](README Demo.md)  

For more permanent installations please see:

[README Install Raspbian.md](README Install Raspbian.md)  

[README Install OSMC.md](README Install OSMC.md)  


Swagger UI
----------

Please note, the Swagger UI is here:

http://localhost:8080/api-docs/

And the specification file (paste into the top of the page) is here:

http://localhost:8080/swagger/swagger.json