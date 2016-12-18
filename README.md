README
------


TL;DR
-----

A web app to control devices over HDMI-cec, turning tvs on and off, switching inputs adjusting volume.


Install Node and Npm
--------------------

- Install node.js and npm:

```
sudo apt-get update
sudo apt-get install nodejs npm
```


Install cec-client
------------------

- Check to see if `cec-client` is already installed:

```
cec-client -h
```

- If a `-bash: cec-client: command not found`, install:

```
sudo apt-get install cec-client
```

- Alternately, follow the instructions and install from:

```
https://github.com/Pulse-Eight/libcec
```


Run stupid-remote
-----------------

- Download latest source from:

https://github.com/gordonturner/stupid-remote/releases/latest

- Rename and uncompress:

```
mv X.X.tar.gz stupid-remote.tar.gz
tar -zvxf stupid-remote.tar.gz
```

- From the root of the project, run:

```
cd stupid-remote
node ./bin/www
```

- Or run with DEBUG on:

```
cd stupid-remote
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

