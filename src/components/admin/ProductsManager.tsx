import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Sparkles, Search } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { Product, ProductColor } from '../../types';

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = StorageService.getCategories();
  const brands = StorageService.getBrands();
  const collections = StorageService.getCollections();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const saved = StorageService.saveProduct(editingProduct);
    setProducts(StorageService.getProducts());
    setEditingProduct(null);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      StorageService.deleteProduct(id);
      setProducts(StorageService.getProducts());
    }
  };

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400">Sheet 03_Products</span>
          <h1 className="text-2xl font-black font-serif text-white">Product Catalog Management</h1>
        </div>

        <button
          onClick={() => setEditingProduct({
            name: '',
            category: "Men's Apparel",
            brand: 'ROYMEN Signature',
            collection: 'Monochromatic Formal',
            price: 5000,
            stock: 15,
            lowStockAlert: 3,
            colors: [{ name: 'Black', hex: '#000000' }],
            sizes: ['M', 'L', 'XL'],
            images: ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop'],
            description: '',
            shortDescription: '',
            status: 'active'
          })}
          className="bg-amber-500 hover:bg-amber-400 text-black font-black px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center gap-2 shadow-lg"
        >
          <Plus className="w-4 h-4" /> Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Filter products by name, SKU, or category..."
          className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400"
        />
      </div>

      {/* Product Edit / Create Modal */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-3xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setEditingProduct(null)}
              className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 border border-zinc-800"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold uppercase font-serif text-amber-300 mb-4">
              {editingProduct.id ? `Edit Product #${editingProduct.id}` : 'Create New Luxury Product'}
            </h3>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-400 font-bold uppercase block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-bold uppercase block mb-1">SKU Number</label>
                  <input
                    type="text"
                    value={editingProduct.sku || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                    placeholder="Auto-generated if empty"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-zinc-400 font-bold uppercase block mb-1">Category</label>
                  <select
                    value={editingProduct.category || "Men's Apparel"}
                    onChange={e => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 font-bold uppercase block mb-1">Brand</label>
                  <select
                    value={editingProduct.brand || 'ROYMEN Signature'}
                    onChange={e => setEditingProduct({ ...editingProduct, brand: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                  >
                    {brands.map(b => (
                      <option key={b.id} value={b.name}>{b.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-zinc-400 font-bold uppercase block mb-1">Collection</label>
                  <select
                    value={editingProduct.collection || 'Monochromatic Formal'}
                    onChange={e => setEditingProduct({ ...editingProduct, collection: e.target.value })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                  >
                    {collections.map(col => (
                      <option key={col.id} value={col.name}>{col.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-zinc-400 font-bold uppercase block mb-1">Regular Price (BDT ৳) *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.price || 0}
                    onChange={e => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-bold uppercase block mb-1">Discount Price (BDT ৳)</label>
                  <input
                    type="number"
                    value={editingProduct.discountPrice || ''}
                    onChange={e => setEditingProduct({ ...editingProduct, discountPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-zinc-400 font-bold uppercase block mb-1">Stock Units *</label>
                  <input
                    type="number"
                    required
                    value={editingProduct.stock || 0}
                    onChange={e => setEditingProduct({ ...editingProduct, stock: parseInt(e.target.value) })}
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-400 font-bold uppercase block mb-1">Image URL (Cloudinary / Unsplash)</label>
                <input
                  type="text"
                  value={editingProduct.images?.[0] || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, images: [e.target.value] })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="text-zinc-400 font-bold uppercase block mb-1">Full Description</label>
                <textarea
                  rows={3}
                  value={editingProduct.description || ''}
                  onChange={e => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-black font-black px-6 py-2.5 rounded-xl uppercase text-xs tracking-wider transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" /> Save To Google Sheets ERP
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left text-zinc-300">
            <thead>
              <tr className="border-b border-zinc-800 bg-zinc-950 text-zinc-400 uppercase tracking-wider">
                <th className="py-3 px-4">Item</th>
                <th className="py-3 px-4">SKU</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price (BDT)</th>
                <th className="py-3 px-4">Stock</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60">
              {filtered.map(p => (
                <tr key={p.id} className="hover:bg-zinc-800/40 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <img src={p.images[0]} alt="" referrerPolicy="no-referrer" className="w-10 h-12 object-cover rounded-lg border border-zinc-800" />
                    <div>
                      <span className="font-bold text-white block">{p.name}</span>
                      <span className="text-[10px] text-amber-400 uppercase">{p.brand}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono">{p.sku}</td>
                  <td className="py-3 px-4">{p.category}</td>
                  <td className="py-3 px-4 font-bold text-white">৳{(p.discountPrice || p.price).toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.stock <= p.lowStockAlert ? 'bg-red-950 text-red-300' : 'bg-zinc-800 text-zinc-200'
                    }`}>
                      {p.stock} units
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingProduct(p)}
                      className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="p-1.5 bg-red-950 hover:bg-red-900 text-red-300 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
