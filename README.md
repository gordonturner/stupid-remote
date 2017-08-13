README
------


TL;DR
-----

A web app to control devices over HDMI-cec, turning tvs on and off, switching inputs adjusting volume.

Tested to work on Raspbian and OMSC, but should work on any other linux distribution.


Demo and Install
----------------

The following instructions will allow stupid-remote to be run as a local user for development and testing.

For more permanent installations, please see:

README Install Raspbian.md
README Install OSMC.md


Update And Upgrade
------------------

```
sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt-get autoremove -y
```


Install Node and Npm
--------------------

- Remove existing node.js and npm if present, the Raspbian version is out of date.

```
sudo apt-get remove nodejs-legacy -y
sudo apt-get autoremove -y
```

- Download the latest LTS version of node
- There are different downloads for the different versions of Raspberry Pi
- To download the right one, run the following:

```
uname -m
```

- If the result is `armv7l` download the armv7l package
- If the result is `armv8l` download the armv8l package

- For example, download armv7l, install and restart:

```
wget https://nodejs.org/dist/v6.11.2/node-v6.11.2-linux-armv7l.tar.xz
tar -vxf node-v6.11.2-linux-armv7l.tar.xz
cd node-v6.11.2-linux-armv7l
sudo cp -R * /usr/local/
sudo reboot
```

- On restart, confirm node version:

```
node -v
```
```
v6.11.2
```


Install cec-client
------------------

- Check to see if `cec-client` is already installed:

```
cec-client -i
```
```
libCEC version: 4.0.2,  compiled on Sat May 27 16:37:50 UTC 2017 by root@compiler2 on Linux 3.16.0-4-amd64 (armv7l), features: P8_USB, DRM, P8_detect, RPi
```

- If a `-bash: cec-client: command not found`, install:

```
sudo apt-get install cec-utils
```

- Alternately, follow the instructions and install from:

```
https://github.com/Pulse-Eight/libcec
```


Run stupid-remote
-----------------

- Download latest source from:

https://github.com/gordonturner/stupid-remote/releases/latest

```
wget https://github.com/gordonturner/stupid-remote/archive/3.0.tar.gz
```

- Uncompress the download:

```
tar -zvxf 3.0.tar.gz
```

- From the root of the project, update npm and start:

```
cd stupid-remote-3.0
npm install
node ./bin/www
```

- Or run with DEBUG on:

```
cd stupid-remote-3.0
DEBUG=* node ./bin/www
```

- web ui:

http://HOSTNAME:8080/


- swagger:

http://HOSTNAME:8080/api-docs/


Customization
-------------

- First understand your cec-client commands, I suggest starting here:

http://blog.gordonturner.ca/2016/12/14/using-cec-client-on-a-raspberry-pi/


- Edit `/routes/cec.js` to create handlers that will call the appropriate cec-client commands

- Edit `/public/index.html` to call the handlers and set the appropriate names in the UI

