import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();

/* GET index page. */
router.post('/error', (req, res) => {
  const {err} = req.body;

  res.json({err});
});

export default router;
