FROM codercom/code-server:latest

USER root

RUN apt-get update && apt-get install -y curl \
    && curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && node -v \
    && npm -v

RUN mkdir -p /app && chown -R coder:coder /app

USER coder
WORKDIR /app

EXPOSE 8080


CMD ["code-server", "--auth", "none", "--bind-addr", "0.0.0.0:8080", "--disable-telemetry", "/app"]



