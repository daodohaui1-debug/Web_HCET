const CACHE_DURATION = 30 * 60 * 1000;
const CACHE_PREFIX = "hcet-course-cache";

const getKey = (type, email, id = "") =>
  `${CACHE_PREFIX}:${type}:${String(email).toLowerCase()}:${id}`;

export const readCourseCache = (type, email, id = "") => {
  try {
    const rawValue = localStorage.getItem(getKey(type, email, id));
    if (!rawValue) return null;
    const cached = JSON.parse(rawValue);
    if (!cached.savedAt || Date.now() - cached.savedAt > CACHE_DURATION) {
      localStorage.removeItem(getKey(type, email, id));
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
};

export const writeCourseCache = (type, email, data, id = "") => {
  try {
    localStorage.setItem(
      getKey(type, email, id),
      JSON.stringify({ data, savedAt: Date.now() })
    );
  } catch {
    // Fall back to the API when browser storage is unavailable.
  }
};

export const readLastLesson = (email, courseId) => {
  const value = localStorage.getItem(getKey("last-lesson", email, courseId));
  return value ? Number(value) : null;
};

export const writeLastLesson = (email, courseId, lessonId) => {
  localStorage.setItem(getKey("last-lesson", email, courseId), String(lessonId));
};
