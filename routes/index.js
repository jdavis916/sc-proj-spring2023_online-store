var express = require('express');
var router = express.Router();
var dbRoute = "";
//const stubs = require("../stubs/stubs");
import { stubs } from "../stubs/stubs";
import * as DB from "../prisma/query"; //db query functions

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
.get("/catalogue", (req, res, next)=> {
	const renderObj = {
		title: 'Catalogue',
		msg: 'Catalogue page.',
		pageMainClass: 'pgCatalogue',
		itemsList: [...stubs.items, ...stubs.items]
	};
	console.log(stubs);
	res.render("catalogue", renderObj);
})
//cart page
.get("/cart", (req, res, next)=> {
	res.render("cart", {
		title: 'Cart',
		msg: 'Cart page.',
		pageMainClass: 'pgCart'
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
.get(dbRoute, (req, res, next)=> {
	
})

;

module.exports = router;