import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  
  const categories = [
    { id: 'all', name: 'Tous les parfums' },
    { id: 'Parfum Homme', name: 'Parfum Homme' },
    { id: 'Parfum Femme', name: 'Parfum Femme' },
    { id: 'Parfum Unisexe', name: 'Parfum Unisexe' },
    { id: 'Packs Exclusifs', name: 'Packs Exclusifs' }
  ];

  // Mock data for products
  const mockProducts = [
    {
      id: 1,
      name: "Essence Noire",
      description: "Un parfum boisé et mystérieux pour homme",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Parfum Homme",
      sizes: ["30ml", "50ml", "100ml"]
    },
    {
      id: 2,
      name: "Fleur d'Amour",
      description: "Une fragrance florale délicate pour femme",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Parfum Femme",
      sizes: ["30ml", "50ml", "100ml"]
    },
    {
      id: 3,
      name: "Lumière d'Été",
      description: "Frais et citronné, parfait pour l'été",
      price: 84.99,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Parfum Unisexe",
      sizes: ["30ml", "50ml", "100ml"]
    },
    {
      id: 4,
      name: "Velvet Night",
      description: "Un parfum sensuel et envoûtant",
      price: 94.99,
      image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Parfum Femme",
      sizes: ["30ml", "50ml", "100ml"]
    },
    {
      id: 5,
      name: "Pack de 5 Parfums Sélection",
      description: "Composez votre pack de 5 parfums parmi notre sélection exclusive",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1599076443191-cb0f1a7f2b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Packs Exclusifs",
      sizes: ["Pack de 5"]
    },
    {
      id: 6,
      name: "Sillage d'Automne",
      description: "Un parfum chaleureux et épicé pour l'automne",
      price: 87.99,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      category: "Parfum Homme",
      sizes: ["30ml", "50ml", "100ml"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      let filteredProducts = mockProducts;
      
      if (selectedCategory && selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(
          product => product.category === selectedCategory
        );
      }
      
      if (searchQuery) {
        filteredProducts = filteredProducts.filter(
          product => 
            product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 500);
  }, [selectedCategory, searchQuery]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="products-page py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Nos Parfums</h1>
        
        {/* Filters */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Rechercher un parfum..."
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        
        {/* Products grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <>
            {products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium text-gray-900 mb-2">Aucun produit trouvé</h3>
                <p className="text-gray-600">Essayez de modifier vos critères de recherche</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {products.map(product => (
                  <div key={product.id} className="card product-card">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover"
                      />
                      {product.category === 'Packs Exclusifs' && (
                        <span className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded">
                          Pack
                        </span>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                      <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-indigo-600">€{product.price}</span>
                        <button className="btn text-sm">
                          Voir
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;