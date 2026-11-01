#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const ledgerPath = path.join(root, 'data', 'publications.json');
const researchPath = path.join(root, 'research.html');
const ledger = JSON.parse(fs.readFileSync(ledgerPath, 'utf8'));
const html = fs.readFileSync(researchPath, 'utf8');
const errors = [];

const allowedStatuses = new Set(ledger.platformStatusValues);
const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

function check(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function textByClass(block, className) {
  const pattern = new RegExp(
    `<[^>]+class="[^"]*\\b${className}\\b[^"]*"[^>]*>([\\s\\S]*?)<\\/[^>]+>`
  );
  const match = block.match(pattern);
  return match ? decodeHtml(match[1]) : null;
}

function primaryLink(block) {
  const links = block.match(/<div class="publication-links">([\s\S]*?)<\/div>/);
  return links?.[1].match(/<a[^>]+href="([^"]+)"/)?.[1] || null;
}

const ids = new Set();
const dois = new Set();

check(/^\d{4}-\d{2}-\d{2}$/.test(ledger.lastReviewed), 'lastReviewed must use YYYY-MM-DD');

for (const publication of ledger.publications) {
  check(!ids.has(publication.id), `Duplicate publication id: ${publication.id}`);
  ids.add(publication.id);

  check(
    /^\d{4}-\d{2}$/.test(publication.canonicalDate.iso),
    `${publication.id}: canonicalDate.iso must use YYYY-MM`
  );

  const [year, month] = publication.canonicalDate.iso.split('-').map(Number);
  const expectedDisplay = `${monthNames[month - 1]} ${year}`;
  check(
    publication.canonicalDate.display === expectedDisplay,
    `${publication.id}: canonical date should display as ${expectedDisplay}`
  );
  check(
    publication.canonicalDate.precision === 'month',
    `${publication.id}: canonical date precision must be month`
  );
  if (publication.exactPublicationDate) {
    check(
      publication.exactPublicationDate.startsWith(`${publication.canonicalDate.iso}-`),
      `${publication.id}: exact publication date conflicts with the canonical month`
    );
  }

  const doi = publication.identifiers.doi?.toLowerCase();
  if (doi) {
    check(!dois.has(doi), `${publication.id}: duplicate DOI ${doi}`);
    dois.add(doi);
    check(
      publication.links.primary.toLowerCase() === `https://doi.org/${doi}`,
      `${publication.id}: primary link must resolve through its DOI`
    );
  }

  for (const [platform, state] of Object.entries(publication.platforms)) {
    check(
      allowedStatuses.has(state.status),
      `${publication.id}: unsupported ${platform} status ${state.status}`
    );
  }
}

const cardStarts = [...html.matchAll(/<div class="publication-card[^>]*>/g)];
const websiteCards = new Map();

cardStarts.forEach((match, index) => {
  const id = match[0].match(/data-publication-id="([^"]+)"/)?.[1];
  const relatedId = match[0].match(/data-related-publication-id="([^"]+)"/)?.[1];
  const end = cardStarts[index + 1]?.index ?? html.length;

  if (relatedId) {
    check(ids.has(relatedId), `Unknown related publication id in research.html: ${relatedId}`);
  }

  if (id) {
    check(!websiteCards.has(id), `Duplicate website publication id: ${id}`);
    websiteCards.set(id, {
      openingTag: match[0],
      block: html.slice(match.index, end)
    });
  }
});

const expectedWebsiteIds = new Set(
  ledger.publications
    .filter(publication => publication.platforms.website.status === 'included')
    .map(publication => publication.platforms.website.cardId)
);

for (const id of websiteCards.keys()) {
  check(expectedWebsiteIds.has(id), `research.html has an untracked publication id: ${id}`);
}

for (const publication of ledger.publications) {
  const website = publication.platforms.website;
  if (website.status !== 'included') {
    continue;
  }

  const card = websiteCards.get(website.cardId);
  check(card, `${publication.id}: website card is missing`);
  if (!card) {
    continue;
  }

  const expectedTitle = website.title || publication.title;
  const expectedVenue = website.venue || publication.citation.venue;
  const expectedYear = publication.canonicalDate.iso.slice(0, 4);
  const cardYear = card.openingTag.match(/data-year="(\d{4})"/)?.[1];

  check(
    textByClass(card.block, 'publication-title') === expectedTitle,
    `${publication.id}: website title differs from the ledger`
  );
  check(
    textByClass(card.block, 'publication-date') === publication.canonicalDate.display,
    `${publication.id}: website date differs from the ledger`
  );
  check(cardYear === expectedYear, `${publication.id}: website data-year differs from the ledger`);
  check(
    textByClass(card.block, 'publication-venue') === expectedVenue,
    `${publication.id}: website venue differs from the ledger`
  );
  check(
    textByClass(card.block, 'publication-institution') === publication.citation.affiliation,
    `${publication.id}: website affiliation differs from the ledger`
  );
  check(
    primaryLink(card.block) === publication.links.primary,
    `${publication.id}: website primary link differs from the ledger`
  );
}

check(
  websiteCards.size === expectedWebsiteIds.size,
  `Expected ${expectedWebsiteIds.size} canonical website records, found ${websiteCards.size}`
);

if (errors.length) {
  console.error('Publication ledger validation failed:');
  errors.forEach(error => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  `Validated ${ledger.publications.length} canonical publication records and ${websiteCards.size} website representations.`
);
