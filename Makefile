default: upgrade test build

upgrade:
	yarn install
	yarn outdated || true
	yarn upgrade

test:
	yarn lint

build:
	NODE_ENV=production yarn build
