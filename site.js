// The restaurant's dishes are stored in a simple array.
const dishes=[
  {name:"House Burger",description:"Beef, cheddar, lettuce, and house sauce.",price:16.5,image:"burger.jpg",photographer:"amirali mirhashemian",source:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
  {name:"Creamy Pasta",description:"Pasta with parmesan and herb cream sauce.",price:18,image:"pates.jpg",photographer:"Eaters Collective",source:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601"},
  {name:"Veggie Bowl",description:"Roasted vegetables, rice, and lemon dressing.",price:14.25,image:"salade.jpg",photographer:"Anna Pelzer",source:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd"},
  {name:"Soup of the Day",description:"Fresh soup made in our kitchen.",price:8.5,image:"bol-riz.jpg",photographer:"Annie Spratt",source:"https://images.unsplash.com/photo-1512058564366-18510be2db19"},
  {name:"Crispy Fries",description:"Golden potatoes, perfect for sharing.",price:6,image:"fries.jpg",photographer:"Vera Cho",source:"https://unsplash.com/photos/french-fries-in-fry-basket-lv7H9OKj_f4"},
  {name:"Chocolate Cake",description:"Moist chocolate cake with whipped cream.",price:7.75,image:"gateau.jpg",photographer:"Christian Agbede",source:"https://images.unsplash.com/photo-1578985545062-69928b1d9587"},
  {name:"Homemade Lemonade",description:"Fresh lemon, water, and a touch of mint.",price:4.5,image:"lemonade.jpg",photographer:"Anuj Waiba",source:"https://unsplash.com/photos/a-glass-of-lemonade-with-a-straw-and-lemons-next-to-it-dBib5pIUTro"},
  {name:"Coffee",description:"Freshly brewed hot coffee.",price:3.25,image:"cafe.jpg",photographer:"Nathan Dumlao",source:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"}
];const photos=[
  {name:"Burger",file:"burger.jpg",photographer:"amirali mirhashemian",source:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd"},
  {name:"Pasta",file:"pates.jpg",photographer:"Eaters Collective",source:"https://images.unsplash.com/photo-1473093295043-cdd812d0e601"},
  {name:"Salad",file:"salade.jpg",photographer:"Anna Pelzer",source:"https://images.unsplash.com/photo-1512621776951-a57141f2eefd"},
  {name:"Pizza",file:"pizza.jpg",photographer:"Ivan Torres",source:"https://images.unsplash.com/photo-1513104890138-7c749659a591"},
  {name:"Breakfast",file:"dejeuner.jpg",photographer:"Eiliv Aceron",source:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666"},
  {name:"Cake",file:"gateau.jpg",photographer:"Christian Agbede",source:"https://images.unsplash.com/photo-1578985545062-69928b1d9587"},
  {name:"Tacos",file:"tacos.jpg",photographer:"Krisztian Tabori",source:"https://images.unsplash.com/photo-1551504734-5ee1c4a1479b"},
  {name:"Coffee",file:"cafe.jpg",photographer:"Nathan Dumlao",source:"https://images.unsplash.com/photo-1509042239860-f550ce710b93"},
  {name:"Rice bowl",file:"bol-riz.jpg",photographer:"Annie Spratt",source:"https://images.unsplash.com/photo-1512058564366-18510be2db19"},
  {name:"Restaurant",file:"restaurant.jpg",photographer:"Lucas Law",source:"https://images.unsplash.com/photo-1414235077428-338989a2e8c0"}
];
document.querySelectorAll(".year").forEach(function(el){el.textContent=new Date().getFullYear()});
// Calgary weather and local time come from a weather API that needs no key.
const weather=document.querySelector("[data-weather]");if(weather){fetch("https://api.open-meteo.com/v1/forecast?latitude=51.0447&longitude=-114.0719&current=temperature_2m&timezone=America%2FEdmonton").then(function(r){if(!r.ok)throw new Error("Weather error");return r.json()}).then(function(data){const time=new Date().toLocaleTimeString("en-CA",{hour:"2-digit",minute:"2-digit",timeZone:"America/Edmonton"});weather.textContent="Calgary · "+Math.round(data.current.temperature_2m)+" °C · "+time}).catch(function(){weather.textContent="Calgary · weather temporarily unavailable"})}
// The carousel shows one photo at a time.
const carousel=document.querySelector("#carousel");
if(carousel){
  let currentPhoto=0;
  let paused=false;
  const image=document.createElement("img");
  image.className="carousel-image";
  carousel.appendChild(image);
  function showPhoto(direction){
    const photo=photos[currentPhoto];
    image.src="images/"+photo.file;
    image.alt=photo.name;
    image.className="carousel-image";
    if(direction>0){image.classList.add("slide-from-right")}
    if(direction<0){image.classList.add("slide-from-left")}
    document.querySelector("#image-caption").textContent=photo.name+" · "+(currentPhoto+1)+" / "+photos.length;
    document.querySelector("#photo-credit").innerHTML="Photo by <strong>"+photo.photographer+"</strong> · <a href=\""+photo.source+"\" target=\"_blank\" rel=\"noopener\">Photo source</a> · <a href=\"https://unsplash.com/license\" target=\"_blank\" rel=\"noopener\">Unsplash licence</a>";
  }
  function movePhoto(amount){
    currentPhoto=(currentPhoto+amount+photos.length)%photos.length;
    showPhoto(amount);
  }
  showPhoto(0);
  document.querySelector("#previous-image").onclick=function(){movePhoto(-1)};
  document.querySelector("#next-image").onclick=function(){movePhoto(1)};
  document.querySelector("#pause-carousel").onclick=function(){
    paused=!paused;
    this.textContent=paused?"Resume slideshow":"Pause slideshow";
  };
  setInterval(function(){if(!paused){movePhoto(1)}},4000);
}// Create the menu cards from the dishes array.
const list=document.querySelector("#menu-items");
if(list){
  dishes.forEach(function(dish,index){
    const card=document.createElement("article");
    card.className="menu-item";
    card.innerHTML="<img class='menu-item-image' src='images/"+dish.image+"' alt='"+dish.name+"'>"+
      "<p class='photo-credit-small'>Photo by <a href='"+dish.source+"' target='_blank' rel='noopener'>"+dish.photographer+"</a> · <a href='https://unsplash.com/license' target='_blank' rel='noopener'>Unsplash licence</a></p>"+
      "<h3>"+dish.name+"</h3><p>"+dish.description+"</p>"+
      "<div class='item-bottom'><span class='item-price'>$"+dish.price.toFixed(2)+"</span>"+
      "<label>Qty <input type='number' min='0' max='20' step='1' value='0' data-index='"+index+"'></label></div>";
    list.appendChild(card);
  });

  const form=document.querySelector("#order-form");
  const receipt=document.querySelector("#receipt");
  let receiptGenerated=false;

  function getOrder(){
    let subtotalCents=0;
    let valid=true;
    const items=[];
    document.querySelectorAll("[data-index]").forEach(function(input){
      const quantity=Number(input.value);
      const dish=dishes[Number(input.dataset.index)];
      if(!Number.isInteger(quantity)||quantity<0||quantity>20){valid=false}
      if(quantity>0){
        const itemCents=Math.round(dish.price*100)*quantity;
        subtotalCents+=itemCents;
        items.push({name:dish.name,quantity:quantity,price:dish.price,totalCents:itemCents});
      }
    });
    return{valid:valid,items:items,subtotalCents:subtotalCents};
  }

  function money(cents){
    return"$"+(cents/100).toFixed(2);
  }

  function showReceipt(order){
    const taxCents=Math.round(order.subtotalCents*0.05);
    receipt.innerHTML="<div class='receipt-heading'><h3>House of Chefs</h3><p>ORDER RECEIPT</p><p>"+new Date().toLocaleString("en-CA")+"</p></div><div class='receipt-rule'></div>";
    order.items.forEach(function(item){
      const row=document.createElement("div");
      row.className="receipt-item";
      row.innerHTML="<div class='receipt-row'><span>"+item.name+"</span><span>"+money(item.totalCents)+"</span></div>"+
        "<div class='receipt-detail'>"+item.quantity+" at "+money(Math.round(item.price*100))+" each</div>";
      receipt.appendChild(row);
    });
    receipt.innerHTML+="<div class='total'><span>Subtotal</span><b>"+money(order.subtotalCents)+"</b></div>"+
      "<div class='total'><span>GST (5%)</span><b>"+money(taxCents)+"</b></div>"+
      "<div class='total receipt-final-total'><span>TOTAL</span><b>"+money(order.subtotalCents+taxCents)+"</b></div>"+
      "<button class='receipt-print-button' id='print-receipt' type='button'>Print / Save as PDF</button>"+
      "<p class='receipt-print-note'>Choose Save as PDF in the print window to keep a copy.</p>";
    receipt.hidden=false;
  }

  receipt.addEventListener("click",function(event){
    if(event.target.id==="print-receipt"){window.print()}
  });

  function updateOrder(){
    const order=getOrder();
    const taxCents=Math.round(order.subtotalCents*0.05);
    document.querySelector("#live-subtotal").textContent=money(order.subtotalCents);
    document.querySelector("#live-tax").textContent=money(taxCents);
    document.querySelector("#live-total").textContent=money(order.subtotalCents+taxCents);
    document.querySelector("#form-error").textContent=order.valid?"":"Enter whole numbers from 0 to 20.";

    // After the receipt is generated, update it whenever a quantity changes.
    if(receiptGenerated){
      if(order.valid&&order.items.length>0){showReceipt(order)}
      else{receipt.hidden=true}
    }
    return order;
  }

  list.addEventListener("input",updateOrder);
  form.addEventListener("submit",function(event){
    event.preventDefault();
    const order=updateOrder();
    const error=document.querySelector("#form-error");
    if(!order.valid){error.textContent="Quantities must be whole numbers from 0 to 20.";return}
    if(order.items.length===0){error.textContent="Choose at least one item before generating a receipt.";return}
    error.textContent="";
    receiptGenerated=true;
    showReceipt(order);
  });

  document.querySelector("#clear-order").addEventListener("click",function(){
    form.reset();
    receiptGenerated=false;
    receipt.hidden=true;
    document.querySelector("#form-error").textContent="";
    updateOrder();
  });
  updateOrder();
}









