// Route to get all uploaded images
app.get('/uploads-data', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Failed to read uploads' });

    const data = files.map(file => {
      const username = path.parse(file).name;
      const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${file}`;
      return { username, imageUrl };
    });

    res.json(data);
  });
});
