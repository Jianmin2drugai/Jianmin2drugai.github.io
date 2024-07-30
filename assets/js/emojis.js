fetch('/assets/emojis.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(emojis => {
    console.log('Emojis fetched successfully:', emojis);

    const textNodes = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const emojiPattern = /:([a-z0-9_+\-]+):/g;

    const specialCases = {
      '+1': emojis['+1'],
      '-1': emojis['-1']
    };

    let currentNode;
    while (currentNode = textNodes.nextNode()) {
      let originalText = currentNode.nodeValue;
      console.log('Processing text node:', originalText);

      // Replace standard emoji codes :emoji:
      let match;
      let replacedText = '';
      let lastIndex = 0;
      while ((match = emojiPattern.exec(originalText)) !== null) {
        const [fullMatch, emojiName] = match;
        const emojiUrl = emojis[emojiName];
        console.log('Found match:', fullMatch, 'with emoji name:', emojiName, 'and URL:', emojiUrl);

        if (emojiUrl) {
          replacedText += originalText.slice(lastIndex, match.index);
          replacedText += `<img src="${emojiUrl}" alt="${emojiName}" style="width: 1em; height: 1em; vertical-align: middle;" class="emoji">`;
          lastIndex = emojiPattern.lastIndex;
        } else {
          console.warn('Emoji not found for:', emojiName);
        }
      }
      replacedText += originalText.slice(lastIndex);

      // Replace special cases like +1 and -1
      Object.keys(specialCases).forEach(caseKey => {
        const casePattern = new RegExp(`\\b${caseKey.replace('+', '\\+')}\\b`, 'g');
        replacedText = replacedText.replace(casePattern, match => {
          console.log('Found special case:', match);
          return `<img src="${specialCases[caseKey]}" alt="${caseKey}" style="width: 1em; height: 1em; vertical-align: middle;" class="emoji">`;
        });
      });

      // Create a fragment and replace the text node
      const fragment = document.createDocumentFragment();
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = replacedText;
      while (tempDiv.firstChild) {
        fragment.appendChild(tempDiv.firstChild);
      }
      currentNode.parentNode.replaceChild(fragment, currentNode);
    }
  })
  .catch(error => console.error('Error fetching emojis:', error));
