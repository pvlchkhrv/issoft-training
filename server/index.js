import express from 'express';
import router from './router.js';
import cors from 'cors';
import fileUploader from 'express-fileupload';

const PORT = 5000;

const app = express();

app.use(express.json());
app.use(fileUploader({}));
app.use(cors());
app.use('/', router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
