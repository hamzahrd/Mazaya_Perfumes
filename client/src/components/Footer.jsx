import React from 'react';
import { Facebook, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">ParfumLux</h3>
            <p className="text-gray-300 mb-4">
              Découvrez notre sélection exclusive de parfums de luxe pour homme, femme et unisexe. 
              Des fragrances uniques qui expriment votre personnalité.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Youtube size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Catégories</h4>
            <ul className="space-y-2">
              <li><a href="/products?category=Parfum Homme" className="text-gray-300 hover:text-white">Parfum Homme</a></li>
              <li><a href="/products?category=Parfum Femme" className="text-gray-300 hover:text-white">Parfum Femme</a></li>
              <li><a href="/products?category=Parfum Unisexe" className="text-gray-300 hover:text-white">Parfum Unisexe</a></li>
              <li><a href="/products?category=Packs Exclusifs" className="text-gray-300 hover:text-white">Packs Exclusifs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Informations</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">À propos de nous</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Livraison</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Retours</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">Téléphone: +33 1 23 45 67 89</li>
              <li className="text-gray-300">Email: contact@parfumlux.com</li>
              <li className="text-gray-300">Adresse: 123 Avenue des Champs-Élysées, 75008 Paris, France</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 ParfumLux. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;