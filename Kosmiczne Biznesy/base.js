window.G = {};
function startBg()
{
	const create =
	{
		cloud: function(d,h)
		{
			const cloud =
			{
				x: Math.random() * d,
				y: Math.random() * h,
				speed: Math.floor(h*0.001 + (Math.random()*(h*0.004))),
				radius: Math.round(h*0.05 + (Math.random()*(h*0.3))),
				alpha: 0.4 + (Math.floor(Math.random()*50)/100),
				color: 'black',
				sister: Math.floor(Math.random()*200)-100,
			};
			if (Math.random()<0.5)
			{
				cloud.color = `hsl(0,0%,${Math.floor(Math.random()*7)}%)`;
			}
			return cloud;
		},
		star: function(d,h)
		{
			const star =
			{
				x: Math.random() * d,
				y: Math.random() * h,
				alpha: Math.random(),
				phase: Math.random() * Math.PI * 2,
				speed: 0.01 + Math.random() * 0.01,
			};
			return star;
		}
	}
	G.bg = {stars:{},clouds:{}};
	G.bg.stars.canvas = document.getElementById('stars');
	G.bg.clouds.canvas = document.getElementById('clouds');
	G.bg.stars.ctx = G.bg.stars.canvas.getContext('2d');
	G.bg.clouds.ctx = G.bg.clouds.canvas.getContext('2d');
	const d = Math.max((window.innerWidth*1.5),(window.innerHeight*1.1));
	const h = window.innerHeight;
	G.bg.stars.canvas.width = d;
	G.bg.stars.canvas.height = h;
	G.bg.clouds.canvas.width = d;
	G.bg.clouds.canvas.height = h;

	G.bg.stars.list = Array.from({ length: 170 }, () => create.star(d,h));
	G.bg.clouds.list = Array.from({ length: 10 }, () => create.cloud(d,h));
	G.bg.animate = function()
	{
		if (true)
		{
			const canvas = G.bg.stars.canvas;
			const ctx = G.bg.stars.ctx;
			ctx.clearRect(0, 0, d, h);

			for (const star of G.bg.stars.list)
			{
				star.phase += star.speed;
				star.alpha = 0.6 + Math.sin(star.phase) * 0.4;

				ctx.beginPath();
				ctx.arc(star.x, star.y, Math.ceil(canvas.height*0.002), 0, Math.PI * 2);
				ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
				ctx.fill();
			}
		}
		if (true)
		{
			const canvas = G.bg.clouds.canvas;
			const ctx = G.bg.clouds.ctx;
			ctx.clearRect(0, 0, d, h);

			for (let i=0 ; i<G.bg.clouds.list.length ; i++)
			{
				const cloud = G.bg.clouds.list[i]
				ctx.globalAlpha = cloud.alpha;
				ctx.fillStyle = cloud.color;
				ctx.beginPath();
				ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
				ctx.arc(cloud.x+(cloud.radius*1.5), cloud.y+cloud.sister, cloud.radius, 0, Math.PI * 2);
				ctx.fill();

				cloud.x += cloud.speed;
				if (cloud.x - cloud.radius > d)
				{
					G.bg.clouds.list[i] = create.cloud(canvas.width,canvas.height)
					G.bg.clouds.list[i].x = -(cloud.radius*3);
				}
			}
			ctx.filter = `blur(${canvas.height*0.05}px)`;
		}
		requestAnimationFrame(G.bg.animate);
	}
	G.bg.animate();
}