# A simplified distrubted exchange

## Get started

**Note**: using `pnpm`

### Start grenache grape

```sh
pnpm start:grenache
```

This will boot up a grape server.

### Start worker

```sh
pnpm start:server
```

### Start client

```sh
pnpm start:client
```

**Note**: Client generates a buy/sell order for a random user every time you execute

### Submit Order

```
pnpm order:submit <type> <price> <quantity> <userId>
```

#### Examples

```sh
pnpm order:submit buy 100 10 2a2c91fb-7256-40fe-8e84-cf5fa3bf7e44
pnpm order:submit sell 100 10 ec31ee39-40bf-41d5-9a2d-98bedd9b03bd
```

### View Orders

```sh
pnpm order:show
```

### View Trades

```sh
pnpm trade:show
```

## Improvements to code

- Typescript
- Tests for services
- Data validation
- Better error handling
- Improved matching logic
