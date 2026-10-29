/** Breed names only: related health conditions are deliberately not synonyms. */
export const SEARCH_ALIASES = [
  {
    token: "synbreed101x",
    label: "Französische Bulldogge",
    pattern:
      "(?:franz(?:ösisch|oesisch|osisch)(?:e[rmns]?)?|french)[ -]+bulldog(?:ge[nr]?)?s?|french(?:ie|y)s?",
  },
  {
    token: "synbreed149x",
    label: "Englische Bulldogge",
    pattern: "(?:englisch(?:e[rmns]?)?|english)[ -]+bulldog(?:ge[nr]?)?s?",
  },
  {
    token: "synbreed253x",
    label: "Mops",
    pattern: "m(?:ö|oe|o)pse?n?|mops|pugs?",
  },
  {
    token: "synbreed148x",
    label: "Dackel",
    pattern: "dackel[n]?|dachshund[s]?|teckel[n]?",
  },
  {
    token: "synbreed166x",
    label: "Deutscher Schäferhund",
    pattern:
      "deutsch(?:e[rmns]?)?[ -]+sch(?:ä|ae|a)ferhund(?:e[n]?)?|german[ -]+shepherd(?:[ -]+dog)?s?",
  },
  {
    token: "synbreed235x",
    label: "Deutsche Dogge",
    pattern: "deutsch(?:e[rmns]?)?[ -]+dogge[n]?|great[ -]+danes?",
  },
  {
    token: "synbreed160x",
    label: "Irischer Wolfshund",
    pattern:
      "irisch(?:e[rmns]?)?[ -]+wolfshund(?:e[n]?)?|irish[ -]+wolfhounds?",
  },
  {
    token: "synbreed1x",
    label: "English Pointer",
    pattern: "(?:englisch(?:e[rmns]?)?|english)[ -]+pointers?",
  },
] as const;

export const aliasPattern = (pattern: string) =>
  new RegExp(`(?<![\\p{L}\\p{N}])(?:${pattern})(?![\\p{L}\\p{N}])`, "giu");

export const resolveSearchQuery = (query: string) => {
  let term = query.trim();
  const aliases: (typeof SEARCH_ALIASES)[number][] = [];
  for (const alias of SEARCH_ALIASES) {
    const pattern = aliasPattern(alias.pattern);
    if (!pattern.test(term)) continue;
    aliases.push(alias);
    term = term.replace(aliasPattern(alias.pattern), alias.token);
  }
  return { term, aliases };
};
