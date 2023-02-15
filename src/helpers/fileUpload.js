export const fileUpload = async( file ) => {
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dlrlluway/upload?';

    const formData = new FormData();
    if(!file) throw new Error('No tenemos ningún archivo a subir');
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file );



    try {
    
        const resp = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        })

        if(!resp.ok) throw new Error('no se pudo subir imagen')

        const cloudResp = await resp.json();    

        return cloudResp.secure_url;
    } catch (error) {
        console.log(error);
        throw new Error( error.message );
    }
}