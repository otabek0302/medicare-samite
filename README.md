# @samit-medical/workspace

## Installation

To install dependencies:

```bash
bun install
```

## Configuration

```bash
docker network create medicare
```

## Migration

Copy source files of two folders: `SourceFile` and `Documentation` folders into root of this project.

And then run `./migrate.sh` to do rest of task script itself and it should work.

## Running

### Locally

```compose
docker-compose -f docker-compose.dev.yml up -d
```

### Production

```compose
docker-compose up -d
```

## Access

| Name     | Address   | Port |
| -------- | --------- | ---- |
| admin    | localhost | 5173 |
| front    | localhost | 5174 |
| api      | localhost | 8000 |
| artistan | localhost | 9000 |
| pusher   | localhost | 6001 |

## Contributing

You can do contribution via Pull Requests and it's much safer, easier and more common case
