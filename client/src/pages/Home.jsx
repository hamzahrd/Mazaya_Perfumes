import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [heroSlides, setHeroSlides] = useState([
    {
      id: 1,
      title: "Collection Exclusive",
      subtitle: "Découvrez nos parfums signature",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
      cta: "Acheter maintenant"
    },
    {
      id: 2,
      title: "Parfums d'Exception",
      subtitle: "Pour homme et femme",
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      cta: "Découvrir"
    }
  ]);
  
  const [exclusivePacks, setExclusivePacks] = useState([
    {
      id: 1,
      name: "Pack de 5 Parfums Sélection",
      description: "Composez votre pack de 5 parfums parmi notre sélection exclusive",
      price: 199.99,
      image: "https://images.unsplash.com/photo-1599076443191-cb0f1a7f2b5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Packs Exclusifs"
    }
  ]);
  
  const [bestSellers, setBestSellers] = useState([
    {
      id: 1,
      name: "Essence Noire",
      description: "Un parfum boisé et mystérieux pour homme",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Parfum Homme"
    },
    {
      id: 2,
      name: "Fleur d'Amour",
      description: "Une fragrance florale délicate pour femme",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Parfum Femme"
    },
    {
      id: 3,
      name: "Lumière d'Été",
      description: "Frais et citronné, parfait pour l'été",
      price: 84.99,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Parfum Unisexe"
    },
    {
      id: 4,
      name: "Velvet Night",
      description: "Un parfum sensuel et envoûtant",
      price: 94.99,
      image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
      category: "Parfum Femme"
    }
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{slide.subtitle}</p>
                <Link to="/products" className="btn btn-secondary">
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
        
        {/* Slide indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentSlide ? 'bg-white' : 'bg-gray-300'
              }`}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Exclusive Packs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Packs Exclusifs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez nos packs spéciaux composés de parfums sélectionnés pour vous offrir une expérience olfactive unique.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {exclusivePacks.map((pack) => (
              <div key={pack.id} className="card overflow-hidden">
                <img
                  src={pack.image}
                  alt={pack.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{pack.name}</h3>
                  <p className="text-gray-600 mb-4">{pack.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-indigo-600">€{pack.price}</span>
                    <Link to={`/product/${pack.id}`} className="btn">
                      Voir le pack
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Best Sellers</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Découvrez les parfums les plus populaires de notre collection.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {bestSellers.map((product) => (
              <div key={product.id} className="card product-card">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                  <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">€{product.price}</span>
                    <Link to={`/product/${product.id}`} className="btn text-sm">
                      Voir
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Banners */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Découvrez par catégorie</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products?category=Parfum Homme" className="card group">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                  alt="Parfum Homme" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold group-hover:text-indigo-600">Parfum Homme</h3>
              </div>
            </Link>
            
            <Link to="/products?category=Parfum Femme" className="card group">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                  alt="Parfum Femme" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold group-hover:text-indigo-600">Parfum Femme</h3>
              </div>
            </Link>
            
            <Link to="/products?category=Parfum Unisexe" className="card group">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80" 
                  alt="Parfum Unisexe" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold group-hover:text-indigo-600">Parfum Unisexe</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;