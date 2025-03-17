---
created: Wednesday, March 12th 2025, 2:55:17 pm
updated: Monday, March 17th 2025, 9:41:42 am
---

This is an heavily opinionated **[Obsidian](https://obsidian.md) vault template** packed with settings, plugins and automations.

# User interface improvements

## Cupertino theme

> [Cupertino](https://github.com/aaaaalexis/obsidian-cupertino) is an Obsidian theme, optimized for **desktop and mobile devices**. Bringing **clean, focused, comfortable** reading and writing experience to your vault.

![[cupertino-theme.png]]

It won the "Best Theme" of Obsidian [Gems of the Year 2024](https://obsidian.md/blog/2024-goty-winners/) awards.

## Iconize

> [Obsidian Iconize](https://florianwoelki.github.io/obsidian-iconize/) is a plugin that let's you “add icons to anything you desire in Obsidian, including files, folders, and text”.

Here's an example of icons added to some folders in the files browser:

![[obsidian-iconize.png#interface|300]]

## Folder Note

> [Folder notes](https://lostpaul.github.io/obsidian-folder-notes/) is a plugin that lets you attach notes to folders so that you can click on the name of a folder to open the note, like in the app [Notion](https://www.notion.so/).

A folder note is created if you  hit <kbd>Alt</kbd> + <kbd>click</kbd> on a folder. This folder note automatically contains a list of tasks from the notes inside this folder and its child folders.

## Waypoint

> [Waypoint](https://github.com/IdreesInc/Waypoint) is an obsidian plugin that gives you the power to generate dynamic MOCs in your folder notes. Enables folders to show up in the graph view and removes the need for messy tags!

The folder note created with the [[#Folder Note]] plugin also contains the list of notes below the folder, without the sub folders that have their own Folder Note.

It helps build a graph better representing the hierarchy of notes.

## Homepage

## File Explorer++

## Mononote

## Colored Tags

## CSS snippets

Obsidian allows using #CSS snippets to change the presentation of different elements in the UI or content. Snippets files should be created in `.obsidian/snippets/` and activated in the “Appearance” screen of the settings.

The default style in Cupertino for selected text is really light grey, so here a `content.css` CSS snippet changes that to `gold` background:

```css
::selection {
  background-color: gold !important;
}
```

# Additional features

## Tasks

## Advanced tables

## Linter

# Automations and data

## Dataview

> [CustomJS](https://github.com/saml-dev/obsidian-custom-js) is a plugin for Obsidian that allows users to write custom Javascript that you can call anywhere you can write JS — including `dataviewjs` blocks and `templater` templates.

## Templater

> [Templater](https://github.com/SilentVoid13/Templater) is a plugin that adds a template language, that lets you insert **variables** and **functions** results into your notes. It will also let you execute JavaScript code manipulating those variables and functions.

It also allows defining default templates for notes created in some folders.

For example, when you create a new note in the [[03. Rolodex/Companies]] or [[03. Rolodex/People]] folders, the relevant [[Template - Company]] and [[Template - People]] templates are used.

A more complex use case is when you create a new note in the [[01. Work]] folder or its sub folders. The [[Template - People or Meeting notes]] template is automatically used, and contains some logic to decide if the note creation is for

- some [[Template - Meeting notes]] because you created the note from scratch in the folder
- or a new [[Template - People]] note, because you clicked a link inside another note from this folder, we guess from the attendees list (maybe not always a safe bet).

## ICS

## Obsidian Custom JS

# Finding help or inspiration

There are multiple resources to find help or inspiration about Obsidian usage:

- The official [documentation](https://docs.obsidian.md/)
- A [Discord server](https://discord.gg/obsidianmd)
- A [forum](https://forum.obsidian.md/)
- A [Subredit](https://www.reddit.com/r/ObsidianMD/)
