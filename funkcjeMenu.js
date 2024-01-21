const funkcjeMenu=
{
	stan:0,
	wysun:function(menu)
	{
		if (funkcjeMenu.stan==-1){return}
		const oknoMenu=document.getElementById("oknoMenu")
		if (funkcjeMenu.stan!=0)
		{
			if (menu==funkcjeMenu.stan)
			{
				return funkcjeMenu.schowaj()
			}
			funkcjeMenu.stan=-1
			funkcjeMenu.rama.zamknij()
			setTimeout(funkcjeMenu.rama.otworz,320)
			setTimeout(()=>{funkcjeMenu.stan=menu},630)
			return
		}
		else
		{
			funkcjeMenu.stan=-1
			oknoMenu.style.marginTop="0vh"
			document.getElementById(`ramyMenu`).style.opacity=1
			setTimeout(funkcjeMenu.rama.otworz,250)
			setTimeout(()=>{funkcjeMenu.stan=menu},600)
			return
		}
	},
	schowaj:function()
	{
		if (funkcjeMenu.stan==-1 || funkcjeMenu.stan==0){return}
		funkcjeMenu.stan=-1
		funkcjeMenu.rama.zamknij()
		setTimeout(()=>{document.getElementById(`ramyMenu`).style.opacity=0},310)
		setTimeout(()=>{document.getElementById("oknoMenu").style.marginTop="-100vh"},520)
		setTimeout(()=>{funkcjeMenu.stan=0},550)
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
	guziki:
	{
		ekrany:
		{
			zero:
			[
				{
					guziki:
					[
						{
							zaznaczony:0,
							svg:"",
							link:"",
							funkcja:"",
							menu:"test1",
							div:document.createElement("div"),
						},
						{
							zaznaczony:0,
							svg:"",
							link:"",
							funkcja:"",
							menu:"test2",
							div:document.createElement("div"),
						},
						{
							zaznaczony:0,
							svg:"",
							link:"",
							funkcja:"",
							menu:"test3",
							div:document.createElement("div"),
						},
						{
							zaznaczony:0,
							svg:"",
							link:"",
							funkcja:"",
							menu:"",
							div:document.createElement("div"),
						},
					],
				},
				{
					guziki:
					[
						{
							zaznaczony:0,
							svg:"",
							link:"",
							funkcja:"",
							menu:"",
							div:document.createElement("div"),
						},
						{
							zaznaczony:0,
							svg:"",
							link:"",
							funkcja:"",
							menu:"test4",
							div:document.createElement("div"),
						},
						{
							zaznaczony:0,
							svg:"",
							link:"",
							funkcja:"",
							menu:"test5",
							div:document.createElement("div"),
						},
						{
							zaznaczony:0,
							svg:"",
							link:"",
							funkcja:"",
							menu:"test6",
							div:document.createElement("div"),
						},
					],
				}
			]
		},
		start:function()
		{
			for (let i=0 ; i<2 ; i++)
			{
				const pas=document.getElementById("pas"+(i+1)).getElementsByClassName("kontentPas")[0]
				pas.style.width="48vh"
				pas.style.marginLeft="-24vh"
				for (let j=0 ; j<4 ; j++)
				{
					const guzik=funkcjeMenu.guziki.ekrany.zero[i].guziki[j]
					guzik.div.className="guzik"
					setTimeout(()=>{pas.appendChild(guzik.div)},750)
					setTimeout(()=>{funkcjeMenu.guziki.odswiez(guzik)},1000)
				}
			}
		},
		otworz:function(guzik)
		{
			guzik.div.style.height="4vh"
			guzik.div.style.marginTop="0.5vh"
		},
		zamknij:function(guzik)
		{
			guzik.div.style.height="0vh"
			guzik.div.style.marginTop="2.5vh"
		},
		odswiez:function(guzik,e)
		{
			if (!e)
			{
				for (let a=0 ; a<guzik.div.children.length ; a++)
				{
					guzik.div.children[a].style.transition="1s"
					guzik.div.children[a].style.opacity=0
				}
				setTimeout(()=>{funkcjeMenu.guziki.odswiez(guzik,1)},150)
			}
			else if (e==1)
			{
				guzik.div.innerHTML=""
				funkcjeMenu.guziki.zamknij(guzik)
				setTimeout(()=>{funkcjeMenu.guziki.odswiez(guzik,2)},150)
			}
			else if (e==2)
			{
				if (guzik.link && typeof guzik.link=="string")
				{
					guzik.funkcja = new Function(`window.open("${guzik.link}","_blank")`)
				}
				else if (guzik.menu)
				{
					guzik.funkcja = new Function(`funkcjeMenu.wysun("${guzik.menu}")`)
				}
				if (guzik.zaznaczony)
				{
					for (let i=0 ; i<2 ; i++)
					{
						guzik.div.className="guzikZaznaczony"
					}
				}
				guzik.div.onclick=function(){funkcjeMenu.guziki.odswiez(guzik);setTimeout(()=>{(guzik.funkcja||new Function(``))()},500)}
				setTimeout(()=>{funkcjeMenu.guziki.odswiez(guzik,3)},200)
			}
			else if (e==3)
			{
				funkcjeMenu.guziki.otworz(guzik)
				setTimeout(()=>{funkcjeMenu.guziki.odswiez(guzik,4)},120)
			}
			else if (e==4)
			{
				if (guzik.svg)
				{
					guzik.div.innerHTML=`<svg width="10vh" height="4vh" viewbox="0 0 24 24">${guzik.svg}</svg>`
					for (let a=0 ; a<guzik.div.children.length ; a++)
					{
						guzik.div.children[a].style.transition="1s"
						guzik.div.children[a].style.opacity=0
					}
					setTimeout(()=>{funkcjeMenu.guziki.odswiez(guzik,5)},5)
				}
			}
			else if (e==5)
			{
				for (let a=0 ; a<guzik.div.children.length ; a++)
				{
					guzik.div.children[a].style.opacity=1
				}
			}
		}
	}
}
