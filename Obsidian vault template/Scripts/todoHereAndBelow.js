const { Shared } = await cJS();

const cleanPath = (path) =>
  path.replace(/^01. Work\/(.*)\/[^/]+$/, "$1").replaceAll("/", " ▸ ");

const currentPageFolder = dv.current().file.folder;
const allTasks = dv.pages(`"${currentPageFolder}"`).file.tasks;
const uncompletedTasks = allTasks.filter((t) => !t.completed);
const dateTasks = uncompletedTasks.filter((t) => t.due);
const noDateTasks = uncompletedTasks.filter((t) => !t.due);

const overdueTasks = dateTasks
  .filter((t) => dv.date(t.due) < dv.date("today"))
  .sort((t) => t.date);
if (overdueTasks.length > 0) {
  dv.header(2, "🚨 Late!");
  dv.taskList(
    overdueTasks.groupBy((task) => {
      return cleanPath(task.link.path);
    }),
    true
  );
  dv.span("---\n");
}

const todayTasks = dateTasks
  .filter((t) => {
    const delay = dv.date(t.due) - dv.date("today");
    return delay === 0;
  })
  .sort((t) => t.date);
if (todayTasks.length > 0) {
  dv.header(2, "📆 Today");
  dv.taskList(
    todayTasks.groupBy((task) => {
      return cleanPath(task.link.path);
    }),
    true
  );
  dv.span("---\n");
}

const nextWeekTasks = dateTasks
  .filter((t) => {
    const delay = dv.date(t.due) - dv.date("today");
    return delay > 0 && delay <= 7 * Shared.DAY_IN_MS;
  })
  .sort((t) => t.date);
if (nextWeekTasks.length > 0) {
  dv.header(2, "⏳ Within a week");
  dv.taskList(
    nextWeekTasks.groupBy((task) => {
      return cleanPath(task.link.path);
    }),
    true
  );
  dv.span("---\n");
}

const laterTasks = dateTasks
  .filter((t) => {
    const delay = dv.date(t.due) - dv.date("today");
    return delay > 7 * Shared.DAY_IN_MS;
  })
  .sort((t) => t.date);
if (laterTasks.length > 0) {
  dv.header(2, "⏳ More than a week away");
  dv.taskList(
    laterTasks.groupBy((task) => {
      return cleanPath(task.link.path);
    }),
    true
  );
  dv.span("---\n");
}

if (noDateTasks.length > 0) {
  dv.header(2, "🤷‍♂️ Task without due date");
  dv.taskList(
    noDateTasks.groupBy((task) => {
      return cleanPath(task.link.path);
    }),
    true
  );
}

if (
  overdueTasks.length === 0 &&
  todayTasks.length === 0 &&
  nextWeekTasks.length === 0 &&
  noDateTasks.length === 0
) {
  dv.header(2, "No task! 🎉");
}
