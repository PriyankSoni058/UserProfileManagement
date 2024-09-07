export const selectUserProfile = (state) => state.userProfile.items || [];

export const selectUserProfileById = (state, id) =>
  state.userProfile.items.find((user) => user._id === id) || {};
