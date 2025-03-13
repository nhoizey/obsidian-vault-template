---
created: Wednesday, March 12th 2025, 2:32:18 pm
updated: Thursday, March 13th 2025, 9:49:33 am
---
# Work

## TODOs

> [!warning] Late
>
> ```dataviewjs
> await dv.view("Scripts/todoForPathShort", { path: '01. Work', max: -1 });
> ```

> [!todo] Today
>
> ```dataviewjs
> await dv.view("Scripts/todoForPathShort", { path: '01. Work', min: 0, max: 0 });
> ```

> [!todo] Within a week
>
> ```dataviewjs
> await dv.view("Scripts/todoForPathShort", { path: '01. Work', min: 1, max: 7 });
> ```

- [[01. Work|All TODOs]]

## Informations

  ### 🏦 Current missions

```dataview
LIST
FROM "01. Work/01. Missions" AND !"01. Work/01. Missions/z. Archives"
WHERE file.folder
FLATTEN list(split(file.folder, "/")) as folderParts
GROUP BY folderParts[2] + " ▸ " + folderParts[3] as mission
```

### 🗄️ Latest updates

`$=dv.list(dv.pages('"01. Work"').filter(f=>!["TODO", "Log"].includes(f.file.name)).sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`

# Personal

## TODOs

> [!warning] Late
>
> ```dataviewjs
> await dv.view("Scripts/todoForPathShort", { path: '02. Personal', max: -1 });
> ```

> [!todo] Today
>
> ```dataviewjs
> await dv.view("Scripts/todoForPathShort", { path: '02. Personal', min: 0, max: 0 });
> ```

> [!todo] Within a week
>
> ```dataviewjs
> await dv.view("Scripts/todoForPathShort", { path: '02. Personal', min: 1, max: 7 });
> ```

## Informations

### ✍️ Projects

```dataview
LIST
FROM "02. Personal/Projects"
WHERE file.folder
WHERE file.name != "Projects"
GROUP BY regexreplace(file.folder, ".*\/([^\/]+)$", "$1") AS Project
SORT Project DESC
```

### 🗄️ Latest updates

 `$=dv.list(dv.pages('"02. Personal"').filter(f=>!["TODO", "Log"].includes(f.file.name)).sort(f=>f.file.mtime.ts,"desc").limit(5).file.link)`
