const port = 4000;
const express = require("express");
const app = express();
const multer = require("multer");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");
const mongoose = require("mongoose");
const { error } = require("console");
const bcrypt = require("bcrypt")
const authenticateToken = require('./middleware/auth.js');

app.use(express.json());
app.use(cors());
const secretKey = "I_got_a_witch";

app.get("/", (req, res) => {
    res.send("Express App is running");
})

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

mongoose.connect("mongodb://localhost:27017/E-commerce")

// Schema model for product details

const ProductSchema = mongoose.Schema({
    id: { type: Number, required: false },
    brand: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    model: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
})
const Product = mongoose.model("product", ProductSchema)

// Schema model for users

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, requied: true },
    email: { type: String, required: false },
    phone: { type: String, required: true },
    cart: { type: [ProductSchema], required: false, default: null },
    history: { type: [ProductSchema], required: false, default: null }
})
const users = mongoose.model("users", userSchema)


// api for signup
app.post('/signup', async (req, res) => {
    const email = req.body.email;
    const user = await users.findOne({ email: email });
    if (!user) {
        try {
            const salt = await bcrypt.genSalt();
            const hashedPass = await bcrypt.hash(req.body.password, salt);
            const user = new users({
                name: req.body.name,
                username: req.body.username,
                password: hashedPass,
                address: req.body.address,
                email: req.body.email,
                phone: req.body.phone
            });
            console.log(user);
            await user.save();
            res.send({ message: "Success!" });
        } catch (error) {
            res.send(error);
        }
    } else {
        res.send({ status: "exists" })
    }
})

// api for login
app.post('/signup/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await users.findOne({ username });
    if (user == null) {
        return res.send({ status: "null" });
    }
    try {
        if (await bcrypt.compare(req.body.password, user.password)) {
            const payload = {
                username: username
            }
            jwt.sign(payload, secretKey, (err, token) => {
                if (err) {
                    console.log("Error creating jwt.", err);
                    res.status(500).json({ error: 'Internal server error' });
                } else {
                    res.json({ "userid": user.id, "token": token });
                }
            })
            // res.send({status: "true"});
        } else {
            res.send({ status: "incorrect" });
        }
    } catch (error) {
        res.send(error);
    }
})

// api for profile 
app.get('/user/profile', authenticateToken, async (req, res) => {
    const user = await users.findOne({ userid: req.user.userid });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    console.log(user)
    res.json({ profile: user });
});


// Creating api for adding a product
app.post("/addproduct", async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    }
    else { id = 1; }
    const product = new Product({
        id: id,
        brand: req.body.brand,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        model: req.body.model,
        quantity: req.body.quantity
    });
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name: req.body.name
    });
})

// Creating api for removing a product

app.delete('/deleteItem/:id', async (req, res) => {
    await Product.findByIdAndDelete(req.params.id);
    console.log("Product removed successfully");
    res.json({
        success: true,
        name: req.body.name
    })
})

// Creating api for getting all products

app.get("/allproducts", async (req, res) => {
    try {
        let allProducts = await Product.find({});
        console.log("All product fetched");
        res.json(allProducts);
    } catch (error) {
        res.send(error);
    }
})

// Creating api for updating product data

app.put('/editItem/:id', async (req, res) => {
    try {
        const item = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!item) {
            return res.send({ message: "Item not found" })
        }
        res.json({ successful: 1 })

    } catch (error) {
        res.send(error)
    }
})

const orderSchema = mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true, },
    price: { type: Number, required: true },
    address: { type: String, required: true, },
    phone: { type: String, required: true, },
    discount: { type: Number, },
    total: { type: Number, required: true, },
    clientId: { type: String, required: true },
    clientName: { type: String, }
})
const orders = mongoose.model('orders', orderSchema)

// api to place order 
app.post("/orders", async (req, res) => {
    const order = new orders(req.body);
    console.log(order);
    try {
        await order.save();
        res.send(true);
    } catch (error) {
        res.send(error)
    }
})

// api to get all orders 
app.get("/getorders", async (req, res) => {
    try {
        const allOrders = await orders.find({});
        res.send(allOrders);
    } catch (error) {
        res.send(error);
    }
})

// api to delete pending item 
app.delete("/delivered", async (req, res) => {
    try {
        const orderId = req.query._id;
        await orders.findByIdAndDelete(orderId);
        res.send(true);
    } catch (error) {
        res.send(false);
    }
});

// schema for sale's history 
const salesSchema = mongoose.Schema({
    brand: { type: String, required: true },
    model: { type: String, required: true, },
    price: { type: Number, required: true },
    address: { type: String, required: true, },
    phone: { type: String, required: true, },
    discount: { type: Number, },
    total: { type: Number, required: true, },
    clientId: { type: String, required: true },
    clientName: { type: String, }
})
const sales = mongoose.model('sales', salesSchema)

// api to add to sale's history 
app.post("/saleshistory", async(req, res)=>{
    try{
        const newSale = new sales(req.body);
        await newSale.save();
        res.send(true);
    }catch(error){
        res.send(false)
    }
})

// api to get sales history 
app.get("/saleshistory", async (req, res) => {
    try {
        const allSales = await sales.find({});
        res.send(allSales);
    } catch (error) {
        res.send(error);
    }
})

// cart schema 
const cartSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    item: {
        type: [ProductSchema],
        default: null,
    }
});
const carts = mongoose.model('carts', cartSchema)

// api to add to cart 
app.post('/cart', async (req, res) => {
    const { userid, item } = req.body;
    console.log(userid, item);
    if (!userid || !item) {
        return res.status(400).send('Missing userId or product data');
    }

    try {
        const cart = await carts.findOne({ userid });

        if (!cart) {
            const newCart = new carts({ userid, item: item });
            await newCart.save();
            return res.status(201).send('Product added to new cart');
        }

        const existingProduct = cart.item.find(items => items.id === item.id);

        if (existingProduct) {
            return res.status(409).send('Product already exists in cart');
        }

        cart.item.push(item);
        await cart.save();

        res.status(200).send('Product added to existing cart');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal server error');
    }
});


app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port: " + port)
    } else {
        console.log("Error: " + error);
    }
})