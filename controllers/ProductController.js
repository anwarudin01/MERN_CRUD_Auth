import Product from '../models/ProductModel.js';

// Find all products
export const getProducts = async (req, res) => {
  try {
    // Find the products
    const product = await Product.find();

    // Respond it
    res.json({ product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Find single product with id
export const getProductById = async (req, res) => {
  try {
    // Get the id
    const productId = req.params.id;

    // Find the note with the id
    const product = await Product.findById(productId);

    // Respond the note
    res.json({ product });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Create product
export const createProduct = async (req, res) => {
  try {
    // Sent data from body
    const { name, price, status } = req.body;

    // Create a note
    const product = await Product.create({
      name,
      price,
      status,
    });

    // Respond with the new note
    res.json({ product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a product
export const updateProduct = async (req, res) => {
  // Get the id
  const productId = req.params.id;
  try {
    // Get data from body
    const { name, price, status } = req.body;

    // Find and update
    await Product.findByIdAndUpdate(productId, {
      name,
      price,
      status,
    });

    // Find update product
    const product = await Product.findById(productId);

    // Respond it
    res.json({ product });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    // Get the id
    const productId = req.params.id;

    // Delete the record
    await Product.deleteOne({ _id: productId });

    // Respond
    res.json({ Success: 'Record Delete' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
