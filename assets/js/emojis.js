fetch('/assets/emojis.json')
  .then(response => response.json())
  .then(emojis => {
    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const emojiPattern = /:([a-z0-9_]+):/g;

    let currentNode;
    while (currentNode = textNodes.nextNode()) {
      let originalText = currentNode.nodeValue;
      let fragment = document.createDocumentFragment();
      let match;
      let lastIndex = 0;

      while (match = emojiPattern.exec(originalText)) {
        const [fullMatch, emojiName] = match;
        const emojiUrl = emojis[emojiName];
        if (emojiUrl) {
          // Append text before the emoji
          fragment.appendChild(document.createTextNode(originalText.slice(lastIndex, match.index)));

          // Create and append the emoji image
          const img = document.createElement('img');
          img.src = emojiUrl;
          img.alt = emojiName;
          img.style.width = '1em';
          img.style.height = '1em';
          fragment.appendChild(img);

          // Update the lastIndex to the end of the match
          lastIndex = emojiPattern.lastIndex;
        }
      }
      
      // Append the remaining text after the last emoji
      fragment.appendChild(document.createTextNode(originalText.slice(lastIndex)));
      
      // Replace the original text node with the fragment
      currentNode.parentNode.replaceChild(fragment, currentNode);
    }
  });
