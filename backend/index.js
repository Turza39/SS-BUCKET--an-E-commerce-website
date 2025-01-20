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
app.use(express.json({ limit: '10mb' })); // JSON payload limit increased to 10MB
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

mongoose.connect("mongodb://localhost:27017/E-commerce")

// Schema model for admin
const adminSchema = mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: false },
    email: { type: String, required: false },
    password: { type: String, required: true },
    bankAccountNo: { type: String, required: true }
});
const Admin = mongoose.model("admin", adminSchema);

app.post('/addadmin', async (req, res) => {
    try {
        const { name, image, email, password, bankAccountNo, currentPassword } = req.body;

        // Check if an admin exists
        const admin = await Admin.findOne();

        if (!admin) {
            // Create a new admin if none exists
            // const hashedPassword = await bcrypt.hash(password, 10);
            const newAdmin = new Admin({
                name,
                image,
                email,
                bankAccountNo,
                // password: hashedPassword,
                password
            });

            await newAdmin.save();
            return res.status(201).json({ message: 'Admin created successfully.', admin: newAdmin });
        }

        // For updating the existing admin
        // const isPasswordCorrect = await bcrypt.compare(currentPassword, admin.password);
        // console.log(admin);
        // if (currentPassword != admin?.password) {
        //     return res.status(401).json({ message: 'Current password is incorrect.' });
        // }
        // if (!isPasswordCorrect) {
        //     return res.status(401).json({ message: 'Current password is incorrect.' });
        // }

        if (name) admin.name = name;
        if (image) admin.image = image;
        if (email) admin.email = email;
        if (bankAccountNo) admin.bankAccountNo = bankAccountNo;
        if (password) admin.password = password;
        // if (password) admin.password = await bcrypt.hash(password, 10);

        await admin.save();
        res.status(200).json({ message: 'Admin updated successfully.', admin });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});

app.get('/getadmin', async (req, res) => {
    try {
        const admin = await Admin.findOne();
        if (!admin) {
            return res.status(404).json({ message: 'Admin does not exist.' });
        }
        const { password, ...adminWithoutPassword } = admin.toObject();
        res.status(200).json({ admin: adminWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error.', error: error.message });
    }
});


// Product schema

const ProductSchema = mongoose.Schema({
    id: { type: Number, required: false },
    brand: { type: String, required: true },
    image: { type: String, default: '' },
    category: { type: String, required: true },
    new_price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    description: { type: String, required: false },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true }
})
const Product = mongoose.model("product", ProductSchema)

// Schema model for users

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
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


app.get("/user/profile/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
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
        description: req.body.description,
        quantity: req.body.quantity,
        name: req.body.name
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
        console.log("All products fetched")
        res.json(allProducts);
    } catch (error) {
        res.send(error);
    }
})

// Get product of specific catogery
app.get("/products/:category", async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category: category });
        console.log(`Products in category: ${category} fetched`);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products by category:", error);
        res.status(500).send(error);
    }
});



// Creating api for searching a product

app.get("/searchsuggestions", async (req, res) => {
    try {
        const { q } = req.query;

        if (!q || q.trim() === "") {
            return res.status(400).json({ error: "Query is required" });
        }
        console.log(q)
        const filter = {
            $or: [
                { name: { $regex: q, $options: "i" } },
                { category: { $regex: q, $options: "i" } },
                { brand: { $regex: q, $options: "i" } }
            ]
        };

        // Limit the number of results for performance
        const suggestions = await Product.find(filter).limit(10);

        res.json(suggestions);
    } catch (error) {
        console.error("Error fetching", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


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
    name: { type: String, required: true, },
    price: { type: Number, required: true },
    image: { type: String, required: true },
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
    // console.log(order);
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

// API to get the total income
app.get('/orders/totalIncome', async (req, res) => {
    try {
        const result = await orders.aggregate([
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: "$total" }
                }
            }
        ]);

        const totalIncome = result.length > 0 ? result[0].totalIncome : 0;

        res.status(200).json({ totalIncome });
    } catch (error) {
        console.error('Error calculating total income:', error.message);
        res.status(500).json({ message: 'Error calculating total income', error: error.message });
    }
});


// API to count the number of pending orders
app.get('/orders/count', async (req, res) => {
    try {
        // Count the total number of orders
        const orderCount = await orders.countDocuments();

        res.status(200).json({ orderCount });
    } catch (error) {
        console.error('Error counting orders:', error.message);
        res.status(500).json({ message: 'Error counting orders', error: error.message });
    }
});


// schema for sale's history 
const salesSchema = mongoose.Schema({
    brand: { type: String, required: true },
    name: { type: String, required: true, },
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
app.post("/saleshistory", async (req, res) => {
    try {
        const newSale = new sales(req.body);
        await newSale.save();
        res.send(true);
    } catch (error) {
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
    brand: { type: String, required: true },
    name: { type: String, required: true, },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    address: { type: String, required: true, },
    phone: { type: String, required: true, },
    discount: { type: Number, },
    total: { type: Number, required: true, },
    clientId: { type: String, required: true },
    clientName: { type: String, }
});
const carts = mongoose.model('carts', cartSchema)

// api to add to cart 
app.post('/cart', async (req, res) => {
    const cartItem = req.body;

    const { clientId, brand, name, price, address, phone, discount, total, clientName, image } = cartItem;

    if (!clientId || !brand || !name || !price || !address || !phone || !total) {
        return res.status(400).json({ message: 'Missing required fields in the cart object' });
    }

    try {
        const existingCartItem = await carts.findOne({ clientId, brand, name });

        if (existingCartItem) {
            return res.status(409).json({ message: 'Product already exists in the cart' });
        }

        const newCartItem = new carts(cartItem);
        await newCartItem.save();

        res.status(201).json({ message: 'Product added to cart successfully' });
    } catch (err) {
        console.error('Error adding product to cart:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// api to fetch cart items
app.get('/cart/:userid', async (req, res) => {
    try {
        const { userid } = req.params;

        const cartItems = await carts.find({ clientId: userid });

        if (!cartItems || cartItems.length === 0) {
            return res.status(404).json({ message: 'No cart items found for this user' });
        }

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ message: 'Error fetching cart items', error: error.message });
    }
});

// Delete a cart item
app.post('/cart/remove', async (req, res) => {
    const { clientId, itemId } = req.body;

    if (!clientId || !itemId) {
        return res.status(400).json({ message: 'Missing clientId or itemId' });
    }

    try {
        const deletedCartItem = await carts.findOneAndDelete({ clientId, _id: itemId });

        if (!deletedCartItem) {
            return res.status(404).json({ message: 'Cart item not found' });
        }

        res.status(200).json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error('Error removing item:', error.message);
        res.status(500).json({ message: 'Failed to remove item', error: error.message });
    }
});







// Define the transaction schema
const TransactionSchema = new mongoose.Schema({
    accountNumber: { type: String, required: false },
    transactionAmount: { type: Number, required: false },
    receiverAccountNumber: { type: String, required: false },
    date: { type: Date, default: Date.now },
  });
  
  const Transaction = mongoose.model('Transaction', TransactionSchema);
  
  // API to save transaction info
  app.post('/api/saveTransaction', async (req, res) => {
    const {  accountNumber, transactionAmount, receiverAccountNumber } = req.body;
  
    try {
      const transaction = new Transaction({
        accountNumber,
        transactionAmount,
        receiverAccountNumber,
      });
  
      await transaction.save();
      res.status(201).json({ success: true, message: 'Transaction saved successfully!' });
    } catch (error) {
      console.error('Error saving transaction:', error);
      res.status(500).json({ success: false, message: 'Failed to save transaction' });
    }
  });
  
  // API to get all transaction info
  app.get('/api/getTransactions', async (req, res) => {
    try {
      const transactions = await Transaction.find({});
      res.status(200).json({ success: true, data: transactions });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ success: false, message: 'Failed to fetch transactions' });
    }
  });


// Define the bank account schema
const bankAccountSchema = mongoose.Schema({
    accountHolderName: { type: String, required: true }, // Name from the frontend
    email: { type: String, required: true }, // Email from the frontend
    phone: { type: String, required: true }, // Phone from the frontend
    accountNumber: { type: String, required: true, unique: true }, // Account number from the frontend
    secretKey: { type: String, required: true }, // Secret key from the frontend
    dateAdded: { type: Date, default: Date.now }
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

// Save bank account information
app.post('/createaccount', async (req, res) => {
    try {
        const { name, email, phone, accountNo, secretKey } = req.body;

        // Check if account number already exists
        const existingAccount = await BankAccount.findOne({ accountNumber: accountNo });
        if (existingAccount) {
            return res.status(400).json({ message: 'Account number already exists' });
        }

        // Create a new bank account document
        const newBankAccount = new BankAccount({
            accountHolderName: name,
            email: email,
            phone: phone,
            accountNumber: accountNo,
            secretKey: secretKey
        });

        // Save the new bank account
        await newBankAccount.save();
        res.status(201).json({ message: 'Bank account created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving bank information', error: error.message });
    }
});

// delivery info


// Define Delivery Info Schema
const DeliveryInfoSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
    address: { type: String, required: true },
    phone: { type: String, required: true },
    bankAccount: { type: String, required: true },
    cvc: { type: String, required: true },
    secretKey: { type: String, required: true },
});


// Create models
const DeliveryInfo = mongoose.model('DeliveryInfo', DeliveryInfoSchema);

// Save or Update Delivery Info
app.post('/saveDeliveryInfo', async (req, res) => {
    try {
        const { userId, address, phone, bankAccount, cvc, secretKey } = req.body;

        // Find existing delivery info for the user
        let deliveryInfo = await DeliveryInfo.findOne({ userId });

        if (deliveryInfo) {
            // If delivery info exists, update it
            deliveryInfo.address = address;
            deliveryInfo.phone = phone;
            deliveryInfo.bankAccount = bankAccount;
            deliveryInfo.cvc = cvc;
            deliveryInfo.secretKey = secretKey;

            // Save the updated delivery info
            await deliveryInfo.save();
            res.status(200).json({ message: 'Delivery information updated successfully' });
        } else {
            // If no delivery info exists for the user, create a new one
            const newDeliveryInfo = new DeliveryInfo({
                userId,
                address,
                phone,
                bankAccount,
                cvc,
                secretKey,
            });

            // Save the new delivery info
            await newDeliveryInfo.save();
            res.status(200).json({ message: 'Delivery information saved successfully' });
        }
    } catch (err) {
        console.error('Error saving/updating delivery information:', err);
        res.status(500).json({ message: 'Error saving delivery information' });
    }
});

//fetch delivery info
app.get('/getDeliveryInfo/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const deliveryInfo = await DeliveryInfo.findOne({ userId: req.params.userId });

        if (deliveryInfo) {
            res.status(200).json(deliveryInfo);
            console.log(deliveryInfo.address);
        } else {
            res.status(404).json({ message: 'No delivery information found' });
        }
    } catch (err) {
        console.error('Error fetching delivery information:', err);
        res.status(500).json({ message: 'Error fetching delivery information' });
    }
});

// Update Profile Picture API
app.post('/api/updateProfilePic', async (req, res) => {
    const { username, profilePic } = req.body;

    if (!username || !profilePic) {
        return res.status(400).json({ message: 'Username and profile picture are required' });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { username },
            { profilePic },
            { new: true } // Return the updated document
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Profile picture updated successfully', user: updatedUser });
    } catch (error) {
        console.error('Error updating profile picture:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.post('/transferFunds', async (req, res) => {
    try {
        const { userId, amount } = req.body;

        // Fetch user delivery info
        const user = await DeliveryInfo.findOne({ userId });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Simulate fund transfer (you can replace this with actual bank API logic)
        const adminAccount = 'admin-bank-account';
        console.log(Transferring`$${amount} from ${user.bankAccount} to ${adminAccount}`);

        res.status(200).json({ success: true, message: 'Funds transferred successfully' });
    } catch (error) {
        console.error('Error transferring funds:', error);
        res.status(500).json({ success: false, message: 'Error transferring funds' });
    }
});

// Admin profile schema

app.listen(port, (error) => {
    if (!error) {
        console.log("Server running on port: " + port)
    } else {
        console.log("Error: " + error);
    }
})

