import { CONFIDENTIALITY_INDEFINITE, type ConfidentialityYears } from "../durations";
import type { TemplateModule } from "./types";

/**
 * Portuguese translation of the Standard Terms body of the Common Paper
 * Mutual NDA v1.0 (AG-93). The `{{TOKEN}}` placeholders are substituted by
 * fillStandardTerms() with the values from the form; they must be kept
 * verbatim and in the same relative order as the English source.
 *
 * Source: https://commonpaper.com/standards/mutual-nda/1.0/ (CC BY 4.0)
 */
const STANDARD_TERMS_TEMPLATE = `1. **Introdução**. Este Acordo de Confidencialidade Mútuo (que incorpora estes Termos Padrão e a Capa (definida abaixo)) (“**MNDA**”) permite que cada parte (“**Parte Divulgadora**”) divulgue ou disponibilize informação relacionada com a {{PURPOSE}} que (1) a Parte Divulgadora identifique junto da parte recetora (“**Parte Recetora**”) como “confidencial”, “de sua propriedade” ou similar, ou (2) deva razoavelmente ser entendida como confidencial ou de propriedade da Parte Divulgadora devido à sua natureza e às circunstâncias da sua divulgação (“**Informação Confidencial**”). A Informação Confidencial de cada parte inclui também a existência e o estado das conversações entre as partes e a informação constante da Capa. A Informação Confidencial inclui informação técnica ou comercial, desenhos ou roteiros de produto, requisitos, preços, documentação de segurança e de conformidade, tecnologia, invenções e know-how. Para utilizar este MNDA, as partes devem preencher e assinar uma capa que incorpore estes Termos Padrão (“**Capa**”). Cada parte é identificada na Capa e os termos com inicial maiúscula têm o significado que lhes é atribuído neste documento ou na Capa.

2. **Utilização e Proteção da Informação Confidencial**. A Parte Recetora deverá: (a) utilizar a Informação Confidencial exclusivamente para a {{PURPOSE}}; (b) não divulgar a Informação Confidencial a terceiros sem a aprovação prévia por escrito da Parte Divulgadora, exceto quando a Parte Recetora possa divulgar a Informação Confidencial aos seus colaboradores, agentes, consultores, subcontratados e outros representantes que tenham uma necessidade razoável de a conhecer para efeitos da {{PURPOSE}}, desde que esses representantes estejam sujeitos a obrigações de confidencialidade não menos protetoras da Parte Divulgadora do que os termos aplicáveis deste MNDA, mantendo-se a Parte Recetora responsável pelo respetivo cumprimento; e (c) proteger a Informação Confidencial utilizando, no mínimo, as mesmas proteções que a Parte Recetora utiliza para a sua própria informação semelhante, nunca inferiores a um padrão razoável de cuidado.

3. **Exceções**. As obrigações da Parte Recetora previstas neste MNDA não se aplicam a informação que esta consiga demonstrar que: (a) é ou se torna publicamente disponível sem culpa da Parte Recetora; (b) já era do seu legítimo conhecimento ou na sua posse antes de a receber da Parte Divulgadora, sem restrições de confidencialidade; (c) obteve legitimamente de um terceiro sem restrições de confidencialidade; ou (d) desenvolveu de forma independente, sem utilizar nem consultar a Informação Confidencial.

4. **Divulgações Exigidas por Lei**. A Parte Recetora poderá divulgar Informação Confidencial na medida exigida por lei, regulamento ou autoridade reguladora, intimação ou decisão judicial, desde que (na medida legalmente permitida) forneça à Parte Divulgadora um aviso prévio razoável da divulgação exigida e coopere de forma razoável, a expensas da Parte Divulgadora, com os esforços desta para obter um tratamento confidencial para a Informação Confidencial.

5. **Vigência e Cessação**. Este MNDA tem início na {{EFFECTIVE_DATE}} e termina no final da {{MNDA_TERM}}. Qualquer das partes pode fazer cessar este MNDA por qualquer motivo ou sem motivo, mediante notificação escrita à outra parte. As obrigações da Parte Recetora relativas à Informação Confidencial manter-se-ão em vigor durante a {{TERM_OF_CONFIDENTIALITY}}, independentemente de qualquer termo ou cessação deste MNDA.

6. **Devolução ou Destruição da Informação Confidencial**. Após o termo ou a cessação deste MNDA, ou mediante pedido anterior da Parte Divulgadora, a Parte Recetora deverá: (a) cessar a utilização da Informação Confidencial; (b) imediatamente após pedido escrito da Parte Divulgadora, destruir toda a Informação Confidencial na sua posse ou controlo, ou devolvê-la à Parte Divulgadora; e (c) se solicitado pela Parte Divulgadora, confirmar por escrito o cumprimento destas obrigações. Como exceção à alínea (b), a Parte Recetora pode conservar Informação Confidencial de acordo com as suas políticas habituais de cópia de segurança ou conservação de registos, ou conforme exigido por lei, mantendo-se os termos deste MNDA aplicáveis à Informação Confidencial conservada.

7. **Direitos de Propriedade**. A Parte Divulgadora conserva a totalidade dos seus direitos de propriedade intelectual e demais direitos sobre a sua Informação Confidencial, e a respetiva divulgação à Parte Recetora não concede qualquer licença sobre esses direitos.

8. **Exclusão de Garantias**. TODA A INFORMAÇÃO CONFIDENCIAL É FORNECIDA “TAL COMO SE ENCONTRA”, COM TODOS OS DEFEITOS E SEM GARANTIAS, INCLUINDO AS GARANTIAS IMPLÍCITAS DE TITULARIDADE, COMERCIALIZAÇÃO E ADEQUAÇÃO A UM FIM ESPECÍFICO.

9. **Lei Aplicável e Jurisdição**. Este MNDA e todas as questões com ele relacionadas regem-se e são interpretados de acordo com as leis de {{GOVERNING_LAW}}, sem consideração pelas respetivas normas de conflito de leis. Qualquer litígio, ação ou processo judicial relacionado com este MNDA deverá ser instaurado nos tribunais de {{JURISDICTION}}. Cada parte submete-se irrevogavelmente à jurisdição exclusiva desses tribunais de {{JURISDICTION}} em qualquer litígio, ação ou processo dessa natureza.

10. **Tutela Cautelar**. Uma violação deste MNDA pode causar um dano irreparável para o qual uma indemnização pecuniária constitua um remédio insuficiente. Perante uma violação deste MNDA, a Parte Divulgadora tem direito a solicitar a tutela cautelar adequada, incluindo uma providência de injunção, para além dos demais meios de que dispõe.

11. **Disposições Gerais**. Nenhuma das partes está obrigada, ao abrigo deste MNDA, a divulgar Informação Confidencial à outra parte nem a avançar com qualquer transação proposta. Nenhuma das partes poderá ceder este MNDA sem o consentimento prévio por escrito da outra parte, exceto quando qualquer das partes ceda este MNDA no âmbito de uma fusão, reorganização, aquisição ou outra transmissão da totalidade ou de substancialmente a totalidade dos seus ativos ou valores mobiliários com direito de voto. Qualquer cessão em violação desta cláusula será nula. Este MNDA vinculará e beneficiará os sucessores e cessionários autorizados de cada parte. As renúncias devem ser assinadas pelo representante autorizado da parte que renuncia e não podem presumir-se de qualquer conduta. Caso alguma disposição deste MNDA seja considerada inexequível, será limitada na medida mínima necessária para que as restantes disposições do MNDA permaneçam em vigor. Este MNDA (incluindo a Capa) constitui o acordo integral entre as partes relativamente ao seu objeto, substituindo todos os entendimentos, acordos, declarações e garantias anteriores e contemporâneos, escritos ou orais, relativos a tal objeto. Este MNDA só poderá ser alterado, modificado, objeto de renúncia ou complementado mediante acordo escrito assinado por ambas as partes. As notificações, pedidos e aprovações previstos neste MNDA devem ser enviados por escrito para os endereços de email ou postais constantes da Capa, considerando-se entregues no momento da respetiva receção. Este MNDA pode ser celebrado em exemplares distintos, incluindo cópias eletrónicas, cada um dos quais será considerado um original e que, em conjunto, constituirão o mesmo acordo.

Acordo de Confidencialidade Mútuo da Common Paper, [Versão 1.0](https://commonpaper.com/standards/mutual-nda/1.0/), de utilização gratuita ao abrigo da licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} ano${n === 1 ? "" : "s"}`;
}

/** Frase inserida em "... e termina no final da {{MNDA_TERM}}." */
function describeMndaTerm(years: number): string {
  return `${pluralYears(years)} a partir da Data de Vigência`;
}

/** Frase inserida em "... manter-se-ão em vigor durante a {{TERM_OF_CONFIDENTIALITY}}, ..." */
function describeConfidentiality(years: ConfidentialityYears): string {
  if (years === CONFIDENTIALITY_INDEFINITE) {
    return "um período indefinido após o termo ou cessação deste MNDA";
  }
  return `${pluralYears(years)} após o termo ou cessação deste MNDA`;
}

export const pt: TemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeMndaTerm,
  describeConfidentiality,
};
