const todoForPathShort = ({ path = "/", min = -9999, max = 9999 } = {}) => {
  const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

  const allTasks = dv.pages(`"${path}"`).file.tasks;
  const uncompletedTasks = allTasks.filter((t) => !t.completed);
  const dateTasks = uncompletedTasks.filter((t) => t.due);

  const tasks = dateTasks
    .filter((t) => {
      const delay = dv.date(t.due) - dv.date("today");
      return (
        delay >= min * MILLISECONDS_PER_DAY &&
        delay <= max * MILLISECONDS_PER_DAY
      );
    })
    .sort((t) => t.date);
  if (tasks.length > 0) {
    dv.taskList(tasks, false);
  } else {
    dv.paragraph("No task! 🎉");
  }
};

todoForPathShort(input);
