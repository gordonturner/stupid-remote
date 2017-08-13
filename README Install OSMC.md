README Install OSMC
===================

Update And Upgrade
------------------

```
sudo apt-get update
sudo apt-get dist-upgrade
```

- NOTE: Do not run `sudo apt-get upgrade -y`, it will not complete the proper upgrade
- See:
https://osmc.tv/wiki/general/keeping-your-osmc-system-up-to-date/


Install Node and Npm
--------------------

- Remove existing node.js and npm if present, the Raspbian version is out of date.

```
sudo apt-get remove nodejs-legacy -y
sudo apt-get autoremove -y
```

- Install build-essential and xz-utils to uncompress the node.js archive:

```
sudo apt-get install build-essential xz-utils
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


Create nodeserver User
----------------------

- Run:

```
sudo adduser nodeserver
```


Install stupid-remote
---------------------

- Download latest source from:

https://github.com/gordonturner/stupid-remote/releases/latest

```
wget https://github.com/gordonturner/stupid-remote/archive/3.0.tar.gz
```

- Uncompress the download:

```
tar -zvxf 3.0.tar.gz
```

- From the root of the project, update npm:

```
cd stupid-remote-3.0
npm install
```

- NOTE: OSMC web interface defaults to 8080, so you will have to change the port for stupid-remote:

```
sudo vi /opt/stupid-remote/bin/www
```
```
...
/* CHANGED */
/* var port = normalizePort(process.env.PORT || '8080'); */
var port = normalizePort(process.env.PORT || '8081');
...
```

- Rename and copy `stupid-remote` folder to `/opt`:

```
cd ..
mv ./stupid-remote-3.0 ./stupid-remote
sudo cp -R ./stupid-remote /opt
```

- Change permissions:

```
sudo chown -R nodeserver.nodeserver /opt/stupid-remote
```


Create systemd unit File
------------------------

- Install on Raspbian and Ubuntu:

```
sudo vi /etc/systemd/system/nodeserver.service
```
```
[Unit]
Description=Node.js Server

[Service]
ExecStart=/usr/local/bin/node /opt/stupid-remote/bin/www
WorkingDirectory=/opt/stupid-remote
Restart=always
RestartSec=10
StandardOutput=syslog
StandardError=syslog
SyslogIdentifier=node-server

# NOTE: Settings for running on OSMC
# BEGIN OSMC
User=osmc
Group=osmc
Environment=PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/osmc/bin/
# END OSMC

# NOTE: Settings for running on rasbian
# BEGIN Raspbian
#User=pi
#Group=pi
#Environment=PATH=/usr/bin:/bin:/usr/sbin:/sbin
# END Raspbian

Environment=DEBUG=express:*
Environment=NODE_ENV=production

[Install]
WantedBy=multi-user.target
```

- Reload:

```
sudo systemctl daemon-reload
```

- Test:

```
sudo systemctl start nodeserver
sudo systemctl stop nodeserver
```

- Enable systemd:

```
sudo systemctl enable nodeserver.service
```

- Disable systemd:

```
sudo systemctl disable nodeserver.service
```


Manage
------

```
sudo systemctl start nodeserver
sudo systemctl stop nodeserver
sudo systemctl status nodeserver
```

- Monitor logs:

```
sudo journalctl -u nodeserver -f
```
