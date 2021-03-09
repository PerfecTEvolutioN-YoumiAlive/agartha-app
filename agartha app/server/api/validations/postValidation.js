function postValidation (req, res, next) {
  const { title, content } = req.body;

  if (!title || !content) {
    res.status(400).json({ message: 'Title and Content are required', status:400 });
  }
  
  if (title.length < 5 || title.length > 350 || content.length < 1 || content.length > 10) {
    res.status(400).json({ message: 'title min 5 and max 350, content min 1 and max 10', status:400 });
  }
  
  if (content.some(i => i.contentType !== 'header' && i.contentType !== 'paragraph' && i.contentType !== 'image')) {
    res.status(400).json({ message: 'Only available contentType are header, paragraph and image. Content should be an array of objects and each object should have a type, and depend on the time it can contain paragraph, header or imageSrc', status: 400 });
  }

  next();
}

function articleValidation (req, res, next) {
  const { title, html } = req.body;

  if (!title || !html) {
    res.status(400).json({ message: 'bad request - title and html are required', status:400 });
  }
  
  if (title.length < 5 || title.length > 350 || html.length < 5 || html.length > 1400) {
    res.status(400).json({ message: 'title min 5 and max 350, html min 5 and max 14000', status:400 });
  }
  
  if (html.split('<div>').length < 2 && html.split('</div>').length < 2) {
    res.status(400).json({ message: 'Article require html not plain text.', status: 400 });
  }

  next();
}

module.exports = { postValidation, articleValidation };