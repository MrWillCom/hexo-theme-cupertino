(() => {
  const f = () => {
    try {
      document.getElementById(
        "tidio-chat-iframe"
      ).contentDocument.documentElement.style.colorScheme = "light dark";
    } catch (error) {}

    if (
      document.getElementById("tidio-chat-iframe")?.contentDocument
        ?.documentElement?.style?.colorScheme !== "light dark"
    ) {
      setTimeout(f, 250);
    }
  };

  f();
})();
