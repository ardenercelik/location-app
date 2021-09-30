build-ui:
	docker build -f Dockerfile.ui -t location-client .
build-api:
	docker build -f Dockerfile.api -t location-api .
build:
	make build-ui
	make build-api
up:
	docker-compose  up
down: 
	docker-compose  down
clean:
	docker-compose down --rmi all