import Router from 'express';
const router = new Router;

router.get('/', (req, res) => {
  try {
    res.status(200).json('Ok');
  } catch (e) {
    res.status(500).json(e);
  }
})
router.post('/images', (req, res) => {
  try {
    console.log(req.files);
    if(req.files) {
      res.status(200).json('File uploaded');
    }
  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
