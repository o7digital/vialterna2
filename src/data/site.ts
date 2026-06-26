export const navigation = [
  { label: "Soluciones", href: "#soluciones" },
  { label: "Industrias", href: "#industrias" },
  { label: "Empresa", href: "/empresa/" },
  { label: "Noticias", href: "/insights/" },
  { label: "FAQ", href: "/faq/" }
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
    text: "La conectividad termina empaquetada junto con seguridad, hardware o nube. Las redes resilientes requieren especialización arquitectónica y relaciones operativas con operadores."
  }
];

export const pillars = [
  {
    title: "Siempre activos por diseño",
    text: "Diseñamos para eliminar puntos únicos de falla, combinando fibra, LTE, 5G, satélite y enlaces inalámbricos según las necesidades de cada sitio."
  },
  {
    title: "Gestión proactiva 24/7 con visibilidad total",
    text: "Monitoreamos la infraestructura de extremo a extremo, coordinamos operadores y respondemos a incidentes antes de que afecten la operación."
  },
  {
    title: "Telco como Servicio Administrado",
    text: "Arquitectura, despliegue, operación, optimización y SLAs reunidos en un solo modelo de servicio y un único punto de responsabilidad."
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
    title: "Soluciones Edge",
    text: "Conectividad administrada para sitios distribuidos: sucursales, cajeros automáticos, tiendas, franquicias, terminales e instalaciones remotas. Una arquitectura diseñada alrededor de cada ubicación.",
    href: "/soluciones/conectividad-sitios-distribuidos/",
    type: "rings",
    label: "Endpoint / Failover / Monitoreo"
  },
  {
    eyebrow: "Sitios centrales",
    title: "El núcleo nunca se detiene.",
    text: "Conectividad de alto rendimiento, diversidad de rutas y redundancia multioperador para corporativos, centros de datos y ubicaciones donde converge la operación.",
    href: "/soluciones/sitios-centrales/",
    type: "signal",
    label: "Core / Diversidad / Baja latencia"
  },
  {
    eyebrow: "IoT / SIM",
    title: "Miles de dispositivos. Una sola vista.",
    text: "Conectividad celular administrada para flotas de dispositivos, terminales y sensores. Gestionamos activación, consumo, operación y ciclo de vida de SIMs y eSIMs.",
    href: "/soluciones/iot-sim-administradas/",
    type: "cells",
    label: "SIM / eSIM / Telemetría / Sensores"
  },
  {
    eyebrow: "Respaldo",
    title: "La segunda red entra antes de la falla.",
    text: "Capas de redundancia con LTE, 5G, satélite y acceso multioperador para mantener activos sitios críticos cuando el enlace principal deja de responder.",
    href: "/soluciones/respaldo-satelital-celular/",
    type: "backup",
    label: "LTE / 5G / Satelital / Multioperador"
  }
];

export const industries = [
  ["Servicios financieros", "Cajeros automáticos, sucursales bancarias e infraestructura transaccional.", "/industrias/servicios-financieros/"],
  ["Retail y franquicias", "Tiendas, POS, inventarios, pedidos en línea y centros de distribución.", "/industrias/retail-franquicias/"],
  ["Energía e industria", "Sitios remotos, SCADA, seguridad operativa, sensores IoT y telemetría industrial.", "/industrias/energia-industria/"],
  ["Infraestructura de pagos", "Terminales, SIMs, sitios de procesamiento y continuidad transaccional.", "/industrias/infraestructura-pagos/"]
];
