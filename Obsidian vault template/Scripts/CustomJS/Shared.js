// https://github.com/saml-dev/obsidian-custom-js

class Shared {
  MY_NAME = 'Nicolas Hoizey';
  DAY_IN_MS = 24 * 60 * 60 * 1000;

  beautifyPath(path) {
    return path.replace(/\//g, " ▸ ");
  }

  noteDate(page) {
    const pageNameStart = page.file.name.match(/^(\d{4}-\d{2}-\d{2}) /);
    if (!pageNameStart) {
      return false;
    }

    return dv.date(pageNameStart[1]).ts;
  }

  participantName(participant) {
    return participant.path.replace(/^(.*\/)(.+)(.md)$/, "$2");
  }
}