import express from 'express';

const router = express.Router();

// Routes
router.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello from the server side!', app: 'Real-Estate' });
});

// Error handling
router.use((err, req, res, next) => {
    if (process.env.NODE_ENV === 'production') {
        return res.status(500).json({ error: 'Internal Server Error' });
    } else {
        console.error(err);
        return res.status(500).json({ error: err });
    }
});

export default router;