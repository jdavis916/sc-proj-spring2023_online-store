//username and password

//items
const stubs = {
    items: [{
        id: 1, 
        sku: 3245,
        item_name: "generic item1", 
        description: "this is about the item",
        item_category: "meat",
        price: 45,
        discount: 30,
        img: "/img/1to1ratio.png"
    },
    {
        id: 2, 
        sku: 3225,
        item_name: "generic item2", 
        description: "this is about the item",
        item_category: "produce",
        price: 30,
        img: "/img/1to1ratio.png"
    },
    {
        id: 3, 
        sku: 6595,
        item_name: "generic item3", 
        description: "this is about the item",
        item_category: "kitchen gadget",
        price: 10,
        discount: 8,
        img: "/img/1to1ratio.png"
    }], 
    user: [{
        id: 1,
        username: "testperson1",
        password: "thewordle"
    }, 
    {
        id: 2,
        username: "testperson2",
        password: "thefiner"
    },
    {
        id: 3,
        username: "testperson3",
        password: "thebasics"
    }],
    /*
    deals: [{
        id: 1,
        itemId: 4,
        price: 20,
        discount: 15,
        img: "/img/1to1ratio.png"
    },
    {
        id: 2,
        itemId: 9,
        price: 4,
        discount: 2,
        img: "/img/1to1ratio.png"
    },
    {
        id: 3,
        itemId: 12,
        price: 12,
        discount: 10,
        img: "/img/1to1ratio.png"
    }]
    */
};
//deals
//exports.stubs = stubs;
module.exports = {
    stubs
}