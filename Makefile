default: upgrade test build deploy

upgrade:
	yarn install
	yarn upgrade

test:
	yarn lint

build:
	NODE_ENV=production yarn build

deploy:
	firebase deploy
