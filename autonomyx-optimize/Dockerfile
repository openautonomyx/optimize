FROM node:20-alpine

WORKDIR /workspace/project/autonomyx-optimize/apps/web

COPY package.json package.json
COPY node_modules/ node_modules/
COPY .next/ .next/
COPY next.config.ts ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npx", "next@15.0.0", "start"]
