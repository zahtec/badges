import isbot from "isbot";

export interface Env {
	db: KVNamespace;
}

interface LanyardResponse {
	success: boolean;
	data: {
		spotify: null;
		listening_to_spotify: boolean;
		kv: Record<string, string>;
		discord_user: {
			username: string;
			public_flags: number;
			id: string;
			global_name: string;
			display_name: string;
			discriminator: string;
			bot: boolean;
			avatar_decoration: string;
			avatar: string;
		};
		discord_status: string;
		activities: {
			type: number;
			state: string;
			name: string;
			id: string;
			emoji: {
				name: string;
				id: string;
				animated: boolean;
			} | null;
			created_at: number;
		}[];
		active_on_discord_web: boolean;
		active_on_discord_mobile: boolean;
		active_on_discord_desktop: boolean;
	};
}

const createBadge = (label: string, message: string, color: string) => {
	const labelWidth = 20 + label.length * 5;
	const messageWidth = 20 + message.length * 5;
	const width = labelWidth + messageWidth;

	return new Response(
		`
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="20">
    <title>${label}: ${message}</title>

    <linearGradient id="s" x2="0" y2="100%">
        <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
        <stop offset="1" stop-opacity=".1"/>
    </linearGradient>

    <clipPath id="r">
        <rect width="${width}" height="20" rx="3" fill="#fff"/>
    </clipPath>

    <g clip-path="url(#r)">
        <rect width="${labelWidth}" height="20" fill="#555"/>
        <rect x="${labelWidth}" width="${messageWidth}" height="20" fill="#${color}"/>
        <rect width="${width}" height="20" fill="url(#s)"/>
    </g>

    <g fill="#fff" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" text-rendering="geometricPrecision" font-size="110">
        <text x="70" y="140" transform="scale(.1)" fill="#fff">${label}</text>
        <text x="${labelWidth * 10 + 80}" y="140" transform="scale(.1)" fill="#fff">${message}</text>
    </g>
</svg>
`.trim(),
		{ headers: { "Content-Type": "image/svg+xml" } }
	);
};

export default {
	async fetch(request: Request, env: Env) {
		const url = request.url.split("/");
		const color = new URLSearchParams(request.url.split("?")[1]).get("color") || "7610b5";

		switch (url[3]) {
			case "discord":
				if (!url[4]) return new Response("Please provide a Discord ID", { status: 400 });

				return fetch(`https://api.lanyard.rest/v1/users/${url[4]}`)
					.then((res) => res.json() as Promise<LanyardResponse>)
					.then((res) =>
						res.success
							? createBadge("Discord", res.data.discord_status !== "offline" ? "online" : "offline", color)
							: new Response("User is not being monitored by Lanyard", {
									status: 400,
							  })
					);

			case "views":
				if (!url[4])
					return new Response("Please provide a GitHub username", {
						status: 400,
					});

				if ((await fetch(`https://github.com/${url[4]}`, { method: "HEAD" })).status === 404)
					return new Response("GitHub user not found", { status: 404 });

				const views = await env.db.get(url[4]);

				if (views && !isbot(request.headers.get("user-agent"))) env.db.put(url[4], String(Number(views) + 1));
				else await env.db.put(url[4], "0");

				return createBadge("Views", views || "0", color);
			default:
				return new Response("Not Found", { status: 404 });
		}
	},
};
