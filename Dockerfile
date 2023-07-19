
FROM public.ecr.aws/docker/library/node:14

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY ./package.json /usr/src/app
COPY ./package-lock.json /usr/src/app

RUN npm install

COPY . /usr/src/app

RUN npm run build

ENV NODE_ENV=production

EXPOSE 8000

CMD ["npm", "run", "start"]
