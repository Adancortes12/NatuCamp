import React from "react";
import styles from "./stylesFAQ.module.css";
import fondo from "../assets/campana.png";

const FAQPage = () => {
  const sections = [
    {
      title: "Cuenta y Registro",
      faqs: [
        {
          q: "¿Cómo creo una cuenta en el foro?",
          a: "Puedes crear una cuenta haciendo clic en el botón 'Registrate' en la página de inicio o accediendo a ella desde el inicio de sesión si es que no tienes una. Solo necesitas un correo electrónico válido y una contraseña.",
        },
        {
          q: "Olvidé mi contraseña, ¿qué hago?",
          a: "Por favor ponte en contacto con un administrador para recibir un codigo de reasignación de contraseña. Actualmente estamos trabajando en un sistema automatico de recuperación de contraseña, agradecemos su paciencia.",
        },
      ],
    },
    {
      title: "Eventos y Actividades",
      faqs: [
        {
          q: "¿Dónde puedo ver los próximos eventos?",
          a: "En la sección 'Explora' encontrarás una lista con fechas, horario, cupo máximo y costo en caso de ser aplicable, y una descripción de cada actividad.",
        },
        {
          q: "¿Cómo me inscribo en un evento?",
          a: "Solamente ve al evento que te interesa y haz clic en el botón 'Registrarme'. ¡Si hay cupo disponible, se te agregará automáticamente a la lista de participantes!",
        },
        {
          q: "¿Dónde puedo ver a que eventos me he inscrito?",
          a: "Puedes ver tus eventos pendientes en la sección de eventos dentro de tu perfil. Para ver tu perfil, accede haciendo click sobre tu nombre desde la barra de navegación.",
        },
      ],
    },
    {
      title: "Animales en La Campana",
      faqs: [
        {
          q: "¿Dónde puedo ver los animales que habitan la zona?",
          a: "En la sección 'Aprende', hay una lista completa con la foto y nombre de las especies existentes en la zona, además de información taxonomica relevante.",
        },
        {
          q: "¿Puedo reportar haber visto un animal?",
          a: "Actualmente no se permite registrar observaciones individuales, pero puedes compartir tu experiencia en la sección de 'Posts'.",
        },
        {
          q: "¿Cómo se verifica la información sobre los animales?",
          a: "La información es otorgada por especialistas del parque y se actualiza regularmente con base en observaciones científicas y colaboraciones externas.",
        },
      ],
    },
    {
      title: "Posts y Comunidad",
      faqs: [
        {
          q: "¿Cómo hago una publicación en el foro?",
          a: "Ve a la sección 'Comparte' y haz clic en 'Hacer un Post'. Puedes escribir sobre tu experiencia, dejar recomendaciones, hablar sobre un evento al que asististe o compartir información sobre tus animales favoritos.",
        },
        {
          q: "¿Puedo subir imágenes en mis posts?",
          a: "Actualmente solo se permiten publicaciones de texto. En un futuro, será posible incluir imagenes en tus publicaciones.",
        },
        {
          q: "¿Hay reglas para las publicaciones?",
          a: "NatuCamp es una página para todo público. No se permite lenguaje ofensivo, contenido sensible, ni publicaciones que promuevan actividades ilegales o el daño al parque y las especies dentro de el mismo. Posts considerados ofensivos serán eliminados, y su cuenta será suspendida de manera temporal.",
        },
        {
          q: "¿Dónde puedo ver mis publicaciones?",
          a: "Puedes ver los posts que has publicado en la sección de posts dentro de tu perfil. Para ver tu perfil, accede haciendo click sobre tu nombre desde la barra de navegación.",
        },
      ],
    },
    {
      title: "Soporte Técnico y Ayuda",
      faqs: [
        {
          q: "La página no carga correctamente, ¿qué hago?",
          a: "Primero, intenta recargarla o accede desde otro navegador. Si el problema persiste, contacta a un administrador.",
        },
        {
          q: "No puedo inscribirme a un evento aunque hay cupo disponible.",
          a: "Asegúrate de haber iniciado sesión. Si el problema continúa, por favor contacta a un administrador.",
        },
        {
          q: "¿Puedo acceder al foro desde mi celular?",
          a: "Aunque puedes acceder al sitio desde tu celular, puedes encontrar problemas en algunas páginas. Estamos trabajando para brindarle una mejor experiencia en cualquier dispositivo móvil, agradecemos su paciencia.",
        },
        {
          q: "Creo que mi cuenta ha sido suspendida injustamente.",
          a: "Si tu cuenta ha sido suspendida sin motivo, ponte en contacto con un administrador para verificar el motivo de la suspensión y tomar los pasos necesarios para llegar a una solución.",
        },
      ],
    },
  ];

  return (
    <div className={styles.faqPageWrapper}>
      <div
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${fondo})` }}
      ></div>
      <div className={styles.faqContainer}>
        <h1 className={styles.mainTitle}>Preguntas Frecuentes (FAQ)</h1>
        {sections.map((section, index) => (
          <div key={index} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            {section.faqs.map((faq, i) => (
              <div key={i} className={styles.faqItem}>
                <p className={styles.question}>
                  <i class="bi bi-patch-question"></i> {faq.q}
                </p>
                <p className={styles.answer}>
                  <i class="bi bi-lightbulb"></i> {faq.a}
                </p>
              </div>
            ))}
          </div>
        ))}

        <div className={styles.grupoContacto}>
          <h2>Contacto</h2>
          <p className={styles.contacto}>
            <i class="bi bi-envelope"></i> <strong> Correo: </strong>
            soporte_natucamp@gmail.com
          </p>
          <p className={styles.contacto}>
            <i class="bi bi-geo-alt"></i> <strong> Ubicación: </strong> Av
            Tecnológico Sn, Villa de Álvarez, 28977 Cdad. de Villa de Álvarez,
            Col.
          </p>
          <p className={styles.contacto}>
            <i class="bi bi-clock"></i> <strong> Horario de atención: </strong>
            Martes a Domingo de 9:00 a.m. a 6:00 p.m.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
