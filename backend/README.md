# Backend
This directory contains all the backend related source files for the project.

## Folder Description
### DataBase folder 
This folder contains all the necessary SQL dump file of the project, please follow the readme file within the folder to setup database.
### django_site folder 
This folder contains all the backend source code. To extend the system, please follow the readme file within the folder.

## Frameworks
- [Django](https://docs.djangoproject.com/en/4.0/)

## Getting Started
I recommend using a [virtual environment](https://docs.python.org/3/library/venv.html) to install the project's dependencies.

Follow the following steps to set-up a virtual environment and install the required python modules:

1. From this directory, run the following command to create a virtual environment named **venv**. This will create a folder named **venv** which will contain your virtual environment.
```
python3 -m venv venv
```

2. Now, activate the virtual environment by running the following command in this directory:
```
source venv/bin/activate
```

3. Now, use pip to install the dependencies:
```
pip install -r requirements.txt
```

4. To test if you have successfully installed the project dependencies, run the django development server and verify it works.
First `cd` into the `django-site` directory, and then attempt to start the django development server.
```
cd django-site
python manage.py runserver
```
