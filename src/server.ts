import 'dotenv/config'


import { severHttp } from './app';
import './socket/sensorsReading/sensorsReadingSocket';

const PORT = process.env.PORT || 3333;



severHttp.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
