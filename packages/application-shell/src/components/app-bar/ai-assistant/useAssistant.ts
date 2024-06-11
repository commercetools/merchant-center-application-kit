import { useState } from 'react';

export const useAiAssistant = () => {
  const [busy, setBusy] = useState(false);

  const data = {
    messages: [
      {
        content: 'how to create a product in the merchant center',
        role: 'user',
      },
      {
        id: 'M3_HLIjiRA',
        content:
          'To create a product using the Merchant Center, you have to first create a Product Type. Then you can create Products of that type. For detailed instructions, please see the Merchant Center documentation:\n\n-   [Product Types and Attributes](https://docs.commercetools.com/merchant-center/product-types)\n-   [Product List](https://docs.commercetools.com/merchant-center/product-list)\n',
        role: 'assistant',
      },
    ],
    conversationId: 'W_X8XsoYoY',
    references: [
      {
        url: 'https://docs.commercetools.com/foundry/blueprint-b2b/define-product-types',
        title: 'Define product types',
        microsite: 'foundry',
        micrositeBreadcrumb: null,
        contentType: 'guidedDocs',
        products: ['Composable Commerce', 'Frontend', 'Connect'],
        tokenCount: 396,
        codeRemoved: false,
        similarityScore: 0.7667849659919739,
        usedInSystemPrompt: true,
      },
      {
        url: 'https://docs.commercetools.com/merchant-center',
        title: 'Merchant Center',
        microsite: 'merchant-center',
        micrositeBreadcrumb: 'Composable Commerce',
        contentType: 'userDocs',
        products: ['Composable Commerce'],
        tokenCount: 628,
        codeRemoved: false,
        similarityScore: 0.7630612850189209,
        usedInSystemPrompt: true,
      },
      {
        url: 'https://docs.commercetools.com/merchant-center/product-types#product-type-and-attributes',
        title: 'Product Types and Attributes: Product Type and Attributes',
        microsite: 'merchant-center',
        micrositeBreadcrumb: 'Composable Commerce',
        contentType: 'userDocs',
        products: ['Composable Commerce'],
        tokenCount: 1582,
        codeRemoved: true,
        similarityScore: 0.7591813802719116,
        usedInSystemPrompt: true,
      },
    ],
    locked: false,
  };

  const send = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
    }, Math.random() * 5000);
  };

  return {
    messages: data.messages,
    conversationId: data.conversationId,
    busy,
    send,
  };
};
