const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res, next) => {
  const { title, imageUrl, description, price } = req.body;
  Product
    .create({
      title,
      imageUrl,
      price,
      description
    })
    .then(result => console.log(result))
    .catch(err => console.log(err));
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) return res.redirect('/');
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    if (!product) return res.redirect('/');
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  });
};

exports.postEditProduct = (req, res, next) => {
  const {
    productId,
    title: updatedTitle,
    price: updatedPrice,
    imageUrl: updatedImageUrl,
    description: updatedDescription
  } = req.body;
  const updatedProduct = new Product(
    productId,
    updatedTitle,
    updatedImageUrl,
    updatedDescription,
    updatedPrice,
  );
  updatedProduct.save();
  res.redirect('/admin/products');
}

exports.postDeleteProduct = (req, res, next) => {
  const { productId } = req.body;
  Product.delete(productId);
  res.redirect('/admin/products');
}

exports.getProducts = (req, res, next) =>{
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  });
}