'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MessageCircle, Mail, X } from 'lucide-react';

type Service = {
  id: string;
  category: string;
  title: string;
  summary: string;
  includes: string[];
  deliverables: string[];
  eta: string;
};

const services: Service[] = [
  {
    id: 'api-rest-node-spring',
    category: 'Backend API',
    title: 'Desarrollo de APIs REST (Node.js / Spring Boot)',
    summary: 'Construccion de APIs robustas, versionadas y listas para producción.',
    includes: [
      'Diseño de endpoints y contratos',
      'Validación de entrada y manejo de errores',
      'Estructura modular y mantenible'
    ],
    deliverables: ['Repositorio backend', 'Documentación OpenAPI', 'Guía de despliegue'],
    eta: '2-4 semanas'
  },
  {
    id: 'api-first-openapi',
    category: 'Arquitectura',
    title: 'Diseño API-First con OpenAPI',
    summary: 'Definición de contratos antes de implementar para evitar deuda técnica.',
    includes: ['Especificación OpenAPI', 'Versionado de endpoints', 'Estrategia de compatibilidad'],
    deliverables: ['Contrato API', 'Colección de pruebas', 'Checklist de breaking changes'],
    eta: '3-7 días'
  },
  {
    id: 'auth-security',
    category: 'Seguridad',
    title: 'Autenticación y autorización segura',
    summary: 'Implementación de JWT, roles y permisos con enfoque de seguridad real.',
    includes: ['JWT o sesiones seguras', 'Roles y permisos por recurso', 'Hardening básico de API'],
    deliverables: ['Módulo de seguridad', 'Políticas de acceso', 'Pruebas de endpoints protegidos'],
    eta: '1-2 semanas'
  },
  {
    id: 'java-enterprise',
    category: 'Java',
    title: 'Backend Java con Spring Security y Hibernate/JPA',
    summary: 'Servicios enterprise con persistencia robusta y estructura escalable.',
    includes: ['Spring Boot', 'Spring Security', 'Hibernate/JPA + Maven'],
    deliverables: ['Servicio backend Java', 'Configuración de seguridad', 'Modelo de persistencia'],
    eta: '2-5 semanas'
  },
  {
    id: 'db-optimization',
    category: 'Base de Datos',
    title: 'Optimización de bases de datos (PostgreSQL/MySQL/SQLite)',
    summary: 'Mejora de rendimiento de consultas, índices y modelo relacional.',
    includes: ['Análisis de queries', 'Índices estratégicos', 'Refactor de esquema'],
    deliverables: ['Reporte de optimización', 'Migraciones', 'Query plan mejorado'],
    eta: '3-10 días'
  },
  {
    id: 'db-migrations',
    category: 'Base de Datos',
    title: 'Migraciones y evolución segura de esquema',
    summary: 'Cambios de base de datos sin romper producción ni perder trazabilidad.',
    includes: ['Plan de migración', 'Versionado de cambios', 'Estrategia rollback'],
    deliverables: ['Scripts de migración', 'Plan de despliegue', 'Validaciones de consistencia'],
    eta: '3-7 días'
  },
  {
    id: 'cloud-setup',
    category: 'Cloud',
    title: 'Cloud setup para backend en AWS',
    summary: 'Configuración de entornos y red base para servicios backend.',
    includes: ['VPC y subredes', 'Reglas de seguridad', 'Entornos dev/staging/prod'],
    deliverables: ['Infraestructura inicial', 'Documento técnico', 'Checklist operativo'],
    eta: '1-2 semanas'
  },
  {
    id: 'deploy-observability',
    category: 'Cloud',
    title: 'Deploy + observabilidad inicial',
    summary: 'Despliegue con logs, health checks y monitoreo base.',
    includes: ['Pipeline de deploy', 'Monitoreo de errores', 'Alertas básicas'],
    deliverables: ['Servicio desplegado', 'Dashboard inicial', 'Guía de operación'],
    eta: '4-10 días'
  },
  {
    id: 'backend-refactor',
    category: 'Refactor',
    title: 'Refactor de backend legado',
    summary: 'Reorganización de código para mejorar mantenibilidad y velocidad de cambio.',
    includes: ['Diagnóstico de deuda técnica', 'Separación por capas', 'Limpieza de módulos críticos'],
    deliverables: ['Código refactorizado', 'Plan de mejoras futuras', 'Reporte de deuda técnica'],
    eta: '1-4 semanas'
  },
  {
    id: 'performance-audit',
    category: 'Rendimiento',
    title: 'Auditoría de performance de API',
    summary: 'Detección y corrección de cuellos de botella en backend.',
    includes: ['Profiling de endpoints', 'Optimización I/O y DB', 'Recomendaciones priorizadas'],
    deliverables: ['Informe técnico', 'Acciones priorizadas', 'Mejora medible de latencia'],
    eta: '3-8 días'
  },
  {
    id: 'testing-quality',
    category: 'Calidad',
    title: 'Testing backend (unitario e integración)',
    summary: 'Cobertura de flujos críticos para disminuir regresiones.',
    includes: ['Pruebas unitarias', 'Pruebas de integración', 'Base de buenas prácticas'],
    deliverables: ['Suite de tests', 'Guía de ejecución', 'Cobertura inicial documentada'],
    eta: '1-2 semanas'
  },
  {
    id: 'integrations-third-party',
    category: 'Integraciones',
    title: 'Integración de APIs de terceros',
    summary: 'Conexión segura y estable con servicios externos.',
    includes: ['Pagos, mensajería o email', 'Manejo de fallos y retries', 'Normalización de respuestas'],
    deliverables: ['Módulo de integración', 'Contratos internos', 'Manejo de errores robusto'],
    eta: '5-12 días'
  },
  {
    id: 'ai-workflows',
    category: 'IA aplicada',
    title: 'Automatización con IA para flujos de producto',
    summary: 'Implementación de casos de uso de IA útiles para negocio.',
    includes: ['Diseño del flujo IA', 'Prompts estructurados', 'Integración con backend existente'],
    deliverables: ['Módulo IA funcional', 'Documentación de uso', 'Métricas iniciales de impacto'],
    eta: '1-3 semanas'
  },
  {
    id: 'technical-consulting',
    category: 'Consultoría',
    title: 'Consultoría técnica para MVP y escalamiento',
    summary: 'Acompañamiento para decisiones de arquitectura y roadmap técnico.',
    includes: ['Evaluación de stack', 'Arquitectura inicial', 'Plan de ejecución por fases'],
    deliverables: ['Roadmap técnico', 'Arquitectura objetivo', 'Prioridades de implementación'],
    eta: '2-5 días'
  },
  {
    id: 'monthly-support',
    category: 'Mantenimiento',
    title: 'Soporte técnico mensual backend + BD',
    summary: 'Mantenimiento evolutivo y correctivo en ciclos cortos.',
    includes: ['Corrección de errores', 'Evolutivos de API', 'Actualización de dependencias'],
    deliverables: ['Reporte mensual', 'Backlog atendido', 'Mejoras continuas priorizadas'],
    eta: 'Servicio recurrente'
  }
];

const WHATSAPP_NUMBER = '584243737586';
const EMAIL = 'gustavojose0819@gmail.com';

export default function ServicesSection() {
  const t = useTranslations('Services');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);

  const selectedService = useMemo(
    () => services.find((service) => service.id === selectedServiceId) ?? null,
    [selectedServiceId]
  );

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedServiceId(null);
      }
    };

    window.addEventListener('keydown', onEscape);
    return () => window.removeEventListener('keydown', onEscape);
  }, []);

  return (
    <section id="services" className="py-24 px-6 max-w-5xl mx-auto w-full">
      <h2 className="text-3xl font-space font-black uppercase mb-4 tracking-tight">{t('title')}</h2>
      <div className="mb-5 h-[2px] w-40 bg-zinc-900/85 dark:bg-zinc-100/85" />
      <p className="mb-10 max-w-3xl text-zinc-600 dark:text-zinc-400">{t('subtitle')}</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <button
            key={service.id}
            type="button"
            onClick={() => setSelectedServiceId(service.id)}
            className="text-left border-2 border-zinc-900 bg-white p-5 transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-100 dark:bg-zinc-950"
          >
            <span className="inline-flex border border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              {service.category}
            </span>
            <h3 className="mt-3 font-space font-black uppercase text-zinc-900 dark:text-zinc-100">{service.title}</h3>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{service.summary}</p>
            <p className="mt-3 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">{t('openModal')}</p>
          </button>
        ))}
      </div>

      {selectedService && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/55 p-4"
          onClick={() => setSelectedServiceId(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="w-full max-w-2xl border-2 border-zinc-900 bg-white p-6 dark:border-zinc-100 dark:bg-zinc-950"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="inline-flex border border-zinc-900 dark:border-zinc-100 bg-zinc-100 dark:bg-zinc-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  {selectedService.category}
                </span>
                <h3 className="mt-3 text-2xl font-space font-black uppercase text-zinc-900 dark:text-zinc-100">
                  {selectedService.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedServiceId(null)}
                className="inline-flex h-9 w-9 items-center justify-center border border-zinc-900 dark:border-zinc-100"
                aria-label={t('close')}
              >
                <X size={16} />
              </button>
            </div>

            <p className="mt-4 text-zinc-600 dark:text-zinc-400">{selectedService.summary}</p>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">{t('includes')}</h4>
                <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {selectedService.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 bg-zinc-900 dark:bg-zinc-100" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">{t('deliverables')}</h4>
                <ul className="mt-2 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {selectedService.deliverables.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 inline-block h-1.5 w-1.5 bg-zinc-900 dark:bg-zinc-100" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border border-zinc-900/70 dark:border-zinc-100/70 px-3 py-2 text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              {t('etaLabel')}: {selectedService.eta}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hola Gustavo, me interesa el servicio: ${selectedService.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-zinc-900 bg-zinc-900 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white hover:bg-zinc-700 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
              >
                <MessageCircle size={16} />
                {t('ctaWhatsapp')}
              </a>
              <a
                href={`mailto:${EMAIL}?subject=${encodeURIComponent(`Interés en servicio: ${selectedService.title}`)}&body=${encodeURIComponent('Hola Gustavo, me gustaria recibir mas informacion sobre este servicio.')}`}
                className="inline-flex items-center gap-2 border-2 border-zinc-900 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-zinc-900 hover:bg-zinc-100 dark:border-zinc-100 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-900"
              >
                <Mail size={16} />
                {t('ctaEmail')}
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
