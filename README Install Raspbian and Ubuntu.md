README Install Raspbian and Ubuntu
==================================

Create systemd unit File
------------------------

- Copy `stupid-remote` folder to `/opt`

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

- Enable:

```
sudo systemctl enable nodeserver.service
```

- Disable:

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
