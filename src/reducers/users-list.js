const getInitialState = () => ({
  page: 1,
  limit: 10,
  users: [],
});

const UsersListReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default UsersListReducer;
