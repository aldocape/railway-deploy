// Importo estructura de datos y esquema de manejo de base de datos para mensajes
import { Mensaje } from '../interfaces';
import MessagesModel from '../models/messages';

import fs from 'fs';
import path from 'path';

const inputPath = path.resolve(__dirname, '../../messages.json');

// Clase Messages con persistencia de datos en MongoDB

class Messages {
  // Método getAll obtiene todos los mensajes

  async getAll() {
    //El lean es para indicar que queremos como respuesta un objeto simple
    const messages = await MessagesModel.find().lean();

    let contenido = JSON.stringify(messages, null, '\t');

    await fs.promises.writeFile(inputPath, contenido);

    return {
      messages,
      tamanio: contenido.length,
    };
  }

  // Método 'add' agrega un documento de tipo producto a la colección 'products'
  async add(message: Mensaje) {
    const newMessage = await MessagesModel.create(message);
    return newMessage;
  }
}

const msgInstance = new Messages();

// Exporto una instancia de la clase Products
export default msgInstance;
