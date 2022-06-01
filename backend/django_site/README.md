# Django Project
This directory contains the Django project. It's been generated using `django-admin startproject ____`. All django-related source code will live in this folder.

## Documentation
The Django documentation and the steps used to generate the project can be found [here](https://docs.djangoproject.com/en/4.0/intro/tutorial01/).

## Testing
The Django test case [test](https://docs.djangoproject.com/en/4.0/topics/testing/) is used for this project.
Run the following command to view the coverage result of the backend tests
```
coverage run manage.py test --parallel auto -v 2 --keepdb
coverage report -m
```