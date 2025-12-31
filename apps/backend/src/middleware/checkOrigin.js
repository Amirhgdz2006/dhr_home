const allowedOrigins = process.env.FRONTEND_URLS?.split(',') || [process.env.FRONTEND_URL];

module.exports = function checkOrigin(req, res, next) {
  const origin = req.get('origin') || req.get('referer') || '';

  const originHost = origin.split('/').slice(0, 3).join('/');
  
  if (!originHost) {
    return res.status(403).json({ error: 'Forbidden: missing origin' });
  }
  
  if (!allowedOrigins.includes(originHost)) {
    return res.status(403).json({ error: 'Forbidden: origin not allowed' });
  }
  
  next();
};
