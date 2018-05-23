export function saveProfile(profile) {
  localStorage.setItem('profile', JSON.stringify(profile));
}

export function deleteProfile() {
  localStorage.removeItem('profile');
}

export function loadProfile() {
  const item = localStorage.getItem('profile');
  return JSON.parse(item);
}

export default {
  saveProfile,
  deleteProfile,
  loadProfile,
};

