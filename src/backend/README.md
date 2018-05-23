## Para levantar el MicroServicio
en el path ``` src/backend``` ejecutar ``` npm install```


## Instalar Docker

**MAC** `https://www.docker.com/docker-mac`

**WINDOWS** `https://www.docker.com/docker-windows`

## Instrucciones locales 

Para crear una network 
```bash
docker network create  --driver bridge custom
```

Para iniciar el build es necesario tener Docker y Docker Compose, y ejecutar el siguiente comando:

```bash
docker-compose -f docker-compose.local.yml build
```

Y luego, para levantar, es necesario ejecutar esto:

```bash
docker-compose -f docker-compose.local.yml up -d
```

Para levantar el Dockerfile del servicio

```bash
docker build -t poc_referidos_local .
docker run poc_referidos_local:latest
```

Para stoppear el ContainnerId

```bash
docker ps
docker stop CONTAINER_ID
curl -i localhost:8080
```

Para testear

```bash
curl -i localhost:8080
```
