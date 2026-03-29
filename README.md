# Terminal Portfolio

A small project for displaying my work in a terminal-like interface.

## About

I built this because I prefer the terminal and wanted a simple way to organize my projects and experience. It uses a CMS so I can update the content without having to change the code.

### How it works
- **Content:** The text for each command is stored in a database via Payload CMS.
- **Interface:** A basic Next.js frontend that takes input and shows the corresponding response.
- **Tools:** Built with Next.js, Payload, and Tailwind CSS.

## Setup

1. **Environment:** Copy `.env.example` to `.env` and add your `MONGODB_URL`.
2. **Install:** `pnpm install`
3. **Run:** `pnpm dev`

The terminal is at `localhost:3000` and the content dashboard is at `/admin`.

## Managing commands

You can add or edit commands in the admin panel. Each command needs a name (what you type), a short description, and the text you want it to display.

## Testing

- Integration: `pnpm run test:int`
- E2E: `pnpm run test:e2e`

## License
MIT
