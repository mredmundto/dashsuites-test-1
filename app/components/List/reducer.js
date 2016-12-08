import { Map, List } from 'immutable';

// Mapping WeekDays to Monday to Friday
// Before Sunday = 0, Monday = 1 => Now Monday = 0, Tuesday = 1, Friday = 4
// let displayDay = new Date('2016-11-30').getDay() - 1;
let displayDay = new Date().getDay() - 1;
if (displayDay === -1) {
  displayDay = 0;
} else if (displayDay > 4) {
  displayDay = 4;
}
const initialState = Map({
  roomParam: Map({}),
  cleaningSchedule: List([]),
  linenSchedule: List([]),
  selectedDay: displayDay,
});

const list = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOM_PARAM':
      return state.setIn(['roomParam', action.key], action.value);
    case 'DELETE_ROOM_PARAM':
      return state.deleteIn(['roomParam', action.key]);
    case 'LOAD_SCHEMA':
      return state.set('appSchema', action.store);
    case 'LOAD_ClEANING_SCHEDULE':
      return state.set('cleaningSchedule', action.store);
    case 'LOAD_LINEN_SCHEDULE':
      return state.set('linenSchedule', action.store);
    case 'SELECT_DAY':
      return state.set('selectedDay', action.store);
    default:
      return state;
  }
};

export default list;
