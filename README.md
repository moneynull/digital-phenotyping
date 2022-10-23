# Digital Phenotyping
This is a project built as part of SWEN900013 at the University of Melbourne.

## Directory Structure
    ├── frontend    # React frontend
    ├── backend     # Django backend
    └── README.md
## How to run this project
Open **frontend** and **backend** folder to see more detailed instructions.

## Deploying for production
In production, the entire application can be deployed on a single EC2 instance in the following way:
- Django: Gunicorn & NGINX
- React: Served with NGINX
- MySQL: Running in the background on the EC2 server
- Certbot: Used to automatically obtain https certificates 

1. Clone the repository to the home directory (`~` on linux machines)

### Setup the database (MySQL)
We use a MySQL database for our Django application. A MySQL database has already been setup on the production EC2 instance, with the name swen90013.

A user has been created with read and write privlleges on the swen90013 database and these credentials are passed to Django. If deploying the app from scratch, then the SQL dump file may need to be imported as the Django migrations are not configured properly. It is better to import the .sql  dump file as the migrations will not create the necessary tables.

### Python backend (Django)
The python backend is deployed using Gunicorn (a python WSGI web server) with NGINX in front of it.

1. Navigate to the directory containing the Python API `/backend`. Create a virtual environment in this folder with the following command. This will create a subdirectory called /venv  that will contain the virtual environment. 

    `python3 -m venv venv`

2. Activate the virtual environment. From the /backend folder, enter the following command. This will now activate the virtual environment - all packages will now be installed in the /venv  directory rather than globally

    `source venv/bin/activate`

3. Install the project's pythons dependencies in the virtual environment. From the /backend directory, run the following command:

    `pip install -r requirements.txt`

4. Now, add a text file named .env  in the `/backend/django_site` directory. This will contain our environment variables needed for the Django application to run. The production .env  file can be found on the EC2 server in the `~/digital-phenotyping/backend/django_site/`  directory. The environment file needs to contain the following lines: 
```
    # Database connection info

    DATABASE_HOST

    DATABASE_PASSWORD

    DATABASE_NAME

    DATABASE_USER

    # Google map information extraction 

    GOOGLE_API_KEY

    # Twitter information extraction

    access_token

    access_token_secret

    bearer_token

    consumer_key

    consumer_secret

    # CRON Job interval scheduling. There are three schedules tasks. These will run automatically on system startup.

    CATEGORY_SCHEDULE

    LOCATION_SCHEDULE

    TWITTER_SCHEDULE
```

5. Following the previous step, everything is ready for deployment. Now the next step is to setup gunicorn . First, ensure that gunicorn  has been installed in the virtual environment. With the virtual environment active, type the following command. You should see gunicorn  in the list of installed packages.

    `pip list`

6. Next, we need to setup gunicorn . We will use Linux's systemd and configure gunicorn as a systemd  service. Create a file named gunicorn.service  in the `/etc/systemd/system` directory. This will point to the gunicorn installation in our project's python virtual environment. It should contain the following lines:
```
    [Unit]
    Description=gunicorn daemon
    Requires=gunicorn.socket
    After=network.target

    [Service]
    User=ubuntu
    Group=www-data
    WorkingDirectory=/home/ubuntu/digital-phenotyping/backend/django_site/
    ExecStart=/home/ubuntu/digital-phenotyping/backend/venv/bin/gunicorn \
              --access-logfile - \
              --workers 3 \
              --bind unix:/run/gunicorn.sock \
              src.wsgi:application

    [Install]
    WantedBy=multi-user.target
```
7. Create another file named gunicorn.socket  in the same /etc/systemd/system  directory. It should contain the following:
```
    [Unit]
    Description=gunicorn socket

    [Socket]
    ListenStream=/run/gunicorn.sock

    [Install]
    WantedBy=sockets.target
```
8. Start gunicorn. Run the following command: 
    
    `sudo systemctl gunicorn start` 

9. Done! Now we need to configure NGINX to forward requests to gunicorn.

### Frontend (React)

Deployment of the react frontend is simple. One thing to note is the build step requires extensive compute resources and so building the react application on the EC2 instance itself is not recommended. Building on EC2 will likely cause the server to crash.

Therefore, it is better to build the react application on your local machine (via running yarn install  and yarn run build) to create the production build and then using scp to transfer the build to the EC2 instance.

This can be done in the following way on a linux/macOS machine:

1. `cd frontend | yarn run build`  will create a /build  directory in the frontend folder
2. `scp -i <path-to-ssh-key> -r build <ubuntu@ipaddress>:~`  will  transfer the build to the home directory on the ec2 instance 

Ensure that the /build  folder containing the react build lives in the home directory (`~`) on the ec2 server; otherwise the following NGINX configuration will not work.

### NGINX

NGINX is used to serve both the React build and the Django API.  Add the following files to /etc/nginx/sites-available 

Create a file named backend in the etc/nginx/sites-available  directory. This will hold our server block for the Django API. The URL is http://backend.senpsi.net and this can be used to access the Django admin page. Add the following lines.
```
    server {
        server_name backend.senpsi.net;

        location = /favicon.ico { access_log off; log_not_found off; }
        location /static/ {
            root /home/ubuntu/digital-phenotyping/backend/django_site/;
        }

        location / {
            include proxy_params;
            proxy_pass http://unix:/run/gunicorn.sock;
        }

    }
```

Create a file named react  in the etc/nginx/sites-available  directory. This will hold our server block for the react frontend. The URL is http://dev.senpsi.net. Add the following lines.
```
    server {

           root /home/ubuntu/build;
           index index.html index.htm;

           server_name dev.senpsi.net;

            location / {
                    try_files $uri /index.html =404;
            }

    }
```

### Certbot
Follow this guide to setup https for both the backend and frontend using Certbot: https://www.nginx.com/blog/using-free-ssltls-certificates-from-lets-encrypt-with-nginx/
