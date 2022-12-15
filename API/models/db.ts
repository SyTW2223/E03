import {Schema, model} from 'mongoose';

const usuarioSchema = new Schema ({
    nombre: {
        type: String,
        required: true,
        trim : true
    }
})

export default model("Usuario", usuarioSchema);