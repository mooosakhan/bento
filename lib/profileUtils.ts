/**
 * Generates a URL-friendly handle from a display name
 * @param displayName - The user's display name
 * @returns A normalized handle (lowercase, no spaces/special chars)
 */
export function generateHandle(displayName: string): string {
  return displayName
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric chars
    .slice(0, 30) // Limit length
    || 'myprofile'; // Fallback if empty
}

/**
 * Gets the profile from localStorage
 */
export function getProfile() {
  if (typeof window === 'undefined') return null;
  
  const saved = localStorage.getItem('bento-profile');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse profile:', e);
    }
  }
  return null;
}

/**
 * Saves the profile to localStorage
 */
export function saveProfile(profile: any) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bento-profile', JSON.stringify(profile));
}

/**
 * Gets a profile by handle from localStorage
 */
export function getProfileByHandle(handle: string) {
  const profile = getProfile();
  if (profile && profile.handle === handle) {
    return profile;
  }
  return null;
}
