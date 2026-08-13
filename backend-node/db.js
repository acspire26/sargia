/**
 * db.js — sql.js (WASM) adapter with better-sqlite3-compatible API
 * No native compilation needed. Database is persisted to sargia.db on every write.
 */
const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'sargia.db');

// ─── Persist in-memory DB to disk ────────────────────────────────────────────
function saveDb(rawDb) {
  try {
    fs.writeFileSync(DB_PATH, Buffer.from(rawDb.export()));
  } catch (e) {
    console.error('[db] Failed to save database:', e.message);
  }
}

// ─── Compatibility shim (mirrors better-sqlite3 API) ─────────────────────────
function makeWrapper(rawDb) {
  return {
    /** Run raw SQL (no results) */
    exec(sql) {
      rawDb.exec(sql);
      return this;
    },

    /** Returns a statement object with .get() / .all() / .run() */
    prepare(sql) {
      return {
        /** Fetch first row as object, or null */
        get(...args) {
          const stmt = rawDb.prepare(sql);
          if (args.length) stmt.bind(args);
          const result = stmt.step() ? stmt.getAsObject() : null;
          stmt.free();
          return result;
        },

        /** Fetch all rows as array of objects */
        all(...args) {
          const stmt = rawDb.prepare(sql);
          if (args.length) stmt.bind(args);
          const rows = [];
          while (stmt.step()) rows.push(stmt.getAsObject());
          stmt.free();
          return rows;
        },

        /** Execute (INSERT / UPDATE / DELETE), auto-saves to disk */
        run(...args) {
          const stmt = rawDb.prepare(sql);
          if (args.length) stmt.bind(args);
          stmt.step();
          stmt.free();
          const lastRow = rawDb.exec('SELECT last_insert_rowid()');
          const lastInsertRowid = lastRow[0]?.values[0][0] ?? null;
          saveDb(rawDb);
          return { lastInsertRowid };
        },
      };
    },
  };
}

// ─── Async init — exported as a Promise ──────────────────────────────────────
module.exports = (async () => {
  const SQL = await initSqlJs();

  // Load existing DB file or create fresh one
  let rawDb;
  if (fs.existsSync(DB_PATH)) {
    rawDb = new SQL.Database(fs.readFileSync(DB_PATH));
  } else {
    rawDb = new SQL.Database();
  }

  rawDb.run('PRAGMA journal_mode = WAL');
  rawDb.run('PRAGMA foreign_keys = ON');

  // ── Create Tables ─────────────────────────────────────────────────────────
  rawDb.exec(`
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

  // ── Seed company info if empty ────────────────────────────────────────────
  const companyCount = rawDb.exec('SELECT COUNT(*) FROM company_info')[0]?.values[0][0] || 0;
  if (companyCount === 0) {
    const s = rawDb.prepare(`
      INSERT INTO company_info (name, about_text, vision_text, mission_text, core_values, email, phone, address, linkedin_url, twitter_url)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    s.run([
      'SARGIA Group',
      'SARGIA Group is a premier holding company driving excellence across technology, arts, and strategic consulting.',
      'To be a globally recognized conglomerate that inspires innovation and creates sustainable value for all stakeholders.',
      'To foster a culture of excellence and strategic growth by investing in transformative ideas and empowering visionary leaders.',
      JSON.stringify(['Integrity', 'Innovation', 'Excellence']),
      'sargia2313@gmail.com',
      '6383283731, 8939774383',
      'Porur, Chennai, India',
      '',
      '',
    ]);
    s.free();
  }

  // ── Seed businesses if empty ──────────────────────────────────────────────
  const bizCount = rawDb.exec('SELECT COUNT(*) FROM businesses')[0]?.values[0][0] || 0;
  if (bizCount === 0) {
    const s = rawDb.prepare(`
      INSERT INTO businesses (name, description, logo_url, website_url, sort_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const seedData = [
      ['Artemclava', 'Our premier strategic consulting arm serving high-growth enterprises. Artemclava focuses on delivering transformative business strategies and operational excellence.', '', '#', 1, 1],
      ['Acspire', 'A cutting-edge technology solutions provider. Acspire builds scalable, high-performance software ecosystems designed to outpace market evolution.', '', '#', 2, 1],
      ['ArtAxis', 'Connecting the global creative economy. ArtAxis leverages technology to empower artists, creators, and platforms in the digital age.', '', '#', 3, 1],
    ];
    for (const row of seedData) {
      s.bind(row);
      s.step();
      s.reset();
    }
    s.free();
  }

  saveDb(rawDb);
  console.log('[db] Database ready:', DB_PATH);
  return makeWrapper(rawDb);
})();
