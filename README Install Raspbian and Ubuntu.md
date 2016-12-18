README Install Raspbian and Ubuntu
==================================


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

- Rename and uncompress:

```
mv X.X.tar.gz stupid-remote.tar.gz
tar -zvxf stupid-remote.tar.gz
```

- Copy `stupid-remote` folder to `/opt`:

```
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
User=osmc
Group=osmc
Environment=PATH=/usr/bin:/bin:/usr/sbin:/sbin:/usr/osmc/bin/
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
