FROM python:3.9
ENV PYTHONUNBUFFERED=1

# Install dependencies

USER root
RUN mkdir /code && chown 1000:1000 /code

# Python & Django-specific

USER 1000
WORKDIR /code
COPY requirements.txt /code/

USER root
RUN pip install -r requirements.txt

USER 1000
COPY . /code/
