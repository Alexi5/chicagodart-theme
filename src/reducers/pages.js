import axios from 'axios';

const initialState = {};

// constants
const LOAD_PAGES = 'LOAD_PAGES';

// actions creators
const receivePages = pages => ({
  type: LOAD_PAGES,
  pages
});

export const loadPages = () => dispatch =>
    axios.get('http://chicagodart.azurewebsites.net/wp-json/wp/v2/pages')
      .then(data => data)
      .then(pages => dispatch(receivePages(pages.data)))
      .catch(err => console.error(err));

// reducer
const pagesReducer = (prevState = initialState, action) => {
  switch (action.type) {
    case LOAD_PAGES:
      return action.pages.reduce((result, curr) => {
        result[curr.slug] = curr;
        return result;
      }, {});
    default:
      return prevState;
  }
};

export default pagesReducer;
