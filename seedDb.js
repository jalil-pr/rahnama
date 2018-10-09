var Home               =require("./models/home.js"),
    Shope              =require("./models/shope.js"),
    Office             =require("./models/office.js");



var offices=[
{
	length:"25 meters",
	width:"5 meters",
	category:"فروشی",
	price:25000,
	location:"مارکیت ملی پول سرخ دوکان تمبر ۱۲۳",
	image:"https://www.papawestray.co.uk/images/shop-interior.jpg",
	provence:"Herat",
	description:"number one office in herat ",
    floor_number:"دو"


},
{

	length:"25 meters",
	width:"5 meters",
	owner:"حکیم",
	category:"فروشی",
	price:"34",
	location:"مارکیت ملی پول سرخ دوکان تمبر ۱۲۳",
	image:"https://www.papawestray.co.uk/images/shop-interior.jpg",
	provence:"Ghazni",
	description:"number one office in herat ",
    floor_number:"چهار"


},
{

	length:"25 met",
	width:"5 meters",
	owner:"نسیم",
	category:"فروشی",
	price:"34820",
	location:"مارکیت ملی پول سرخ دوکان تمبر ۱۲۳",
	image:"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Charity_shop_in_West_Street_%286%29_-_geograph.org.uk_-_1504815.jpg/250px-Charity_shop_in_West_Street_%286%29_-_geograph.org.uk_-_1504815.jpg",
    provence:"Ghazni",
	description:"number one office in herat ",
    floor_number:"سه"
}]




// function seedDb()
// {
// 		Shope.remove({},function(err)
// 					   {
// 					    	if (err) {
// 						    	console.log(err)
// 						}else
// 						{
// 							console.log("removed all shopes");
// 							shopes.forEach(function(shope)
// 							{
// 								Shope.create(shope,function(err,createdShope)
// 								{
// 									if (err) {
// 										console.log(err);
// 									}
// 									else
// 									{
// 										console.log("created a shope record");
// 									}

// 								})
// 							})

// 		                  }


// 		              })
// }

function seedDb()
{
	Office.remove({},function(err)
	{
		if (err) {
			console.log(err);
		}
		else
		{

		console.log("removed all offices record")
		offices.forEach(function(office)
		{
			Office.create({office},function(err,createdOffice)
			{
				if(err)
				{
					console.log(err)
				}
				else
				{

					console.log("created an office record");
				}

			});

		})
	}

	})
}



// 	Home.remove({},function(err)
// 	{
// 		if (err) {
// 			console.log("could not delete the homes");
// 		}else
// 		{
// 			homes.forEach(function(home)
// 		   {
// 			Home.create(home,function(err,createdHome)
// 			{
// 				if (err) {
// 					console.log("some error happened while seeding the database.")
// 				}
// 				else
// 				{
//                   console.log("created a home record")

// 				}
// 			 })
					

// 			})
// 			Shope.remove({},function(err)
// 					   {
// 					    	if (err) {
// 						    	console.log(err)
// 						}else
// 						{
// 							console.log("removed all shopes");
// 							shopes.forEach(function(shope)
// 							{
// 								Shope.create(shope,function(err,createdShope)
// 								{
// 									if (err) {
// 										console.log(err);
// 									}
// 									else
// 									{
// 										console.log("created a shope record");
// 									}

// 								})
// 							})

// 		                  }


// 		              })
// 		}

//   })
//}
module.exports=seedDb;