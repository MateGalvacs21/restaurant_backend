## Restaurant management backend

### Required variables

- [Required] `CONN_STRING`: Connection string to database
- [Required] `DB_NAME`: Database name, where collections found or created
- [Required] `PORT`: Port for server, in local more important

### Setup application in local
First, you need install packages from node, if you have no node CLI install the latest version from: https://nodejs.org/en/download/?utm_source=blog

After, you installed node, you can run `npm install` or `npm i` commands.

And if you set environment variables, you should run `npm run start`.

Application will be start in local and console will be written 'Server is run at {YOUR PORT} port'.

### Deploy and build
Application was written in typescript, so `npm run build` will be run simple `tsc` command and create `dist` folder.

In application has no automatic deploy script, so if you want used this in `live server` you need deploy manually your environment.
Application deployed on `www.render.com` by default.