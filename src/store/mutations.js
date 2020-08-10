export const dayBirth = (state, payload) => {
  state.user.dayBirth = payload;
};
export const monthBirth = (state, payload) => {
  state.user.monthBirth = payload;
};
export const yearBirth = (state, payload) => {
  state.user.yearBirth = payload;
};
export const birthday = (state, payload) => {
  state.user.birthday = payload;
};
export const gender = (state, payload) => {
  state.user.gender = payload;
};
export const disability = (state, payload) => {
  state.user.disability = payload;
};
export const disabilities = (state, payload) => {
  if (state.user.disabilities.indexOf(payload) > -1) {
    state.user.disabilities.splice(payload, 1);
  } else {
    state.user.disabilities.push(payload);
  }
};
export const setData = (state, payload) => {
  state.data = payload;
};

export const setQuestions = (state, payload) => {
  state.questions = payload;
};

export const setSelectedItem = ( state, payload ) => {
  state.selected[payload.object] = payload.item
  localStorage.setItem('selected', JSON.stringify(state.selected))
};

export const setUserId = ( state, payload ) => {
  state.user.id = payload
  localStorage.setItem('app_user', JSON.stringify(state.user))
};

export const initialiseStore = (state) => {
  if (localStorage.getItem('app_user')) {
    state.user = JSON.parse(localStorage.getItem('app_user'))
  }
  if (localStorage.getItem('selected')) {
    state.selected = JSON.parse(localStorage.getItem('selected'))
  }
  if (localStorage.getItem('questions')) {
    state.questions = JSON.parse(localStorage.getItem('questions'))
  }
  if (localStorage.getItem('data')) {
    state.data = JSON.parse(localStorage.getItem('data'))
  }
};