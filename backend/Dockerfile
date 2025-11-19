ARG DJANGO_APP_NAME

FROM python:3.12.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set work directory
WORKDIR /app

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        python3-dev \
        pkg-config \
        default-libmysqlclient-dev \
        gettext \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy project files
COPY . .

RUN mkdir -p /app/static
RUN mkdir -p /app/locale

RUN python manage.py collectstatic --noinput --settings=${DJANGO_APP_NAME}.settings_cloud || true
RUN python manage.py compilemessages --settings=${DJANGO_APP_NAME}.settings_cloud || true

EXPOSE 8080

CMD gunicorn --bind 0.0.0.0:8080 ${DJANGO_APP_NAME}.wsgi:application --workers 2 --threads 2 --timeout 60 --preload
