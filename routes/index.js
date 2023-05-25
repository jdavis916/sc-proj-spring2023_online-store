import { PrismaClient } from '@prisma/client';
import * as DB from "../prisma/query"; //db query functions
import { raw } from "body-parser";
const prisma = new PrismaClient();
var express = require('express');
var router = express.Router();

function createDropdownList(num) { //create a dropdown list of numbers
	let arr = [];

	for (let i = 1; i <= num; i++) {
		arr.push({
			val: i
		})
	}

	return arr;
}
/* GET home page */
router
.get('/', async function(req, res, next) {
	const dbItems = (await prisma.item.findMany()).slice(0,8);
  	res.render('index', { 
  	title: 'Simple Node Template',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgHome',
	itemsList: dbItems,
	dropdownOne: createDropdownList(10) //create a dropdown list of numbers
  });
})
//catalogue page
.get("/catalogue", async (req, res, next)=> {
	console.log(req.body);
	const dbItems = await prisma.item.findMany(); //get all items from the database
	const renderObj = {
		title: 'Catalogue',
		msg: 'Catalogue page.',
		pageMainClass: 'pgCatalogue',
		itemsList: dbItems,
		categories: ['Dairy', 'Meat', 'Bakery', 'Frozen', 'Snacks', 'Kitchen Gadgets', 'Candy','Sauces','Spices']
	};
	res.render("catalogue", renderObj);
})
//cart page
.get("/cart", (req, res, next)=> {
	let data = cartAssemble(req) ?? {items: [], total: 0, qty: 0, disabled: 'disabled'}; //gather the data for the cart, or set to default if undefined
	res.render("cart", {
		title: 'Cart',
		msg: 'Cart page.',
		pageMainClass: 'pgCart',
		items: data.items,
		total: data.total,
		qty: data.qty,
		itemsData: JSON.stringify(data.items), //stringify the data for the cookie to pass to thank you page
		disabled: data.disabled
	})
})
//contact page
.get("/contact", (req, res, next)=> {
	res.render("contact", {
		title: 'Contact',
		msg: 'Contact page.',
		pageMainClass: 'pgContact'
	})
})
//search page
.get("/search", (req, res, next)=> {
	res.render("search", {
		title: 'Search',
		msg: 'Search page.',
		pageMainClass: 'pgSearch',
		itemsList: stubs.items
	})
})
.post("/thanks", (req, res, next)=> { //thank you page
	res.clearCookie('items');
	res.render("thankYou", {
		title: 'Thank You',
		msg: 'Thank you for your submission.',
		pageMainClass: 'pgThankYou'
	});
})

const cartAssemble = (req)=>{ 
	let cartItems = []; //cart list
	let total = 0; //total price
	let qty = 0; //total quantity
	if(!req.cookies.items)return; //if cookie is empty
	let rawCookieDough = req.cookies.items.replace('items=', '').slice(0, -2); //cleaning up the cookie
	rawCookieDough.split('**').forEach((i)=>{ //for each cart item
		let temp = JSON.parse(i); //turn it to an object
		temp.qty ? qty += +temp.qty : qty += 1; //if qty is defined, add it to the qty total, otherwise add 1
		total += +temp.price * qty; //add the price of the item to the total
		cartItems.push(temp) //push the item to the cart list
	}); //parse the cookie and push to cart list
	return { //return the data
		items: cartItems,
		total: total,
		qty: qty,
		disabled: ''
	};
};

module.exports = router;