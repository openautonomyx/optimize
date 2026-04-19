FROM node:20-alpine

WORKDIR /app

# Install deps fresh
COPY package.json package.json
RUN npm install

# Copy build output
COPY .next/ .next/
COPY next.config.ts ./

ENV NODE_ENV=production
EXPOSE 3000

CMD ["npm", "run", "start"]
