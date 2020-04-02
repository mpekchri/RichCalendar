FROM python:3.6.6-alpine3.7
ENV PYTHONUNBUFFERED 1
WORKDIR /
RUN pip install pipenv
COPY . ./app
WORKDIR /app
RUN pipenv install --system --deploy --ignore-pipfile
WORKDIR /app/calendarapp
EXPOSE 8000
ENTRYPOINT [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]