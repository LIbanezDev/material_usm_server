const careers = [
    {name: 'Informatica', type: 'Tecnico Universitario'},
    {name: 'Electricidad', type: 'Tecnico Universitario'},
    {name: 'Electrónica', type: 'Tecnico Universitario'},
    {name: 'Construcción', type: 'Tecnico Universitario'},
    {name: 'Control del Medio Ambiente', type: 'Tecnico Universitario'},
    {name: 'Diseño y Producción Industrial en Moldes y Matrices', type: 'Tecnico Universitario'},
    {name: 'Energías Renovables', type: 'Tecnico Universitario'},
    {name: 'Gestión de Calidad en Alimentos', type: 'Tecnico Universitario'},
    {name: 'Mantenimiento Industrial', type: 'Tecnico Universitario'},
    {name: 'Mecánica Automotriz', type: 'Tecnico Universitario'},
    {name: 'Mecánica Industrial', type: 'Tecnico Universitario'},
    {name: 'Minería y Metalurgia', type: 'Tecnico Universitario'},
    {name: 'Proyecto y Diseño Mecánico', type: 'Tecnico Universitario'},
    {name: 'Proyectos de Ingeniería', type: 'Tecnico Universitario'},
    {name: 'Química, mención Química Analítica', type: 'Tecnico Universitario'},
    {name: 'Telecomunicaciones y Redes', type: 'Tecnico Universitario'},
]

const subjects = [
    // T.U Informatica
    {name: 'Elementos de la Matemática', semester: 1, careerId: 1},
    {name: 'Inglés I', semester: 1, careerId: 1},
    {name: 'Programación', semester: 1, careerId: 1},
    {name: 'Análisis de Sistemas de Información', semester: 1, careerId: 1},
    {name: 'Educación Física', semester: 1, careerId: 1},
    {name: 'Introducción a la Informática y Computación', semester: 1, careerId: 1},
    {name: 'Matemática Aplicada', semester: 2, careerId: 1},
    {name: 'Ingles II', semester: 2, careerId: 1},
    {name: 'Análisis y Diseño Orientado a Objeto', semester: 2, careerId: 1},
    {name: 'Diseño de Sistemas de Información', semester: 2, careerId: 1},
    {name: 'Estructuras de Datos', semester: 2, careerId: 1},
    {name: 'Programación Orientada a Evento', semester: 3, careerId: 1},
    {name: 'Taller de Sistemas de Información I', semester: 3, careerId: 1},
    {name: 'Inglés III', semester: 3, careerId: 1},
    {name: 'Programación Orientada a Objeto', semester: 3, careerId: 1},
    {name: 'Diseño y Programación Orientada a la Web', semester: 3, careerId: 1},
    {name: 'Bases de Datos', semester: 3, careerId: 1},
    {name: 'Arquitectura y Organización de Computadores', semester: 4, careerId: 1},
    {name: 'Taller de Sistemas de Información II', semester: 4, careerId: 1},
    {name: 'Humanidades', semester: 4, careerId: 1},
    {name: 'Desarrollo de Aplicaciones Móviles', semester: 4, careerId: 1},
    {name: 'Taller de Desarrollo de Software', semester: 4, careerId: 1},
    {name: 'Sistemas Operativos', semester: 4, careerId: 1}

]

const campuses = [
    {name: 'Sede Jose Miguel Carrera', createdAt: new Date(), updatedAt: new Date()},
    {name: 'Sede Concepcion', createdAt: new Date(), updatedAt: new Date()},
    {name: 'Casa Central', createdAt: new Date(), updatedAt: new Date()},
    {name: 'Sede San Joaquin', createdAt: new Date(), updatedAt: new Date()}
]

const careers_campuses = []

for(let i = 1; i <= 16; i++) {
    careers_campuses.push({
        careerId: i,
        campusId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
    })
}

module.exports = {
    careers,
    subjects,
    campuses,
    careers_campuses
}
