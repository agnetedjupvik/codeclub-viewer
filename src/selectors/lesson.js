import {createSelector} from 'reselect';
import {tagsMatchFilter} from '../util';

const getLessons = (state, courseName = '') => {
  return Object.keys(state.lessons).reduce((res, lessonPath) => {
    return lessonPath.startsWith('./' + courseName) ? {...res, [lessonPath]: state.lessons[lessonPath]} : res;
  }, {});
};
const getFilter = (state) => state.filter;

/**
 * Creates an object containing lessons that have tags matching the filter
 * Input props: courseName (string, optional)
 */
export const getFilteredLessons = createSelector(
  [getFilter, getLessons],
  (filter = {}, lessons = {}) => {

    return Object.keys(lessons).reduce((res, lessonKey) => {
      const lesson = lessons[lessonKey];
      if (tagsMatchFilter(lesson.tags, filter)) res[lessonKey] = lesson;
      return res;
    }, {});

  }
);

/**
 * Creates an object containing indexed lessons that have tags matching the filter
 * Input props: courseName (string, optional)
 */
export const getFilteredAndIndexedLessons = createSelector(
  [getFilteredLessons],
  (filteredLessons = {}) => {
    return Object.keys(filteredLessons).reduce((res, lessonPath) => {
      const lesson = filteredLessons[lessonPath];
      return lesson.indexed ? {...res, [lessonPath]: lesson} : res;
    }, {});
  }
);

export const getAvailableLessons = createSelector(
  [getFilteredLessons],
  (filteredLessons = {}) => {
    const availableAndroidLessons = 0;

    return Object.keys(filteredLessons).reduce((sum, lessonKey) => {
      const lesson = lessons[lessonKey];
      'android' in lesson.tags.operativsystem ? availableAndroidLessons++ : null;
    }, 0);
  }
);


{
  android: 10,
  arduino: 5,
  windows: 8
}
