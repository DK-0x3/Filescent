import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app = express();
const upload = multer({ dest: 'uploads/' });

// Настройка CORS для разрешения запросов с localhost:5173
app.use(cors({
	origin: 'http://localhost:5173', // Разрешает запросы только с этого источника
	methods: ['GET', 'POST'],
	allowedHeaders: ['Content-Type'],
}));

app.post('/upload', upload.single('file'), (req, res) => {
	res.json({ fileUrl: `http://localhost:25504/uploads/${req.file.filename}` });
});

app.listen(25504, () => {
	console.log('Mock server running on http://localhost:25504');
});