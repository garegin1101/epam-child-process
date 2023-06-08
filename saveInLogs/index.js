import { writeFile } from 'fs/promises';
import path from 'path';

export default async (obj, command) => {

    const filename = command + obj.start.toISOString().replaceAll(":","_") + ".json";

    const filepath = path.join('logs', filename);

    try {
        
        await writeFile(filepath, JSON.stringify(obj, null, 2));

    } catch(err) {
        console.log(err.message)
    }
}