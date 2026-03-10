const express = require('express');

const app = express();
app.use(express.json());

const port = 3030;

const authRoutes = require('./modules/auth/auth.routes');
app.use('/auth', authRoutes);

const profileRoutes = require('./modules/profile/profile.routes');
app.use('/profile', profileRoutes);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
