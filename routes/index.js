import express from 'express';

// eslint-disable-next-line new-cap
const router = express.Router();

/* GET index page. */
router.get('/*', (req, res) => {
  res.render('index', {
    title: 'Everyone is John'
  });
});

export default router;
