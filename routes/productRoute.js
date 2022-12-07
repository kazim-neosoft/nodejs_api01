const express = require('express');
const { addProduct, getProducts, getProductById, updateProduct, deleteProduct, signIn, signUp, access } = require('../controllers/productController');
const jwtAuth = require('../middlewares/jwtAuth');
const { validateUser } = require('../validators/validateUser');
const router=express.Router();

// router.post("/product/add",validateUser,addProduct);
router.post("/product/add",addProduct);
// router.get("/product/get",jwtAuth(),getProducts);
router.get("/product/get",getProducts);

router.get("/product/get/:id",getProductById);
// router.put("/product/update/:id",validateUser,updateProduct);
router.put("/product/update/:id",updateProduct);

router.delete("/product/delete/:id",deleteProduct);

router.post("/signin",signIn);
router.post("/signup",signUp);
router.post("/access",access);

module.exports=router