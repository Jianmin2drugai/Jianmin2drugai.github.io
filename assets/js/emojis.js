fetch('/assets/emojis.json')
  .then(response => response.json())
  .then(emojis => {
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const emojiPattern = /:([a-z0-9_]+):/g;

    let currentNode;
    while (currentNode = textNodes.nextNode()) {
      let originalText = currentNode.nodeValue;
      let fragment = document.createDocumentFragment();
      let lastIndex = 0;
      let match;

      while ((match = emojiPattern.exec(originalText)) !== null) {
        const [fullMatch, emojiName] = match;
        const emojiUrl = emojis[emojiName];

        if (emojiUrl) {
          fragment.appendChild(document.createTextNode(originalText.slice(lastIndex, match.index)));

          const img = document.createElement('img');
          img.src = emojiUrl;
          img.alt = emojiName;
          img.style.width = '1em';
          img.style.height = '1em';
          img.style.verticalAlign = 'middle';
          fragment.appendChild(img);

          lastIndex = emojiPattern.lastIndex;
        }
      }

      fragment.appendChild(document.createTextNode(originalText.slice(lastIndex)));
      currentNode.parentNode.replaceChild(fragment, currentNode);
    }
  })
  .catch(error => console.error('Error fetching emojis:', error));
