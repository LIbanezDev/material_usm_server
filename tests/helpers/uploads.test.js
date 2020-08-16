const {
    uploadFilesToGC,
    deleteFileFromGC,
    getFilesFromGC
} = require('../../helpers/uploads')
const fs = require('fs')
const testFile = fs.readFileSync('tests/helpers/test-image.jpg')
const arrayTestFile = [{originalname: 'test-image.jpg', buffer: testFile}]

describe('Funciones de CRUD en Google Cloud Storage', () => {
    it('debe subir archivo correctamente', async () => {
        const publicURLArray = await uploadFilesToGC(arrayTestFile, 'tests')
        const uploadedFile = publicURLArray[0].split('/').pop()
        const res = await deleteFileFromGC(uploadedFile, 'tests')
        expect(publicURLArray).toHaveLength(1)
        expect(res).toBeDefined()
    });
    it('debe listar archivos de una carpeta especifica', async () => {
        const files = await getFilesFromGC('users')
        expect(files[0]).toBeDefined()
    });
})

