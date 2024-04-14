const koduj=
{
	adres:function(y,x,pn,pp)
	{
		//Yukladu,Xukladu,planeta,polePlanety
		//testowanie
		if (!(y>-1 && y<700 && x>-1 && x<700 && pn>-1 && pn<8 && pp>-1 && pp<4))
		{
			console.log("błąd")
			debugger
			return 'Ymog'
		}
		//koniec testowania
		let l=(y*22400)+(x*32)+((Number(pn)||0)*4)+(Number(pp)||0)
		let szyfr=""
		for (let i=3 ; i>=0 ; i--)
		{
			const znak=Math.floor(l/Math.pow(63,i))
			l-=(znak*Math.pow(63,i))
			szyfr+="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890+"[znak]
		}
		return szyfr
	},
	liczba:function(liczba,iloscMiejsc)
	{
		if (!liczba && liczba!=0){debugger}
		let s=""
		for (let a=0 ; a<(iloscMiejsc||2) ; a++)
		{
			const c=Math.pow(62,(iloscMiejsc-a))
			if (liczba>c){alert("liczba przewyższa ilość miejsc "+liczba);console.log("liczba przewyższa ilość miejsc");return "XX"}
			const d=Math.pow(62,((iloscMiejsc-a)-1))
			const e=Math.floor(liczba/d)
			liczba-=(e*d)
			s+="0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM"[e]||"_"
		}
		if (/_/.test(s)){debugger}
		return s
	},
	tekst:function(tekst)
	{
		let s=""
		for (let a=0 ; a<tekst.length ; a++)
		{
			if (a==0 || (a>1 && tekst[a-1]==" " && tekst[a-2]=="."))
			{
				if (tekst[a].toUpperCase()!=tekst[a])
				{
					s+="^"
				}
			}
			else if (tekst[a].toLowerCase()!=tekst[a])
			{
				s+="^"
			}
			s+=tekst[a]
		}
		tekst=s.toLowerCase()
		s=""
		let kod=[]
		p=` aeionzrwstcudl.,mkypbjg1łhąęóśż-0123456789źć?!:ńfqvx^"()/=$%&*+@`
		for (let a=0 ; a<tekst.length ; a++)
		{
			for (let b=0 ; b<p.length ; b++)
			{
				if (tekst[a]==p[b])
				{
					if (b<14){kod.push(b)}
					else
					{
						for (let c=0 ; c<Math.floor(b/14) ; c++)
						{
							kod.push(14)
						}
						kod.push((b%14))
					}
				}
			}
		}
		for (let a=0 ; a<kod.length ; a+=3)
		{
			let l=0
			for (let b=0 ; b<3 ; b++)
			{
				if (kod[a+b]>=0)
				{
					l+=kod[a+b]*Math.pow(15,2-b)
				}
				else
				{
					l+=14*Math.pow(15,2-b)
				}
			}
			s+=koduj.liczba(l,2)
		}
		return s
	},
	wygladUkladu:function(wielkosc,przesuniecie,kolor,iloscPlanet)
	{
		let szyfr=""
		//Yukladu,Xukladu,planeta,polePlanety
		//testowanie
		if (!(kolor>-1 && kolor<12 && przesuniecie>-1 && przesuniecie<10 && iloscPlanet>-1 && iloscPlanet<8 && wielkosc>0 && wielkosc<5))
		{
			console.log("błąd")
			debugger
			return 'qqqq'
		}
		//koniec testowania
		let l=(kolor*320)+(przesuniecie*32)+(iloscPlanet*4)+(wielkosc-1)
		for (let i=1 ; i>=0 ; i--)
		{
			const znak=Math.floor(l/Math.pow(63,i))
			l-=(znak*Math.pow(63,i))
			szyfr+="qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890+"[znak]
		}
		return szyfr
	},
}
const odkoduj=
{
	adres:function(szyfr)
	{
		const adres={}
		let l=0
		for (let i=0 ; i<4 ; i++)
		{
			const znak={q:0,w:1,e:2,r:3,t:4,y:5,u:6,i:7,o:8,p:9,a:10,s:11,d:12,f:13,g:14,h:15,j:16,k:17,l:18,z:19,x:20,c:21,v:22,b:23,n:24,m:25,Q:26,W:27,E:28,R:29,T:30,Y:31,U:32,I:33,O:34,P:35,A:36,S:37,D:38,F:39,G:40,H:41,J:42,K:43,L:44,Z:45,X:46,C:47,V:48,B:49,N:50,M:51,1:52,2:53,3:54,4:55,5:56,6:57,7:58,8:59,9:60,0:61,"+":62}[szyfr[i]]
			l+=(znak*Math.pow(63,3-i))
		}
		for (let i=0 ; i<4 ; i++)
		{
			adres[["y","x","planeta","polePlanety"][i]]=Math.floor(l/[22400,32,4,1][i])
			l-=adres[["y","x","planeta","polePlanety"][i]]*[22400,32,4,1][i]
		}
		return adres
	},
	liczba:function(szyfr)
	{
		if (typeof szyfr !="string"){console.log("błąd");alert("liczba nie jest stringiem");return 7}
		const b={0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,q:10,w:11,e:12,r:13,t:14,y:15,u:16,i:17,o:18,p:19,a:20,s:21,d:22,f:23,g:24,h:25,j:26,k:27,l:28,z:29,x:30,c:31,v:32,b:33,n:34,m:35,Q:36,W:37,E:38,R:39,T:40,Y:41,U:42,I:43,O:44,P:45,A:46,S:47,D:48,F:49,G:50,H:51,J:52,K:53,L:54,Z:55,X:56,C:57,V:58,B:59,N:60,M:61}
		let liczba=0
		for (let a=0 ; a<szyfr.length ; a++)
		{
			const d=Math.pow(62,((szyfr.length-a)-1))
			const e=b[szyfr[a]]
			if (!(e>=0)){console.log("błąd");alert("niepoprawny kod liczby");return liczba}
			liczba+=(e*d)
		}
		return liczba
	},
	tekst:function(szyfr)
	{
		kod=[]
		for (let a=0 ; a<szyfr.length ; a+=2)
		{
			l=odkoduj.liczba(szyfr[a]+szyfr[a+1])
			kod.push(Math.floor(l/225))
			l-=(Math.floor(l/225)*225)
			kod.push(Math.floor(l/15))
			l-=(Math.floor(l/15)*15)
			kod.push(l)
		}
		p=` aeionzrwstcudl.,mkypbjg1łhąęóśż-0123456789źć?!:ńfqvx^"()/=$%&*+@`
		let tekst=""
		let tryb=0
		for (let a=0 ; a<kod.length ; a++)
		{
			if (kod[a]>13)
			{
				tryb++
			}
			else
			{
				tekst+=p[(tryb*14)+kod[a]]
				tryb=0
			}
		}
		s=""
		for (let a=0 ; a<tekst.length ; a++)
		{
			if (a==0 || (a>1 && tekst[a-1]==" " && tekst[a-2]=="."))
			{
				if (tekst[a]!="^")
				{
					s+=tekst[a].toUpperCase()
				}
			}
			else if (tekst[a]=="^")
			{
				a++
				s+=tekst[a].toUpperCase()
			}
			else
			{
				s+=tekst[a]
			}
		}
		return s
	},
	wygladUkladu:function(szyfr)
	{
		const wygladUkladu={}
		let l=0
		for (let i=0 ; i<2 ; i++)
		{
			const znak={q:0,w:1,e:2,r:3,t:4,y:5,u:6,i:7,o:8,p:9,a:10,s:11,d:12,f:13,g:14,h:15,j:16,k:17,l:18,z:19,x:20,c:21,v:22,b:23,n:24,m:25,Q:26,W:27,E:28,R:29,T:30,Y:31,U:32,I:33,O:34,P:35,A:36,S:37,D:38,F:39,G:40,H:41,J:42,K:43,L:44,Z:45,X:46,C:47,V:48,B:49,N:50,M:51,1:52,2:53,3:54,4:55,5:56,6:57,7:58,8:59,9:60,0:61,"+":62}[szyfr[i]]
			l+=(znak*Math.pow(63,1-i))
		}
		for (let i=0 ; i<4 ; i++)
		{
			wygladUkladu[["kolor","przesuniecie","iloscPlanet","wielkosc"][i]]=Math.floor(l/[320,32,4,1][i])
			l-=wygladUkladu[["kolor","przesuniecie","iloscPlanet","wielkosc"][i]]*[320,32,4,1][i]
		}
		wygladUkladu.wielkosc++
		return wygladUkladu
	},
}
