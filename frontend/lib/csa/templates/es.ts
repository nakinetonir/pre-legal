import type { CsaTemplateModule } from "./types";

/** Spanish adaptation of the CSA Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Servicio**. Durante el Período de Suscripción y sujeto a los términos de este Acuerdo, el Cliente podrá acceder y utilizar el Servicio en la Nube y cualquier Software y Documentación incluidos, únicamente para sus fines empresariales internos. El Cliente es responsable de todas las acciones realizadas en las cuentas de sus Usuarios y del cumplimiento de este Acuerdo por parte de estos. El Cliente puede proporcionar Comentarios al Proveedor, que este podrá usar libremente, y el Proveedor puede recopilar y analizar Datos de Uso agregados para mantener, mejorar y promocionar sus productos y servicios, incluido el desarrollo o la mejora de modelos de inteligencia artificial o aprendizaje automático, sin identificar al Cliente ni a sus Usuarios.

2. **Restricciones y Suspensión**. Salvo que este Acuerdo lo permita expresamente, el Cliente no realizará (ni permitirá a nadie realizar) ingeniería inversa del Producto, revenderá ni sublicenciará el acceso al mismo, eliminará avisos de propiedad ni lo utilizará para desarrollar un producto competidor o en incumplimiento de la normativa aplicable. Si el Cliente mantiene un saldo pendiente no disputado durante más de 30 días o incumple sustancialmente este Acuerdo, el Proveedor podrá suspender su acceso, tratando de notificarlo previamente cuando sea posible, y restablecerá el acceso una vez resuelto el problema.

3. **Pago e Impuestos**. {{PAYMENT_PROCESS}}. El Cliente es responsable de todos los impuestos y gravámenes aplicables a las Tarifas, salvo los impuestos sobre la renta del Proveedor. Si el Cliente tiene una disputa de buena fe sobre una factura, deberá notificarlo al Proveedor antes de la fecha de pago y abonar puntualmente los importes no disputados; las partes colaborarán de buena fe para resolver la disputa.

4. **Vigencia y Terminación**. Este Acuerdo comienza el {{EFFECTIVE_DATE}} y continúa durante {{SUBSCRIPTION_PERIOD}}. Cualquiera de las partes podrá terminarlo de inmediato si la otra parte no subsana un incumplimiento sustancial en un plazo de 30 días desde la notificación, o si entra en insolvencia. Tras la expiración o terminación: el Cliente perderá todo derecho a usar el Producto; el Proveedor eliminará el Contenido del Cliente en un plazo de 60 días desde la solicitud; cada parte devolverá o destruirá la Información Confidencial de la otra; y el Proveedor emitirá una factura final por las Tarifas devengadas antes de la terminación.

5. **Declaraciones y Garantías**. Cada parte declara que tiene la autoridad para celebrar este Acuerdo y que cumplirá con la normativa aplicable al ejecutarlo. El Proveedor garantiza además que no reducirá sustancialmente la funcionalidad general del Servicio en la Nube durante el Período de Suscripción. Si el Proveedor incumple esta garantía, el único remedio del Cliente será que el Proveedor restaure la funcionalidad en un plazo de 45 días desde la notificación o, en su defecto, que el Cliente termine la suscripción afectada y reciba un reembolso prorrateado de las Tarifas prepagadas.

6. **Exclusión de Garantías**. Salvo por las garantías de la Sección 5 (Declaraciones y Garantías), el Producto se proporciona **"TAL CUAL", y el Proveedor y el Cliente renuncian a cualquier otra garantía o condición, expresa o implícita, incluidas las garantías implícitas de comerciabilidad, idoneidad para un propósito particular y no infracción, en la máxima medida permitida por la normativa aplicable**.

7. **Limitación de Responsabilidad**. **Salvo por un incumplimiento de la Sección 9 (Confidencialidad) o de las obligaciones de indemnización de una parte conforme a la Sección 8 (Indemnización), la responsabilidad total acumulada de cada parte por todas las reclamaciones derivadas de este Acuerdo no excederá {{GENERAL_CAP_AMOUNT}}, y en ningún caso ninguna de las partes será responsable ante la otra por lucro cesante ni por daños consecuentes, especiales, indirectos, ejemplares, punitivos o incidentales, incluso si se le hubiera informado de la posibilidad de dichos daños.** Estas limitaciones se aplican a toda responsabilidad, ya sea extracontractual, contractual o de otro tipo, salvo en la medida en que lo prohíba la normativa aplicable.

8. **Indemnización**. El Proveedor defenderá e indemnizará al Cliente frente a reclamaciones de terceros que aleguen que el Producto infringe sus derechos de propiedad intelectual, y el Cliente defenderá e indemnizará al Proveedor frente a reclamaciones de terceros derivadas del uso indebido del Producto o del Contenido del Cliente, incluyendo en cada caso los honorarios razonables de abogados. La parte indemnizada deberá notificar con prontitud a la parte indemnizadora sobre la reclamación, otorgarle el control exclusivo de la defensa y el acuerdo transaccional, y cooperar razonablemente a cargo de la parte indemnizadora.

9. **Confidencialidad**. Salvo que sea necesario para ejecutar este Acuerdo, la parte que reciba Información Confidencial de la otra no la usará ni divulgará, y la protegerá con al menos el mismo cuidado que emplea para su propia información similar. Estas obligaciones no se aplican a la información que sea o llegue a ser pública, que ya se conociera sin restricciones, o que se desarrolle de forma independiente sin referencia a la Información Confidencial, y una parte podrá divulgar Información Confidencial en la medida exigida por la ley, tras notificarlo razonablemente cuando esté legalmente permitido.

10. **Reserva de Derechos**. Salvo por los derechos limitados otorgados en este Acuerdo, el Proveedor conserva todo derecho, título e interés sobre el Producto, y el Cliente conserva todo derecho, título e interés sobre su Contenido.

11. **Ley Aplicable y Tribunales Elegidos**. Este Acuerdo y todos los asuntos relacionados con él se rigen e interpretan de acuerdo con las leyes de {{GOVERNING_LAW}}, sin tener en cuenta sus normas de conflicto de leyes. Cualquier litigio relacionado con este Acuerdo deberá presentarse ante los tribunales de {{JURISDICTION}}, a cuya jurisdicción exclusiva se someten irrevocablemente ambas partes. Un incumplimiento de la Sección 9 (Confidencialidad) o de los derechos de propiedad intelectual de una parte puede causar un daño irreparable, por lo que la parte no infractora podrá solicitar medidas cautelares además de sus demás remedios.

12. **Disposiciones Generales**. Este Acuerdo constituye el acuerdo íntegro entre las partes sobre su objeto y sustituye a cualquier discusión previa. Cualquier modificación, renuncia o enmienda deberá constar por escrito y estar firmada por ambas partes, y si alguna disposición se considera inaplicable, el resto del Acuerdo seguirá vigente. Ninguna parte podrá ceder este Acuerdo sin el consentimiento previo por escrito de la otra, salvo en relación con una fusión, reorganización o venta de la totalidad de sus activos. Las partes son contratistas independientes, y ninguna será responsable de un retraso causado por un Evento de Fuerza Mayor, aunque esto no exime al Cliente de pagar las Tarifas ya devengadas. Este Acuerdo podrá firmarse por duplicado, incluso electrónicamente, considerándose cada copia un original.

Adaptado del Common Paper Cloud Service Agreement [Standard Terms Version 2.1](https://commonpaper.com/standards/cloud-service-agreement/2.1/), de libre uso bajo [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} año${n === 1 ? "" : "s"}`;
}

function describeSubscriptionPeriod(years: number): string {
  return (
    `${pluralYears(years)} desde la Fecha Efectiva, renovándose automáticamente por ` +
    `períodos adicionales de ${pluralYears(years)} salvo que cualquiera de las partes notifique ` +
    `la no renovación al menos 30 días antes de que finalice el período en curso`
  );
}

export const es: CsaTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeSubscriptionPeriod,
};
