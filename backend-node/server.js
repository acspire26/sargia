const express = require('express');
const cors = require('cors');
const db = require('./db');
const { syncEnquiryToSheets } = require('./sheets');

const app = express();
const PORT = process.env.PORT || 8000;

// ─── Middleware ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Helper ───────────────────────────────────────────────────────────────────
const parseBool = (val) => val === 1 || val === true;

const formatBusiness = (b) => ({
  ...b,
  is_active: parseBool(b.is_active),
});

// ═══════════════════════════════════════════════════════════════════════════════
// COMPANY INFO
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/company-info  — returns first record (mimics Django list returning single object)
app.get('/api/company-info', (req, res) => {
  try {
    const info = db.prepare('SELECT * FROM company_info LIMIT 1').get();
    if (!info) return res.json({ results: [] });
    const parsed = { ...info, core_values: JSON.parse(info.core_values || '[]') };
    res.json({ results: [parsed], count: 1 });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/company-info/:id  — update company info
app.put('/api/company-info/:id', (req, res) => {
  try {
    const { name, about_text, vision_text, mission_text, core_values, email, phone, address, linkedin_url, twitter_url } = req.body;
    db.prepare(`
      UPDATE company_info SET
        name = ?, about_text = ?, vision_text = ?, mission_text = ?,
        core_values = ?, email = ?, phone = ?, address = ?,
        linkedin_url = ?, twitter_url = ?
      WHERE id = ?
    `).run(name, about_text, vision_text, mission_text, JSON.stringify(core_values || []), email, phone, address, linkedin_url, twitter_url, req.params.id);
    const updated = db.prepare('SELECT * FROM company_info WHERE id = ?').get(req.params.id);
    res.json({ ...updated, core_values: JSON.parse(updated.core_values || '[]') });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// BUSINESSES
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/businesses  — active only (public website)
app.get('/api/businesses', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM businesses WHERE is_active = 1 ORDER BY sort_order ASC').all();
    res.json({ results: rows.map(formatBusiness), count: rows.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /api/businesses/all  — all including hidden (admin)
app.get('/api/businesses/all', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM businesses ORDER BY sort_order ASC').all();
    res.json({ results: rows.map(formatBusiness), count: rows.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/businesses  — create
app.post('/api/businesses', (req, res) => {
  try {
    const { name, description, logo_url, website_url, sort_order } = req.body;
    if (!name || !description) return res.status(400).json({ error: 'Name and description are required.' });
    const maxOrder = db.prepare('SELECT MAX(sort_order) as mo FROM businesses').get();
    const newOrder = sort_order || (maxOrder.mo || 0) + 1;
    const result = db.prepare(`
      INSERT INTO businesses (name, description, logo_url, website_url, sort_order, is_active)
      VALUES (?, ?, ?, ?, ?, 1)
    `).run(name, description, logo_url || '', website_url || '', newOrder);
    const created = db.prepare('SELECT * FROM businesses WHERE id = ?').get(result.lastInsertRowid);
    res.status(201).json(formatBusiness(created));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /api/businesses/:id  — update
app.put('/api/businesses/:id', (req, res) => {
  try {
    const { name, description, logo_url, website_url, sort_order } = req.body;
    if (!name || !description) return res.status(400).json({ error: 'Name and description are required.' });
    db.prepare(`
      UPDATE businesses SET name = ?, description = ?, logo_url = ?, website_url = ?, sort_order = ?
      WHERE id = ?
    `).run(name, description, logo_url || '', website_url || '', sort_order || 0, req.params.id);
    const updated = db.prepare('SELECT * FROM businesses WHERE id = ?').get(req.params.id);
    if (!updated) return res.status(404).json({ error: 'Business not found.' });
    res.json(formatBusiness(updated));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// DELETE /api/businesses/:id  — delete
app.delete('/api/businesses/:id', (req, res) => {
  try {
    const biz = db.prepare('SELECT * FROM businesses WHERE id = ?').get(req.params.id);
    if (!biz) return res.status(404).json({ error: 'Business not found.' });
    db.prepare('DELETE FROM businesses WHERE id = ?').run(req.params.id);
    res.json({ message: `Business "${biz.name}" deleted successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /api/businesses/:id/toggle  — toggle is_active
app.patch('/api/businesses/:id/toggle', (req, res) => {
  try {
    const biz = db.prepare('SELECT * FROM businesses WHERE id = ?').get(req.params.id);
    if (!biz) return res.status(404).json({ error: 'Business not found.' });
    const newState = biz.is_active ? 0 : 1;
    db.prepare('UPDATE businesses SET is_active = ? WHERE id = ?').run(newState, req.params.id);
    const updated = db.prepare('SELECT * FROM businesses WHERE id = ?').get(req.params.id);
    res.json(formatBusiness(updated));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ═══════════════════════════════════════════════════════════════════════════════
// ENQUIRIES
// ═══════════════════════════════════════════════════════════════════════════════

// GET /api/enquiries  — list all (admin)
app.get('/api/enquiries', (req, res) => {
  try {
    const rows = db.prepare('SELECT * FROM enquiries ORDER BY created_at DESC').all();
    res.json(rows.map(e => ({ ...e, synced_to_sheets: parseBool(e.synced_to_sheets) })));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/enquiries  — create + auto-sync
app.post('/api/enquiries', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required.' });
    const result = db.prepare(`
      INSERT INTO enquiries (name, email, phone, subject, message)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, email, phone || '', subject || '', message);
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(result.lastInsertRowid);

    // Auto-sync to Google Sheets (fire-and-forget, don't block response)
    syncEnquiryToSheets(enquiry).catch(console.error);

    res.status(201).json({ ...enquiry, synced_to_sheets: parseBool(enquiry.synced_to_sheets) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /api/enquiries/:id/sync_to_sheets  — force re-sync
app.post('/api/enquiries/:id/sync_to_sheets', async (req, res) => {
  try {
    const enquiry = db.prepare('SELECT * FROM enquiries WHERE id = ?').get(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Enquiry not found.' });
    const success = await syncEnquiryToSheets(enquiry);
    if (success) {
      res.json({ status: 'synced', synced_to_sheets: true });
    } else {
      res.status(400).json({ status: 'failed', synced_to_sheets: false, message: 'Check credentials.json and GOOGLE_SHEET_ID.' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ─── Health check ─────────────────────────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', server: 'SARGIA Node.js Backend', port: PORT });
});

// ─── 404 fallback ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.path}` });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  SARGIA Backend (Node.js) running on http://localhost:${PORT}\n`);
});
