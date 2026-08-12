import { useState, useEffect } from 'react';
import { getEnquiries, syncEnquiryToSheets, getAllBusinesses, createBusiness, updateBusiness, deleteBusiness, toggleBusiness } from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, CheckCircle, AlertTriangle, Eye, RefreshCw, 
  FileSpreadsheet, Lock, Database, Search, Plus, Pencil, Trash2,
  ToggleLeft, ToggleRight, X, Building2, Mail
} from 'lucide-react';

// ── Reusable Input ────────────────────────────────────────────────────────────
const FormInput = ({ label, name, value, onChange, type = 'text', placeholder = '', required = false, textarea = false }) => (
  <div>
    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
    {textarea ? (
      <textarea name={name} value={value} onChange={onChange} required={required} rows={3}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent outline-none text-sm transition-all resize-none" />
    ) : (
      <input type={type} name={name} value={value} onChange={onChange} required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg bg-slate-50 border border-slate-200 focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent outline-none text-sm transition-all" />
    )}
  </div>
);

// ── Business Modal (Add / Edit) ───────────────────────────────────────────────
const BusinessModal = ({ business, onClose, onSave }) => {
  const isEdit = !!business?.id;
  const [form, setForm] = useState({
    name: business?.name || '',
    description: business?.description || '',
    logo_url: business?.logo_url || '',
    website_url: business?.website_url || '',
    sort_order: business?.sort_order || 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isEdit) {
        await updateBusiness(business.id, form);
      } else {
        await createBusiness(form);
      }
      onSave();
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
      <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-lg rounded-[2rem] border border-slate-200 shadow-2xl relative z-10 overflow-hidden">
        
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h3 className="text-xl font-extrabold text-gray-900">{isEdit ? 'Edit Business' : 'Add New Business'}</h3>
            <p className="text-xs text-gray-500 mt-0.5">{isEdit ? `Editing "${business.name}"` : 'This will appear on the public website'}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <FormInput label="Business Name" name="name" value={form.name} onChange={handleChange} required placeholder="e.g. Artemclava" />
          <FormInput label="Description" name="description" value={form.description} onChange={handleChange} required textarea placeholder="Brief description of the business..." />
          <FormInput label="Logo URL" name="logo_url" value={form.logo_url} onChange={handleChange} placeholder="https://example.com/logo.png" />
          <FormInput label="Website URL" name="website_url" value={form.website_url} onChange={handleChange} placeholder="https://example.com" />
          <FormInput label="Display Order" name="sort_order" value={form.sort_order} onChange={handleChange} type="number" placeholder="1" />

          {error && <p className="text-red-500 text-sm font-bold bg-red-50 p-3 rounded-lg">{error}</p>}

          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={loading}
              className="flex-1 py-3 rounded-lg bg-accent text-white font-bold hover:bg-accent-hover transition-colors shadow-md disabled:opacity-50 text-sm">
              {loading ? 'Saving...' : isEdit ? 'Save Changes' : 'Create Business'}
            </button>
            <button type="button" onClick={onClose}
              className="px-6 py-3 rounded-lg bg-white border border-slate-200 text-gray-700 font-bold hover:bg-slate-50 transition-colors text-sm">
              Cancel
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

// ── Delete Confirm Modal ──────────────────────────────────────────────────────
const DeleteModal = ({ business, onClose, onConfirm, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onClick={onClose} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
      className="bg-white w-full max-w-sm rounded-[2rem] border border-slate-200 shadow-2xl relative z-10 p-8 text-center">
      <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mx-auto mb-5 text-red-500">
        <Trash2 size={24} />
      </div>
      <h3 className="text-xl font-extrabold text-gray-900 mb-2">Delete Business?</h3>
      <p className="text-gray-500 text-sm mb-6">This will permanently delete <strong>"{business.name}"</strong> from the website. This cannot be undone.</p>
      <div className="flex gap-3">
        <button onClick={onConfirm} disabled={loading}
          className="flex-1 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors disabled:opacity-50 text-sm">
          {loading ? 'Deleting...' : 'Yes, Delete'}
        </button>
        <button onClick={onClose}
          className="flex-1 py-3 rounded-lg bg-white border border-slate-200 text-gray-700 font-bold hover:bg-slate-50 transition-colors text-sm">
          Cancel
        </button>
      </div>
    </motion.div>
  </div>
);

// ═════════════════════════════════════════════════════════════════════════════
// MAIN ADMIN DASHBOARD
// ═════════════════════════════════════════════════════════════════════════════
const AdminDashboard = () => {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeTab, setActiveTab] = useState('businesses');

  // Business state
  const [businesses, setBusinesses] = useState([]);
  const [bizLoading, setBizLoading] = useState(false);
  const [bizError, setBizError] = useState('');
  const [editingBusiness, setEditingBusiness] = useState(null); // null = closed, {} = new, {id,...} = edit
  const [deletingBusiness, setDeletingBusiness] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toggleLoadingId, setToggleLoadingId] = useState(null);

  // Enquiry state
  const [enquiries, setEnquiries] = useState([]);
  const [enquiryLoading, setEnquiryLoading] = useState(false);
  const [enquiryError, setEnquiryError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [syncLoadingId, setSyncLoadingId] = useState(null);

  // Auth
  const handleLogin = (e) => {
    e.preventDefault();
    if (passcode === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      localStorage.setItem('admin_auth', 'true');
    } else {
      setAuthError('Incorrect passcode. Please try again.');
    }
  };

  useEffect(() => {
    if (localStorage.getItem('admin_auth') === 'true') setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchBusinesses();
      fetchEnquiries();
    }
  }, [isAuthenticated]);

  // Business fetch
  const fetchBusinesses = async () => {
    setBizLoading(true);
    setBizError('');
    try {
      const data = await getAllBusinesses();
      setBusinesses(data.results || data);
    } catch (err) {
      setBizError('Failed to load businesses. Is the backend running?');
    } finally {
      setBizLoading(false);
    }
  };

  // Business actions
  const handleToggle = async (id) => {
    setToggleLoadingId(id);
    try {
      await toggleBusiness(id);
      await fetchBusinesses();
    } catch (err) {
      alert('Toggle failed. Please try again.');
    } finally {
      setToggleLoadingId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deletingBusiness) return;
    setDeleteLoading(true);
    try {
      await deleteBusiness(deletingBusiness.id);
      setDeletingBusiness(null);
      await fetchBusinesses();
    } catch (err) {
      alert('Delete failed. Please try again.');
    } finally {
      setDeleteLoading(false);
    }
  };

  // Enquiry fetch
  const fetchEnquiries = async () => {
    setEnquiryLoading(true);
    setEnquiryError('');
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (err) {
      setEnquiryError('Failed to fetch enquiries. Make sure the backend is running.');
    } finally {
      setEnquiryLoading(false);
    }
  };

  const handleSyncSingle = async (id) => {
    setSyncLoadingId(id);
    try {
      await syncEnquiryToSheets(id);
      await fetchEnquiries();
    } catch (err) {
      alert('Sync failed. Check credentials.json and GOOGLE_SHEET_ID.');
    } finally {
      setSyncLoadingId(null);
    }
  };

  const filteredEnquiries = enquiries.filter(e =>
    e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (e.subject && e.subject.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const enquiryStats = {
    total: enquiries.length,
    synced: enquiries.filter(e => e.synced_to_sheets).length,
    pending: enquiries.filter(e => !e.synced_to_sheets).length,
  };

  // ── Login Screen ──────────────────────────────────────────────────────────
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full bg-white p-10 rounded-[2rem] border border-slate-200 shadow-xl relative z-10 text-center">
          <div className="w-16 h-16 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-8 text-accent shadow-sm">
            <Lock size={28} />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2 font-serif">Admin Portal</h2>
          <p className="text-gray-500 text-sm mb-8 font-medium">Enter your passcode to access the dashboard.</p>
          <form onSubmit={handleLogin} className="space-y-5">
            <input type="password" required value={passcode} onChange={(e) => setPasscode(e.target.value)}
              className="w-full px-5 py-4 rounded-md bg-slate-50 border border-slate-200 focus:border-accent focus:bg-white focus:ring-1 focus:ring-accent outline-none transition-all text-center text-lg font-bold tracking-widest"
              placeholder="••••••••" />
            {authError && <p className="text-red-500 text-sm font-bold text-left">{authError}</p>}
            <button type="submit" className="w-full py-4 rounded-md bg-accent text-white font-bold hover:bg-accent-hover transition-colors shadow-lg">
              Access Dashboard
            </button>
          </form>
          <a href="/" className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-gray-700 transition-colors mt-8">
            <ArrowLeft size={16} /> Return to Homepage
          </a>
        </motion.div>
      </div>
    );
  }

  // ── Dashboard ──────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-50 py-12 relative overflow-hidden font-sans">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/5 rounded-full filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">
          <div className="flex items-center gap-4">
            <a href="/" className="text-gray-500 hover:text-gray-900 p-2 rounded-lg bg-white border border-slate-200 shadow-sm transition-colors">
              <ArrowLeft size={18} />
            </a>
            <div>
              <p className="text-accent text-xs font-bold tracking-widest uppercase mb-0.5">SARGIA Group</p>
              <h1 className="text-3xl font-extrabold text-gray-900 font-serif">Admin Dashboard</h1>
            </div>
          </div>
          <button onClick={() => { localStorage.removeItem('admin_auth'); setIsAuthenticated(false); }}
            className="px-5 py-2.5 rounded-lg bg-red-50 text-red-600 text-sm font-bold hover:bg-red-100 transition-colors border border-red-200/50 self-start md:self-auto">
            Sign Out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 bg-white border border-slate-200 rounded-xl p-1.5 shadow-sm w-fit mb-8">
          {[
            { id: 'businesses', label: 'Businesses', icon: Building2 },
            { id: 'enquiries', label: 'Enquiries', icon: Mail },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab.id ? 'bg-accent text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-slate-50'
              }`}>
              <tab.icon size={16} />{tab.label}
            </button>
          ))}
        </div>

        {/* ══ BUSINESSES TAB ══════════════════════════════════════════════ */}
        {activeTab === 'businesses' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-gray-900">Manage Businesses</h2>
                <p className="text-sm text-gray-500 mt-0.5">Changes update the public website immediately.</p>
              </div>
              <div className="flex gap-3">
                <button onClick={fetchBusinesses} disabled={bizLoading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-sm font-bold text-gray-700 hover:bg-slate-50 shadow-sm transition-colors">
                  <RefreshCw size={15} className={bizLoading ? 'animate-spin' : ''} /> Reload
                </button>
                <button onClick={() => setEditingBusiness({})}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent text-white text-sm font-bold hover:bg-accent-hover shadow-md transition-colors">
                  <Plus size={16} /> Add Business
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
              {bizLoading ? (
                <div className="text-center py-20 text-gray-500">
                  <RefreshCw size={28} className="animate-spin mx-auto mb-4 text-accent" />
                  Loading businesses...
                </div>
              ) : bizError ? (
                <div className="text-center py-20 px-4 text-red-500 font-bold">
                  <Database size={36} className="mx-auto mb-4 opacity-50" />{bizError}
                </div>
              ) : businesses.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                  <Building2 size={36} className="mx-auto mb-4 opacity-30" />
                  No businesses yet. Click "Add Business" to get started.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {businesses.map((biz) => (
                    <div key={biz.id} className="flex items-center gap-4 p-5 hover:bg-slate-50/60 transition-colors group">
                      {/* Icon / Logo */}
                      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-gray-400 shrink-0">
                        {biz.logo_url ? (
                          <img src={biz.logo_url} alt={biz.name} className="w-8 h-8 object-contain" onError={e => { e.target.style.display = 'none'; }} />
                        ) : (
                          <Building2 size={22} />
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-grow min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-900">{biz.name}</span>
                          <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${biz.is_active ? 'bg-green-50 text-accent' : 'bg-slate-100 text-gray-400'}`}>
                            {biz.is_active ? 'Visible' : 'Hidden'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 truncate mt-0.5 max-w-lg">{biz.description}</p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-1 shrink-0">
                        {/* Toggle */}
                        <button onClick={() => handleToggle(biz.id)} disabled={toggleLoadingId === biz.id}
                          className={`p-2 rounded-lg transition-all hover:scale-110 disabled:opacity-50 ${biz.is_active ? 'text-accent hover:bg-accent/10' : 'text-gray-400 hover:bg-slate-100'}`}
                          title={biz.is_active ? 'Hide from website' : 'Show on website'}>
                          {toggleLoadingId === biz.id
                            ? <RefreshCw size={18} className="animate-spin" />
                            : biz.is_active ? <ToggleRight size={22} /> : <ToggleLeft size={22} />}
                        </button>
                        {/* Edit */}
                        <button onClick={() => setEditingBusiness(biz)}
                          className="p-2 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-slate-100 transition-all"
                          title="Edit business">
                          <Pencil size={17} />
                        </button>
                        {/* Delete */}
                        <button onClick={() => setDeletingBusiness(biz)}
                          className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                          title="Delete business">
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ══ ENQUIRIES TAB ═══════════════════════════════════════════════ */}
        {activeTab === 'enquiries' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-md">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Total</div>
                <div className="text-4xl font-extrabold text-gray-900 font-serif">{enquiryStats.total}</div>
              </div>
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-md flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Synced</div>
                  <div className="text-4xl font-extrabold text-accent font-serif">{enquiryStats.synced}</div>
                </div>
                <CheckCircle size={36} className="text-accent/25" />
              </div>
              <div className="bg-white p-7 rounded-2xl border border-slate-200 shadow-md flex justify-between items-center">
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Pending Sync</div>
                  <div className="text-4xl font-extrabold text-amber-500 font-serif">{enquiryStats.pending}</div>
                </div>
                <AlertTriangle size={36} className="text-amber-400/30" />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative max-w-sm w-full">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" placeholder="Search submissions..." value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-accent focus:ring-1 focus:ring-accent outline-none text-sm" />
                </div>
                <button onClick={fetchEnquiries} disabled={enquiryLoading}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white border border-slate-200 text-sm font-bold hover:bg-slate-50 shadow-sm transition-colors">
                  <RefreshCw size={15} className={enquiryLoading ? 'animate-spin' : ''} /> Reload
                </button>
              </div>

              {enquiryLoading ? (
                <div className="text-center py-16"><RefreshCw size={28} className="animate-spin mx-auto mb-3 text-accent" /><p className="text-gray-400 text-sm">Loading...</p></div>
              ) : enquiryError ? (
                <div className="text-center py-16 text-red-500 font-bold px-4"><Database size={32} className="mx-auto mb-3 opacity-50" />{enquiryError}</div>
              ) : filteredEnquiries.length === 0 ? (
                <div className="text-center py-16 text-gray-400"><Search size={32} className="mx-auto mb-3 opacity-30" />No submissions found.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <th className="py-3.5 px-5">Name</th>
                        <th className="py-3.5 px-5">Subject</th>
                        <th className="py-3.5 px-5">Date</th>
                        <th className="py-3.5 px-5 text-center">Sheets</th>
                        <th className="py-3.5 px-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm font-medium">
                      {filteredEnquiries.map((enquiry) => (
                        <tr key={enquiry.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-4 px-5">
                            <div className="text-gray-900 font-bold">{enquiry.name}</div>
                            <div className="text-gray-400 text-xs mt-0.5">{enquiry.email}</div>
                          </td>
                          <td className="py-4 px-5 text-gray-600 truncate max-w-[180px]">{enquiry.subject || '—'}</td>
                          <td className="py-4 px-5 text-gray-400 text-xs">{new Date(enquiry.created_at).toLocaleString()}</td>
                          <td className="py-4 px-5 text-center">
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${enquiry.synced_to_sheets ? 'bg-green-50 text-accent' : 'bg-amber-50 text-amber-600'}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${enquiry.synced_to_sheets ? 'bg-accent' : 'bg-amber-500'}`}></span>
                              {enquiry.synced_to_sheets ? 'Synced' : 'Pending'}
                            </span>
                          </td>
                          <td className="py-4 px-5 text-right">
                            <div className="flex justify-end gap-1">
                              <button onClick={() => setSelectedEnquiry(enquiry)}
                                className="p-1.5 rounded-lg hover:bg-slate-100 text-gray-400 hover:text-gray-700 transition-colors" title="View">
                                <Eye size={16} />
                              </button>
                              {!enquiry.synced_to_sheets && (
                                <button onClick={() => handleSyncSingle(enquiry.id)} disabled={syncLoadingId === enquiry.id}
                                  className="p-1.5 rounded-lg hover:bg-accent/10 text-accent transition-colors disabled:opacity-50" title="Force Sync">
                                  <RefreshCw size={16} className={syncLoadingId === enquiry.id ? 'animate-spin' : ''} />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* ── Business Add/Edit Modal ── */}
      <AnimatePresence>
        {editingBusiness !== null && (
          <BusinessModal
            business={editingBusiness?.id ? editingBusiness : null}
            onClose={() => setEditingBusiness(null)}
            onSave={() => { setEditingBusiness(null); fetchBusinesses(); }}
          />
        )}
      </AnimatePresence>

      {/* ── Business Delete Confirm ── */}
      <AnimatePresence>
        {deletingBusiness && (
          <DeleteModal
            business={deletingBusiness}
            onClose={() => setDeletingBusiness(null)}
            onConfirm={handleDeleteConfirm}
            loading={deleteLoading}
          />
        )}
      </AnimatePresence>

      {/* ── Enquiry Detail Modal ── */}
      <AnimatePresence>
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedEnquiry(null)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-white w-full max-w-2xl rounded-[2rem] border border-slate-200 shadow-2xl relative z-10 overflow-hidden">
              <div className="p-7 border-b border-slate-100 flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-extrabold text-gray-900 font-serif mb-1">{selectedEnquiry.subject || '(No Subject)'}</h3>
                  <p className="text-xs text-gray-400">{new Date(selectedEnquiry.created_at).toLocaleString()}</p>
                </div>
                <button onClick={() => setSelectedEnquiry(null)}
                  className="p-2 rounded-lg hover:bg-slate-100 text-gray-400 hover:text-gray-600 transition-colors"><X size={18} /></button>
              </div>
              <div className="p-7 space-y-5">
                <div className="grid grid-cols-2 gap-5 bg-slate-50 p-5 rounded-2xl">
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">From</span>
                    <span className="font-bold text-gray-900">{selectedEnquiry.name}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Email</span>
                    <a href={`mailto:${selectedEnquiry.email}`} className="font-bold text-accent hover:underline">{selectedEnquiry.email}</a>
                  </div>
                  {selectedEnquiry.phone && (
                    <div>
                      <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Phone</span>
                      <span className="font-bold text-gray-900">{selectedEnquiry.phone}</span>
                    </div>
                  )}
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message</span>
                  <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">{selectedEnquiry.message}</div>
                </div>
              </div>
              <div className="p-7 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button onClick={() => setSelectedEnquiry(null)}
                  className="px-6 py-2.5 rounded-lg bg-white border border-slate-200 text-gray-700 font-bold hover:bg-slate-100 transition-colors text-sm">
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
