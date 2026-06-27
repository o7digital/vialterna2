export type DetailPage = {
  slug: string;
  eyebrow: string;
  title: string;
  description: string;
  problemTitle?: string;
  problem?: string;
  sectionTitle: string;
  items: { title: string; text: string }[];
  benefits: string[];
};

export const solutionPages: DetailPage[] = [
  {
    slug: "conectividad-sitios-distribuidos",
    eyebrow: "Soluciones Edge",
    title: "Soluciones Edge: conectividad resiliente para redes distribuidas en México",
    description: "Conectividad resiliente para cada sitio de tu red distribuida: cajeros automáticos, sucursales, tiendas, franquicias e instalaciones remotas.",
    problemTitle: "Cuando los sitios distribuidos se desconectan, tu negocio se detiene",
    problem: "Cada sitio necesita mantenerse conectado para que la operación continúe. Un modelo vulnerable con un operador por sitio, failover manual o inexistente expone transacciones, procesos críticos y atención al cliente.",
    sectionTitle: "Qué incluye una solución Edge de Vialterna",
    items: [
      { title: "Diseño de arquitectura por sitio", text: "Evaluamos fibra, celular, satélite LEO o MPLS según cobertura, criticidad y disponibilidad requerida." },
      { title: "Hardware administrado", text: "Vialterna aprovisiona, configura, envía y gestiona routers, switches, antenas y gateways celulares." },
      { title: "Supervisión de conectividad", text: "Cada sitio se revisa para detectar problemas de conectividad o degradaciones." },
      { title: "Failover automático", text: "Cuando una conexión falla, el tráfico cambia automáticamente hacia un enlace de respaldo." },
      { title: "Disponibilidad respaldada por SLA", text: "La disponibilidad se mide y reporta con acuerdos de nivel de servicio claros." }
    ],
    benefits: ["Conectividad resiliente para sitios distribuidos", "Arquitectura diseñada por ubicación", "Reducción de puntos únicos de falla", "Failover automático entre enlaces", "Hardware administrado por Vialterna", "Supervisión de conectividad", "Disponibilidad respaldada por SLA"]
  },
  {
    slug: "sitios-centrales",
    eyebrow: "Sitios centrales",
    title: "Soluciones para Sitios Centrales: conectividad resiliente para infraestructura crítica",
    description: "Conectividad resiliente y de alto rendimiento para instalaciones críticas: corporativos, hubs regionales, centros de datos, centros de distribución y sitios transaccionales de alto volumen.",
    problemTitle: "El problema de los sitios centrales",
    problem: "Un sitio central concentra aplicaciones, datos, transacciones y operación. Si depende de una sola ruta, un solo operador o una arquitectura sin redundancia suficiente, cualquier falla puede escalar a impacto regional o nacional.",
    sectionTitle: "Qué incluye la solución",
    items: [
      { title: "Rutas WAN diversas", text: "Diseño con diversidad de operadores, tecnologías y rutas." },
      { title: "Gestión avanzada de tráfico", text: "Priorización y control del tráfico crítico." },
      { title: "Mayor ancho de banda y SLAs", text: "Arquitecturas preparadas para capacidad, desempeño y acuerdos de nivel de servicio." },
      { title: "Supervisión de conectividad", text: "Revisión de enlaces, eventos y disponibilidad." }
    ],
    benefits: ["Mayor resiliencia en instalaciones críticas", "Reducción de puntos únicos de falla", "Gestión avanzada de tráfico", "Supervisión de conectividad", "Arquitectura alineada con SLA"]
  },
  {
    slug: "iot-sim-administradas",
    eyebrow: "IoT y SIM",
    title: "Soluciones IoT/SIM para dispositivos conectados",
    description: "Vialterna administra conectividad celular, SIMs empresariales, consumo, alertas, planes y ciclo de vida para flotas de dispositivos conectados.",
    problemTitle: "Gestión de SIMs y conectividad celular administrada",
    problem: "Las flotas de terminales, sensores, cajeros, vehículos o dispositivos conectados requieren control de activaciones, consumo, planes y soporte.",
    sectionTitle: "Qué incluye",
    items: [
      { title: "Aprovisionamiento y activación", text: "Gestión de altas, activaciones y asignación de SIMs." },
      { title: "Control de consumo y alertas", text: "Visibilidad para detectar anomalías y desconexiones." },
      { title: "Optimización de planes", text: "Revisión de consumo para identificar oportunidades de ajuste." },
      { title: "Gestión del ciclo de vida", text: "Control de SIMs activas, suspendidas, reemplazadas o reasignadas." }
    ],
    benefits: ["Gestión centralizada de SIMs", "Aprovisionamiento y activación masiva", "Control de consumo", "Alertas operativas", "Optimización de planes", "Integración con sistemas IoT"]
  },
  {
    slug: "respaldo-satelital-celular",
    eyebrow: "Respaldo",
    title: "Conectividad de respaldo satelital y celular para continuidad operativa",
    description: "Vialterna diseña rutas secundarias con respaldo satelital LEO, LTE o 5G para mantener sitios críticos conectados cuando el enlace principal falla.",
    problemTitle: "Conectividad secundaria y failover",
    problem: "El respaldo debe permitir que el tráfico cambie automáticamente hacia una ruta secundaria cuando la conexión principal se degrada o cae.",
    sectionTitle: "Tecnologías de respaldo",
    items: [
      { title: "Respaldo satelital LEO", text: "Ruta secundaria para sitios con redundancia terrestre limitada." },
      { title: "Respaldo celular LTE / 5G", text: "Conectividad móvil para continuidad ante fallas de enlaces fijos." },
      { title: "Failover automático", text: "Cambio de tráfico hacia respaldo sin intervención manual." },
      { title: "Supervisión integrada", text: "Revisión del enlace principal, respaldo, eventos y disponibilidad." }
    ],
    benefits: ["Conectividad secundaria para sitios críticos", "Failover satelital y celular", "Continuidad ante fallas", "Supervisión integrada", "Menos dependencia de una sola tecnología"]
  }
];

export const industryPages: DetailPage[] = [
  {
    slug: "servicios-financieros", eyebrow: "Servicios financieros",
    title: "Servicios financieros: conectividad resiliente para cajeros, sucursales e infraestructura transaccional",
    description: "En servicios financieros, una interrupción de conectividad puede traducirse en transacciones perdidas, afectación al usuario y presión operativa.",
    sectionTitle: "Qué hace Vialterna",
    items: [
      { title: "Soluciones Edge para cajeros automáticos", text: "Arquitectura por sitio, CPE, SIMs celulares y respaldo." },
      { title: "Respaldo para sucursales bancarias", text: "Failover celular o satelital para mantener operación básica ante fallas." },
      { title: "Visibilidad y reportes", text: "Gestión de incidentes y visibilidad de desempeño." }
    ],
    benefits: ["Mayor disponibilidad para cajeros y sucursales", "Menor exposición a un solo operador", "Failover automático", "Supervisión de conectividad", "Reportes de desempeño"]
  },
  {
    slug: "retail-franquicias", eyebrow: "Retail y franquicias",
    title: "Retail y franquicias: conectividad resiliente para redes de tiendas",
    description: "Cada tienda desconectada puede significar ventas perdidas, procesos manuales, quejas de clientes y presión sobre el corporativo.",
    sectionTitle: "Qué hace Vialterna",
    items: [
      { title: "Gestión WAN", text: "Centralización de conectividad, desempeño y soporte." },
      { title: "Soluciones Edge para tiendas y POS", text: "Arquitectura de sitio con enlaces principales y respaldo." },
      { title: "Centros de distribución y hubs", text: "Conectividad para logística, inventario y coordinación operativa." }
    ],
    benefits: ["Menos ventas perdidas", "Mayor continuidad para POS", "Visibilidad centralizada", "Respaldo para tiendas críticas", "Supervisión de conectividad"]
  },
  {
    slug: "energia-industria", eyebrow: "Energía e industria",
    title: "Energía e industria: conectividad resiliente para sitios remotos y operación crítica",
    description: "Los sitios operativos remotos dependen de conectividad para telemetría, seguridad, sistemas industriales y control operativo.",
    sectionTitle: "Qué hace Vialterna",
    items: [
      { title: "Conectividad para sitios remotos", text: "Diseño de rutas y tecnologías disponibles por ubicación." },
      { title: "Arquitectura híbrida y satelital", text: "Combinación de enlaces terrestres, celulares y satelitales." },
      { title: "IoT / SIM para sensores", text: "Conectividad para telemetría, sensores y activos industriales." }
    ],
    benefits: ["Conectividad para sitios remotos", "Mayor visibilidad operativa", "Respaldo satelital o celular", "Conectividad IoT industrial", "Supervisión de conectividad"]
  },
  {
    slug: "infraestructura-pagos", eyebrow: "Infraestructura de pagos",
    title: "Infraestructura de pagos: conectividad administrada para terminales y procesamiento transaccional",
    description: "Las empresas de pagos necesitan administrar miles de SIMs, detectar terminales desconectadas, optimizar planes y proteger sitios de procesamiento.",
    sectionTitle: "Qué hace Vialterna",
    items: [
      { title: "Gestión de SIMs", text: "Aprovisionamiento, activación, control de consumo y optimización de planes." },
      { title: "Redundancia para procesamiento", text: "Arquitectura multioperador, diversidad de ruta y failover automático." },
      { title: "Reportes de desempeño", text: "Seguimiento proactivo, reportes de desempeño y atención a incidentes." }
    ],
    benefits: ["Gestión centralizada de SIMs", "Aprovisionamiento masivo", "Control de consumo", "Optimización de planes", "Redundancia para procesamiento", "Failover automático"]
  }
];
