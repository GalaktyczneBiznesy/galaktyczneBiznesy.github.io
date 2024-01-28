const menu=
{
	guziki:[[],[],[]],
	menu:{},
	zaladuj:function()
	{
		for (let i=0 ; i<2 ; i++)
		{
			menu.guziki[i]=[]
			const pas=document.getElementById("pas"+(i+1)).getElementsByClassName("kontentPas")[0]
			setTimeout(()=>{pas.style.width="48vh";pas.style.marginLeft="-24vh"},500)
			for (let j=0 ; j<4 ; j++)
			{
				menu.guziki[i][j] = new Guzik({aktywny:false})
				setTimeout(()=>{pas.appendChild(menu.guziki[i][j].div)},1750)
			}
		}
	},
	stan:0,
	wysun:function(typ)
	{
		if (menu.stan==-1){return}
		const oknoMenu=document.getElementById("oknoMenu")
		if (menu.stan!=0)
		{
			if (typ==menu.stan)
			{
				return menu.schowaj()
			}
			menu.stan=-1
			menu.rama.zamknij()
			setTimeout(menu.rama.otworz,320)
			setTimeout(()=>{menu.stan=typ},630)
			return
		}
		else
		{
			menu.stan=-1
			oknoMenu.style.marginTop="0vh"
			document.getElementById(`ramyMenu`).style.opacity=1
			setTimeout(menu.rama.otworz,250)
			setTimeout(()=>{menu.stan=typ},600)
			return
		}
	},
	schowaj:function()
	{
		if (menu.stan==-1 || menu.stan==0){return}
		menu.stan=-1
		menu.rama.zamknij()
		setTimeout(()=>{document.getElementById(`ramyMenu`).style.opacity=0},310)
		setTimeout(()=>{document.getElementById("oknoMenu").style.marginTop="-100vh"},520)
		setTimeout(()=>{menu.stan=0},550)
	},
	rama:
	{
		otworz:function()
		{
			setTimeout(()=>{document.getElementById("tloMenu").style.opacity=1},100)
			document.getElementById("kontentMenu").style.opacity=1
			for (let i=0 ; i<2 ; i++)
			{
				const rama=document.getElementById(`ramaMenu${i+1}`)
				rama.style[["left","right"][i]]="0vh"
			}
		},zamknij:function()
		{
			document.getElementById("tloMenu").style.opacity=0
			document.getElementById("kontentMenu").style.opacity=0
			for (let i=0 ; i<2 ; i++)
			{
				const rama=document.getElementById(`ramaMenu${i+1}`)
				rama.style[["left","right"][i]]="23vh"
			}
		}
	},
}
class Guzik
{
    constructor(dane)
    {
    	this.id=menu.guziki[2].length
    	menu.guziki[2][this.id]=this
    	this.div=document.createElement("div")
        this.odswiez(dane)
    }
    odswiez(dane,etap)
    {
        if (dane && typeof dane=="object")
        {
        	for (let pole in dane)
        	{
        		this[pole]=dane[pole]
        	}
        }
        if (!etap)
        {
	        for (let a=0 ; a<this.div.children.length ; a++)
	        {
	        	this.div.children[a].style.transition="0.2s"
	        	this.div.children[a].style.opacity=0
	        }
	        setTimeout(()=>{this.odswiez(0,1)},200)
	    }
	    else if (etap==1)
        {
	        this.div.innerHTML=""
	        this.div.style.height="0.2vh"
	        this.div.style.marginTop="2.4vh"
	        setTimeout(()=>{this.odswiez(0,2)},200)
	    }
	    else if (etap==2)
        {
        	if (this.aktywny)
        	{
		        this.div.style.height="4vh"
		        this.div.style.marginTop="0.5vh"
		        setTimeout(()=>{this.odswiez(0,3)},200)
		    }
		    else
		    {
		    	this.div.className="guzik"
		    }
	    }
	    else if (etap==3)
        {
	        this.div.onclick = new Function(`menu.guziki[2][${this.id}].klik(menu.guziki[2][${this.id}])`)
	        if (this.przejdz)
	        {
	        	this.funkcja=window.open(this.przejdz)
	        }
	        else if (this.otworz)
	        {
	        	this.funkcja=window.open(this.przejdz,"_blank")
	        }
	        else if (this.menu)
	        {
	        	this.funkcja=function(){menu.wysun(this.menu)}
	        }
	        else if (this.funkcja)
	        {
	        	this.funkcja = new Function(this.funkcja)
	        }
	        //
	        this.kolor1="var(--podstawowy1)"
	        this.kolor2="var(--podstawowy3)"
	        if (this.zaznaczony)
	        {
	        	this.div.className="guzikZaznaczony"
	        	this.kolor1="var(--zaznaczony1)"
	        	this.kolor2="var(--zaznaczony3)"
	        }
	        for (let a=0 ; a<30 ; a++)
	        {
	        	const kolumna=this.kolumna(a%2,[Math.floor(Math.random()*2),Math.floor(Math.random()*2),Math.floor(Math.random()*2),Math.floor(Math.random()*2),Math.floor(Math.random()*2),Math.floor(Math.random()*2),Math.floor(Math.random()*2)])
	        	kolumna.style.left=`${0.328*a}vh`
	        	this.div.appendChild(kolumna)
	        }
	        setTimeout(()=>{this.odswiez(0,4)},10)
	    }
    }
    klik(guzik)
    {
    	setTimeout(guzik.funkcja,200)
    }
    kolumna(typ,dane)
    {
    	const kontenerSVG=document.createElement("div")
    	kontenerSVG.style.position="absolute"
    	kontenerSVG.style.width="0.656vh"
    	kontenerSVG.style.height="4vh"
    	let s=`<svg width="100%" height="100%" viewBox="0 0 656 4000">`
    	typ=Number(typ)||0
    	if (typ){typ=1}
    	for (let i=0 ; i<7 ; i++)
    	{
    		if (dane[i] || Math.random()<0.4)
    		{
	    		const h=(570*i)
	    		const w=[656,570]
	    		const d=[w[0]*0.17,w[1]*0.17]
	    		const points=[`${(w[0]/2)},${h+(0+d[1])} ${0+d[0]},${h+(w[1]-d[1])} ${w[0]-d[0]},${h+(w[1]-d[1])}`,`${0+d[0]},${h+(0+d[1])} ${w[0]-d[0]},${h+(0+d[1])} ${(w[0]/2)},${h+(w[1]-d[1])}`][(i+typ)%2]
	    		if (dane[i])
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
    }
}
