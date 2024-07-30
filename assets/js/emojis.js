fetch('/assets/emojis.json') // Adjust the path as needed
  .then(response => response.json())
  .then(emojis => {
    const emojiContainer = document.getElementById('emoji-container');
    const emojiName = 'smile'; // Replace with desired emoji name
    const emojiUrl = emojis[emojiName];
    if (emojiUrl) {
      const img = document.createElement('img');
      img.src = emojiUrl;
      img.alt = emojiName;
      emojiContainer.appendChild(img);
    }
  });
