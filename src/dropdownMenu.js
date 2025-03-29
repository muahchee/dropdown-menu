export class DropdownMenu {
  constructor(button, menu) {
    this.button = button;
    this.menu = menu;
  }

  create() {
    this.menu.style.visibility = "hidden";

    this.button.addEventListener("click", () => {
      if (this.menu.style.visibility === "hidden") {
        return (this.menu.style.visibility = "visible");
      }

      this.menu.style.visibility = "hidden";
    });
  }
}
