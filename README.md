# Badges

Cloudflare WebWorker for custom profile README.md badges.

## Discord Status Badge

![Discord presence](https://badges.toryn.bio/discord/example)
![Discord presence](https://badges.toryn.bio/discord/example?color=1eb323)

Add whether you are online or offline to your profile `README.md`. This makes use of the [Lanyard API](https://github.com/Phineas/lanyard); you must be in their Discord server!

### With Profile Link

```md
(![Discord presence](https://badges.toryn.bio/discord/:id))[https://discord.com/users/:id]
```

### Without Profile Link

```md
![Discord presence](https://badges.toryn.bio/discord/:id)
```

`id` — Discord user ID

## Profile Views Badge

![Profile views](https://badges.toryn.bio/views/example)
![Profile views](https://badges.toryn.bio/views/example?color=1eb323)

Count the amount of users who visit your profile `README.md`.

```md
![Profile views](https://badges.toryn.bio/views/:username)
```

`username` — GitHub username

## Global Options

These query parameter are availible for all badges.

```
https://badges.toryn.bio/views/:username?color=7610b5
```

| Parameter | Description                  | Value(s)              | Example(s) |
| --------- | ---------------------------- | --------------------- | ---------- |
| `color`   | Changes the color of a badge | Any hexadecimal color | `7610b5`   |
