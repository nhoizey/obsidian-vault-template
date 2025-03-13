/* ********************************************************** */
// CONFIGURATION
/* ********************************************************** */

const MY_NAME = "Nicolas Hoizey"; // Should match the name in the people note
const REMOVE_ME_FROM_ATTENDEES = true;
const NOTICE_DURATION = 10000; // 10 seconds

/* ********************************************************** */
// END OF CONFIGURATION
/* ********************************************************** */

const titleCase = (str) => {
  return str.trim().toLowerCase().replace(/(^|[ -])\w/g, (match) => match.toUpperCase());
}

const cleanName = (str) => {
  return titleCase(str).replace(/\([^)]*\)/g, '').trim();
};

const now = Date.now();

async function peopleOrMeeting(tp) {
  const currentFolder = await tp.file.folder(true);
  const initialFile = await tp.file.find_tfile(tp.file.path(true));
  const currentTitle = initialFile.basename;
  const currentDate = tp.date.now("YYYY-MM-DD");

  if (currentTitle !== 'Untitled') {
    /* ********************************************************** */
    // This is (probably) a people note, not a meeting note
    /* ********************************************************** */

    // Create a new file with the "People" template
    await tp.file.create_new(tp.file.find_tfile("Template - People"), currentTitle, true, "03. Rolodex/People");
  } else {

    /* ********************************************************** */
    // This is a new meeting note
    /* ********************************************************** */

    new Notice("⏳ Please wait, trying to get meeting info from the calendar…", NOTICE_DURATION);

    // Get events from the calendar
    const beforeCalendarEvents = Date.now();
    const calendarEvents = await app.plugins.getPlugin('ics').getEvents(currentDate);
    const afterCalendarEvents = Date.now();
    console.log(`Getting events from the calendar took ${(afterCalendarEvents - beforeCalendarEvents)/1000} seconds`);

    const relevantEvents = [];
    calendarEvents.map(event => {
      // const attendees = event.attendees.filter(attendee => attendee.type === 'INDIVIDUAL');

      // Only keep events in progress
      event.start = moment(event.time, "kk:mm").valueOf();
      event.end = moment(event.endTime, "kk:mm").valueOf();
      if (event.end < event.start) {
        // The event ends the next day
        event.end += 24 * 60 * 60 * 1000;
      }
      if ((now >= event.start) && (now <= event.end)) {
        relevantEvents.push(event);
      }
    });

    if (relevantEvents.length === 0) {
      new Notice(`📆 Couldn't find any event…`, NOTICE_DURATION);

      // Create a new file with the "Meeting notes" template
      await tp.file.create_new(tp.file.find_tfile("Template - Meeting notes"), `${currentDate} Unknown meeting…`, true, currentFolder);
    } else {
      new Notice(`📆 Found ${relevantEvents.length} event${relevantEvents.length > 1 ? 's' : ''}…`, NOTICE_DURATION);

      // Take the shortest event 🤷‍♂️
      // TODO: replace with a prompt to choose the event
      relevantEvents.sort((a, b) => {
        const aDuration = a.end - a.start;
        const bDuration = b.end - b.start;
        return aDuration - bDuration;
      });
      const event = relevantEvents[0];

      const title = event.summary.replace(/[:/#]/g, '-').replace('TR - ', '');

      new Notice(`👥 Retrieving the list of attendees for event: ${title}…`, NOTICE_DURATION);
      // Retrieve all known email addresses for people Notes
      const peopleByEmail = {};
      const peopleNames = [];
      const peopleNotes = await tp.app.plugins.plugins.dataview.api.pages('"03. Rolodex/People"');
      for (const people of peopleNotes) {
        if (people.emails) {
          for (const email of people.emails) {
            peopleByEmail[email.toLowerCase()] = people.file.name;
          }
        } else {
          peopleNames.push(people.file.name);
        }
      }

      // Build the list of attendees to add to the frontmatter
      const attendees = new Set();
      for(const attendee of event.attendees) {
        if (attendee.type !== 'INDIVIDUAL') {
          continue;
        }
        const emailAddress = attendee.email.toLowerCase();
        if (peopleByEmail[emailAddress]) {
          if (!REMOVE_ME_FROM_ATTENDEES || peopleByEmail[emailAddress] !== MY_NAME) {
            attendees.add(`[[${peopleByEmail[emailAddress]}]]`);
          }
        } else {
          const attendeeName = cleanName(attendee.name);
          const reversedAttendeeName = attendeeName.replace(/^([^ ]+) ([^ ]+)$/g, "$2 $1");

          if (attendeeName.length > 0) {
            if (peopleNames.includes(attendeeName)) {
              attendees.add(`[[${attendeeName}]]`);
            } else if (peopleNames.includes(reversedAttendeeName)) {
              attendees.add(`[[${reversedAttendeeName}]]`);
            } else {
              attendees.add(`[[${attendeeName} <${emailAddress}>]]`);
            }
          } else {
            attendees.add(`[[${emailAddress}]]`);
          }
        }
      }

      new Notice(`👥 Found ${attendees.size} attendee${attendees.size > 1 ? 's' : ''}…`, NOTICE_DURATION);

      // Build the title of the new note
      // TODO: replace with a prompt to choose to open an existing note or change the title
      let newNoteTitle = `${currentDate} ${title}`;
      let increment = 1;
      while (await tp.file.exists(`${currentFolder}/${newNoteTitle}.md`)) {
        increment++;
        newNoteTitle = `${currentDate} ${title} ${increment}`;
      }

      // Create a new file with the "Meeting notes" template
      await tp.file.create_new(tp.file.find_tfile("Template - Meeting notes"), newNoteTitle, true, currentFolder);

      await tp.app.fileManager.processFrontMatter(await tp.file.find_tfile(newNoteTitle), (frontmatter) => {
        frontmatter.attendees = Array.from(attendees);
      });
    }
  }
  // Delete initial file
  await tp.app.vault.adapter.trashLocal(initialFile.path);
}

module.exports = peopleOrMeeting;