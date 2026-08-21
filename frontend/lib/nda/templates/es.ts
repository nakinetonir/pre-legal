import { CONFIDENTIALITY_INDEFINITE, type ConfidentialityYears } from "../durations";
import type { TemplateModule } from "./types";

/**
 * Spanish translation of the Standard Terms body of the Common Paper Mutual
 * NDA v1.0 (AG-85). The `{{TOKEN}}` placeholders are substituted by
 * fillStandardTerms() with the values from the form; they must be kept
 * verbatim and in the same relative order as the English source.
 *
 * Source: https://commonpaper.com/standards/mutual-nda/1.0/ (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Introducción**. Este Acuerdo de Confidencialidad Mutuo (que incorpora estos Términos Estándar y la Portada (definida más abajo)) (“**MNDA**”) permite que cada parte (“**Parte Reveladora**”) divulgue o ponga a disposición información relacionada con la {{PURPOSE}} que (1) la Parte Reveladora identifique ante la parte receptora (“**Parte Receptora**”) como “confidencial”, “de su propiedad” o similar, o (2) deba razonablemente entenderse como confidencial o de su propiedad debido a su naturaleza y a las circunstancias de su divulgación (“**Información Confidencial**”). La Información Confidencial de cada parte incluye también la existencia y el estado de las conversaciones entre las partes y la información contenida en la Portada. La Información Confidencial incluye información técnica o comercial, diseños o hojas de ruta de producto, requisitos, precios, documentación de seguridad y cumplimiento normativo, tecnología, invenciones y know-how. Para utilizar este MNDA, las partes deben cumplimentar y firmar una portada que incorpore estos Términos Estándar (“**Portada**”). Cada parte queda identificada en la Portada y los términos en mayúscula tienen el significado que se les atribuye en este documento o en la Portada.

2. **Uso y Protección de la Información Confidencial**. La Parte Receptora deberá: (a) utilizar la Información Confidencial únicamente para la {{PURPOSE}}; (b) no divulgar la Información Confidencial a terceros sin la autorización previa por escrito de la Parte Reveladora, salvo que la Parte Receptora podrá divulgar la Información Confidencial a sus empleados, agentes, asesores, contratistas y otros representantes que tengan una necesidad razonable de conocerla para la {{PURPOSE}}, siempre que dichos representantes estén sujetos a obligaciones de confidencialidad no menos protectoras para la Parte Reveladora que los términos aplicables de este MNDA, y que la Parte Receptora siga siendo responsable de su cumplimiento; y (c) proteger la Información Confidencial utilizando, como mínimo, las mismas protecciones que la Parte Receptora emplea para su propia información similar, sin que en ningún caso sean inferiores a un estándar de diligencia razonable.

3. **Excepciones**. Las obligaciones de la Parte Receptora en este MNDA no serán aplicables a la información que pueda demostrar que: (a) es o pasa a ser de dominio público sin culpa de la Parte Receptora; (b) ya conocía o poseía legítimamente antes de recibirla de la Parte Reveladora, sin restricciones de confidencialidad; (c) obtuvo legítimamente de un tercero sin restricciones de confidencialidad; o (d) desarrolló de forma independiente sin utilizar ni hacer referencia a la Información Confidencial.

4. **Divulgaciones Exigidas por Ley**. La Parte Receptora podrá divulgar Información Confidencial en la medida exigida por ley, normativa o autoridad regulatoria, citación o requerimiento judicial, siempre que (en la medida legalmente permitida) proporcione a la Parte Reveladora un aviso previo razonable de la divulgación exigida y coopere razonablemente, a costa de la Parte Reveladora, con los esfuerzos de esta última para obtener un tratamiento confidencial de la Información Confidencial.

5. **Duración y Terminación**. Este MNDA comienza en la {{EFFECTIVE_DATE}} y finaliza al término de la {{MNDA_TERM}}. Cualquiera de las partes podrá terminar este MNDA por cualquier motivo o sin motivo alguno mediante notificación escrita a la otra parte. Las obligaciones de la Parte Receptora relativas a la Información Confidencial subsistirán durante la {{TERM_OF_CONFIDENTIALITY}}, con independencia de la expiración o terminación de este MNDA.

6. **Devolución o Destrucción de la Información Confidencial**. Tras la expiración o terminación de este MNDA, o a solicitud anterior de la Parte Reveladora, la Parte Receptora deberá: (a) cesar en el uso de la Información Confidencial; (b) inmediatamente después de la solicitud por escrito de la Parte Reveladora, destruir toda la Información Confidencial en su posesión o control, o devolverla a la Parte Reveladora; y (c) si así lo solicita la Parte Reveladora, confirmar por escrito el cumplimiento de estas obligaciones. Como excepción al apartado (b), la Parte Receptora podrá conservar Información Confidencial de acuerdo con sus políticas habituales de copia de seguridad o conservación de registros, o según exija la ley, si bien los términos de este MNDA seguirán siendo aplicables a la Información Confidencial conservada.

7. **Derechos de Propiedad**. La Parte Reveladora conserva la totalidad de sus derechos de propiedad intelectual y demás derechos sobre su Información Confidencial, y su divulgación a la Parte Receptora no otorga ninguna licencia sobre dichos derechos.

8. **Exención de Garantías**. TODA LA INFORMACIÓN CONFIDENCIAL SE PROPORCIONA “TAL CUAL”, CON TODOS SUS DEFECTOS Y SIN GARANTÍAS, INCLUIDAS LAS GARANTÍAS IMPLÍCITAS DE TITULARIDAD, COMERCIABILIDAD E IDONEIDAD PARA UN FIN PARTICULAR.

9. **Ley Aplicable y Jurisdicción**. Este MNDA y todas las cuestiones relacionadas con el mismo se rigen e interpretan de conformidad con las leyes de {{GOVERNING_LAW}}, sin tener en cuenta sus normas de conflicto de leyes. Cualquier litigio, acción o procedimiento legal relacionado con este MNDA deberá interponerse ante los tribunales de {{JURISDICTION}}. Cada parte se somete irrevocablemente a la jurisdicción exclusiva de dichos tribunales de {{JURISDICTION}} en cualquier litigio, acción o procedimiento de este tipo.

10. **Tutela Cautelar**. El incumplimiento de este MNDA puede causar un daño irreparable para el cual una indemnización pecuniaria resultaría un remedio insuficiente. Ante un incumplimiento de este MNDA, la Parte Reveladora tendrá derecho a solicitar la tutela cautelar que corresponda, incluida una medida de cesación, además de sus demás recursos.

11. **Disposiciones Generales**. Ninguna de las partes está obligada en virtud de este MNDA a divulgar Información Confidencial a la otra ni a proseguir con cualquier transacción propuesta. Ninguna de las partes podrá ceder este MNDA sin el consentimiento previo por escrito de la otra parte, salvo que cualquiera de las partes podrá cederlo en el marco de una fusión, reorganización, adquisición u otra transmisión de la totalidad o sustancialmente la totalidad de sus activos o valores con derecho a voto. Cualquier cesión que infrinja esta cláusula será nula. Este MNDA vinculará y redundará en beneficio de los sucesores y cesionarios autorizados de cada parte. Las renuncias deberán constar por escrito y estar firmadas por el representante autorizado de la parte que renuncia, y no podrán presumirse de ninguna conducta. Si alguna disposición de este MNDA se declarase inaplicable, se limitará en la medida mínima necesaria para que el resto del MNDA permanezca en vigor. Este MNDA (incluida la Portada) constituye el acuerdo íntegro entre las partes respecto de su objeto y sustituye a cualesquiera entendimientos, acuerdos, manifestaciones y garantías anteriores o contemporáneos, ya sean escritos u orales, relativos a dicho objeto. Este MNDA solo podrá modificarse, alterarse, dispensarse o complementarse mediante acuerdo por escrito firmado por ambas partes. Las notificaciones, solicitudes y aprobaciones previstas en este MNDA deberán enviarse por escrito a las direcciones de correo electrónico o postales indicadas en la Portada, y se considerarán entregadas en el momento de su recepción. Este MNDA podrá suscribirse en varios ejemplares, incluidas copias electrónicas, cada uno de los cuales se considerará un original y todos ellos constituirán un mismo acuerdo.

Acuerdo de Confidencialidad Mutuo de Common Paper, [Versión 1.0](https://commonpaper.com/standards/mutual-nda/1.0/), de uso gratuito bajo licencia [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} año${n === 1 ? "" : "s"}`;
}

/** Frase insertada en "... y finaliza al término de la {{MNDA_TERM}}." */
function describeMndaTerm(years: number): string {
  return `${pluralYears(years)} desde la Fecha Efectiva`;
}

/** Frase insertada en "... subsistirán durante la {{TERM_OF_CONFIDENTIALITY}}, ..." */
function describeConfidentiality(years: ConfidentialityYears): string {
  if (years === CONFIDENTIALITY_INDEFINITE) {
    return "un periodo indefinido tras la expiración o terminación de este MNDA";
  }
  return `${pluralYears(years)} tras la expiración o terminación de este MNDA`;
}

export const es: TemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeMndaTerm,
  describeConfidentiality,
};
