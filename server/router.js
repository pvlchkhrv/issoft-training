import Router from 'express';

const router = new Router;

router.get('/', (req, res) => {
  try {
    res.status(200).json('Ok');
  } catch (e) {
    res.status(500).json(e);
  }
})
router.post('/', (req, res) => {
  try {
    console.log(req.files);
    res.status(200).json('Сервер ок!');

  } catch (e) {
    res.status(500).json(e);
  }
});

export default router;
