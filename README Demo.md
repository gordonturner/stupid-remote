README Demo
-----------

The following instructions will allow stupid-remote to be run as a local user for development and testing.


Software Versions
-----------------

- OS, tested with the following distributions:
Raspbian Stretch April 18th 2018 (2018-04-18-raspbian-stretch.zip)

- NodeJS version: 10.4.1

- cec-client tested:
libCEC version: 4.0.2


Update And Upgrade
------------------

- Update and upgrade the OS:

```
sudo apt-get update && sudo apt-get upgrade -y
sudo apt-get dist-upgrade -y
sudo apt-get autoremove -y
```


Install Node and Npm
--------------------

- Download the latest version of node
- There are different downloads for the different versions of Raspberry Pi
- To download the right one, run the following:

```
uname -m
```

- If the result is `armv6l` download the armv6l package
- If the result is `armv7l` download the armv7l package
- If the result is `armv8l` download the armv8l package

- Open in a browser:

https://nodejs.org/dist/latest/

- Choose the appropriate packages

- For example, download armv6l, install and restart:

```
wget https://nodejs.org/dist/latest/node-v10.4.1-linux-armv6l.tar.xz
tar -vxf node-v10.4.1-linux-armv6l.tar.xz
cd node-v10.4.1-linux-armv6l
sudo cp -R * /usr/local/
sudo reboot
```

- On restart, confirm node version:

```
node -v
```
```
v10.4.1
```


Install cec-client
------------------

- Install `cec-client`:

```
sudo apt-get install cec-utils -y
```

- Confirm version:

```
cec-client -i
```
```
libCEC version: 4.0.2, git revision: libcec-4.0.2+30-8adc786~dirty, compiled on Mon Aug 21 09:41:41 UTC 2017 by root@hostname: Name or service not known on Linux 4.4.0-92-generic (armv7l), features: P8_USB, DRM, P8_detect, randr, RPi
```

- Alternately, follow the instructions and install from:

```
https://github.com/Pulse-Eight/libcec
```


Download and Run
----------------

- Download latest source from:

https://github.com/gordonturner/stupid-remote/releases/latest

```
wget https://github.com/gordonturner/stupid-remote/archive/4.2.tar.gz
```

- Uncompress the download:

```
tar -zvxf 4.2.tar.gz
```

- From the root of the project, update npm and start:

```
cd stupid-remote-4.2
npm install
node ./bin/www
```

- Or run with DEBUG on:

```
cd stupid-remote-4.2
DEBUG=* node ./bin/www
```

- web ui:

http://HOSTNAME:8181/


- swagger:

http://HOSTNAME:8181/api-docs/


Customization
-------------

- First understand your cec-client commands, I suggest starting here:

http://blog.gordonturner.ca/2016/12/14/using-cec-client-on-a-raspberry-pi/


- Edit `/routes/cec.js` to create handlers that will call the appropriate cec-client commands

- Edit `/public/index.html` to call the handlers and set the appropriate names in the UI

