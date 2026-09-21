import React, { useState, useEffect } from 'react';
import { 
  Search, Bell, MapPin, SlidersHorizontal, 
  MessageCircle, Plus, Home, User, 
  Star, ShieldCheck, Tag, ShoppingBag,
  ChevronRight, X, Heart, MessageSquare, ChevronDown
} from 'lucide-react';
import { MOCK_LISTINGS, CATEGORIES, Listing } from './data';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedItem, setSelectedItem] = useState<Listing | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxDistance, setMaxDistance] = useState<number>(2.0);
  const [campusZone, setCampusZone] = useState('Campus Main');
  const [showFilters, setShowFilters] = useState(false);
  const [isFeedLoading, setIsFeedLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    setIsFeedLoading(true);
    const timer = setTimeout(() => setIsFeedLoading(false), 400);
    return () => clearTimeout(timer);
  }, [searchQuery, activeCategory, maxDistance, campusZone]);

  useEffect(() => {
    if (selectedItem) {
      setIsDetailLoading(true);
      const timer = setTimeout(() => setIsDetailLoading(false), 400);
      return () => clearTimeout(timer);
    }
  }, [selectedItem]);

  const filteredListings = MOCK_LISTINGS.filter(l => {
    if (activeCategory !== 'All' && l.category !== activeCategory) return false;
    if (searchQuery.trim() && !l.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    const dist = parseFloat(l.distance);
    if (dist > maxDistance) return false;
    return true;
  });

  // Authentication Flow
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-indigo-200 transform rotate-3">
              <ShoppingBag size={32} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">BrainBuy</h1>
              <p className="text-slate-500 mt-2">The trusted university marketplace.</p>
            </div>
            
            <form className="space-y-4 text-left" onSubmit={(e) => { e.preventDefault(); setIsAuthenticated(true); }}>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">University Email</label>
                <div className="relative">
                  <input 
                    type="email" 
                    required
                    placeholder="student@university.edu"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>
                <p className="text-xs text-slate-400 mt-1.5 flex items-center gap-1">
                  <Lock size={12} /> Secure .edu authentication
                </p>
              </div>
              <button 
                type="submit"
                className="w-full bg-indigo-600 text-white rounded-xl py-3.5 font-bold hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Continue securely
              </button>
            </form>
          </div>
          <div className="bg-slate-50 px-8 py-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">By continuing, you agree to our Terms of Service & Privacy Policy.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex justify-center">
      {/* Mobile Constraint Wrapper */}
      <div className="w-full max-w-md bg-white shadow-2xl overflow-hidden relative flex flex-col h-[100dvh]">
        
        {/* Header */}
        <header className="px-5 pt-12 pb-4 bg-white sticky top-0 z-30 border-b border-slate-100">
          <div className="flex justify-between items-center mb-5">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 flex items-center gap-1.5">
                BrainBuy
              </h1>
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="text-xs text-indigo-600 font-bold flex items-center gap-1 mt-0.5 hover:text-indigo-700 transition-colors"
              >
                <MapPin className="w-3 h-3" /> {campusZone} <ChevronDown className="w-3 h-3" />
              </button>
            </div>
            <button className="p-2.5 bg-slate-50 text-slate-600 rounded-full hover:bg-slate-100 transition relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border-2 border-slate-50 rounded-full"></span>
            </button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search textbooks, electronics..." 
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition-all"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2.5 border rounded-xl transition flex items-center justify-center ${showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-slate-50 border-slate-100 hover:bg-slate-100 text-slate-600'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Proximity Filter Dropdown */}
          {showFilters && (
            <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 shadow-xl p-5 z-40 animate-slide-up origin-top">
              <div className="space-y-5">
                <div>
                  <label className="block text-xs font-bold text-slate-900 mb-2 uppercase tracking-wide">Campus Zone</label>
                  <div className="relative">
                    <select 
                      value={campusZone}
                      onChange={(e) => setCampusZone(e.target.value)}
                      className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <option>Campus Main</option>
                      <option>North Campus Dorms</option>
                      <option>South Campus Area</option>
                      <option>Engineering Quad</option>
                      <option>Medical Center</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-xs font-bold text-slate-900 uppercase tracking-wide">Maximum Distance</label>
                    <span className="text-xs font-black text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">{maxDistance.toFixed(1)} miles</span>
                  </div>
                  <input 
                    type="range" 
                    min="0.1" 
                    max="5" 
                    step="0.1" 
                    value={maxDistance}
                    onChange={(e) => setMaxDistance(parseFloat(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                  <div className="flex justify-between text-[10px] font-semibold text-slate-400 mt-2">
                    <span>Walking (0.1mi)</span>
                    <span>Driving (5mi+)</span>
                  </div>
                </div>

                <button 
                  onClick={() => setShowFilters(false)}
                  className="w-full bg-slate-900 text-white rounded-xl py-3 text-sm font-bold hover:bg-slate-800 transition-colors shadow-md"
                >
                  Show {filteredListings.length} Results
                </button>
              </div>
            </div>
          )}
        </header>

        {/* Scrollable Main Area */}
        <main className="flex-1 overflow-y-auto pb-24">
          
          {/* Categories Pill Nav */}
          <div className="px-5 py-4 overflow-x-auto hide-scrollbar border-b border-slate-50">
            <div className="flex gap-2 min-w-max">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    activeCategory === cat 
                      ? "bg-slate-900 text-white" 
                      : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Feed */}
          <div className="p-5">
            <div className="flex justify-between items-end mb-4">
              <h2 className="text-base font-bold">Recommended Deals</h2>
              <span className="text-xs font-semibold text-slate-500">{filteredListings.length} items</span>
            </div>
            
            {isFeedLoading ? (
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={`skeleton-${i}`} className="flex flex-col">
                    <div className="aspect-square w-full rounded-2xl bg-slate-200 animate-pulse mb-2"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4 mb-1.5"></div>
                    <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4 mb-1.5"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-12 px-4 border-2 border-dashed border-slate-200 rounded-2xl">
                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Search className="w-5 h-5 text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">No items found</h3>
                <p className="text-xs text-slate-500">Try expanding your search distance or changing zones.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredListings.map((listing) => (
                  <div 
                    key={listing.id} 
                    onClick={() => setSelectedItem(listing)}
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 mb-2 border border-slate-100">
                      <img 
                        src={listing.image} 
                        alt={listing.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded text-[10px] font-bold text-slate-700">
                        {listing.condition}
                      </div>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-semibold text-xs leading-snug line-clamp-2 text-slate-800 flex-1">
                        {listing.title}
                      </h3>
                    </div>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-sm font-bold text-slate-900">${listing.price}</span>
                      {listing.originalPrice && (
                        <span className="text-[10px] text-slate-400 line-through">${listing.originalPrice}</span>
                      )}
                    </div>
                    <div className="mt-1 text-[10px] text-slate-500 flex items-center gap-1">
                      <MapPin size={10} /> {listing.distance}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* Bottom Tab Bar */}
        <nav className="absolute bottom-0 w-full bg-white border-t border-slate-100 pb-safe pt-2 px-6 flex justify-between items-center z-20">
          {[
            { id: "home", icon: Home, label: "Home" },
            { id: "messages", icon: MessageCircle, label: "Inbox" },
            { id: "sell", icon: Plus, label: "Sell", special: true },
            { id: "cart", icon: Tag, label: "Saved" },
            { id: "profile", icon: User, label: "Profile" },
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            if (item.special) {
              return (
                <button key={item.id} className="relative -top-5 bg-indigo-600 text-white p-3.5 rounded-full shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-all">
                  <Icon className="w-6 h-6" />
                </button>
              );
            }

            return (
              <button 
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center p-2 gap-1 transition-colors ${
                  isActive ? "text-indigo-600" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "fill-indigo-50" : ""}`} />
                <span className="text-[9px] font-semibold">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Item Detail Modal overlay */}
        {selectedItem && (
          <div className="absolute inset-0 bg-white z-30 flex flex-col animate-slide-up h-full">
            <div className="relative w-full h-72 shrink-0">
              {isDetailLoading ? (
                <div className="w-full h-full bg-slate-200 animate-pulse"></div>
              ) : (
                <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover bg-slate-100" />
              )}
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-12 left-4 p-2.5 bg-white/50 backdrop-blur-md rounded-full text-slate-800 hover:bg-white/70 transition-colors z-10"
              >
                <X size={20} />
              </button>
              <button className="absolute top-12 right-4 p-2.5 bg-white/50 backdrop-blur-md rounded-full text-slate-800 hover:bg-white/70 transition-colors z-10">
                <Heart size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto pb-24">
              {isDetailLoading ? (
                <div className="p-5 space-y-6">
                  <div className="space-y-3">
                    <div className="h-6 bg-slate-200 rounded animate-pulse w-3/4"></div>
                    <div className="h-8 bg-slate-200 rounded animate-pulse w-1/3"></div>
                    <div className="flex gap-2 pt-2">
                      <div className="h-6 w-16 bg-slate-200 rounded animate-pulse"></div>
                      <div className="h-6 w-20 bg-slate-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                  <div className="space-y-2 pt-4 border-t border-slate-100">
                    <div className="h-4 bg-slate-200 rounded animate-pulse w-1/4 mb-3"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse w-full"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse w-full"></div>
                    <div className="h-3 bg-slate-200 rounded animate-pulse w-5/6"></div>
                  </div>
                  <div className="flex gap-3 items-center pt-4 border-t border-slate-100">
                    <div className="w-12 h-12 rounded-full bg-slate-200 animate-pulse shrink-0"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-slate-200 rounded animate-pulse w-1/3"></div>
                      <div className="h-3 bg-slate-200 rounded animate-pulse w-1/2"></div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-5 border-b border-slate-100">
                    <div className="flex justify-between items-start mb-2">
                      <h1 className="text-xl font-bold text-slate-900">{selectedItem.title}</h1>
                    </div>
                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="text-2xl font-extrabold text-slate-900">${selectedItem.price}</span>
                      {selectedItem.originalPrice && (
                        <span className="text-sm text-slate-400 line-through">Retails for ${selectedItem.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">{selectedItem.condition}</span>
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium">{selectedItem.category}</span>
                      <span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
                        <MapPin size={12}/> {selectedItem.distance}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 border-b border-slate-100">
                    <h3 className="text-sm font-bold mb-2">Description</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedItem.description}</p>
                    <p className="text-xs text-slate-400 mt-2">Posted {selectedItem.createdAt}</p>
                  </div>

                  <div className="p-5">
                    <h3 className="text-sm font-bold mb-3">Seller Details</h3>
                    <div className="flex items-center gap-3">
                      <img src={selectedItem.seller.avatar} alt="Seller" className="w-12 h-12 rounded-full object-cover" />
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-sm text-slate-900">{selectedItem.seller.name}</span>
                          {selectedItem.seller.verified && <ShieldCheck size={14} className="text-emerald-500" />}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {selectedItem.seller.major} • Class of {selectedItem.seller.gradYear}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                        <Star size={12} className="fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold">{selectedItem.seller.rating}</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="absolute bottom-0 w-full bg-white border-t border-slate-100 p-4 pb-safe flex gap-3 z-20 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
              {isDetailLoading ? (
                <>
                  <div className="flex-1 h-[52px] bg-slate-200 rounded-xl animate-pulse"></div>
                  <div className="flex-1 h-[52px] bg-slate-200 rounded-xl animate-pulse"></div>
                </>
              ) : (
                <>
                  <button className="flex-1 bg-slate-100 text-slate-900 font-bold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors">
                    <MessageSquare size={18} /> Ask a Question
                  </button>
                  <button 
                    onClick={() => setShowCheckout(true)}
                    className="flex-1 bg-indigo-600 text-white font-bold py-3.5 rounded-xl text-sm shadow-md shadow-indigo-200 hover:bg-indigo-700 transition-colors"
                  >
                    Make Offer
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Minimal Checkout Overlay */}
        {showCheckout && selectedItem && (
          <div className="absolute inset-0 bg-slate-900/40 z-40 flex flex-col justify-end">
            <div className="bg-white rounded-t-3xl p-6 w-full animate-slide-up">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Secure Escrow Checkout</h2>
                <button onClick={() => setShowCheckout(false)} className="text-slate-400 hover:text-slate-600">
                  <X size={24} />
                </button>
              </div>

              <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl border border-slate-100">
                <img src={selectedItem.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{selectedItem.title}</h4>
                  <div className="text-lg font-extrabold text-indigo-600 mt-1">${selectedItem.price}</div>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 p-3.5 border border-slate-200 rounded-xl cursor-pointer hover:border-indigo-600 hover:bg-indigo-50/30 transition-all">
                  <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-xs text-slate-600">CC</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold">Visa ending in 4242</div>
                    <div className="text-xs text-slate-500">Student Account</div>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-600 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 bg-indigo-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  alert("Payment processed securely!");
                  setShowCheckout(false);
                  setSelectedItem(null);
                }}
                className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
              >
                Pay ${selectedItem.price} & Reserve Item
              </button>
              <p className="text-center text-[10px] text-slate-400 mt-4 flex items-center justify-center gap-1">
                <ShieldCheck size={12} /> Funds held safely until pickup is confirmed.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Minimal stub for a missing icon
function Lock(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
  );
}

