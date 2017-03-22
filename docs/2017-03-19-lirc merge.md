2017-03-19-lirc merge
=====================


stupid-remote
-------------

- steve:/Users/gturner/Developer/Work/stupid-remote

- lirc changes are on the 2017-02-10-lirc-support branch

- By merging cec code back into 2017-02-10-lirc-support, cec-client code is required
- This may not be ideal:
  - In some cases cec-client is not required
  - The latest cec-client must be compiled from source

- Code in avswitch:/home/pi/stupid-remote is synced with steve:/Users/gturner/Developer/Work/stupid-remote
- Code in steve:/Users/gturner/Developer/Work/stupid-remote is synced with 2017-02-10-lirc-support branch


stupid-remote-TV-Remote
-----------------------

- steve:/Users/gturner/Developer/Work/stupid-remote-TV-Remote
- osmc:/opt/stupid-remote

- cec code is on develop and master

- cec code has been removed from 2017-02-10-lirc-support branch
  - Technically it is still in the `package.json` file
  - Code referencing cec has been commented out from `app.js`
  - Code referencing cec has been commented out from `/bin/www`


stupid-remote-TV-Remote-cec-config
----------------------------------

- steve:/Users/gturner/Developer/Work/stupid-remote-TV-Remote-cec-config
- osmc:/home/osmc/stupid-remote-TV-Remote-cec-config

- A test copy of `stupid-remote-TV-Remote` to place all of the cec-code in `/bin/www` at the end of the file
- Test the possibility of configuration to enable / disable it



stupid-remote (osmc)
--------------------

- osmc:/opt/stupid-remote


Test stupid-remote-TV-Remote-cec-config
---------------------------------------

- Stop existing nodeserver:

```
sudo systemctl status nodeserver
sudo systemctl stop nodeserver
```

- Manually start the process:

```
cd /home/osmc/stupid-remote-TV-Remote-cec-config
DEBUG=express:* /usr/local/bin/node /home/osmc/stupid-remote-TV-Remote-cec-config/bin/www
```

- Works



Merge stupid-remote to stupid-remote-TV-Remote-cec-config
---------------------------------------------------------

- steve:/Users/gturner/Developer/Work/stupid-remote
- steve:/Users/gturner/Developer/Work/stupid-remote-TV-Remote-cec-config

- Sync to and test cec
- Manually start the process:

```
cd /home/osmc/stupid-remote-TV-Remote-cec-config
DEBUG=express:* /usr/local/bin/node /home/osmc/stupid-remote-TV-Remote-cec-config/bin/www
```

- Works on osmc

- Files that require configuration blocks for lirc or cec:

/app.js  (pending)
/bin/www (done)

- Files that require configuration for specific install:

/public/index.html

- update `/app.js` for configuration block cec
- Sync to osmc and test cec
- Works on osmc

- Disable cec and enable lirc
- Copy `device-AV-Switch.html` to `index.html`
- Sync and test lirc
- Manually start the process:

```
cd /home/pi/stupid-remote-TV-Remote-cec-config
DEBUG=express:* /usr/local/bin/node /home/pi/stupid-remote-TV-Remote-cec-config/bin/www
```

- Works
- Merge code changes into branch

- steve:/Users/gturner/Developer/Work/stupid-remote-TV-Remote-cec-config
- steve:/Users/gturner/Developer/Work/stupid-remote



Issue `Error: read ECONNRESET`
------------------------------

- When testing on osmc, stopped nodeserver and attempted to start test server
- Crashes and cannot restart nodeserver without it crashing as well


- Ran:

```
sudo systemctl stop nodeserver
sudo journalctl -u nodeserver -f
```

- Confirmed stopped
- Attempted to use `ps` to find threads, nothing obvious

- Attempted to start current server by hand, which should be known good:

```
DEBUG=* /usr/local/bin/node /opt/stupid-remote/bin/www
```

- App starts, page renders, but on button press, get error:

```
GET /cec/tvOff 200 29.761 ms - -
events.js:141
      throw er; // Unhandled 'error' event
      ^

Error: read ECONNRESET
    at exports._errnoException (util.js:870:11)
    at Pipe.onread (net.js:552:26)
```

- App crashes
- Cannot restart even the nodeserver without it crashing as well
- WTF

- Google says possible port conflict
- Running `netstat` to see what is running:

```
Active Internet connections (w/o servers)
Proto Recv-Q Send-Q Local Address           Foreign Address         State      
tcp        0      0 osmc:60311              windows-10.lan:2869     TIME_WAIT  
tcp        0      0 osmc:41908              media.lan:microsoft-ds  ESTABLISHED
tcp        0      0 osmc:41924              media.lan:microsoft-ds  ESTABLISHED
tcp        0      0 osmc:ssh                steve.lan:50588         ESTABLISHED
tcp        0      0 osmc:60310              windows-10.lan:2869     TIME_WAIT  
tcp        0      0 osmc:ssh                steve.lan:50612         ESTABLISHED
tcp        0      0 osmc:41904              media.lan:microsoft-ds  ESTABLISHED
tcp        0      0 osmc:41922              media.lan:microsoft-ds  ESTABLISHED
tcp        0      0 osmc:41916              media.lan:microsoft-ds  ESTABLISHED
tcp        0    124 osmc:41918              media.lan:microsoft-ds  ESTABLISHED
tcp        0      0 osmc:41906              media.lan:microsoft-ds  ESTABLISHED
tcp6       0      0 osmc.lan:http-alt       steve.lan:50669         TIME_WAIT  
tcp6       0      0 osmc.lan:http-alt       steve.lan:50668         TIME_WAIT  
udp        0      0 osmc:59289              firewall.lan:domain     ESTABLISHED
udp        0      0 osmc:36896              firewall.lan:domain     ESTABLISHED
Active UNIX domain sockets (w/o servers)
Proto RefCnt Flags       Type       State         I-Node   Path
unix  2      [ ]         DGRAM                    6206     /run/systemd/notify
unix  2      [ ]         DGRAM                    6220     /run/systemd/shutdownd
unix  11     [ ]         DGRAM                    6225     /run/systemd/journal/dev-log
unix  6      [ ]         DGRAM                    6235     /run/systemd/journal/socket
unix  2      [ ]         DGRAM                    8596     /run/user/1000/systemd/notify
unix  3      [ ]         STREAM     CONNECTED     6112     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     7502     /var/run/dbus/system_bus_socket
unix  2      [ ]         DGRAM                    5745     
unix  3      [ ]         STREAM     CONNECTED     7278     /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     7273     
unix  3      [ ]         STREAM     CONNECTED     8216     /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     7293     
unix  3      [ ]         STREAM     CONNECTED     7297     
unix  3      [ ]         STREAM     CONNECTED     6743     /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     7292     
unix  3      [ ]         STREAM     CONNECTED     1701     /var/run/dbus/system_bus_socket
unix  2      [ ]         DGRAM                    5844     
unix  3      [ ]         STREAM     CONNECTED     6111     
unix  3      [ ]         STREAM     CONNECTED     7501     
unix  3      [ ]         STREAM     CONNECTED     5795     
unix  2      [ ]         DGRAM                    7285     
unix  3      [ ]         STREAM     CONNECTED     9232     
unix  3      [ ]         STREAM     CONNECTED     7561     
unix  3      [ ]         STREAM     CONNECTED     1897     /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     7446     
unix  3      [ ]         STREAM     CONNECTED     1702     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     5743     
unix  3      [ ]         STREAM     CONNECTED     6117     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     5842     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     7489     
unix  3      [ ]         STREAM     CONNECTED     5751     
unix  3      [ ]         STREAM     CONNECTED     7280     /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     10242    
unix  3      [ ]         STREAM     CONNECTED     10662    
unix  2      [ ]         DGRAM                    10241    
unix  3      [ ]         STREAM     CONNECTED     7143     
unix  3      [ ]         STREAM     CONNECTED     6724     
unix  3      [ ]         STREAM     CONNECTED     10243    /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     7279     /run/systemd/journal/stdout
unix  2      [ ]         DGRAM                    10653    
unix  3      [ ]         DGRAM                    10344    
unix  3      [ ]         STREAM     CONNECTED     10663    
unix  3      [ ]         DGRAM                    10343    
unix  3      [ ]         DGRAM                    10337    
unix  3      [ ]         DGRAM                    10336    
unix  3      [ ]         STREAM     CONNECTED     8400     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     1901     /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     10654    
unix  2      [ ]         DGRAM                    9474     
unix  3      [ ]         STREAM     CONNECTED     10324    
unix  2      [ ]         DGRAM                    6737     
unix  2      [ ]         DGRAM                    6248     
unix  3      [ ]         STREAM     CONNECTED     6826     
unix  3      [ ]         STREAM     CONNECTED     1992     /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     6115     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     7126     
unix  3      [ ]         DGRAM                    10340    
unix  3      [ ]         DGRAM                    10339    
unix  3      [ ]         STREAM     CONNECTED     9457     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     9456     
unix  2      [ ]         DGRAM                    7134     
unix  3      [ ]         STREAM     CONNECTED     9465     /var/run/dbus/system_bus_socket
unix  2      [ ]         STREAM     CONNECTED     7131     
unix  2      [ ]         DGRAM                    9448     
unix  3      [ ]         STREAM     CONNECTED     7444     /run/systemd/journal/stdout
unix  3      [ ]         STREAM     CONNECTED     8396     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     8395     
unix  2      [ ]         DGRAM                    1416     
unix  3      [ ]         STREAM     CONNECTED     8337     
unix  3      [ ]         DGRAM                    1420     
unix  3      [ ]         STREAM     CONNECTED     1700     /var/run/dbus/system_bus_socket
unix  3      [ ]         DGRAM                    1419     
unix  3      [ ]         STREAM     CONNECTED     10319    /var/run/lirc/lircd
unix  3      [ ]         STREAM     CONNECTED     1690     
unix  3      [ ]         STREAM     CONNECTED     10915    
unix  3      [ ]         STREAM     CONNECTED     1698     
unix  3      [ ]         STREAM     CONNECTED     8338     
unix  3      [ ]         STREAM     CONNECTED     1699     
unix  3      [ ]         STREAM     CONNECTED     7775     
unix  3      [ ]         STREAM     CONNECTED     10916    
unix  3      [ ]         STREAM     CONNECTED     10274    /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     8339     /var/run/dbus/system_bus_socket
unix  3      [ ]         STREAM     CONNECTED     1810     
unix  3      [ ]         STREAM     CONNECTED     10906    
unix  3      [ ]         STREAM     CONNECTED     9466     /run/systemd/journal/stdout
unix  2      [ ]         DGRAM                    10905    
unix  2      [ ]         DGRAM                    7782     
unix  3      [ ]         STREAM     CONNECTED     8394     
unix  3      [ ]         STREAM     CONNECTED     9820     /var/run/dbus/system_bus_socket
```

- Noting interesting
- Although lircd is listed, it is not part of this stupid-remote build

- Calls to RPI cec device okay
- Calls to /dev/ttyACM0 cec device fail

- See if we can find what is holding onto the /dev/ttyACM0 cec device
- Install lsof:

```
sudo apt-get install lsof
```

- Run lsof:

```
lsof | grep ttyACM0
```

- Nothing actionable (?)


Attempt 1
---------

- Disable nodeserver
- Run:

```
sudo systemctl disable nodeserver
```

- Reboot
- Attempt to start:

```
DEBUG=* /usr/local/bin/node /opt/stupid-remote/bin/www
```

- Starts successfully
- On button press on UI, error:

```
  express:router dispatching GET /cec/tvOff +4s
  express:router query  : /cec/tvOff +1ms
  express:router expressInit  : /cec/tvOff +2ms
  express:router favicon  : /cec/tvOff +2ms
  express:router logger  : /cec/tvOff +1ms
  express:router jsonParser  : /cec/tvOff +2ms
  body-parser:json skip empty body +1ms
  express:router urlencodedParser  : /cec/tvOff +1ms
  body-parser:urlencoded skip empty body +1ms
  express:router cookieParser  : /cec/tvOff +1ms
  express:router serveStatic  : /cec/tvOff +1ms
  send stat "/opt/stupid-remote/public/cec/tvOff" +2ms
  express:router router  : /cec/tvOff +5ms
  express:router dispatching GET /cec/tvOff +3ms
  express:router trim prefix (/cec) from url /cec/tvOff +6ms
  express:router router /cec : /cec/tvOff +2ms
  express:router dispatching GET /tvOff +1ms
  stupid-remote:cec called tvOff +9ms
  express:router <anonymous>  : /cec/tvOff +7ms
  express:router <anonymous>  : /cec/tvOff +3ms
  express:view lookup "error.pug" +3s
  express:view stat "/opt/stupid-remote/views/error.pug" +4ms
  express:view render "/opt/stupid-remote/views/error.pug" +2ms
  morgan log request +1s
GET /cec/tvOff 500 3686.102 ms - 1129
```

- Manually kill process

- Examine `nodeserver.service`:

```
vi /etc/systemd/system/nodeserver.service
```

- Retry with cd to working directory:

```
cd /opt/stupid-remote
DEBUG=express:* /usr/local/bin/node /opt/stupid-remote/bin/www
```

- Same error

- Restore systemctl:

```
sudo systemctl enable nodeserver
sudo systemctl start nodeserver
```


Attempt 2
---------

- Disable the cec in osmc
- ssh in and disable the nodeserver

```
sudo systemctl status nodeserver
sudo systemctl stop nodeserver
```

- Manually start the process:

```
cd /opt/stupid-remote
DEBUG=express:* /usr/local/bin/node /opt/stupid-remote/bin/www
```

- Resolved






