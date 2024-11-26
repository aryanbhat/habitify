export function handlePseudoAnchor(link: string, newWindow: boolean) {
  const a: HTMLAnchorElement = document.createElement("a");
  a.href = link;
  a.target = newWindow ? "_blank" : "_self";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
