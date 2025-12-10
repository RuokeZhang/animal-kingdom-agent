```js
import zooData from '../data/zoology.json';

export const logs = [];
export const feedbackLog = [];

/**
 * Returns a species profile by case-insensitive match on common name.
 */
export function getSpeciesProfile(name) {
  if (!name) return null;
  const lowered = name.toLowerCase();
  const match = zooData.species.find(
    (s) => s.commonName.toLowerCase() === lowered || s.scientificName.toLowerCase() === lowered
  );
  // TODO: implement fuzzy matching or alias mapping for common misspellings
  return match || null;
}

/**
 * Returns relevant knowledge entries matching query tokens.
 */
export function searchKnowledge(query) {
  if (!query) return [];
  const lowered = query.toLowerCase();
  const terms = lowered.split(/\s+/).filter(Boolean);
  const hits = zooData.species.filter((s) =>
    terms.some((t) =>
      s.commonName.toLowerCase().includes(t) ||
      s.scientificName.toLowerCase().includes(t) ||
      s.behavior.toLowerCase().includes(t) ||
      s.diet.toLowerCase().includes(t) ||
      s.distribution.toLowerCase().includes(t)
    )
  );
  // TODO: add vector search or embeddings for semantic retrieval
  return hits.slice(0, 5);
}
```
