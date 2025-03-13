// Get incomming links
const inlinks = dv.current().file.inlinks;

// Get the list of Clients/Missions
const missions = await dv
	.pages('"01. Work/01. Missions"')
	.where((p) => p.type === "meeting" && inlinks.includes(p.file.link))
	.groupBy((p) =>
		p.file.path
			.replace(/^01\. Work\/01\. Missions\/(.*)\/[^/]+$/, "$1")
			.replace("/", " ▸ "),
	)
	.sort((group) => group, "asc");

// New version based on folders/files
for (const group of missions) {
	dv.header(2, group.key);
	dv.table(
		["Meeting", "Summary"],
		group.rows
			.sort((k) => k.file.name, "desc")
			.map((k) => [k.file.link, k.summary]),
	);
}
