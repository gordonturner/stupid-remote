README Install OSMC
===================

The following instructions will setup stupid-remote to be run as a service, with its own user.


Software Versions
-----------------

- OS, tested with the following distributions:
Open Source Media Center running Kodi 17.6 (OSMC_TGT_rbp1_20180502.img.gz)

- NodeJS version: 10.3.0

- cec-client tested:
libCEC version: 4.0.2


Update And Upgrade
------------------

- Update and upgrade the OS:

```
sudo apt-get update
sudo apt-get dist-upgrade -y
```

- NOTE: Do not run `sudo apt-get upgrade -y`, it will not complete the proper upgrade
- See:

https://osmc.tv/wiki/general/keeping-your-osmc-system-up-to-date/


Install Node and Npm
--------------------

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

- If the result is `armv6l` download the armv6l package
- If the result is `armv7l` download the armv7l package
- If the result is `armv8l` download the armv8l package

- Open in a browser:

https://nodejs.org/dist/latest/

- Choose the appropriate packages

- For example, download armv6l, install and restart:

```
wget https://nodejs.org/dist/latest/node-v10.3.0-linux-armv6l.tar.xz
tar -vxf node-v10.3.0-linux-armv6l.tar.xz
cd node-v10.3.0-linux-armv6l
sudo cp -R * /usr/local/
sudo reboot
```

- On restart, confirm node version:

```
node -v
```
```
v10.3.0
```


Install cec-client
------------------

- Install `cec-client`:

```
sudo apt-get install cec-utils -y
```

- NOTE: May already be installed, if so continue to next step

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
sudo vi ./stupid-remote/bin/www
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
SyslogIdentifier=nodeserver

# NOTE: Settings for running on rasbian as nodeserver
# BEGIN Raspbian
User=pi
Group=pi
Environment=PATH=/usr/bin:/bin:/usr/sbin:/sbin
# END Raspbian as nodeserver

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
