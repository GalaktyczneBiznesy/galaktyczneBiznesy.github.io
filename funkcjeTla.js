const tlo=
{
	zaladuj:function()
	{
		const tlo_div=document.getElementById("tlo")
		const iloscGwiazd=77
		for (let i=0 ; i<iloscGwiazd ; i++)
		{
			const gwiazda=document.createElement("div")
			gwiazda.className="gwiazdaTla"
			let p=tlo.losowaPozycja()
			for (let a=0 ; a<3 ; a++)
			{
				const odl=Math.pow(Math.pow((50-p[0]),2)+Math.pow((50-p[1]),2),0.5)
				if (Math.random()<Math.abs(odl-42)/20)
				{
					p=tlo.losowaPozycja()
				}
			}
			gwiazda.style.top=`${p[0]}%`
			gwiazda.style.left=`${p[1]}%`
			tlo_div.appendChild(gwiazda)
			setTimeout(()=>{tlo.animacjegwiazd[0](gwiazda)},4200+(Math.random()*10000))
		}
	},
	losowaPozycja:function()
	{

		const p=[0,0]
		const l=Math.floor(Math.random()*2)
		for (let j=0 ; j<2 ; j++)
		{
			p[j]=Math.floor(Math.random()*1000)/10
			if ((l+j)%2)
			{
				p[j]=Math.floor(Math.random()*350)/10
				if (Math.random()<0.5){p[j]+=65}
			}
		}
		return p
	},
	animacjegwiazd:
	[
		function(g)
		{
			g.style.transition="7s"
			setTimeout(()=>{tlo.animacjegwiazd[1](g)},10)
		},
		function(g)
		{
			g.style.opacity=0.6
			setTimeout(()=>{tlo.animacjegwiazd[2](g)},7200)
		},
		function(g)
		{
			g.style.transition="0.2s"
			setTimeout(()=>{tlo.animacjegwiazd[3](g)},10)
		},
		function(g)
		{
			g.style.opacity=1
			setTimeout(()=>{tlo.animacjegwiazd[4](g)},220)
		},
		function(g)
		{
			g.style.opacity=0.2
			setTimeout(()=>{tlo.animacjegwiazd[5](g)},220)
		},
		function(g)
		{
			g.style.opacity=0.6
			setTimeout(()=>{tlo.animacjegwiazd[6](g)},220)
		},
		function(g)
		{
			g.style.transition="7s"
			setTimeout(()=>{tlo.animacjegwiazd[7](g)},10)
		},
		function(g)
		{
			g.style.opacity=0
			setTimeout(()=>{tlo.animacjegwiazd[0](g)},7200+(Math.random()*10000))
		}
	]
}
