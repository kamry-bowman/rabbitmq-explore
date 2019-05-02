## Notes
Uses a docker container for rabbitmq service. Assuming docker is set up, it can be run with: `docker run -d --hostname my-rabbit --name some-rabbit -p 15672:15672 -p 5672:5672 rabbitmq:3-management`. Hat tip to http://www.andyfrench.info/2017/08/quick-rabbitmq-using-docker.html

username/password is guest for admin port (15672).