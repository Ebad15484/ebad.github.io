const specialBtn = document.getElementById('specialBtn');
specialBtn.addEventListener('click',()=>{alert("Today's Special: 🍔 Double Cheeseburger Combo - $7.99!")});


const menuItemsData = [
{name:"Cheeseburger", price:5.99, category:"Burgers", img:"https://via.placeholder.com/150?text=Burger"},
{name:"Veggie Burger", price:6.49, category:"Burgers", img:"https://via.placeholder.com/150?text=Veggie"},
{name:"French Fries", price:2.99, category:"Sides", img:"https://via.placeholder.com/150?text=Fries"},
{name:"Chicken Nuggets", price:4.99, category:"Sides", img:"https://via.placeholder.com/150?text=Nuggets"},
{name:"Pepperoni Pizza", price:8.99, category:"Pizza", img:"https://via.placeholder.com/150?text=Pizza"},
{name:"Margherita Pizza", price:7.99, category:"Pizza", img:"https://via.placeholder.com/150?text=Margherita"},
{name:"Soft Drink", price:1.99, category:"Drinks", img:"https://via.placeholder.com/150?text=Drink"},
{name:"Milkshake", price:3.49, category:"Drinks", img:"https://via.placeholder.com/150?text=Milkshake"},
{name:"Ice Cream", price:2.49, category:"Desserts", img:"https://via.placeholder.com/150?text=IceCream"},
{name:"Chocolate Cake", price:3.99, category:"Desserts", img:"https://via.placeholder.com/150?text=Cake"}
];


const categories = [...new Set(menuItemsData.map(i=>i.category))];
const categoryList = document.getElementById('category-list');
categories.forEach(cat=>{
    const a=document.createElement('a');
    a.href="#"+cat;
    a.textContent=cat;
    categoryList.appendChild(a);
});


const menuContainer = document.getElementById('menu-items');
categories.forEach(cat=>{
    const section = document.createElement('div');
    section.id = cat;
    section.innerHTML=`<h3 style="color:#e74c3c">${cat}</h3>`;
    menuItemsData.filter(i=>i.category===cat).forEach(item=>{
        const div=document.createElement('div');
        div.classList.add('item');
        div.dataset.name=item.name;
        div.dataset.price=item.price;
        div.innerHTML=`<img src="${item.img}" alt="${item.name}">
        <h3>${item.name}</h3>
        <p>$${item.price.toFixed(2)}</p>
        <button class="add-btn">Add to Cart</button>`;
        section.appendChild(div);
    });
    menuContainer.appendChild(section);
});


let cart=[];
const cartSidebar = document.getElementById('cart-sidebar');
const cartCount = document.getElementById('cart-count');

function updateCart(){
    const container = cartSidebar.querySelector('.cart-items');
    container.innerHTML='';
    let total=0;
    cart.forEach((item,index)=>{
        total+=item.price*item.quantity;
        const div=document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML=`<span>${item.name} x ${item.quantity} - $${(item.price*item.quantity).toFixed(2)}</span>
        <button data-index="${index}">Remove</button>`;
        container.appendChild(div);
    });
    cartSidebar.querySelector('.total').textContent=`Total: $${total.toFixed(2)}`;
    cartCount.textContent=cart.reduce((a,b)=>a+b.quantity,0);
    container.querySelectorAll('button').forEach(btn=>{
        btn.addEventListener('click',()=>{cart.splice(btn.dataset.index,1);updateCart();});
    });
}

document.addEventListener('click', e=>{
    if(e.target.classList.contains('add-btn')){
        const itemDiv = e.target.parentElement;
        const name = itemDiv.dataset.name;
        const price = parseFloat(itemDiv.dataset.price);
        const existing = cart.find(i=>i.name===name);
        if(existing) existing.quantity+=1;
        else cart.push({name,price,quantity:1});
        updateCart();
        cartSidebar.classList.add('active');
    }
});


document.getElementById('openCartBtn').addEventListener('click',()=>cartSidebar.classList.add('active'));
document.getElementById('closeCartBtn').addEventListener('click',()=>cartSidebar.classList.remove('active'));

document.getElementById('checkoutBtn').addEventListener('click',()=>{
    if(cart.length>0){alert(`Thank you! Total: $${cart.reduce((a,b)=>a+b.price*b.quantity,0).toFixed(2)}`); cart=[];updateCart();}
    else alert("Cart is empty!");
});
