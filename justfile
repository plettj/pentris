set windows-shell := ["powershell.exe", "-c"]
set dotenv-filename := ".env.local"

# Run a specific script
script +script_name:
  pnpm ts-node --project tsconfig.ts-node.json scripts/{{script_name}}.ts

# Install Shadcn component
shad +component_name:
  pnpm dlx shadcn-ui@latest add {{component_name}}

# Development
dev: 
  pnpm dev

build:
  pnpm build

start:
  pnpm start

# Full build
prod-start: 
  pnpm build
  pnpm start

link:
  pnpm vercel link

pull-env:
  pnpm vercel env pull --environment=development

format:
  pnpm prettier --write .