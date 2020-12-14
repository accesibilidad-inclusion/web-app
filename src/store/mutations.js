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

export const setCategories = (state, payload) => {
  state.categories = payload;
};

export const setQuestions = (state, payload) => {
  state.questions = payload;
};

export const setPictos = (state, payload) => {
  state.pictos = payload;
};

export const setProposalPictos = (state, payload) => {
  state.proposalPictos = payload;
};

export const setSelectedItem = (state, payload) => {
  state.selected[payload.object] = payload.item;
  localStorage.setItem('selected', JSON.stringify(state.selected));
};

export const setUserId = (state, payload) => {
  state.user.id = payload;
  localStorage.setItem('app_user', JSON.stringify(state.user));
};

export const tutorialOnboarding = (state, payload) => {
  state.tutorial.onboarding = false;
  localStorage.setItem('tutorial.onboarding', JSON.stringify(state.tutorial.onboarding));
};

export const tutorialEvaluation = (state, payload) => {
  state.tutorial.evaluation = false;
  localStorage.setItem('tutorial.evaluation', JSON.stringify(state.tutorial.evaluation));
};

export const tutorialPlace = (state, payload) => {
  state.tutorial.place = false;
  localStorage.setItem('tutorial.place', JSON.stringify(state.tutorial.place));
};

export const tutorialTask = (state, payload) => {
  state.tutorial.task = false;
  localStorage.setItem('tutorial.task', JSON.stringify(state.tutorial.task));
};

export const tutorialPictogram = (state, payload) => {
  state.tutorial.pictogram = false;
  localStorage.setItem('tutorial.pictogram', JSON.stringify(state.tutorial.pictogram));
};

export const cleanTutorials = (state, payload) => {
  state.tutorial.onboarding = true;
  state.tutorial.evaluation = true;
  state.tutorial.place = true;
  state.tutorial.task = true;
  state.tutorial.pictogram = true;
  localStorage.setItem('tutorial.onboarding', JSON.stringify(state.tutorial.onboarding));
  localStorage.setItem('tutorial.evaluation', JSON.stringify(state.tutorial.evaluation));
  localStorage.setItem('tutorial.place', JSON.stringify(state.tutorial.place));
  localStorage.setItem('tutorial.task', JSON.stringify(state.tutorial.task));
  localStorage.setItem('tutorial.pictogram', JSON.stringify(state.tutorial.pictogram));
};

export const initializeStore = (state) => {
  if (localStorage.getItem('app_user')) {
    state.user = JSON.parse(localStorage.getItem('app_user'));
  }
  if (localStorage.getItem('tutorial.onboarding')) {
    state.tutorial.onboarding = JSON.parse(localStorage.getItem('tutorial.onboarding'));
  }
  if (localStorage.getItem('tutorial.evaluation')) {
    state.tutorial.evaluation = JSON.parse(localStorage.getItem('tutorial.evaluation'));
  }
  if (localStorage.getItem('tutorial.place')) {
    state.tutorial.place = JSON.parse(localStorage.getItem('tutorial.place'));
  }
  if (localStorage.getItem('tutorial.task')) {
    state.tutorial.task = JSON.parse(localStorage.getItem('tutorial.task'));
  }
  if (localStorage.getItem('tutorial.pictogram')) {
    state.tutorial.pictogram = JSON.parse(localStorage.getItem('tutorial.pictogram'));
  }
  if (localStorage.getItem('selected')) {
    state.selected = JSON.parse(localStorage.getItem('selected'));
  }
  if (localStorage.getItem('questions')) {
    state.questions = JSON.parse(localStorage.getItem('questions'));
  }
  if (localStorage.getItem('pictos')) {
    state.pictos = JSON.parse(localStorage.getItem('pictos'));
  }
  if (localStorage.getItem('categories')) {
    state.categories = JSON.parse(localStorage.getItem('categories'));
  }
};
