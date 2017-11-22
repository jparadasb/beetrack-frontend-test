const getInitialState = () => ({
  page: 1,
  limit: 10,
  users: [],
});

const ContactsListReducer = (state = getInitialState(), action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default ContactsListReducer;
