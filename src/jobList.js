const jobList = [
    {
        id: "1",
        title:"Fullstack Java Developer",
        dateposted: "11/20/2022",
        location: [{id:"1", city:"Bogotá", country:"Colombia"}, {id:"2", city:"Buenos Aires", country:"Argentina"}, {id:"3", city:"Lima", country:"Perú"}],
        remote: true,
        description: "Estamos buscando desarrolladores con conocimientos en Angular, Java Spring Boot o Scala con experiencia mínima de 1 año, preferiblemente con conocimientos en AWS, Azure y DevOps",
        salary: "$4.500.000 - $6.000.000 mensual",
        benefits:[{id:"1", name:"Medicina prepagada"},{id:"2", name:"1 tarde libre al mes"},{id:"3", name:"Acceso a plataformas e-learning (Platzi, Udemy)"}],
        jobtype: "Tiempo completo",
        company: "Westeros Software INC",
        applicants:[{id:"8525"},{id:"2338"}]
    },
    {
        id: "2",
        title:"Mesero",
        dateposted: "09/25/2022",
        location: [{id:"1", city:"Medellin", country:"Colombia"}],
        remote: false,
        description: "Se requiere mesero trabajo en hotel 5 estrellas. Indispensable tener uniforme básico (Camisa Blanca, Pantalon Negro, Zapatos Negros, Corbata Negra) para la ciudad de medellin, conocimiento en etiqueta y protocolo",
        salary: "$1.200.000 por mes",
        benefits:[],
        jobtype: "Tiempo parcial",
        company: "King's Landing Hotel",
        applicants:[{id:"1587"},{id:"6854"}]
    },

    {
        id: "3",
        title:"Docente de Ciencias Sociales",
        dateposted: "10/11/2022",
        location: [{id:"1", city:"Bogotá", country:"Colombia"}],
        remote: false,
        description: "Reconocido colegio ubicado cerca al portal del mundo mágico, requiere: Docente de sociales, filosofía y artes oscuras; experiencia en colegio y preferible experiencia en hechizos avanzados. Horario:Lunes a viernes de 6:30am a 4:00pm",
        salary: "$2.200.000 - $2.600.000 mensual",
        benefits:[],
        jobtype: "Tiempo completo",
        company: "Colegio Hogwarts de Magia y Hechicería, sede Colombia",
        applicants:[{id:"7811"}]
    },

    {
        id: "4",
        title:"Guarda de seguridad",
        dateposted: "15/11/2022",
        location: [{id:"1", city:"Medellín", country:"Colombia"}],
        remote: false,
        description: "Importante castillo del norte de Westeros requiere para incorporar a su equipo de trabajo, conductor/escolta. Bachiller con libreta militar de primera clase. Con experiencia mínima de un año en cargos de escolta/conductor/guarda. Con Disponibilidad de tiempo completo y cursos de seguridad (Escolta actualizado)",
        salary: "$1.500.000 - $1.800.000 mensual",
        benefits:[],
        jobtype: "Tiempo completo",
        company: "Winterfell Castle",
        applicants:[{id:"8851"}]
    },

    {
        id: "5",
        title:"Junior .NET developer",
        dateposted: "26/11/2022",
        location: [{id:"1", city:"Medellín", country:"Colombia"}, {id:"2", city:"Cali", country:"Colombia"}, {id:"3", city:"Ciudad de México", country:"México"}, {id:"4", city:"Caracas", country:"Venezuela"}],
        remote: true,
        description: "We are looking for experienced ASP && .net Developers with VC++ background. The minimum requirements for the positions include a Bachelor's degree or equivalent experience in a computer-related field. Candidate will be determined, ambitious and self motivated with excellent written and oral communication skills.",
        salary: "$2.500.000 - $4.000.000 mensual",
        benefits:[],
        jobtype: "Tiempo completo",
        company: "Stormland Technology",
        applicants:[{id:"7858"}]
    },
]


export default jobList;