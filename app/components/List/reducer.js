import { Map, List } from 'immutable';

// Mapping WeekDays to Monday to Friday
// Before Sunday = 0, Monday = 1 => Now Monday = 0, Tuesday = 1, Friday = 4
let displayDay = new Date().getDay() - 1;
if (displayDay === -1) {
  displayDay = 0;
} else if (displayDay > 4) {
  displayDay = 4;
}

const initialState = Map({
  room: List([
    Map({}),
  ]),
  review: List([
    Map({
      room: { name: 'testing' },
      createdAt: 'Seed data from client',
      issueList: List([
        Map({
          flagged: true,
          title: 'Some issue one',
          createdAt: 'Nov 15 2016',
        }),
      ]),
    }),
  ]),
  cleaningSchedule: List([]),
  linenSchedule: List([]),
  selectedRoom: Map({}),
  selectedDay: displayDay,
});

const list = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ISSUE':
      return action.store;
    case 'LOAD_ROOM': {
      return state.set('room', action.store);
    }
    case 'LOAD_REVIEW': {
      return state.set('review', action.store);
    }
    case 'LOAD_SCHEMA': {
      return state.set('appSchema', action.store);
    }
    case 'LOAD_ClEANING_SCHEDULE': {
      return state.set('cleaningSchedule', action.store);
    }
    case 'LOAD_LINEN_SCHEDULE': {
      return state.set('linenSchedule', action.store);
    }
    case 'SELECT_ROOM': {
      return state.set('selectedRoom', action.store);
    }
    case 'SELECT_DAY': {
      return state.set('selectedDay', action.store);
    }
    default:
      return state;
  }
};

export default list;
