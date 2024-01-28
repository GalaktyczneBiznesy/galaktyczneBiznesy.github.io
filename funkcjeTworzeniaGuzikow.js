rysowanieGuzikow=
{
	kolor1:"var(--podstawowy1)",kolor2:"var(--podstawowy3)",
	obraz:[],
	e:0,
	f:0,
	g:0,
	zaladuj:function()
	{
		rysowanieGuzikow.e=document.createElement("div")
		rysowanieGuzikow.e.className="guzik"
		rysowanieGuzikow.e.style.width="48vh"
		rysowanieGuzikow.e.style.height="19.2vh"
		rysowanieGuzikow.e.style.top="15vh"
		rysowanieGuzikow.e.style.left="50%"
		rysowanieGuzikow.e.style.marginLeft="-24vh"
		rysowanieGuzikow.e.style.borderTop="solid 2vh var(--podstawowy3)"
		rysowanieGuzikow.e.style.borderBottom="solid 2vh var(--podstawowy3)"
		//
		rysowanieGuzikow.f=document.createElement("div")
		rysowanieGuzikow.f.style.position="absolute"
		rysowanieGuzikow.f.style.width="100%"
		rysowanieGuzikow.f.style.height="100%"
		for (let a=0 ; a<29 ; a++)
		{
			rysowanieGuzikow.obraz[a]=[0,0,0,0,0,0,0]
			const k=rysowanieGuzikow.kolumna(a%2,rysowanieGuzikow.obraz[a])
			k.style.left=`${1.5745*a}vh`
			rysowanieGuzikow.f.appendChild(k)
		}
		rysowanieGuzikow.e.appendChild(rysowanieGuzikow.f)
		for (let a=0 ; a<29 ; a++)
		{
			for (let b=0 ; b<7 ; b++)
			{
				const k=document.createElement("div")
				k.style.position="absolute"
				k.style.left=`${(1.5745*a)+0.78725}vh`
				k.style.width=`1.5745vh`
				k.style.height=`2.743vh`
				k.style.top=`${(2.743*b)}vh`
				k.onclick = new Function(`rysowanieGuzikow.zmien(${a},${b})`)
				rysowanieGuzikow.e.appendChild(k)
			}
		}
		document.getElementById("kontent").appendChild(rysowanieGuzikow.e)
		rysowanieGuzikow.g=document.createElement("div")
		rysowanieGuzikow.g.style.position="absolute"
		rysowanieGuzikow.g.style.width="48vh"
		rysowanieGuzikow.g.style.top="41vh"
		rysowanieGuzikow.g.style.left="50%"
		rysowanieGuzikow.g.style.marginLeft="-24vh"
		rysowanieGuzikow.g.style.color="white"
		document.getElementById("kontent").appendChild(rysowanieGuzikow.g)
	},
	kolumna(typ,dane)
    {
    	const kontenerSVG=document.createElement("div")
    	kontenerSVG.style.position="absolute"
    	kontenerSVG.style.width="3.149vh"
    	kontenerSVG.style.height="19.3vh"
    	let s=`<svg width="100%" height="100%" viewBox="0 0 656 4000">`
    	typ=Number(typ)||0
    	if (typ){typ=1}
    	for (let i=0 ; i<7 ; i++)
    	{
    		if (dane[i])
    		{
	    		const h=(570*i)
	    		const w=[656,570]
	    		const d=[w[0]*0.17,w[1]*0.17]
	    		const points=[`${(w[0]/2)},${h+(0+d[1])} ${0+d[0]},${h+(w[1]-d[1])} ${w[0]-d[0]},${h+(w[1]-d[1])}`,`${0+d[0]},${h+(0+d[1])} ${w[0]-d[0]},${h+(0+d[1])} ${(w[0]/2)},${h+(w[1]-d[1])}`][(i+typ)%2]
	    		if (dane[i]>0.6)
	    		{
	    			s+=`<polygon points="${points}" style="fill:${this.kolor1}"/>`
	    		}
	    		else
	    		{
	    			s+=`<polygon points="${points}" style="fill:${this.kolor2}"/>`
	    		}
	    	}
    	}
    	s+=`</svg>`
    	kontenerSVG.innerHTML=s
    	return kontenerSVG
    },
    zmien(x,y)
    {
    	rysowanieGuzikow.obraz[x][y]-=0.5
    	if (rysowanieGuzikow.obraz[x][y]<0)
    	{
    		rysowanieGuzikow.obraz[x][y]=1
    	}
    	rysowanieGuzikow.f.innerHTML=""
    	for (let a=0 ; a<29 ; a++)
		{
			const k=rysowanieGuzikow.kolumna(a%2,rysowanieGuzikow.obraz[a])
			k.style.left=`${1.5745*a}vh`
			rysowanieGuzikow.f.appendChild(k)
		}
		rysowanieGuzikow.g.innerHTML=JSON.stringify(rysowanieGuzikow.obraz)
    }
}