/**
 * For general-purpose jobs
 */
export const MAIN_QUEUE = 'main-queue';

export enum MAIN_PROCESSES {
  COLLECT_COLLECTIONS = 'COLLECT_COLLECTIONS',
}

/**
 * Queue for GitHub-related jobs
 */
export const GITHUB_QUEUE = 'github-queue';

export enum GITHUB_PROCESSES {
  DISCOVER_OWNERS_REPO_TERMS = 'DISCOVER_OWNERS_REPO_TERMS',
  DISCOVER_OWNERS_BY_LOCATION = 'DISCOVER_OWNERS_BY_LOCATION',
  EXTRACT_OWNERS = 'EXTRACT_OWNERS',
  EXTRACT_REPOS = 'EXTRACT_REPOS',
  ADD_OWNER = 'ADD_OWNER',
}
// TODO: make these class based instead of enums?
