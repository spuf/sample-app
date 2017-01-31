default: upgrade test build deploy

upgrade:
	yarn install
	yarn outdated || true
	yarn upgrade

test:
	yarn lint

build:
	NODE_ENV=production yarn build

deploy:
	firebase deploy
