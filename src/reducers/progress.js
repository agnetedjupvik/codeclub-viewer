export function handleCheck(state, path, subtaskID){
  if(path == null || subtaskID == null) return state;

  const subtasks = state.lessons[path].progress;
  const checked = subtasks.subtaskID;
  return {
    ...state,
    [subtasks.subtaskID]: !checked
  };
}
