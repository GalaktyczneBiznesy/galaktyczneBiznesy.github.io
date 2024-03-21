function rysuj(plutno,budowaObrazka)
{
	const ctx=plutno.getContext('2d');
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	plutno.height=budowaObrazka.h||1000
	plutno.width=budowaObrazka.d||1000
	for (element of budowaObrazka.elementy)
	{
		ctx.globalAlpha=Number(element.krycie)||1
		ctx.lineWidth=element.grubosc||0
		ctx.strokeStyle=element.kolorLini||`rgba(0,0,0,0)`
		ctx.fillStyle=element.kolor||`rgba(0,0,0,0)`
		if (element.rozmycie)
		{
			ctx.filter=`blur(${element.rozmycie||0}px)`
		}
		ctx.beginPath()
		if (Array.isArray(element.srodek) && element.promien>0)
		{
			if (Array.isArray(element.zakresKatow))
			{
				ctx.arc(element.srodek[1], element.srodek[0], element.promien, element.zakresKatow[0]*Math.PI, element.zakresKatow[1]*Math.PI);
			}
			else
			{
				ctx.arc(element.srodek[1], element.srodek[0], element.promien, 0, 2*Math.PI);
			}
		}
		else if ((element.punkty||[]).length>2)
		{
			ctx.moveTo(element.punkty[0][1],element.punkty[0][0])
			for (let a=1 ; a<element.punkty.length ; a++)
			{
				ctx.lineTo(element.punkty[a][1],element.punkty[a][0])
			}
			ctx.lineTo(element.punkty[0][1],element.punkty[0][0])
		}
		else
		{
			console.log("nieznany kształt: ",element)
		}
		if (element.kolor)
		{
			ctx.fill()
		}
		if (element.grubosc && element.kolorLini)
		{
			ctx.stroke()
		}
		ctx.closePath()
		if (element.rozmycie)
		{
			ctx.filter=`none`
		}
	}
}
