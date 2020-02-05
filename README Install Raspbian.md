README Install Raspbian
=======================

The following instructions will setup stupid-remote to be run as a service, with its own user.


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
```

- Confirm node version:

```
node -v
```
```
v10.4.1
```


Install cec-client
------------------

- NOTE: If not using cec-client, need to remove references to it in `app.js` and `/bin/www`

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

- NOTE: Occasionally an error will appear on the first run of cec-client, it can be disregarded:

```
libCEC version: 4.0.2, git revision: libcec-4.0.2+30-8adc786~dirty, compiled on Mon Aug 21 09:41:41 UTC 2017 by root@hostname: Name or service not known on Linux 4.4.0-92-generic (armv7l), features: P8_USB, DRM, P8_detect, randr, RPi
*** Error in `cec-client': corrupted double-linked list: 0x0015dcf0 ***
Aborted
```

- Alternately, follow the instructions and install from:

```
https://github.com/Pulse-Eight/libcec
```


Install lirc
------------

- NOTE: If not using lirc, need to remove references to it in `app.js` and `/bin/www`

- Install `lirc`:

```
sudo apt-get install lirc -y
```

- Confirm version:

```
lircd -v
```
```
lircd 0.9.4c
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
wget https://github.com/gordonturner/stupid-remote/archive/4.2.tar.gz
```

- Uncompress the download:

```
tar -zvxf 4.2.tar.gz
```

- From the root of the project, update npm:

```
cd stupid-remote-4.2
npm install
```

- Rename and copy `stupid-remote` folder to `/opt`:

```
cd ..
mv ./stupid-remote-4.2 ./stupid-remote
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
#User=osmc
#Group=osmc
#Environment=PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/osmc/bin/
# END OSMC

# NOTE: Settings for running on rasbian
# BEGIN Raspbian
User=pi
Group=pi
Environment=PATH=/usr/bin:/bin:/usr/sbin:/sbin
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

- Test start and stop:

```
sudo systemctl start nodeserver
sudo systemctl stop nodeserver
```

- Enable boot at start:

```
sudo systemctl enable nodeserver.service
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
