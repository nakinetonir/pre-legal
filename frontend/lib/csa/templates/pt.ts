import type { CsaTemplateModule } from "./types";

/** Portuguese adaptation of the CSA Standard Terms - see en.ts for the source note. */
const STANDARD_TERMS_TEMPLATE = `1. **Serviço**. Durante o Período de Subscrição e sujeito aos termos deste Acordo, o Cliente pode aceder e utilizar o Serviço na Nuvem e qualquer Software e Documentação incluídos, exclusivamente para os seus fins empresariais internos. O Cliente é responsável por todas as ações realizadas nas contas dos seus Utilizadores e pelo cumprimento deste Acordo por parte destes. O Cliente pode fornecer Comentários ao Fornecedor, que este pode utilizar livremente, e o Fornecedor pode recolher e analisar Dados de Utilização agregados para manter, melhorar e promover os seus produtos e serviços, incluindo o desenvolvimento ou aperfeiçoamento de modelos de inteligência artificial ou aprendizagem automática, sem identificar o Cliente ou os seus Utilizadores.

2. **Restrições e Suspensão**. Salvo se expressamente permitido por este Acordo, o Cliente não fará (nem permitirá a terceiros fazer) engenharia inversa do Produto, não o revenderá nem sublicenciará, não removerá avisos de propriedade e não o utilizará para desenvolver um produto concorrente ou em violação da legislação aplicável. Se o Cliente tiver um saldo em dívida não contestado há mais de 30 dias ou violar substancialmente este Acordo, o Fornecedor poderá suspender o seu acesso, procurando notificá-lo previamente quando praticável, e restabelecerá o acesso assim que o problema for resolvido.

3. **Pagamento e Impostos**. {{PAYMENT_PROCESS}}. O Cliente é responsável por todos os direitos, impostos e taxas aplicáveis às Tarifas, exceto os impostos sobre o rendimento do Fornecedor. Se o Cliente tiver uma disputa de boa-fé sobre uma fatura, deve notificar o Fornecedor antes da data de vencimento do pagamento e pagar pontualmente os valores não contestados; as partes colaborarão de boa-fé para resolver a disputa.

4. **Vigência e Rescisão**. Este Acordo entra em vigor em {{EFFECTIVE_DATE}} e mantém-se por {{SUBSCRIPTION_PERIOD}}. Qualquer das partes pode rescindir imediatamente se a outra parte não sanar um incumprimento substancial no prazo de 30 dias após a notificação, ou se tornar insolvente. Após a expiração ou rescisão: o Cliente perde qualquer direito de utilizar o Produto; o Fornecedor eliminará o Conteúdo do Cliente no prazo de 60 dias após o pedido; cada parte devolverá ou destruirá as Informações Confidenciais da outra; e o Fornecedor emitirá uma fatura final referente às Tarifas vencidas antes da rescisão.

5. **Declarações e Garantias**. Cada parte declara que tem autoridade para celebrar este Acordo e que cumprirá a legislação aplicável na sua execução. O Fornecedor garante ainda que não reduzirá substancialmente a funcionalidade geral do Serviço na Nuvem durante o Período de Subscrição. Se o Fornecedor violar esta garantia, o único recurso do Cliente será que o Fornecedor restaure a funcionalidade no prazo de 45 dias após a notificação ou, não o conseguindo, que o Cliente rescinda a subscrição afetada e receba um reembolso proporcional das Tarifas pré-pagas.

6. **Exclusão de Garantias**. Exceto pelas garantias da Secção 5 (Declarações e Garantias), o Produto é fornecido **"TAL COMO ESTÁ", e o Fornecedor e o Cliente excluem cada um todas as demais garantias e condições, expressas ou implícitas, incluindo as garantias implícitas de comercialização, adequação a um fim específico e não violação, na máxima medida permitida pela legislação aplicável**.

7. **Limitação de Responsabilidade**. **Exceto em caso de violação da Secção 9 (Confidencialidade) ou das obrigações de indemnização de uma parte nos termos da Secção 8 (Indemnização), a responsabilidade cumulativa total de cada parte por todas as reclamações decorrentes deste Acordo não excederá {{GENERAL_CAP_AMOUNT}}, e em nenhuma circunstância qualquer das partes será responsável perante a outra por lucros cessantes ou por danos consequenciais, especiais, indiretos, exemplares, punitivos ou incidentais, mesmo que tenha sido informada da possibilidade de tais danos.** Estas limitações aplicam-se a toda a responsabilidade, seja em responsabilidade civil extracontratual, contratual ou outra, salvo na medida proibida pela legislação aplicável.

8. **Indemnização**. O Fornecedor defenderá e indemnizará o Cliente contra reclamações de terceiros que aleguem que o Produto viola os seus direitos de propriedade intelectual, e o Cliente defenderá e indemnizará o Fornecedor contra reclamações de terceiros decorrentes de utilização indevida do Produto ou do Conteúdo do Cliente, incluindo em cada caso honorários advocatícios razoáveis. A parte indemnizada deve notificar prontamente a parte indemnizadora sobre a reclamação, conceder-lhe o controlo exclusivo da defesa e do acordo, e cooperar razoavelmente a expensas da parte indemnizadora.

9. **Confidencialidade**. Exceto quando necessário para a execução deste Acordo, a parte que receber Informações Confidenciais da outra não as utilizará nem divulgará, e protegê-las-á com pelo menos o mesmo cuidado que aplica às suas próprias informações semelhantes. Estas obrigações não se aplicam a informações que sejam ou se tornem públicas, que já fossem conhecidas sem restrições, ou desenvolvidas de forma independente sem referência às Informações Confidenciais, podendo uma parte divulgar Informações Confidenciais na medida exigida por lei, após aviso prévio razoável sempre que legalmente permitido.

10. **Reserva de Direitos**. Exceto pelos direitos limitados concedidos neste Acordo, o Fornecedor conserva todos os direitos, título e interesse sobre o Produto, e o Cliente conserva todos os direitos, título e interesse sobre o seu Conteúdo.

11. **Lei Aplicável e Tribunais Escolhidos**. Este Acordo e todas as questões a ele relacionadas regem-se e são interpretados de acordo com as leis de {{GOVERNING_LAW}}, sem consideração das respetivas normas de conflito de leis. Qualquer ação judicial relacionada com este Acordo deve ser instaurada nos tribunais de {{JURISDICTION}}, à cuja jurisdição exclusiva cada parte se submete irrevogavelmente. Uma violação da Secção 9 (Confidencialidade) ou dos direitos de propriedade intelectual de uma parte pode causar dano irreparável, podendo a parte não infratora solicitar medidas cautelares, além dos demais recursos disponíveis.

12. **Disposições Gerais**. Este Acordo constitui a totalidade do acordo entre as partes quanto ao seu objeto e substitui todas as discussões anteriores. Qualquer alteração, renúncia ou aditamento deve ser feito por escrito e assinado por ambas as partes, e se alguma disposição for considerada inexequível, o restante do Acordo permanece em vigor. Nenhuma das partes poderá ceder este Acordo sem o consentimento prévio por escrito da outra, exceto em caso de fusão, reorganização ou venda da totalidade ou da quase totalidade dos seus ativos. As partes são contratantes independentes, e nenhuma delas será responsável por um atraso causado por um Evento de Força Maior, o que não isenta, contudo, o Cliente da obrigação de pagar as Tarifas já vencidas. Este Acordo pode ser assinado em várias vias, incluindo eletronicamente, considerando-se cada uma delas um original.

Adaptado do Common Paper Cloud Service Agreement [Standard Terms Version 2.1](https://commonpaper.com/standards/cloud-service-agreement/2.1/), de livre utilização ao abrigo da licença [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
`;

function pluralYears(n: number): string {
  return `${n} ano${n === 1 ? "" : "s"}`;
}

function describeSubscriptionPeriod(years: number): string {
  return (
    `${pluralYears(years)} a partir da Data de Vigência, renovando-se automaticamente por ` +
    `períodos adicionais de ${pluralYears(years)}, salvo se qualquer das partes notificar a não ` +
    `renovação com pelo menos 30 dias de antecedência em relação ao final do período em curso`
  );
}

export const pt: CsaTemplateModule = {
  STANDARD_TERMS_TEMPLATE,
  describeSubscriptionPeriod,
};
