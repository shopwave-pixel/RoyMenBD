import React, { useState, useRef } from 'react';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Sparkles, Search, UploadCloud, Star, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { StorageService } from '../../services/storageService';
import { CloudinaryService } from '../../services/cloudinaryService';
import { Product, ProductColor } from '../../types';

export const ProductsManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(() => StorageService.getProducts());
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Cloudinary upload state
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccessMsg, setUploadSuccessMsg] = useState('');
  const [uploadErrorMsg, setUploadErrorMsg] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = StorageService.getCategories();
  const brands = StorageService.getBrands();
  const collections = StorageService.getCollections();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    // Ensure at least 1 image exists
    const finalImages = (editingProduct.images && editingProduct.images.length > 0)
      ? editingProduct.images
      : ['https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop'];

    const saved = StorageService.saveProduct({
      ...editingProduct,
      images: finalImages
    });
    setProducts(StorageService.getProducts());
    setEditingProduct(null);
    resetUploadState();
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      StorageService.deleteProduct(id);
      setProducts(StorageService.getProducts());
    }
  };

  const resetUploadState = () => {
    setIsUploading(false);
    setUploadProgress(0);
    setUploadSuccessMsg('');
    setUploadErrorMsg('');
  };

  const handleProcessImageUpload = async (file: File) => {
    resetUploadState();
    setIsUploading(true);

    try {
      const result = await CloudinaryService.uploadImage(file, (progress) => {
        setUploadProgress(progress);
      });

      const currentImages = editingProduct?.images ? [...editingProduct.images] : [];
      // Append Cloudinary secure URL
      const updatedImages = [...currentImages, result.secure_url];

      setEditingProduct(prev => prev ? { ...prev, images: updatedImages } : null);
      setUploadSuccessMsg(`Image uploaded to Cloudinary successfully! (${result.public_id})`);
    } catch (err: any) {
      console.error('Cloudinary upload error:', err);
      setUploadErrorMsg(err.message || 'Failed to upload image to Cloudinary.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleProcessImageUpload(e.target.files[0]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleProcessImageUpload(e.dataTransfer.files[0]);
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    if (!editingProduct?.images) return;
    const updated = editingProduct.images.filter((_, idx) => idx !== indexToRemove);
    setEditingProduct({ ...editingProduct, images: updated });
  };

  const handleSetFeaturedImage = (indexToFeature: number) => {
    if (!editingProduct?.images) return;
    const images = [...editingProduct.images];
    const [featured] = images.splice(indexToFeature, 1);
    images.unshift(featured);
    setEditingProduct({ ...editingProduct, images });
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

              {/* Cloudinary Image Upload Section */}
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-amber-400 font-bold uppercase tracking-wider block text-xs">
                      Product Media & Cloudinary Direct Upload
                    </label>
                    <span className="text-[10px] text-zinc-400 block">
                      Directly upload images to Cloudinary. Max size: 5MB. Formats: JPG, PNG, WEBP.
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-zinc-950 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                    {(editingProduct.images || []).length} Image(s)
                  </span>
                </div>

                {/* Drag and Drop Zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-5 text-center transition-all cursor-pointer ${
                    isDragging
                      ? 'border-amber-400 bg-amber-500/10'
                      : 'border-zinc-700 hover:border-zinc-500 bg-zinc-950/60'
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  
                  <UploadCloud className="w-8 h-8 text-amber-400 mx-auto mb-2 animate-bounce" />
                  <p className="text-xs font-semibold text-white">
                    Drag & Drop your product image here, or <span className="text-amber-400 underline">Browse</span>
                  </p>
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Uploaded directly to Cloudinary CDN & saved to Google Sheets
                  </p>
                </div>

                {/* Upload Progress Bar */}
                {isUploading && (
                  <div className="space-y-1 bg-zinc-950 p-2.5 rounded-xl border border-amber-500/30">
                    <div className="flex items-center justify-between text-[11px] text-zinc-300">
                      <span className="flex items-center gap-1.5 font-bold">
                        <RefreshCw className="w-3.5 h-3.5 text-amber-400 animate-spin" /> Uploading to Cloudinary...
                      </span>
                      <span className="font-mono text-amber-400">{uploadProgress}%</span>
                    </div>
                    <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-amber-400 h-1.5 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Upload Success Alert */}
                {uploadSuccessMsg && (
                  <div className="p-2.5 bg-emerald-950/60 border border-emerald-800 text-emerald-300 rounded-xl text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" /> {uploadSuccessMsg}
                    </span>
                    <button type="button" onClick={() => setUploadSuccessMsg('')} className="text-emerald-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Upload Error Alert */}
                {uploadErrorMsg && (
                  <div className="p-2.5 bg-red-950/60 border border-red-800 text-red-300 rounded-xl text-xs flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-medium">
                      <AlertCircle className="w-4 h-4 text-red-400" /> {uploadErrorMsg}
                    </span>
                    <button type="button" onClick={() => setUploadErrorMsg('')} className="text-red-400 hover:text-white">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}

                {/* Uploaded Images Gallery Preview */}
                {editingProduct.images && editingProduct.images.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <span className="text-[11px] font-bold text-zinc-400 block uppercase">Product Image Gallery & Featured Image:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {editingProduct.images.map((imgUrl, idx) => {
                        const isFeatured = idx === 0;
                        return (
                          <div
                            key={idx}
                            className={`relative group rounded-xl overflow-hidden border ${
                              isFeatured ? 'border-amber-400 ring-2 ring-amber-400/30' : 'border-zinc-800'
                            } bg-zinc-950`}
                          >
                            <img
                              src={imgUrl}
                              alt={`Product image ${idx + 1}`}
                              referrerPolicy="no-referrer"
                              className="w-full h-24 object-cover"
                            />

                            {/* Featured Badge */}
                            {isFeatured && (
                              <span className="absolute top-1.5 left-1.5 bg-amber-500 text-black text-[9px] font-black uppercase px-1.5 py-0.5 rounded shadow flex items-center gap-0.5">
                                <Star className="w-2.5 h-2.5 fill-black" /> Featured
                              </span>
                            )}

                            {/* Image Actions Overlay */}
                            <div className="absolute inset-0 bg-black/75 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 p-1">
                              {!isFeatured && (
                                <button
                                  type="button"
                                  onClick={() => handleSetFeaturedImage(idx)}
                                  className="bg-amber-500 text-black px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 hover:bg-amber-400"
                                >
                                  <Star className="w-3 h-3" /> Set Featured
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase flex items-center gap-1 hover:bg-red-500"
                              >
                                <Trash2 className="w-3 h-3" /> Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Manual Cloudinary URL Direct Input fallback */}
                <div className="pt-1">
                  <label className="text-[10px] font-bold uppercase text-zinc-500 block mb-1">
                    Direct Image URL Input (Cloudinary / Unsplash)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.images?.[0] || ''}
                    onChange={e => {
                      const newUrl = e.target.value.trim();
                      if (newUrl) {
                        const current = editingProduct.images ? [...editingProduct.images] : [];
                        current[0] = newUrl;
                        setEditingProduct({ ...editingProduct, images: current });
                      }
                    }}
                    placeholder="https://res.cloudinary.com/your-cloud-name/image/upload/..."
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2 text-[11px] text-white font-mono"
                  />
                </div>
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
