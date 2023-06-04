# Badges

Cloudflare WebWorker for custom README.md badges.

Currently offering:

- Discord status badge utilizing [Lanyard](https://github.com/Phineas/lanyard)
- Profile views badge

## Discord Status Badge

Add whether you are online or offline to your profile `README.md`. This makes use of the [Lanyard API](https://github.com/Phineas/lanyard); you must be in their Discord server!

### With Profile Link

```md
(![Discord presence](https://badges.zahtec.com/discord/:id))[https://discord.com/users/:id]
```

### Without Profile Link

```md
![Discord presence](https://badges.zahtec.com/discord/:id)
```

`id` — Discord user ID

## Profile Views Badge

Count the amount of users who visit your profile `README.md`.

```md
![Discord presence](https://badges.zahtec.com/views/:username)
```

`username` — GitHub username

## Global Options

These query parameter are availible for all badges.

```
https://badges.zahtec.com/views/:username?color=7610b5
```

| Parameter | Description                  | Value(s)              | Example(s) |
| --------- | ---------------------------- | --------------------- | ---------- |
| `color`   | Changes the color of a badge | Any hexadecimal color | `7610b5`   |
