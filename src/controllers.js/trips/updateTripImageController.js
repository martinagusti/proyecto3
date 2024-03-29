
const path = require("path");
const fs = require("fs").promises
const randomstring = require("randomstring");
const throwJsonError = require("../../errors/throwJsonError");
const createJsonError = require("../../errors/createJsonError");
const { addAvatarimage } = require("../../repositories.js/usersRepository");
const { addimage, findUserIdInTrip, findTripById } = require("../../repositories.js/tripsRepositories");
const sharp = require("sharp")

const updateTripImage = async (req, res) =>{
    try {

        const {id} = req.auth;
        const {id:idTrip} = req.params;
        
        const existe = await findTripById(idTrip)
        
        if(!existe){
            throwJsonError(400, "No existe el viaje.")
        }

        const [idUser] = await findUserIdInTrip(idTrip)
        
        if(idUser.id !== id){
            throwJsonError(400, "No puedes actualizar la imagen de otro usuario.")
        }
       

        const validateExtension = [".jpeg", ".jpg", ".png", ".JPEG", ".JPG", ".PNG"]

         const {files} = req;
         
         const {tripImage} = files;
        

        if(!files){
            throwJsonError(400, "No se ha seleccionado el fichero")
        }
        
        const extension =  path.extname(tripImage.name)

        if(!validateExtension.includes(extension)){
            throwJsonError(400, "Formato no valido")
        }
        
        
        const trip = await  findTripById(idTrip);
        
        if(!trip){
            throwJsonError(400, "No existe el viaje")
        }
       
        const {image} = trip

        
        const pathTripImage = path.join(__dirname, "../../../public/tripImages")
        const random = randomstring.generate(10)
        const imageName = `${id}-${random}${extension}`
        const pathImage = (path.join(pathTripImage, imageName))

        
        
        if(image){
            
            await fs.unlink(path.join(pathTripImage, image))
        }

        const imageSharp = sharp(tripImage.data);
         
        await imageSharp.resize(600,400).toFile(pathImage);

        await addAvatarimage(imageName, id);

        await addimage(imageName, idTrip);
        //dasd

    
      
        res.status(200);
        res.send(`Imagen actualizada correctamente`)

       

    } catch (error) {
        createJsonError(error, res)
    }
}

module.exports = updateTripImage;