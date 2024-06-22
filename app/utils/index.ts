export function getInitialsFromEmail(email: string) {
  const username = email.split("@")[0];
  const parts = username.split(/[\._-]/).filter(Boolean);

  let initials =
    parts.length > 1
      ? parts.map((name) => name[0].toUpperCase()).join("")
      : username.substring(0, 2).toUpperCase();

  return initials.substring(0, 2);
}
