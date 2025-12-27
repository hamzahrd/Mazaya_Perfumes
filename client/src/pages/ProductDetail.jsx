import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedPerfumes, setSelectedPerfumes] = useState([]); // For pack of 5
  const [activeImage, setActiveImage] = useState(0);
  
  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: "Essence Noire",
      description: "Un parfum boisé et mystérieux pour homme. Notes de tête: Bergamote, Notes de cœur: Lavande, Notes de fond: Vanille et Musc.",
      price: 89.99,
      images: [
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      ],
      category: "Parfum Homme",
      sizes: ["30ml", "50ml", "100ml"],
      fragranceNotes: {
        top: "Bergamote, Citron",
        heart: "Lavande, Jasmin",
        base: "Vanille, Musc, Bois de cèdre"
      },
      inStock: true
    },
    {
      id: 2,
      name: "Fleur d'Amour",
      description: "Une fragrance florale délicate pour femme. Notes de tête: Ylang-ylang, Notes de cœur: Rose, Notes de fond: Vétiver.",
      price: 79.99,
      images: [
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80"
      ],
      category: "Parfum Femme",
      sizes: ["30ml", "50ml", "100ml"],
      fragranceNotes: {
        top: "Ylang-ylang, Poivre rose",
        heart: "Rose, Jasmin",
        base: "Vétiver, Patchouli"
      },
      inStock: true
    },
    {
      id: 3,
      name: "Pack de 5 Parfums Sélection",
      description: "Composez votre pack de 5 parfums parmi notre sélection exclusive. Choisissez 5 parfums de votre choix et bénéficiez d'une remise exceptionnelle.",
      price: 199.99,
      images: [
        "https://images.unsplash.com/photo-1599076443191-cb0f1a7f2b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
      ],
      category: "Packs Exclusifs",
      sizes: ["Pack de 5"],
      isPack: true,
      availablePerfumes: [
        { id: 1, name: "Essence Noire", category: "Parfum Homme" },
        { id: 2, name: "Fleur d'Amour", category: "Parfum Femme" },
        { id: 3, name: "Lumière d'Été", category: "Parfum Unisexe" },
        { id: 4, name: "Velvet Night", category: "Parfum Femme" },
        { id: 5, name: "Sillage d'Automne", category: "Parfum Homme" },
        { id: 6, name: "Océan Profond", category: "Parfum Unisexe" },
        { id: 7, name: "Rouge Passion", category: "Parfum Femme" },
        { id: 8, name: "Forêt Mystique", category: "Parfum Homme" }
      ],
      inStock: true
    }
  ];

  useEffect(() => {
    // Simulate API call
    const foundProduct = mockProducts.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      if (foundProduct.sizes && foundProduct.sizes.length > 0) {
        setSelectedSize(foundProduct.sizes[0]);
      }
    } else {
      navigate('/products');
    }
  }, [id, navigate]);

  const handleAddToCart = () => {
    // In a real app, this would call an API
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      size: selectedSize,
      ...(product.isPack && { packContents: selectedPerfumes })
    };

    // Get existing cart from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItemIndex = existingCart.findIndex(item => 
      item.id === cartItem.id && item.size === cartItem.size
    );

    if (existingItemIndex >= 0) {
      existingCart[existingItemIndex].quantity += cartItem.quantity;
    } else {
      existingCart.push(cartItem);
    }

    localStorage.setItem('cart', JSON.stringify(existingCart));
    
    // Show success message
    alert('Produit ajouté au panier!');
  };

  const handlePackSelection = (perfumeId) => {
    if (selectedPerfumes.includes(perfumeId)) {
      setSelectedPerfumes(selectedPerfumes.filter(id => id !== perfumeId));
    } else if (selectedPerfumes.length < 5) {
      setSelectedPerfumes([...selectedPerfumes, perfumeId]);
    }
  };

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="product-detail-page py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`w-full h-24 rounded overflow-hidden ${
                    activeImage === index ? 'ring-2 ring-indigo-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-lg text-indigo-600 font-semibold mb-4">€{product.price}</p>
            
            <div className="mb-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                product.inStock 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.inStock ? 'En stock' : 'Rupture de stock'}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Size Selection */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Taille</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md ${
                      selectedSize === size
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Pack Selection (if this is a pack) */}
            {product.isPack && (
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Sélectionnez 5 parfums pour votre pack
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Vous avez sélectionné {selectedPerfumes.length}/5 parfums
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2 border rounded">
                  {product.availablePerfumes.map((perfume) => (
                    <div
                      key={perfume.id}
                      onClick={() => handlePackSelection(perfume.id)}
                      className={`p-3 border rounded cursor-pointer flex items-center ${
                        selectedPerfumes.includes(perfume.id)
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-5 h-5 rounded-full border mr-3 flex items-center justify-center ${
                          selectedPerfumes.includes(perfume.id)
                            ? 'bg-indigo-500 border-indigo-500'
                            : 'border-gray-400'
                        }`}>
                          {selectedPerfumes.includes(perfume.id) && (
                            <span className="text-white text-xs">✓</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{perfume.name}</p>
                          <p className="text-sm text-gray-600">{perfume.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">Quantité</h3>
              <div className="flex items-center">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-gray-300 bg-gray-100 rounded-l-md"
                >
                  -
                </button>
                <span className="px-4 py-2 border-t border-b border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-gray-300 bg-gray-100 rounded-r-md"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock || (product.isPack && selectedPerfumes.length !== 5)}
              className={`w-full py-3 px-6 rounded-md font-medium ${
                product.inStock && (!product.isPack || selectedPerfumes.length === 5)
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {product.isPack && selectedPerfumes.length !== 5
                ? `Sélectionnez ${5 - selectedPerfumes.length} parfum(s) supplémentaire(s)`
                : 'Ajouter au panier'}
            </button>

            {/* Fragrance Notes */}
            {product.fragranceNotes && (
              <div className="mt-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Notes de parfum</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium text-gray-900 mb-2">Notes de tête</h4>
                    <p className="text-gray-600">{product.fragranceNotes.top}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium text-gray-900 mb-2">Notes de cœur</h4>
                    <p className="text-gray-600">{product.fragranceNotes.heart}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-medium text-gray-900 mb-2">Notes de fond</h4>
                    <p className="text-gray-600">{product.fragranceNotes.base}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Produits similaires</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {mockProducts
              .filter(p => p.id !== product.id && p.category === product.category)
              .slice(0, 4)
              .map(relatedProduct => (
                <div key={relatedProduct.id} className="card product-card">
                  <img
                    src={relatedProduct.images[0]}
                    alt={relatedProduct.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold mb-1">{relatedProduct.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{relatedProduct.category}</p>
                    <p className="text-gray-700 text-sm mb-3 line-clamp-2">{relatedProduct.description.substring(0, 60)}...</p>
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-indigo-600">€{relatedProduct.price}</span>
                      <button className="btn text-sm">
                        Voir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;