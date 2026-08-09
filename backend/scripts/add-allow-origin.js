#!/usr/bin/env node
/**
 * Usage:
 *   MONGODB_URI="mongodb://..." node add-allow-origin.js http://example.com https://foo.com
 * Or set env ALLOW_ORIGINS (comma-separated):
 *   MONGODB_URI="mongodb://..." ALLOW_ORIGINS="http://a.com,https://b.com" node add-allow-origin.js
 */
const { MongoClient } = require('mongodb');

async function main() {
  const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
  if (!uri) {
    console.error('Missing MONGODB_URI environment variable');
    process.exit(1);
  }

  let origins = [];
  if (process.env.ALLOW_ORIGINS) {
    origins = process.env.ALLOW_ORIGINS.split(',').map(s => s.trim()).filter(Boolean);
  }
  if (process.argv.length > 2) {
    origins = origins.concat(process.argv.slice(2));
  }
  origins = [...new Set(origins.map(o => o.toLowerCase()))];

  if (origins.length === 0) {
    console.error('No origins provided. Provide as args or via ALLOW_ORIGINS env.');
    process.exit(1);
  }

  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  try {
    await client.connect();
    const db = client.db();
    const coll = db.collection('alloworigins');

    for (const origin of origins) {
      const normalized = origin.toLowerCase().replace(/\/$/, '');
      const res = await coll.updateOne(
        { origin: normalized },
        { $setOnInsert: { origin: normalized, createdAt: new Date() } },
        { upsert: true }
      );
      if (res.upsertedCount && res.upsertedCount > 0) {
        console.log('Inserted:', normalized);
      } else {
        console.log('Already exists:', normalized);
      }
    }

    console.log('Done.');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(2);
  } finally {
    try { await client.close(); } catch (e) {}
  }
}

main();
