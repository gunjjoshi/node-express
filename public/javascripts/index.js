
      // background letters

      const CHARACTERS =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_=~!@#$%^&*/\|;:?";

      const randomCharacter = () => {
        return CHARACTERS[Math.floor(Math.random() * (CHARACTERS.length - 1))];
      };

      const generateRandomString = (length) => {
        return Array(length).fill().map(randomCharacter).join("");
      };

      const container = document.querySelector(".container");
      const letters = container.querySelector(".letters");

      var mouseTimeout;
      var fadeInterval;

      // fade out characters when mouse stops moving
      const fadeCharacters = () => {
        fadeInterval = setInterval(() => {
          if (parseFloat(letters.style.opacity) > 0) {
            letters.style.opacity = (
              parseFloat(letters.style.opacity) - 0.1
            ).toString();
          } else {
            clearInterval(fadeInterval);
          }
        }, 100);
      };

      // clear fade delays and reset opacity when mouse leaves the screen
      const handleMouseLeave = (e) => {
        clearTimeout(mouseTimeout);
        clearInterval(fadeInterval);
        letters.style.opacity = "0";
      };

      // generate new random string when mouse moves
      const handleMouseMove = (e) => {
        // clear fade delays and set opacity
        clearTimeout(mouseTimeout);
        clearInterval(fadeInterval);
        letters.style.opacity = "0.4";
        // letters.style.height = `calc(${container.style.height} + ${}`;
        // letters.style.height = `${Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight)}px`;

        // get mouse position
        const bounds = container.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = e.clientY - bounds.top - document.body.offsetHeight;
        // console.log(`${e.clientX}, ${e.clientY}`);

        // generate new random string of characters
        const fontSize = Number(
          window
            .getComputedStyle(letters)
            .getPropertyValue("font-size")
            .match(/\d+/)[0]
        );
        const rect = letters.getBoundingClientRect();
        const characterWidth = fontSize / 1.8;
        const characterCount =
          Math.floor(rect.width / characterWidth) *
          Math.floor(rect.height / fontSize);

        // set position for radial gradient
        letters.style.setProperty("--x", `${e.clientX}px`);
        letters.style.setProperty("--y", `${e.clientY}px`);

        letters.innerText = generateRandomString(characterCount);

        // set new fade timeout
        mouseTimeout = setTimeout(() => fadeCharacters(), 400);
      };

      container.onmousemove = (e) => handleMouseMove(e);
      container.ontouchmove = (e) => handleMouseMove(e.touches[0]);
      container.onmouseleave = (e) => handleMouseLeave();

      // button group

      const group = document.querySelector(".btn-group");
      const buttons = group.querySelectorAll("button");
      var buttonGroupSelection = buttons[0].innerText;
      buttons[0].style.borderColor = "var(--primary)";

      const handleButtonGroupSelection = (e) => {
        const target = e.currentTarget;
        buttons.forEach((button) => {
          button.style.borderColor = "rgba(var(--primary-rgb), 0.2)";
        });
        target.style.borderColor = "var(--primary)";
        buttonGroupSelection = target.innerText;
      };

      buttons.forEach((button) => {
        button.onclick = (e) => handleButtonGroupSelection(e);
      });

      // dropdown

      var dropdownOpen = false;
      const dropdown = document.querySelector(".dropdown-header");
      const caret = document.querySelector(".dropdown-caret");
      const options = document.querySelector(".dropdown-items");

      const handleOpenDropdown = () => {
        dropdown.style.borderBottomLeftRadius = "0";
        dropdown.style.borderBottomRightRadius = "0";
        options.style.display = "block";
        caret.innerText = "▲";
        dropdownOpen = true;
      };

      const handleCloseDropdown = () => {
        dropdown.style.borderBottomLeftRadius = "6px";
        dropdown.style.borderBottomRightRadius = "6px";
        options.style.display = "none";
        caret.innerText = "▼";
        dropdownOpen = false;
      };

      container.onclick = (e) => {
        const target = e.target;
        const clickOutside =
          target.className !== "dropdown-header" &&
          target.parentElement.className !== "dropdown-header";
        if (clickOutside && dropdownOpen) handleCloseDropdown();
      };
      dropdown.onclick = () =>
        dropdownOpen ? handleCloseDropdown() : handleOpenDropdown();

      // dropdown selection

      const selection = document.querySelector(".dropdown-selection");
      const items = options.querySelectorAll("li");
      var dropdownSelection = "";

      const handleDropdownSelection = (e) => {
        const target = e.currentTarget;
        items.forEach((item) => {
          item.style.fontWeight = "normal";
        });
        target.style.fontWeight = "bold";
        selection.innerText = target.innerText;
        dropdownSelection = target.innerText;
      };

      items.forEach((item) => {
        item.onclick = (e) => handleDropdownSelection(e);
      });