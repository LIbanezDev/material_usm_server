const request = require('supertest')
const {app} = require('../../app')

describe('Rutas de archivos /files', () => {
    it('Endpoint /upload debe subir correctamente menos de 6 archivos',async () => {
        await request(app)
            .post('/api/file/upload')
            .send({
                hi:'XD'
            })
            .expect(403)
            .then(console.log)

    });
})
