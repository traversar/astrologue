FROM nikolaik/python-nodejs:python3.8-nodejs14 as base

WORKDIR /var/www
COPY . .

# Install Python Dependencies
RUN ["pip", "install", "-r", "requirements.txt"]

# Build React App
RUN ["npm", "install"]
RUN ["npm", "run", "build"]

# Move our react build for Flask to serve
# Use cp here because we're copying files inside our working directory, not from
# our host machine.
# RUN ["cp", "-r", "djsr/client/static/frontend/public/", "app/static"]
# RUN ["cp", "-r", "/static/frontend/public/", "app/static"]


EXPOSE 8000

# Run django environment
# CMD python djsr/manage.py runserver
CMD gunicorn --chdir astrologue/ djsr.wsgi
