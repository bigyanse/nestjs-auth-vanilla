# nestjs-auth-vanilla

NestJS Auth Implmentation based on TypeORM and JWT.

# Installation and Usage

- `git clone https://github.com/bigyanse/nestjs-auth-vanilla.git`
- `cd nestjs-auth-vanilla`
- `pnpm install`
- `cp .env.example .env` and modify variables in `.env` file
- `pnpm typeorm-ts-node-commonjs migration:run -d ormconfig.ts`
- `pnpm start:dev -b swc`
