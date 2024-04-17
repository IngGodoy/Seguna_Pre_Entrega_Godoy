import { dirname } from "path";
import { fileURLToPath } from "url";


//este código proporciona una manera de obtener dinámicamente el directorio del archivo actual
export const __dirname = dirname(fileURLToPath(import.meta.url));


