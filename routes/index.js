//const stubs = require("../stubs/stubs");
import { stubs } from "../stubs/stubs";
import { PrismaClient } from '@prisma/client';
import * as DB from "../prisma/query"; //db query functions
import { raw } from "body-parser";
const prisma = new PrismaClient();
var express = require('express');
var router = express.Router();

//Initialize Cart
/*(async()=>{
	await prisma.cart.upsert({
		where: {id: 1},
		update:{},
		create: {items: ''}
	})
})()*/
/* GET home page */
router
.get('/', function(req, res, next) {
  res.render('index', { 
  	title: 'Simple Node Template',
  	msg: 'This sample template should help get you on your way.',
  	pageMainClass: 'pgHome',
	  itemsList: [...stubs.items, ...stubs.items]
  });
})
//catalogue page
.get("/catalogue", async (req, res, next)=> {
	console.log(req.body);
	const dbItems = await prisma.item.findMany();
	const renderObj = {
		title: 'Catalogue',
		msg: 'Catalogue page.',
		pageMainClass: 'pgCatalogue',
		itemsList: dbItems
	};
	res.render("catalogue", renderObj);
})
//cart page
.get("/cart", (req, res, next)=> {
	let cartItems = [];
	let rawCookieDough = req.cookies.items.replace('items=', '').slice(0, -2);
	console.log(rawCookieDough);
	rawCookieDough.split('**').forEach((i)=>cartItems.push(JSON.parse(i)));
	console.log(cartItems);
	res.render("cart", {
		title: 'Cart',
		msg: 'Cart page.',
		pageMainClass: 'pgCart',
		items: cartItems
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
/*.post("/catalogue", async (req, res, next)=> {
	console.log(req.body);
	let addedItem = req.body.modalItemId + ':' + req.body.modalQty + ';';
	//await prisma.cart.deleteMany();
	/*await prisma.cart.findFirst({}).then(async (data)=>{
		await prisma.cart.update({
			where: {id: 1},
			data: {items: data.items + addedItem}
		})
	})
	const dbItems = await prisma.item.findMany();
	const renderObj = {
		title: 'Catalogue',
		msg: 'Catalogue page.',
		pageMainClass: 'pgCatalogue',
		itemsList: dbItems
	};
	res.render("catalogue", renderObj);
})*/
;

module.exports = router;