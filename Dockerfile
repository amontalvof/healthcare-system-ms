# ---------- Build stage ----------
FROM node:20-bullseye-slim AS builder
WORKDIR /usr/src/app

# Which Nest app to build (api-gateway | auth | appointment | billing | doctor | notification | patient)
ARG SERVICE
ENV SERVICE=${SERVICE}

# Copy manifest files for deterministic installs
COPY package*.json ./

# Install dev deps; fall back if lockfile is out-of-sync or missing
RUN if [ -f package-lock.json ]; then npm ci --include=dev; else npm install; fi

# Copy the rest and build ONLY the selected app (adjust if your Nest CLI needs a specific script)
COPY . .
# Option 1: if your nest CLI supports "npm run build -- <app>"
RUN npx nest build ${SERVICE}
# Option 2 (if Option 1 doesn't work):
# RUN npm run build:${SERVICE}

# ---------- Runtime stage ----------
FROM node:20-bullseye-slim AS runner
WORKDIR /usr/src/app
ENV NODE_ENV=production

# Make SERVICE available here too
ARG SERVICE
ENV SERVICE=${SERVICE}

# Copy manifest and install ONLY production deps; same fallback
COPY package*.json ./
RUN if [ -f package-lock.json ]; then npm ci --omit=dev; else npm install --omit=dev; fi

# Bring compiled code for the selected app + compiled libs
COPY --from=builder /usr/src/app/dist/apps/${SERVICE} ./dist/apps/${SERVICE}
COPY --from=builder /usr/src/app/dist/libs ./dist/libs

# Heroku sets PORT; EXPOSE is optional but fine
EXPOSE 3000

# Start the selected service
CMD ["node", "dist/apps/${SERVICE}/main.js"]