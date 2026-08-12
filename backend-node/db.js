const Database = require('better-sqlite3');
const path = require('path');

const DB_PATH = path.join(__dirname, 'sargia.db');
const db = new Database(DB_PATH);

// Enable WAL mode for better performance
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ─── Create Tables ───────────────────────────────────────────────────────────

db.exec(`
  CREATE TABLE IF NOT EXISTS company_info (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL DEFAULT 'SARGIA Group',
    about_text TEXT DEFAULT '',
    vision_text TEXT DEFAULT '',
    mission_text TEXT DEFAULT '',
    core_values TEXT DEFAULT '[]',
    email TEXT DEFAULT '',
    phone TEXT DEFAULT '',
    address TEXT DEFAULT '',
    linkedin_url TEXT DEFAULT '',
    twitter_url TEXT DEFAULT ''
  );

  CREATE TABLE IF NOT EXISTS businesses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NOT NULL DEFAULT '',
    logo_url TEXT DEFAULT '',
    website_url TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    is_active INTEGER DEFAULT 1,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS enquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT DEFAULT '',
    subject TEXT DEFAULT '',
    message TEXT NOT NULL,
    synced_to_sheets INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

// ─── Seed default company info if empty ──────────────────────────────────────
const companyCount = db.prepare('SELECT COUNT(*) as count FROM company_info').get();
if (companyCount.count === 0) {
  db.prepare(`
    INSERT INTO company_info (name, about_text, vision_text, mission_text, core_values, email, phone, address, linkedin_url, twitter_url)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'SARGIA Group',
    'SARGIA Group is a premier holding company driving excellence across technology, arts, and strategic consulting.',
    'To be a globally recognized conglomerate that inspires innovation and creates sustainable value for all stakeholders.',
    'To foster a culture of excellence and strategic growth by investing in transformative ideas and empowering visionary leaders.',
    JSON.stringify(['Integrity', 'Innovation', 'Excellence']),
    'contact@sargiagroup.com',
    '+1 (800) 456-7890',
    'One World Trade Center, Suite 4500, New York, NY 10007',
    '',
    ''
  );
}

// ─── Seed default businesses if empty ────────────────────────────────────────
const bizCount = db.prepare('SELECT COUNT(*) as count FROM businesses').get();
if (bizCount.count === 0) {
  const insertBiz = db.prepare(`
    INSERT INTO businesses (name, description, logo_url, website_url, sort_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  insertBiz.run('Artemclava', 'Our premier strategic consulting arm serving high-growth enterprises. Artemclava focuses on delivering transformative business strategies and operational excellence.', '', '#', 1, 1);
  insertBiz.run('Acspire', 'A cutting-edge technology solutions provider. Acspire builds scalable, high-performance software ecosystems designed to outpace market evolution.', '', '#', 2, 1);
  insertBiz.run('ArtAxis', 'Connecting the global creative economy. ArtAxis leverages technology to empower artists, creators, and platforms in the digital age.', '', '#', 3, 1);
}

module.exports = db;
