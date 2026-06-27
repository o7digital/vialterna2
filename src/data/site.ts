export const navigation = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Industrias", href: "#industrias" },
  { label: "Empresa", href: "/empresa/" },
  { label: "Noticias", href: "/insights/" },
  { label: "FAQ", href: "/faq/" },
  { label: "Contacto", href: "/contacto/" }
];

export const approaches = [
  {
    title: "Hacerlo internamente (In-house)",
    text: "Tu equipo de TI asume la gestión de operadores, el diseño de redundancia y la respuesta a incidentes, además de todo lo que ya tiene a su cargo."
  },
  {
    title: "Depender de un operador tradicional",
    text: "Un operador tradicional está estructuralmente sesgado hacia la red que posee. Te vende un enlace, no disponibilidad diseñada alrededor de tu operación."
  },
  {
    title: "Empaquetarlo con un integrador de TI",
    text: "La conectividad termina empaquetada junto con seguridad, hardware o nube. El problema es estructural: las redes resilientes requieren especialización arquitectónica y relaciones operativas con operadores."
  }
];

export const pillars = [
  {
    title: "Siempre activos por diseño",
    text: "La resiliencia multirred elimina puntos únicos de falla. Nuestra arquitectura combina fibra, celular, satélite y otras fuentes en una conectividad de alta disponibilidad."
  },
  {
    title: "Gestión proactiva 24/7 con visibilidad total",
    text: "Nuestro NOC monitorea cada sitio en tiempo real en todo el país. Detectamos y resolvemos problemas antes de que los notes."
  },
  {
    title: "Telco como Servicio Administrado",
    text: "Auditamos el gasto en telecomunicaciones, sacamos a la luz operadores redundantes, enlaces de bajo rendimiento y fugas silenciosas de SLA."
  }
];

export const phases = [
  ["Entrada", "Comenzamos con un diagnóstico de tu estado actual de telecomunicaciones o con un problema específico a resolver."],
  ["Diseño", "Diseñamos la arquitectura de red para cada sitio utilizando la combinación óptima de enlaces y tecnologías."],
  ["Despliegue", "Coordinamos hardware, operadores y activación para poner la solución en operación."],
  ["Gestión y expansión", "Optimizamos y expandimos la arquitectura a medida que crece tu presencia o cambian tus necesidades de red."]
];

export const solutions = [
  {
    eyebrow: "Edge · Última milla",
    title: "Soluciones Edge (Última Milla)",
    text: "Para endpoints distribuidos dentro de tu red: cajeros automáticos, sucursales minoristas, franquicias e instalaciones remotas. Diseñamos la arquitectura por sitio, administramos el hardware, supervisamos la conectividad y automatizamos el failover con disponibilidad respaldada por SLA.",
    href: "/soluciones/conectividad-sitios-distribuidos/",
    type: "rings",
    label: "Endpoint / Failover / Monitoreo"
  },
  {
    eyebrow: "Sitios centrales",
    title: "Sitios centrales",
    text: "Conectividad resiliente y de alto rendimiento para corporativos, centros de datos, hubs regionales, centros de distribución y sitios transaccionales. Integramos diversidad de rutas, redundancia multioperador y failover automático.",
    href: "/soluciones/sitios-centrales/",
    type: "signal",
    label: "Core / Diversidad / Baja latencia"
  },
  {
    eyebrow: "IoT / SIM",
    title: "Soluciones IoT/SIM",
    text: "Gestión de SIMs, conectividad celular administrada, control de consumo, alertas, optimización de planes y ciclo de vida. Centralizamos el aprovisionamiento y la operación de terminales, sensores y flotas de dispositivos.",
    href: "/soluciones/iot-sim-administradas/",
    type: "cells",
    label: "SIM / eSIM / Telemetría / Sensores"
  },
  {
    eyebrow: "Respaldo",
    title: "Soluciones de Respaldo",
    text: "Conectividad secundaria con failover satelital LEO, LTE o 5G para sitios remotos, retail, banca e infraestructura crítica. Diseñamos capas de redundancia para mantener activos los sitios cuando el enlace principal deja de responder.",
    href: "/soluciones/respaldo-satelital-celular/",
    type: "backup",
    label: "LTE / 5G / Satelital / Multioperador"
  }
];

export const industries = [
  ["Servicios financieros", "Las instituciones financieras dependen de conectividad resiliente para cajeros automáticos, sucursales, terminales y procesamiento transaccional. Vialterna integra respaldo, supervisión y arquitectura multioperador.", "/industrias/servicios-financieros/"],
  ["Retail y franquicias", "Cada tienda desconectada puede significar ventas perdidas, procesos manuales y presión sobre el corporativo. Conectamos tiendas, POS, inventarios, pedidos en línea y centros de distribución.", "/industrias/retail-franquicias/"],
  ["Energía e industria", "Los sitios operativos remotos dependen de conectividad para telemetría, seguridad, sistemas industriales y control operativo. Combinamos enlaces terrestres, celulares y satelitales.", "/industrias/energia-industria/"],
  ["Infraestructura de pagos", "Las empresas de pagos necesitan administrar miles de SIMs, detectar terminales desconectadas, optimizar planes y proteger sitios de procesamiento.", "/industrias/infraestructura-pagos/"]
];
