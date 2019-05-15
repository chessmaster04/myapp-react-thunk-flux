import axios from 'axios';
import { route as baseURL, headers } from './constants';

export default axios.create({
    baseURL,
    headers,
});
