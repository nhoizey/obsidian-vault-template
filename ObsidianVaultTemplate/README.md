---
created: Wednesday, March 12th 2025, 2:55:17 pm
updated: Wednesday, March 19th 2025, 2:06:23 pm
---

This is an heavily opinionated **[Obsidian](https://obsidian.md) vault template** packed with settings, plugins and automations.

# User interface improvements

## Cupertino theme

> [Cupertino](https://github.com/aaaaalexis/obsidian-cupertino) is an Obsidian #theme, optimized for **desktop and mobile devices**. Bringing **clean, focused, comfortable** reading and writing experience to your vault.

![[cupertino-theme.png]]

It won the "Best Theme" of Obsidian [Gems of the Year 2024](https://obsidian.md/blog/2024-goty-winners/) awards.

## Iconize plugin

> [Obsidian Iconize](https://florianwoelki.github.io/obsidian-iconize/) is a plugin that let's you “add icons to anything you desire in Obsidian, including files, folders, and text”.

Here's an example of #icons added to some folders in the files browser:

![[obsidian-iconize.png#interface|300]]

## Folder Note plugin

> [Folder notes](https://lostpaul.github.io/obsidian-folder-notes/) is a plugin that lets you attach notes to folders so that you can click on the name of a folder to open the note, like in the app [Notion](https://www.notion.so/).

A folder note is created if you  hit <kbd>Alt</kbd> + <kbd>click</kbd> on a folder. This folder note automatically contains a list of #tasks from the notes inside this folder and its child folders.

## Waypoint plugin

> [Waypoint](https://github.com/IdreesInc/Waypoint) is a plugin that gives you the power to generate dynamic MOCs in your folder notes. Enables folders to show up in the graph view and removes the need for messy tags!

The folder note created with the [[#Folder Note]] plugin also contains the list of notes below the folder, without the sub folders that have their own Folder Note.

It helps build a #graph better representing the hierarchy of notes.

## Homepage plugin

> [Homepage](https://github.com/mirnovov/obsidian-homepage) is a plugin that opens a specified note, canvas, or workspace on startup, instead of the most recent one.

It is configured to open the [[Home]] note on startup (or when there is no open note anymore) in reading view mode.

## File Explorer++ plugin

> [File Explorer++](https://github.com/kelszo/obsidian-file-explorer-plus) is a plugin that enables the ability to hide and pin specific files and folders in the file explorer by applying custom filters.

It is configured to pin:

- the [[Home]] note to the top of the files explorer
- any note named `TODO` to the top of its parent folder

It also hides 3 special folders:

- `/Templates/` contains the templates
- `/Scripts/` contains all JavaScript files used by the [[#Dataview]], [[#Templater]] and [[#Custom JS]] plugins
- `*/attachments/` are subfolders where uploads are stored for notes in the parent folder

## Mononote plugin

> [Mononote](https://github.com/czottmann/obsidian-mononote) is a plugin that ensures each note occupies only one tab. If a note is already open, its existing tab will be focussed instead of opening the same file in the current tab.

## Colored Tags plugin

> [Colored Tags](https://github.com/pfrankov/obsidian-colored-tags) is a plugin that colorizes #tags in different #colors. Colors of nested tags are mixed with the root tag to improve #readability.

## CSS snippets

Obsidian allows using #CSS snippets to change the presentation of different elements in the UI or content. Snippets files should be created in `.obsidian/snippets/` and activated in the “Appearance” screen of the settings.

The default style in Cupertino for selected text is really light grey, so here a `content.css` CSS snippet changes that to `gold` background:

```css
::selection {
  background-color: gold !important;
}
```

# Additional features

## Tasks plugin

> [Tasks]() is a plugin that tracks tasks across the entire Obsidian vault. Query them and mark them as done wherever you want. Supports due dates, recurring tasks (repetition), done dates, sub-set of checklist items, and filtering.

Open #tasks with due dates are automatically listed on the [[Home]] note thanks to [[#Dataview plugin]] queries.

## Advanced tables plugin

> [Advanced tables](https://github.com/tgrosinger/advanced-tables-obsidian) is a plugin that provides improved table navigation, formatting, and manipulation.

## Linter plugin

> [Linter](https://platers.github.io/obsidian-linter/) is a plugin that formats and styles notes with a focus on configurability and extensibility.

Some configuration of the plugin activated here:

- add and update `created` and `updated` fields in every note metadata (aka #YAML Front Matter)
- alphabetically sort values of array metadata (for example `attendees` in #meeting notes)

# Automations and data

## Dataview plugin

> [Dataview]() is a plugin that maintains a live index and query engine over your personal knowledge base. You can add metadata to your notes and #query them with the Dataview Query Language to list, filter, sort or group your data.

Queries can be made with the SQL-like [Dataview Query Language](https://blacksmithgu.github.io/obsidian-dataview/queries/structure/) or more advanced [JavaScript API](https://blacksmithgu.github.io/obsidian-dataview/api/intro/).

### DQL example (`dataview`)

For example, here's the DQL code for the list of missions on the [[Home]] note:

```sql
LIST
FROM "01. Work/01. Missions" AND !"01. Work/01. Missions/z. Archives"
WHERE file.folder
FLATTEN list(split(file.folder, "/")) as folderParts
GROUP BY folderParts[2] + " ▸ " + folderParts[3] as mission
```

### JavaScript example (`dataviewjs`)

And here's the more elaborate JavaScript for the list of personal projects on the same note:

```javascript
dv.list(
	app.vault.getFiles()
	.filter(
		file =>
			file.parent.parent != null
				&& file.parent.parent.path == "02. Personal/Projects"
				&& file.name == file.parent.name +".md"
	)
	.sort((a, b) => a.name.localeCompare(b.name))
	.map(file => dv.fileLink(file.path))
)
```

Just adding `dataview` or `dataviewjs` right after the 3 back quotes (on the same line) in these code samples makes them run live.

### External JavaScript file

The JavaScript code for even more advanced examples can be [externalized](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/#dvviewpath-input) for re-use and easier management. It also allows using standard JavaScript tooling such as [Biome](https://biomejs.dev/), a code linter and formater.

For example, the code for #tasks lists in the [[Home]] note is in an external file located at `/Scripts/todoForPathShort.js`.

## Templater plugin

> [Templater](https://github.com/SilentVoid13/Templater) is a plugin that adds a template language, that lets you insert **variables** and **functions** results into your notes. It will also let you execute JavaScript code manipulating those variables and functions.

It also allows defining default templates for notes created in some folders.

For example, when you create a new note in the [[03. Rolodex/Companies]] or [[03. Rolodex/People]] folders, the relevant [[Template - Company]] and [[Template - People]] templates are used.

A more complex use case is when you create a new note in the [[01. Work]] folder or its sub folders. The [[Template - People or Meeting notes]] template is automatically used, and contains some logic to decide if the note creation is for

- some [[Template - Meeting notes]] because you created the note from scratch in the folder
- or a new [[Template - People]] note, because you clicked a link inside another note from this folder, we guess from the attendees list (maybe not always a safe bet).

## ICS plugin

> [ICS](https://github.com/cloud-atlas-ai/obsidian-ics) is a plugin that adds events from calendar/ics URLs to your Daily Note on demand.

It is used here “only” to request a remote #ICS file from a #calendar, to find the title and list of attendees of current event, to initialize a #meeting note with a [[#Templater plugin]] dynamic template.

> [!warning] Add your own ICS URL
> You have to add your own calendar #ICS URL to the plugin settings.
> Here's for example [how to get the “Secret address in iCal format” for a Google Calendar](https://support.google.com/calendar/answer/37648?hl=en&sjid=9556975173730557749-EU#zippy=%2Cget-your-calendar-view-only).

## Custom JS plugin

> [CustomJS](https://github.com/saml-dev/obsidian-custom-js) is a plugin that allows users to write custom Javascript that you can call anywhere you can write JS — including `dataviewjs` blocks and `templater` templates.

These scripts are stored in the `/Scripts/CustomJS/` folder.

# Finding help or inspiration

There are multiple resources to find help or inspiration about Obsidian usage:

- The official [documentation](https://docs.obsidian.md/)
- A [Discord server](https://discord.gg/obsidianmd)
- A [forum](https://forum.obsidian.md/)
- A [Subredit](https://www.reddit.com/r/ObsidianMD/)
