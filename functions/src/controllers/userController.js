async function getUserProfile(req, res) {
  try {
    res.status(200).json({ user: req.user });
  } catch (error) {
    return res.status(500).json(error.message);
  }
}

module.exports = { getUserProfile };
