function rysuj(plutno,budowaObrazka)
{
	const ctx=plutno.getContext('2d');
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	plutno.height=budowaObrazka.h||1000
	plutno.width=budowaObrazka.d||1000
	function rysujelement(typ,kolor,punkty,srodek,promien,zakresKatow,grubosc,kolorLini,rozmycie,krycie)
	{
		ctx.filter=`blur(${Number(rozmycie)||0}px)`
		ctx.globalAlpha=Number(krycie)||1
		ctx.lineWidth=grubosc||0
		ctx.strokeStyle=kolorLini||`rgba(0,0,0,0)`
		ctx.fillStyle=kolor||`rgba(0,0,0,0)`
		ctx.beginPath()
		if (typ==1)
		{
			if ((punkty||[]).length<3){return}
			ctx.moveTo(punkty[0][1],punkty[0][0])
			for (let a=1 ; a<punkty.length ; a++)
			{
				ctx.lineTo(punkty[a][1],punkty[a][0])
			}
			ctx.lineTo(punkty[0][1],punkty[0][0])
		}
		else
		{
			if (!Array.isArray(srodek) || !Number(promien)){return}
			if (Array.isArray(zakresKatow))
			{
				ctx.arc(srodek[1], srodek[0], promien, zakresKatow[0]*Math.PI, zakresKatow[1]*Math.PI);
			}
			else
			{
				ctx.arc(srodek[1], srodek[0], promien, 0, 2*Math.PI);
			}
		}
		if (kolor)
		{
			ctx.fill()
		}
		if (grubosc && kolorLini)
		{
			ctx.stroke()
		}
		ctx.closePath()
	}
	for (element of budowaObrazka.elementy)
	{
		rysujelement(element.typ,element.kolor,element.punkty,element.srodek,element.promien,element.zakresKatow,element.grubosc,element.kolorLini,element.rozmycie,element.krycie)
	}
}
